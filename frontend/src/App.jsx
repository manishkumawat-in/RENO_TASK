import { Routes, Route, Link } from "react-router";
import AddSchool from "./pages/AddSchool";
import SchoolList from "./pages/SchoolList";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <nav className="bg-blue-600 text-white p-4 flex justify-center gap-6 shadow-md">
        <Link to="/add-school" className="hover:underline">
          Add School
        </Link>
        <Link to="/view-school" className="hover:underline">
          View Schools
        </Link>
      </nav>

      <Routes>
        <Route path="/add-school" element={<AddSchool />} />
        <Route path="/view-school" element={<SchoolList />} />
        <Route
          path="/*"
          element={
            <h1 className="text-center font-bold text-2xl mt-5">
              No page found
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;
