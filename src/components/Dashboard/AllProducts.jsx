import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

export default function AllProducts({ setActiveTab }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getToken = () => sessionStorage.getItem("accessToken");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const response = await fetch("https://shri-velan-food.onrender.com/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data?.data?.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = getToken();
      if (!token) return alert("No authorization token found.");

      const response = await fetch(`https://shri-velan-food.onrender.com/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete product");
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (product) => {
    setActiveTab("Add Products", { product, isEditing: true });
  };

  if (loading) return <div className="flex min-h-screen justify-center items-center"><Loader /></div>
  if (error) return <p className="text-center text-red-500 mt-5">Error: {error}</p>;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-5 text-center">All Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
              <img src={product.images?.[0]} alt={product.name} className="w-full h-56 object-cover rounded-md" />
              <div className="mt-3">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="mt-2 text-gray-700"><span className="font-medium">Weight:</span> {product.weight}</p>
                <p className="text-gray-700"><span className="font-medium">Normal Price:</span> ₹{product.normalPrice}</p>
                <p className="text-green-600 font-semibold">Offer Price: ₹{product.offerPrice}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
