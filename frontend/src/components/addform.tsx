import React, { useState } from "react";
// import { useNavigate } from "react-router";
import "./formstyle.css"; // Import external stylesheet

const Addbookform: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    status: "",
  });

  // const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new object with empty fields

    const sanitizedFormData = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {} as { [key: string]: string }
    );

    // Save sanitizedFormData to local storage
    const existingData = JSON.parse(localStorage.getItem("formData") || "[]");
    existingData.push(sanitizedFormData);
    localStorage.setItem("formData", JSON.stringify(existingData));
    // navigate("/update-book"); // Navigate to the updae book page
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Book title: </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Genre: </label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value=""></option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
      </div>
      <p></p>
      <p className="p-written">You have chosen {formData.status}</p>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default Addbookform;
