import { useState, type ChangeEvent, type FormEvent } from "react";
import DatePicker from "react-datepicker";
import { IoAddCircle } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";

type EventFormData = {
  title: string;
  date: Date | null;
  time: Date | null;
  notes: string;
  category: string;
};

export default function EventForm() {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: null,
    time: null,
    notes: "",
    category: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", {
      ...formData,
      date: formData.date?.toLocaleDateString(),
      time: formData.time?.toLocaleTimeString(),
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center gap-3 text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        <IoAddCircle className="text-indigo-500" />
        <h1>Add Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Meeting with John"
            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

       {/* Date and Time Pickers in One Row */}
<div className="flex flex-col md:flex-row gap-4 w-full">
  {/* Date Picker */}
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Date <span className="text-red-500">*</span>
    </label>
    <div className="mt-1 w-full">
      <DatePicker
        selected={formData.date}
        onChange={(date: Date | null) =>
          setFormData((prev) => ({ ...prev, date }))
        }
        dateFormat="MMMM d, yyyy"
        placeholderText="Select a date"
        className="!w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        popperPlacement="bottom"
      />
    </div>
  </div>

  {/* Time Picker */}
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Time <span className="text-red-500">*</span>
    </label>
    <div className="mt-1 w-full">
      <DatePicker
        selected={formData.time}
        onChange={(time: Date | null) =>
          setFormData((prev) => ({ ...prev, time }))
        }
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        placeholderText="Select time"
        className="!w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        popperPlacement="bottom"
      />
    </div>
  </div>
</div>


        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Optional notes..."
            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category (AI Suggested)
          </label>
          <input
            type="text"
            name="category"
            readOnly
            value={formData.category}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
            placeholder="e.g., Meeting"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-indigo-600 text-white rounded-xl font-semibold shadow hover:bg-indigo-700 transition-all duration-200"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}
