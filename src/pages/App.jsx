import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LeadForm from "./LeadForm";
import LeadList from "./LeadList";

function LeadListPage({ leads }) {
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-gray-700 min-h-screen">
      <h1 className="text-4xl text-center font-bold text-zinc-200">
        Lead Enquiry List
      </h1>
      <div className="flex justify-end items-center mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/add")}
        >
          Add New Lead
        </button>
      </div>
      <LeadList leads={leads} />
    </div>
  );
}

function LeadFormPage({ onAddLead }) {
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-gray-700 min-h-screen">
      <h1 className="text-4xl text-center font-bold text-zinc-200">
        Add New Lead
      </h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to List
        </button>
      </div>
      <LeadForm onAddLead={onAddLead} />
    </div>
  );
}

const App = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch("/leadsData.json")
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) => console.error("Error loading leads.json:", err));
  }, []);

  const addLead = (lead) => {
    setLeads((prev) => [...prev, lead]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeadListPage leads={leads} />} />
        <Route path="/add" element={<LeadFormPage onAddLead={addLead} />} />
        <Route
          path="*"
          element={
            <div className="text-center text-red-500 mt-10">Page Not Found</div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
