import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const Donate = () => {

  // ✅ Scroll to top when page loads (kept same)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [form, setForm] = useState({
    itemName: "",
    category: "",
    condition: "",
    quantity: "",
    weight: "",
    address: "",
    image: null, // ✅ changed for file upload
  });

  // ✅ handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ handle image upload
  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first ❌");
      return;
    }

    if (
      !form.itemName.trim() ||
      !form.category.trim() ||
      !form.condition.trim() ||
      !form.address.trim()
    ) {
      alert("Please fill all required fields ❌");
      return;
    }

    try {
      // ✅ FormData for image upload
      const data = new FormData();
      data.append("userId", userId);
      data.append("itemName", form.itemName);
      data.append("category", form.category);
      data.append("condition", form.condition);
      data.append("quantity", form.quantity);
      data.append("weight", form.weight);
      data.append("address", form.address);

      if (form.image) {
        data.append("image", form.image);
      }

      const res = await axios.post(
        "http://localhost:5000/api/donate",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("points", res.data.totalPoints);
      window.dispatchEvent(new Event("storage"));

      alert(
        `🎉 Donation Successful!\n\nYou earned +${res.data.rewardPoints} points\n\nTotal Points: ${res.data.totalPoints}`
      );

      setForm({
        itemName: "",
        category: "",
        condition: "",
        quantity: "",
        weight: "",
        address: "",
        image: null,
      });

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div
      style={{
        paddingTop: "120px",
        paddingBottom: "80px",
        background: "#f4faf5",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section (UNCHANGED) */}
      <div className="container text-center mb-5">
        <div
          style={{
            display: "inline-block",
            background: "#e8f5e9",
            color: "#198754",
            padding: "8px 20px",
            borderRadius: "50px",
            fontWeight: "600",
            marginBottom: "18px",
            fontSize: "15px",
          }}
        >
          ♻ Donate & Earn Rewards
        </div>

        <h1 style={{ fontSize: "2.8rem", fontWeight: "700", marginBottom: "12px" }}>
          Donate Your <span style={{ color: "#198754" }}>Items</span>
        </h1>

        <p style={{ maxWidth: "650px", margin: "0 auto", color: "#666", fontSize: "16px" }}>
          Give unused items a new life. Help people, reduce waste,
          and earn reward points for every successful donation.
        </p>
      </div>

      {/* Main Card (UNCHANGED) */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            <div
              style={{
                background: "#ffffff",
                padding: "40px",
                borderRadius: "24px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
                border: "1px solid #edf2ed",
              }}
            >
              <h3 style={{ fontWeight: "700", marginBottom: "30px", textAlign: "center" }}>
                Donation Details
              </h3>

              <form onSubmit={handleSubmit}>

                {/* Item Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Item Name *</label>
                  <input
                    type="text"
                    name="itemName"
                    className="form-control"
                    value={form.itemName}
                    onChange={handleChange}
                    style={{ borderRadius: "14px", padding: "12px" }}
                  />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Category *</label>
                  <select
                    name="category"
                    className="form-select"
                    value={form.category}
                    onChange={handleChange}
                    style={{ borderRadius: "14px", padding: "12px" }}
                  >
                    <option value="">Select Category</option>
                    <option>Books</option>
                    <option>Clothes</option>
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Toys</option>
                    <option>Kitchen Items</option>
                  </select>
                </div>

                {/* Condition */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Item Condition *</label>
                  <input
                    type="text"
                    name="condition"
                    className="form-control"
                    value={form.condition}
                    onChange={handleChange}
                    style={{ borderRadius: "14px", padding: "12px" }}
                  />
                </div>

                {/* Quantity + Weight */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="number"
                      name="quantity"
                      className="form-control"
                      placeholder="Quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      style={{ borderRadius: "14px", padding: "12px" }}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="weight"
                      className="form-control"
                      placeholder="Weight (optional)"
                      value={form.weight}
                      onChange={handleChange}
                      style={{ borderRadius: "14px", padding: "12px" }}
                    />
                  </div>
                </div>

                {/* ✅ IMAGE UPLOAD (REPLACED ONLY THIS PART) */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Upload Image *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleImageChange}
                    style={{ borderRadius: "14px", padding: "12px" }}
                  />
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Pickup Address *</label>
                  <textarea
                    name="address"
                    rows="4"
                    className="form-control"
                    value={form.address}
                    onChange={handleChange}
                    style={{ borderRadius: "14px", padding: "12px" }}
                  />
                </div>

                {/* Submit */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success px-5 py-3"
                    style={{ borderRadius: "50px", fontWeight: "600", fontSize: "16px" }}
                  >
                    <i className="bi bi-gift-fill me-2"></i>
                    Donate Now
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;