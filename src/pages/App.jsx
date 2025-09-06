import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LeadForm from "./LeadForm";
import LeadList from "./LeadList";

// list page component
function LeadListPage({ leads, onDelete, onEdit }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search)
  );

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

      <input
        type="text"
        placeholder="Search by name, email, or phone"
        className="mb-4 p-2 border rounded w-full max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <LeadList leads={filteredLeads} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

//form page component
function LeadFormPage({ onAddLead, onEditLead, editingLead }) {
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
      <LeadForm
        onAddLead={onAddLead}
        editingLead={editingLead}
        onEditLead={onEditLead}
      />
    </div>
  );
}

const App = () => {
  const [leads, setLeads] = useState([]);
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    fetch("/leadsData.json")
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) => console.error("Error loading leads.json:", err));
  }, []);

  const addLead = (lead) => {
    setLeads((prev) => [...prev, lead]);
    toast.success("Lead added!");
  };

  const editLead = (updatedLead) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.email === updatedLead.email ? updatedLead : lead
      )
    );
    setEditingLead(null);
    toast.success("Lead updated!");
  };

  const deleteLead = (email) => {
    setLeads((prev) => prev.filter((lead) => lead.email !== email));
    toast.info("Lead deleted.");
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route
          path="/"
          element={
            <LeadListPage
              leads={leads}
              onDelete={deleteLead}
              onEdit={(lead) => setEditingLead(lead)}
            />
          }
        />
        <Route
          path="/add"
          element={
            <LeadFormPage
              onAddLead={addLead}
              editingLead={editingLead}
              onEditLead={editLead}
            />
          }
        />
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
