import React, { useState } from "react";
import "./formstyle.css"; // Import external stylesheet

// Create an interface for the book object
interface Book {
  id: number;
  title: string;
  genre: string;
  status: string;
}

const Addbookform: React.FC = () => {
  // State to store the book data
  const [addBook, setAddBook] = useState({
    title: "",
    genre: "",
    status: "",
  });

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const books: Book[] = JSON.parse(localStorage.getItem("books") || "[]");
    const newBook: Book = {
      id: books.length + 1,
      title: addBook.title,
      genre: addBook.genre,
      status: addBook.status,
    };
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    setAddBook({ title: "", genre: "", status: "" });
    alert("Book added successfully!");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Book title: </label>
        <input
          type="text"
          name="title"
          value={addBook.title}
          onChange={(e) => setAddBook({ ...addBook, title: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Genre: </label>
        <input
          type="text"
          name="genre"
          value={addBook.genre}
          onChange={(e) => setAddBook({ ...addBook, genre: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Status:</label>
        <select
          name="status"
          value={addBook.status}
          onChange={(e) => setAddBook({ ...addBook, status: e.target.value })}
        >
          <option value=""></option>
          <option value="on-loan">on-loan</option>
          <option value="available">available</option>
        </select>
      </div>
      <p></p>
      <p className="p-written">You have chosen {addBook.status}</p>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default Addbookform;
