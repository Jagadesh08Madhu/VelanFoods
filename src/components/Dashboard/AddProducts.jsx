import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthLoader from "../Auth/AuthLoader";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function AddProducts({ setActiveTab, productData: productDataFromProps }) {
  const [benefits, setBenefits] = useState([""]);
  const [fileNames, setFileNames] = useState([]);
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // New state for existing images
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
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
    categoryName: "", // changed from categoryId → categoryName
  });

  const location = useLocation();
  const getToken = () => sessionStorage.getItem("accessToken");

  // Fetch categories
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async () => {
    try {
      const token = getToken();
      const response = await fetch("https://shri-velan-food.onrender.com/api/categories" ,
         { headers: { Authorization: `Bearer ${token}` } }
        );
      if (!response.ok) throw new Error("Failed to fetch category");

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setCategory(result.data);
      } else {
        throw new Error("Invalid category data format");
      }
    } catch (err) {
      console.error("Fetch category error:", err);
      alert("Failed to fetch category. Please try again later.");
    }
  };

  // Prefill from props
  useEffect(() => {
    if (productDataFromProps) {
      const product = productDataFromProps;
      setIsEditing(true);
      setEditingProductId(product.id);
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
        categoryName: product.category?.name || "", // use category name
      });

      setBenefits(product.benefits?.length > 0 ? product.benefits : [""]);

      if (product.images?.length > 0) {
        setExistingImages(product.images);
        setFileNames(product.images.map((_, i) => `Existing Image ${i + 1}`));
      }
    }
  }, [productDataFromProps]);

  // Prefill from location.state (for backward compatibility)
  useEffect(() => {
    if (location.state?.isEditing && location.state?.product) {
      const product = location.state.product;
      setIsEditing(true);
      setEditingProductId(product.id);
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
        categoryName: product.category?.name || "", // use category name
      });

      setBenefits(product.benefits?.length > 0 ? product.benefits : [""]);

      if (product.images?.length > 0) {
        setExistingImages(product.images);
        setFileNames(product.images.map((_, i) => `Existing Image ${i + 1}`));
      }
    }
  }, [location.state]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      setFileNames(selectedFiles.map((file) => file.name));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({ ...productData, [name]: type === "checkbox" ? checked : value });
  };

  const handleBenefitChange = (index, value) => {
    const updated = [...benefits];
    updated[index] = value;
    setBenefits(updated);
  };
  const addBenefit = () => setBenefits([...benefits, ""]);
  const removeBenefit = (index) => setBenefits(benefits.filter((_, i) => i !== index));

  // Remove existing image
  const removeExistingImage = (index) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
    setFileNames(updated.map((_, i) => `Existing Image ${i + 1}`));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      alert("No authorization token found. Please login again.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    const ingredientsArray = productData.ingredients
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    const tagsArray = productData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("weight", productData.weight);
    formData.append("isCombo", productData.isCombo);
    formData.append("normalPrice", productData.normalPrice);
    formData.append("offerPrice", productData.offerPrice);
    formData.append("stock", productData.stock);
    formData.append("status", productData.status);
    formData.append("categoryName", productData.categoryName);
    formData.append("benefits", JSON.stringify(benefits));
    formData.append("ingredients", JSON.stringify(ingredientsArray));
    formData.append("tags", JSON.stringify(tagsArray));

    if (isEditing) {
      formData.append("existingImages", JSON.stringify(existingImages)); // send existing images array
    }

    try {
      setLoading(true);
      let url = "https://shri-velan-food.onrender.com/api/products";
      let res;

      if (isEditing) {
        url += `/${editingProductId}`;
        res = await fetch(url, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      } else {
        res = await fetch(url, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(`❌ ${isEditing ? "Update" : "Add"} failed: ${data.message || "Unknown error"}`);
        return;
      }

      toast.success(`✅ Product ${isEditing ? "updated" : "added"} successfully!`);
      if (!isEditing) {
        resetForm();
      } else {
        if (typeof setActiveTab === "function") setActiveTab("All products");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      categoryName: "",
    });
    setBenefits([""]);
    setFiles([]);
    setFileNames([]);
    setExistingImages([]);
  };

  return (
        <motion.section
      className="px-5 lg:px-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="text-2xl font-semibold mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isEditing ? "Edit Product" : "Add Products"}
      </motion.h1>

      <motion.form
        className="flex flex-col gap-6 w-full"
        onSubmit={handleSubmit}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        {/* Product Images */}
        <motion.div
          className="flex flex-col gap-2"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <label className="font-medium mb-1">Product Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="mb-3"
          />
          <div className="flex gap-3 flex-wrap">
            {existingImages.map((img, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <img
                  src={img}
                  alt={`Existing ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-full"
                >
                  ✕
                </button>
              </motion.div>
            ))}

            {files.map((file, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedFiles = [...files];
                    updatedFiles.splice(index, 1);
                    setFiles(updatedFiles);
                    setFileNames(updatedFiles.map((f) => f.name));
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-full"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Combo Checkbox */}
        <motion.div
          className="flex items-center gap-2"
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
        >
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
        </motion.div>

        {/* Name & Weight */}
        <motion.div
          className="flex flex-col md:flex-row gap-5"
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
        >
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
        </motion.div>

        {/* Category Dropdown */}
        <motion.div
          className="flex flex-col w-full"
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
        >
          <label className="font-medium mb-1">Select Category:</label>
          <select
            name="categoryName"
            value={productData.categoryName}
            onChange={handleChange}
            className="border px-5 py-2 outline-none rounded-md focus:border-primary"
            required
          >
            <option value="">-- Select Category --</option>
            {category
              .filter((cate) => cate.isActive)
              .map((cate) => (
                <option key={cate.id} value={cate.name}>
                  {cate.name}
                </option>
              ))}
          </select>
        </motion.div>

        {/* Prices */}
        <motion.div
          className="flex flex-col md:flex-row gap-5"
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
        >
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
        </motion.div>

        {/* Benefits */}
        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
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
        </motion.div>

        {/* Ingredients */}
        <motion.div
          className="flex flex-col"
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
        >
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
        </motion.div>

        {/* Stock & Tags */}
        <motion.div
          className="flex flex-col md:flex-row gap-5"
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
        >
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
        </motion.div>

        {/* Status */}
        <motion.div
          className="flex items-center gap-2"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <input
            type="checkbox"
            name="status"
            checked={productData.status}
            onChange={(e) => setProductData({ ...productData, status: e.target.checked })}
          />
          <label className="font-medium">Active Status</label>
        </motion.div>

        {/* Description */}
        <motion.div
          className="flex flex-col"
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
        >
          <label className="font-medium mb-1">Description:</label>
          <textarea
            name="description"
            className="border px-5 py-2 outline-none rounded-md focus:border-primary"
            placeholder="Enter product description"
            value={productData.description}
            onChange={handleChange}
            required
          ></textarea>
        </motion.div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          className={`relative flex items-center justify-center gap-2 px-6 py-2 text-white font-semibold rounded transition-all duration-200 ${
            loading ? "bg-transparent cursor-not-allowed" : "bg-primary hover:bg-primary/90"
          }`}
          variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
        >
          {loading ? <AuthLoader /> : isEditing ? "Update Product" : "Add Product"}
        </motion.button>

        {isEditing && (
          <motion.button
            type="button"
            onClick={() =>
              typeof setActiveTab === "function" && setActiveTab("All products")
            }
            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            Cancel
          </motion.button>
        )}
      </motion.form>
    </motion.section>
  );
}
