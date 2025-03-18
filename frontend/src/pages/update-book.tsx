import React, { useEffect, useState } from "react";

// Create a book interface
interface Book {
  id: number;
  title: string;
  genre: string;
  status: string;
}

const Updatebook: React.FC = () => {
  // Use state to store the books
  const [books, setBooks] = useState<Book[]>([]);
  // Use state for editing
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editBook, setEditBook] = useState<Book | null>(null);

  // set for specific columns to filter
  // States for specific column filters
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // and now for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  // Use effect to get the books from local storage
  useEffect(() => {
    const storedBooks: Book[] = JSON.parse(
      localStorage.getItem("books") || "[]"
    );
    setBooks(storedBooks);
  }, []);

  // Filter the books based on the search
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesGenre = book.genre
      .toLowerCase()
      .includes(genreFilter.toLowerCase());
    const matchesStatus = book.status
      .toLowerCase()
      .includes(statusFilter.toLowerCase());
    return matchesTitle && matchesGenre && matchesStatus;
  });

  // caluclate the books to display based on the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredBooks.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (book: Book) => {
    setIsEditing(book.id);
    setEditBook(book);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editBook) {
      setEditBook({
        ...editBook,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdate = () => {
    if (editBook) {
      const updatedBooks = books.map((book) =>
        book.id === editBook.id ? editBook : book
      );
      setBooks(updatedBooks);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      setIsEditing(null);
      setEditBook(null);
    }
  };

  const handleDelete = (id: number) => {
    const updatedData = books.filter((book) => book.id !== id);
    setBooks(updatedData);
    localStorage.setItem("books", JSON.stringify(updatedData));
  };

  return (
    <>
      {/* Filter inputs */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Filter by title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Filter by genre"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
      </div>
      <div className="table_component">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.id}>
                {isEditing === book.id ? (
                  <>
                    <td>{book.id}</td>
                    <td>
                      <input
                        type="text"
                        name="title"
                        value={editBook?.title || ""}
                        onChange={handleEditChange}
                        className="table_input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="genre"
                        value={editBook?.genre || ""}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="status"
                        value={editBook?.status || ""}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                    </td>
                    <td>
                      <button onClick={() => setIsEditing(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.genre}</td>
                    <td>{book.status}</td>
                    <td>
                      <button onClick={() => handleEdit(book)}>Update</button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(book.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            handlePreviousPage();
          }}
          style={{
            color: currentPage === 1 ? "gray" : "blue",
            pointerEvents: currentPage === 1 ? "none" : "auto",
            margin: "0 10px",
          }}
        >
          Previous
        </a>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {Math.ceil(books.length / booksPerPage)}
        </span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            handleNextPage();
          }}
          style={{
            color:
              currentPage === Math.ceil(books.length / booksPerPage)
                ? "gray"
                : "blue",
            pointerEvents:
              currentPage === Math.ceil(books.length / booksPerPage)
                ? "none"
                : "auto",
          }}
        >
          Next
        </a>
      </div>
    </>
  );
};

export default Updatebook;
