import { useState, type ChangeEvent, type FormEvent } from "react";
import DatePicker from "react-datepicker";
import { IoAddCircle } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

type EventFormData = {
  title: string;
  date: Date | null;
  time: Date | null;
  notes: string;
  category: string;
};

type Props = {
  onEventAdded: () => void;
};

export default function EventForm({ onEventAdded }: Props) {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: null,
    time: null,
    notes: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!formData.date || !formData.time) {
      setError("Date and time are required.");
      return;
    }

    // Prevent past dates
    const selectedDate = new Date(
      formData.date.getFullYear(),
      formData.date.getMonth(),
      formData.date.getDate()
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError("Date cannot be in the past.");
      return;
    }

    const newEvent = {
      title: formData.title,
      date: formData.date.toISOString().split("T")[0],
      time: formData.time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      notes: formData.notes,
    };

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) throw new Error("Failed to add event");

      const result = await res.json();
      console.log("Event added:", result);

      setFormData({
        title: "",
        date: null,
        time: null,
        notes: "",
        category: result.category || "Other",
      });

      onEventAdded();

      toast.success("Event added successfully!");
    } catch (err) {
      console.error("Error adding event:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center gap-3 text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        <IoAddCircle className="text-indigo-500" />
        <h1>Add Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="text-red-500 font-medium bg-red-100 px-4 py-2 rounded">
            {error}
          </div>
        )}

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

        {/* Date and Time */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date <span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData((prev) => ({ ...prev, date }))}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select a date"
              minDate={new Date()}
              className="!w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              popperPlacement="bottom"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Time <span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={formData.time}
              onChange={(time) => setFormData((prev) => ({ ...prev, time }))}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="Select time"
              className="!w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              popperPlacement="bottom"
              required
            />
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
            placeholder="e.g., Work"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl cursor-pointer font-semibold shadow transition-all duration-200 ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Adding..." : "Add Event"}
        </button>
      </form>
    </div>
  );
}
