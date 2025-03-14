import "./formstyle.css"; // Import external stylesheet

const Updateform = () => {
  return (
    <form className="form-container">
      <div className="form-group">
        <label htmlFor="title">Book title: </label>
        <input type="text" placeholder="Test Input" />
      </div>
      <div className="form-group">
        <label htmlFor="title">Genre: </label>
        <input type="text" placeholder="Test Input" />
      </div>
      <div className="form-group">
        <label htmlFor="title">Status:</label>
        <select>
          <option value="1">Unread</option>
          <option value="2">Read</option>
        </select>
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default Updateform;
