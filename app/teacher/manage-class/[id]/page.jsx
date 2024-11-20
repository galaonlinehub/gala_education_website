"use client";

import React, { useState } from "react";

const Page = ({ params: { id } }) => {
  const [formData, setFormData] = useState({
    subTopic: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const onFinish = (e) => {
    e.preventDefault();
    console.log("Form Values:", formData, id);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="md:px-32">
      <div className="flex items-center justify-center mb-4">
        <span className="text-lg font-semibold">Fill Sub-Topic Details</span>
      </div>
      <form onSubmit={onFinish} className="space-y-4">
        {/* Sub Topic Input */}
        <div>
          <label htmlFor="subTopic" className="block text-xs font-medium text-gray-700">Sub Topic</label>
          <input
            type="text"
            id="subTopic"
            name="subTopic"
            value={formData.subTopic}
            onChange={handleChange}
            placeholder="Enter Sub Topic"
            required
            className="mt-1 p-2 w-full border-2 border-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:border-black text-xs"
          />
        </div>

        {/* Start Date Input */}
        <div>
          <label htmlFor="startDate" className="block text-xs font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
             className="mt-1 p-2 w-full border-2 border-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:border-black text-xs"
          />
        </div>

        {/* End Date Input */}
        <div>
          <label htmlFor="endDate" className="block text-xs font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
             className="mt-1 p-2 w-full border-2 border-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:border-black text-xs"
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-xs font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            rows="4"
            required
            className="mt-1 p-2 w-full border-2 border-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:border-black text-xs"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="w-full py-2 px-4 bg-[#001840] text-white font-medium hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
