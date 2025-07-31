import React, { useState } from "react";
import axios from "axios";

export const ResultsPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setResult(null);
    try {
      const res = await axios.get(`/api/results?rollNo=${query}`);
      setResult(res.data);
    } catch (err) {
      setError("Result not found.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Results</h1>
      <div className="mb-4 flex">
        <input
          className="border p-2 flex-1"
          placeholder="Enter Roll No. or ID"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {result && (
        <div className="bg-white shadow p-4 rounded">
          <div><b>Name:</b> {result.name}</div>
          <div><b>Roll No:</b> {result.rollNo}</div>
          <div><b>Marks:</b> {result.marks}</div>
          <div><b>Status:</b> {result.status}</div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;