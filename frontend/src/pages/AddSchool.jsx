import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Append text fields
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("contact", values.contact);
      formData.append("email", values.email);

      // Append image
      if (values.image && values.image[0]) {
        formData.append("image", values.image[0]);
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/school/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        toast.success("✅ School added successfully!");
        reset();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🏫 Add School
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* School Name */}
          <div>
            <input
              type="text"
              placeholder="School Name"
              {...register("name", { required: "School name is required" })}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              placeholder="Address"
              {...register("address", { required: "Address is required" })}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-pink-400"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div>
            <input
              type="text"
              placeholder="State"
              {...register("state", { required: "State is required" })}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <input
              type="text"
              placeholder="Contact Number"
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "School image is required" })}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:from-purple-500 hover:to-pink-500 transition-transform transform hover:scale-105 disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Add School"}
          </button>
        </form>
      </div>
    </div>
  );
}
