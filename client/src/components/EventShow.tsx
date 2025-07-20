import { useEffect, useState } from "react";
import { HiTrash, HiArchive, HiOutlineArchive } from "react-icons/hi";
import { RiCalendarScheduleFill } from "react-icons/ri";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: string;
  archived: boolean;
};

export default function EventShow({ refreshTrigger }: { refreshTrigger: number }) {
  const [events, setEvents] = useState<Event[]>([]);

   useEffect(() => {
    fetchEvents();
  }, [refreshTrigger]);



  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/events/${id}`, { method: "DELETE" });
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  const toggleArchive = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/events/${id}`, { method: "PATCH" });
      const updated = await res.json();
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, archived: updated.archived } : e))
      );
    } catch (err) {
      console.error("Failed to toggle archive:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3 text-2xl mt-4 font-semibold text-gray-800 dark:text-white mb-6">
        <RiCalendarScheduleFill className="text-indigo-500" />
        <h1>All Events</h1>
      </div>

      {events.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No events to show
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {events.map(({ id, title, date, time, notes, category, archived }) => (
          <div
            key={id}
            className={`relative p-5 rounded-lg shadow-md border
              ${
                archived
                  ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 opacity-70"
                  : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              }
              flex flex-col justify-between`}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Date:</span>{" "}
                {new Date(date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Time:</span> {time}
              </p>
              {notes && (
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 whitespace-pre-wrap">
                  {notes}
                </p>
              )}
              <p className="mt-3 inline-block text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-300 w-max">
                {category}
              </p>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => toggleArchive(id)}
                title={archived ? "Unarchive" : "Archive"}
                className="text-indigo-600 cursor-pointer hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
              >
                {archived ? <HiOutlineArchive size={22} /> : <HiArchive size={22} />}
              </button>
              <button
                onClick={() => deleteEvent(id)}
                title="Delete"
                className="text-red-600 cursor-pointer hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
              >
                <HiTrash size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
