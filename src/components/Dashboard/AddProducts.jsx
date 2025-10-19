import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [benefits, setBenefits] = useState([""]);
  const [fileNames, setFileNames] = useState([]);
  const [files, setFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [productData, setProductData] = useState({
    isCombo: false,
    name: "",
    weight: "",
    normalPrice: "",
    offerPrice: "",
    ingredients: "",
    stock: "",
    status: true,
    tags: "",
    description: "",
    categoryId: ""
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Get token from sessionStorage
  const getToken = () => {
    return sessionStorage.getItem("accessToken");
  };

  // Check if we're in edit mode
  useEffect(() => {
    if (location.state?.isEditing && location.state?.product) {
      const product = location.state.product;
      setIsEditing(true);
      setEditingProductId(product.id);
      
      // Pre-fill form with product data
      setProductData({
        isCombo: product.isCombo || false,
        name: product.name || "",
        weight: product.weight || "",
        normalPrice: product.normalPrice || "",
        offerPrice: product.offerPrice || "",
        ingredients: product.ingredients?.join(", ") || "",
        stock: product.stock || "",
        status: product.status !== undefined ? product.status : true,
        tags: product.tags?.join(", ") || "",
        description: product.description || "",
        categoryId: product.categoryId || product.category?.id || ""
      });

      // Pre-fill benefits
      if (product.benefits && product.benefits.length > 0) {
        setBenefits(product.benefits);
      } else {
        setBenefits([""]);
      }

      // You might want to handle existing images here
      if (product.images && product.images.length > 0) {
        setFileNames(product.images.map((img, index) => `Existing Image ${index + 1}`));
      }
    }
  }, [location.state]);

  // ✅ handle multiple file uploads
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      setFileNames(selectedFiles.map((file) => file.name));
    }
  };

  // ✅ handle all other inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ handle dynamic benefits
  const handleBenefitChange = (index, value) => {
    const updated = [...benefits];
    updated[index] = value;
    setBenefits(updated);
  };
  const addBenefit = () => setBenefits([...benefits, ""]);
  const removeBenefit = (index) =>
    setBenefits(benefits.filter((_, i) => i !== index));

  // ✅ handle submit for both add and edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if token exists
    const token = getToken();
    if (!token) {
      alert("No authorization token found. Please login again.");
      return;
    }

    const formData = new FormData();

    // Append multiple files as images[] (only for new uploads)
    files.forEach((file) => formData.append("images", file));

    // Convert comma-separated values to arrays
    const ingredientsArray = productData.ingredients
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    const tagsArray = productData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Append basic fields
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("weight", productData.weight);
    formData.append("isCombo", productData.isCombo);
    formData.append("normalPrice", productData.normalPrice);
    formData.append("offerPrice", productData.offerPrice);
    formData.append("stock", productData.stock);
    formData.append("status", productData.status);
    formData.append("categoryId", productData.categoryId);
    formData.append("benefits", JSON.stringify(benefits));
    formData.append("ingredients", JSON.stringify(ingredientsArray));
    formData.append("tags", JSON.stringify(tagsArray));

    try {
      let res;
      let url = "https://shri-velan-food.onrender.com/api/products";
      
      if (isEditing) {
        // For editing, use PUT method and include product ID
        url += `/${editingProductId}`;
        res = await fetch(url, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        });
      } else {
        // For adding, use POST method
        res = await fetch(url, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        });
      }

      const data = await res.json();
      if (res.ok) {
        alert(`✅ Product ${isEditing ? 'updated' : 'added'} successfully!`);
        if (!isEditing) {
          // Reset form if it was an add operation
          resetForm();
        } else {
          // Navigate back to products list after successful edit
          navigate('/all-products');
        }
      } else {
        alert(`❌ ${isEditing ? 'Update' : 'Add'} failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }
  };

  // Reset form function
  const resetForm = () => {
    setProductData({
      isCombo: false,
      name: "",
      weight: "",
      normalPrice: "",
      offerPrice: "",
      ingredients: "",
      stock: "",
      status: true,
      tags: "",
      description: "",
      categoryId: ""
    });
    setBenefits([""]);
    setFiles([]);
    setFileNames([]);
  };

  return (
    <section className="px-5 lg:px-20">
      <h1 className="text-2xl font-semibold mb-5">
        {isEditing ? 'Edit Product' : 'Add Products'}
      </h1>

      <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
        {/* Product Images */}
        <div className="flex flex-col gap-2">
          <label className="font-medium mb-1">Product Images:</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              id="fileUpload"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md transition"
            >
              Choose Files
            </label>
            <span className="text-gray-600 text-sm">
              {fileNames.length > 0 ? fileNames.join(", ") : "No file chosen"}
            </span>
          </div>
          {isEditing && fileNames.length === 0 && (
            <p className="text-sm text-gray-500">No new images selected. Existing images will be kept.</p>
          )}
        </div>

        {/* Combo Checkbox */}
        <div className="flex items-center gap-2">
          <input
            id="isCombo"
            type="checkbox"
            name="isCombo"
            checked={productData.isCombo}
            onChange={handleChange}
          />
          <label htmlFor="isCombo" className="font-medium">
            Is this a combo product?
          </label>
        </div>

        {/* Name & Weight */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Product Name:</label>
            <input
              name="name"
              className="border px-5 py-2 outline-none rounded-md focus:border-primary"
              type="text"
              placeholder="Enter product name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Weight:</label>
            <input
              name="weight"
              className="border px-5 py-2 outline-none rounded-md focus:border-primary"
              type="text"
              placeholder="Enter weight"
              value={productData.weight}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Category ID:</label>
          <input
            name="categoryId"
            className="border px-5 py-2 outline-none rounded-md focus:border-primary"
            type="text"
            placeholder="Enter category ID"
            value={productData.categoryId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Prices */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Normal Price:</label>
            <input
              name="normalPrice"
              type="number"
              placeholder="Enter normal price"
              value={productData.normalPrice}
              onChange={handleChange}
              className="border px-5 py-2 outline-none rounded-md focus:border-primary"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Offer Price:</label>
            <input
              name="offerPrice"
              type="number"
              placeholder="Enter offer price"
              value={productData.offerPrice}
              onChange={handleChange}
              className="border px-5 py-2 outline-none rounded-md focus:border-primary"
              required
            />
          </div>
        </div>

        {/* Benefits */}
        <div>
          <label className="font-medium">Benefits:</label>
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-3 mt-2">
              <input
                className="border px-4 py-2 outline-none rounded-md w-full"
                type="text"
                placeholder={`Benefit ${index + 1}`}
                value={benefit}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
              />
              {benefits.length > 1 && (
                <button
                  type="button"
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => removeBenefit(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="mt-3 px-4 py-2 bg-primary text-white rounded"
            onClick={addBenefit}
          >
            + Add Benefit
          </button>
        </div>

        {/* Ingredients */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Ingredients (comma separated):</label>
          <input
            name="ingredients"
            className="border px-5 py-2 outline-none rounded-md focus:border-primary"
            type="text"
            placeholder="Example: Almonds, Cashews, Jaggery"
            value={productData.ingredients}
            onChange={handleChange}
            required
          />
        </div>

        {/* Stock & Tags */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Stock Quantity:</label>
            <input
              name="stock"
              type="number"
              placeholder="Enter stock quantity"
              value={productData.stock}
              onChange={handleChange}
              className="border px-5 py-2 outline-none rounded-md focus:border-primary"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Tags (comma separated):</label>
            <input
              name="tags"
              type="text"
              placeholder="Example: organic, herbal, natural"
              value={productData.tags}
              onChange={handleChange}
              className="border px-5 py-2 outline-none rounded-md focus:border-primary"
              required
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={productData.status}
            onChange={(e) =>
              setProductData({ ...productData, status: e.target.checked })
            }
          />
          <label className="font-medium">Active Status</label>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Description:</label>
          <textarea
            name="description"
            className="border px-5 py-2 outline-none rounded-md focus:border-primary"
            placeholder="Enter product description"
            value={productData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white font-semibold rounded"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>

        {/* Cancel button for edit mode */}
        {isEditing && (
          <button
            type="button"
            onClick={() => navigate('/all-products')}
            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded"
          >
            Cancel
          </button>
        )}
      </form>
    </section>
  );
}