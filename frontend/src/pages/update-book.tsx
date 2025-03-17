import React, { useEffect, useState } from "react";

const Updatebook: React.FC = () => {
  const [tableData, setTableData] = useState<
    Array<{ title: string; genre: string; status: string }>
  >([]);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the row being edited
  const [editedRow, setEditedRow] = useState<{
    title: string;
    genre: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formData") || "[]");
    setTableData(data);
  }, []);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedRow({ ...tableData[index] });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (editedRow) {
      setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
    }
  };

  const handleSave = (index: number) => {
    if (editedRow) {
      const updatedData = [...tableData];
      updatedData[index] = editedRow;
      setTableData(updatedData);
      localStorage.setItem("formData", JSON.stringify(updatedData)); // Save the updated data
    }
    setEditIndex(null);
    setEditedRow(null);
  };

  const handleDelete = (index: number) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedRow(null);
  };

  return (
    <>
      <h2 className="h2-title">Update or Delete a book</h2>
      <div className="table_component">
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Genre</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                {editIndex === index ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="title"
                        value={editedRow?.title || ""}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="genre"
                        value={editedRow?.genre || ""}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <select
                        name="status"
                        value={editedRow?.status || ""}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleSave(index)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.title}</td>
                    <td>{item.genre}</td>
                    <td>{item.status}</td>
                    <td>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>
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
    </>
  );
};

export default Updatebook;
