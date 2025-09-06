import React from "react";
import { useNavigate } from "react-router-dom";

export default function LeadList({ leads, onDelete, onEdit }) {
  const navigate = useNavigate();
  if (leads.length === 0)
    return <p className="text-gray-500">No leads captured yet.</p>;

  return (
    <div className="w-full  bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Leads</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Qualification</th>
              <th className="p-2 border">Source</th>
              <th className="p-2 border">Interested Field</th>
              <th className="p-2 border">Assigned To</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">State</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{lead.name}</td>
                <td className="p-2 border">{lead.email}</td>
                <td className="p-2 border">{lead.phone}</td>
                <td className="p-2 border">{lead.status || "-"}</td>
                <td className="p-2 border">{lead.qualification || "-"}</td>
                <td className="p-2 border">{lead.source || "-"}</td>
                <td className="p-2 border">{lead.interstedField || "-"}</td>
                <td className="p-2 border">{lead.assignedTo || "-"}</td>
                <td className="p-2 border">{lead.city || "-"}</td>
                <td className="p-2 border">{lead.state || "-"}</td>
                <td className="p-2 border">
                  <button
                    className="text-blue-600 mr-2"
                    onClick={() => {
                      onEdit(lead);
                      navigate("/add");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => onDelete(lead.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
