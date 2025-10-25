import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

export default function DashboardContact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContacts = async () => {
    setLoading(true)
    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      setError("Access denied. No token found.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://shri-velan-food.onrender.com/api/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setContacts(data.data.contacts);
      } else {
        setError(data.message || "Failed to fetch contacts");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await fetch(`https://shri-velan-food.onrender.com/api/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // remove deleted contact from state
        setContacts((prev) => prev.filter((contact) => contact.id !== id));
      } else {
        alert(data.message || "Failed to delete contact");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting");
    }
  };

  if (loading) return <div className='flex justify-center items-center min-h-screen'><Loader /></div>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!contacts.length)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-white text-center text-xl">No contacts found.</p>
    </div>
  );


  return (
    <div className="p-5">
      <h2 className="text-2xl text-white font-semibold mb-5">Contact Submissions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-primary/60 p-4 flex flex-col gap-3 rounded-lg shadow-md relative">
            <h3 className="font-semibold "><strong>Name:</strong> {contact.name}</h3>
            <p className=""><strong>Email:</strong> {contact.email}</p>
            <p className=""><strong>Phone:</strong> {contact.phone}</p>
            <p className=""><strong>Message:</strong> {contact.message}</p>
            <p className=" text-sm">{new Date(contact.createdAt).toLocaleString()}</p>
            <button
              onClick={() => handleDelete(contact.id)}
              className=" bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
