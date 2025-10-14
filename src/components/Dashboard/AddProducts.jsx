import React, { useState } from "react";

export default function AddProducts() {
  const [benefits, setBenefits] = useState([""]);
  const [fileName, setFileName] = useState("No file chosen");
  const [file, setFile] = useState(null);

  const [productData, setProductData] = useState({
    isCombo: false,
    productName: "",
    weight: "",
    newCategory: "",
    existingCategory: "",
    normalPrice: "",
    offerPrice: "",
    ingredients: "",
    stockQuantity: "",
    status: "active",
    tags: "",
    description: "",
  });

  // ✅ handle file input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
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

  // ✅ handle benefits dynamically
  const handleBenefitChange = (index, value) => {
    const updated = [...benefits];
    updated[index] = value;
    setBenefits(updated);
  };
  const addBenefit = () => setBenefits([...benefits, ""]);
  const removeBenefit = (index) =>
    setBenefits(benefits.filter((_, i) => i !== index));

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) formData.append("image", file);

    Object.entries(productData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("benefits", JSON.stringify(benefits));

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product added successfully!");
      } else {
        alert(`❌ Failed: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }
  };

  return (
    <section className="px-5 lg:px-20">
      <h1 className="text-2xl font-semibold mb-5">Add Products</h1>

      <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
        {/* Product Image */}
        <div className="flex flex-col gap-2">
          <label className="font-medium mb-1">Product Image:</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md transition"
            >
              Choose File
            </label>
            <span className="text-gray-600 text-sm">{fileName}</span>
          </div>
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

        {/* Product Name & Weight */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Product Name:</label>
            <input
              name="productName"
              className="border px-5 py-2 outline-none rounded-md focus:border-primary"
              type="text"
              placeholder="Enter product name"
              value={productData.productName}
              onChange={handleChange}
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
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">New Category:</label>
            <input
              name="newCategory"
              className="border px-5 py-2 outline-none rounded-md focus:border-primary"
              type="text"
              placeholder="Enter new category"
              value={productData.newCategory}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Existing Category:</label>
            <select
              name="existingCategory"
              className="border px-5 py-2 outline-none rounded-md focus:border-primary"
              value={productData.existingCategory}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Hair Care">Hair Care</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Health">Health</option>
            </select>
          </div>
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
          <label className="font-medium mb-1">Ingredients:</label>
          <input
            name="ingredients"
            className="border px-5 py-2 outline-none rounded-md focus:border-primary"
            type="text"
            placeholder="List ingredients"
            value={productData.ingredients}
            onChange={handleChange}
          />
        </div>

        {/* Stock & Tags */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Stock Quantity:</label>
            <input
              name="stockQuantity"
              type="number"
              placeholder="Enter stock quantity"
              value={productData.stockQuantity}
              onChange={handleChange}
              className="border px-5 py-2 outline-none rounded-md focus:border-primary"
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
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Status:</label>
          <select
            name="status"
            value={productData.status}
            onChange={handleChange}
            className="border px-5 py-2 outline-none rounded-md focus:border-primary"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white font-semibold rounded"
        >
          Add Product
        </button>
      </form>
    </section>
  );
}
  