import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/layout";
import Homepage from "./pages/homepage";
import Addbook from "./pages/add-book";
import Updatebook from "./pages/update-book";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/add-book" element={<Addbook />} />
            <Route path="/update-book" element={<Updatebook />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
