
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Reserve = () => {
  const [formData, setFormData] = useState({
    name: '',
    tableSize: '',
    date: '',
    startTimeHours: '',
    startTimeMinutes: '',
    startTimePeriod: 'AM',
    endTimeHours: '',
    endTimeMinutes: '',
    endTimePeriod: 'AM',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date' && new Date(value) < new Date()) {
        alert('Please select a future date.');
        return;
      }


    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log the form data

    toast.success('Reservation Request Successful',{position:"top-right"})

    setFormData({
      name: '',
      tableSize: '',
      date: '',
      startTimeHours: '',
      startTimeMinutes: '',
      startTimePeriod: 'AM',
      endTimeHours: '',
      endTimeMinutes: '',
      endTimePeriod: 'AM',
      description: ''
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-3xl text-center font-bold mb-6">Reservation Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-b border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div>
          <label htmlFor="tableSize" className="block text-gray-700 font-bold mb-2">Table Size:</label>
          <select
            id="tableSize"
            name="tableSize"
            value={formData.tableSize}
            onChange={handleChange}
            className="w-full border-b border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
            required
          >
            <option value="">Select Table Size</option>
            <option value="small">Small (1-2 person)</option>
            <option value="medium">Medium (4 person)</option>
            <option value="large">Large (family)</option>
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border-b border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div>
          <label htmlFor="startTime" className="block text-gray-700 font-bold mb-2">Start Time:</label>
          <div className="flex items-center">
            <input
              type="number"
              id="startTimeHours"
              name="startTimeHours"
              value={formData.startTimeHours}
              onChange={handleChange}
              min="1"
              max="12"
              className="w-16 border-b border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-blue-400 mr-1"
              required
            />
            <span>:</span>
            <input
              type="number"
              id="startTimeMinutes"
              name="startTimeMinutes"
              value={formData.startTimeMinutes}
              onChange={handleChange}
              min="0"
              max="59"
              className="w-16 border-b border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-blue-400 mr-1"
              required
            />
            <select
              id="startTimePeriod"
              name="startTimePeriod"
              value={formData.startTimePeriod}
              onChange={handleChange}
              className="w-20 border-b border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
              required
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="endTime" className="block text-gray-700 font-bold mb-2">End Time:</label>
          <div className="flex items-center">
            <input
              type="number"
              id="endTimeHours"
              name="endTimeHours"
              value={formData.endTimeHours}
              onChange={handleChange}
              min="1"
              max="12"
              className="w-16 border-b border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-blue-400 mr-1"
              required
            />
            <span>:</span>
            <input
              type="number"
              id="endTimeMinutes"
              name="endTimeMinutes"
              value={formData.endTimeMinutes}
              onChange={handleChange}
              min="0"
              max="59"
              className="w-16 border-b border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-blue-400 mr-1"
              required
            />
            <select
              id="endTimePeriod"
              name="endTimePeriod"
              value={formData.endTimePeriod}
              onChange={handleChange}
              className="w-20 border-b border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
              required
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <button type="submit" className=" bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Reserve;

