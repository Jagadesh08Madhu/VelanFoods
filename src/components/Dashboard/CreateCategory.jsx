import React, { useEffect, useState } from "react";
import AuthLoader from "../Auth/AuthLoader"; // your loader component
import Loader from "../Loader/Loader";
import ButtonLoader from "../Loader/ButtonLoader";

export default function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const token = sessionStorage.getItem("accessToken");

  // Fetch categories
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch(
        "https://shri-velan-food.onrender.com/api/categories",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Create or update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("isActive", isActive);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      let res;
      if (editingId) {
        res = await fetch(
          `https://shri-velan-food.onrender.com/api/categories/${editingId}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
      } else {
        res = await fetch(
          "https://shri-velan-food.onrender.com/api/categories",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
      }

      const data = await res.json();
      if (!data.success) {
        alert("Error: " + (data.message || "Something went wrong"));
        return;
      }

      await fetchCategories(); // refresh list
      alert(editingId ? "Category updated!" : "Category created!");

      // Reset form
      setName("");
      setDescription("");
      setImage(null);
      setPreview(null);
      setEditingId(null);
      setIsActive(true);
    } catch (err) {
      console.error("Error creating/updating category:", err);
      alert("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(
        `https://shri-velan-food.onrender.com/api/categories/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!data.success) {
        alert("Error deleting category: " + (data.message || ""));
        return;
      }
      alert("Category deleted successfully!");
      await fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  // Edit category
  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description);
    setPreview(cat.image);
    setImage(null);
    setIsActive(cat.isActive ?? true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {editingId ? "Edit Category" : "Create Category"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-10">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-5 py-2 outline-none rounded-md focus:border-primary w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-5 py-2 outline-none rounded-md focus:border-primary w-full"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border px-5 py-2 outline-none rounded-md focus:border-primary w-full"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-contain rounded mt-2"
          />
        )}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            id="isActive"
          />
          <label htmlFor="isActive">Is Active</label>
        </div>
        <button
          type="submit"
          className={`bg-primary w-full text-white px-4 py-3 rounded flex items-center justify-center ${loading ? "bg-transparent" :"bg-primary"}`}
          disabled={loading}
        >
          {loading ? <ButtonLoader /> : editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <h3 className="text-lg text-center font-semibold mb-8">All Categories</h3>

      {loadingCategories ? (
        <div className="flex justify-center items-center py-10">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div
                key={cat.id}
                className={`border rounded p-3 flex flex-col items-center`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-48 object-contain rounded mb-2"
                />
                <h4 className="font-semibold">{cat.name}</h4>
                <p className="text-sm text-gray-600 text-center mb-2">
                  {cat.description}
                </p>
                <p className="text-sm mb-2">
                  Status: {cat.isActive ? "Active" : "Inactive"}
                </p>
                <div className="flex gap-5 mt-auto">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-transparent border border-black text-black px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="bg-primary border  text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No categories found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
