import React, { useState } from "react";
import { toast } from "react-toastify";
import Back3 from "../assets/img/back-3.jpg";

const Reserve = () => {
  const [formData, setFormData] = useState({
    name: "",
    tableSize: "",
    date: "",
    startTimeHours: "",
    startTimeMinutes: "",
    startTimePeriod: "AM",
    endTimeHours: "",
    endTimeMinutes: "",
    endTimePeriod: "AM",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date" && new Date(value) < new Date()) {
      alert("Please select a future date.");
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log the form data

    toast.success("Reservation Request Successful", { position: "top-right" });

    setFormData({
      name: "",
      tableSize: "",
      date: "",
      startTimeHours: "",
      startTimeMinutes: "",
      startTimePeriod: "AM",
      endTimeHours: "",
      endTimeMinutes: "",
      endTimePeriod: "AM",
      description: "",
    });
  };

  return (
    <div className="w-screen h-screen relative  justify-center items-center  overflow-hidden flex ">
      {/* background image */}
      <img
        src={Back3}
        alt="Login_Page"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      

      <div className="flex  flex-col w-560 items-center px-4 py-5 rounded-lg gap-6 bg-lightOverlay z-10 md:w-[50%] justify-center backdrop-blur-lg">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="name" className="block text-black font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 focus:outline-none  bg-lightOverlay backdrop-blur-md "
              required
            />
          </div>
          <div>
            <label
              htmlFor="tableSize"
              className="block text-black font-bold mb-2"
            >
              Table Size:
            </label>
            <select
              id="tableSize"
              name="tableSize"
              value={formData.tableSize}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 focus:outline-none  bg-lightOverlay backdrop-blur-md "
              required
            >
              <option value="">Select Table Size</option>
              <option value="small">Small (1-2 person)</option>
              <option value="medium">Medium (4 person)</option>
              <option value="large">Large (family)</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-black font-bold mb-2">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 focus:outline-none  bg-lightOverlay backdrop-blur-md "
              required
            />
          </div>
          <div className="flex items-center gap-36">
            {/* Start Time */}
            <div className="flex items-center mr-4">
              <label
                htmlFor="startTime"
                className="block text-black font-bold mb-2 mr-2"
              >
                Start Time:
              </label>
              <input
                type="number"
                id="startTimeHours"
                name="startTimeHours"
                value={formData.startTimeHours}
                onChange={handleChange}
                min="1"
                max="12"
                className="w-full rounded-lg px-3 py-2 focus:outline-none  bg-lightOverlay backdrop-blur-md "
                required
              />
              <span className="text-2xl bold">:</span>
              <input
                type="number"
                id="startTimeMinutes"
                name="startTimeMinutes"
                value={formData.startTimeMinutes}
                onChange={handleChange}
                min="0"
                max="59"
                className="w-full rounded-lg px-3 py-2 focus:outline-none  bg-lightOverlay backdrop-blur-md "
                required
              />
              <select
                id="startTimePeriod"
                name="startTimePeriod"
                value={formData.startTimePeriod}
                onChange={handleChange}
                className="ml-3 w-full rounded-lg px-3 py-2 focus:outline-none  bg-lightOverlay backdrop-blur-md "
                required
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            {/* End Time */}
            <div className="flex items-center">
              <label
                htmlFor="endTime"
                className="block text-black font-bold mb-2 mr-2"
              >
                End Time:
              </label>
              <input
                type="number"
                id="endTimeHours"
                name="endTimeHours"
                value={formData.endTimeHours}
                onChange={handleChange}
                min="1"
                max="12"
                className="w-full rounded-lg px-3 py-2 focus:outline-none  bg-lightOverlay backdrop-blur-md "
                required
              />
              <span className="text-2xl bold">:</span>
              <input
                type="number"
                id="endTimeMinutes"
                name="endTimeMinutes"
                value={formData.endTimeMinutes}
                onChange={handleChange}
                min="0"
                max="59"
                className="w-full rounded-lg px-3 py-2 focus:outline-none  bg-lightOverlay backdrop-blur-md "
                required
              />
              <select
                id="endTimePeriod"
                name="endTimePeriod"
                value={formData.endTimePeriod}
                onChange={handleChange}
                className="ml-3 w-full rounded-lg px-3 py-2 focus:outline-none  bg-lightOverlay backdrop-blur-md "
                required
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-black-500 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 focus:outline-none  bg-lightOverlay backdrop-blur-md "
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default Reserve;
