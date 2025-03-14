const Updatebook = () => {
  return (
    <>
      <h2 className="h2-title">Update a book</h2>
      <div className="table_component">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Status</th>
              <th>Return date</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>The Hobbit</td>
              <td>Fiction</td>
              <td>Available</td>
              <td></td>
              <td>
                <button>Update</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Atomic Habits</td>
              <td>Non-fiction</td>
              <td>On-loan</td>
              <td>12/12/2025</td>
              <td>
                <button>Update</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Updatebook;
