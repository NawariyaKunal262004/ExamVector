import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ExamApplicationPage: React.FC = () => {
  const { examId } = useParams();
  const [schema, setSchema] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`/api/exams/${examId}/schema`)
      .then(res => setSchema(res.data))
      .catch(() => setError("Could not load form schema."));
  }, [examId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      await axios.post(`/api/exams/${examId}/apply`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Form submitted successfully!");
    } catch (err) {
      setError("Submission failed. Please try again.");
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;
  if (!schema) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">{schema.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {schema.fields.map((field: any) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              name={field.name}
              type={field.type}
              required={field.required}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default ExamApplicationPage;
