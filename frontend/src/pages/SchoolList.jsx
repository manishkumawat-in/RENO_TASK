import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SchoolList() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/school/get_all`
        );

        if (data.success) {
          setSchools(data.data);
        } else {
          toast.error("Failed to fetch schools: " + data.message);
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    };
    fetchSchools();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          🏫 Explore Schools
        </h2>

        {/* School Grid */}
        {schools.length === 0 ? (
          <p className="text-center text-gray-600">No schools found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.map((school) => (
              <div
                key={school.id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition transform hover:scale-105 overflow-hidden"
              >
                {/* Image */}
                <img
                  src={school.image}
                  alt={school.name}
                  className="w-full h-48 object-cover"
                />

                {/* Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {school.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    📍 {school.address}, {school.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
