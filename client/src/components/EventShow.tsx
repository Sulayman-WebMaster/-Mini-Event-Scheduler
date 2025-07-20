import { useState } from "react";
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

export default function EventList() {
  
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Meeting with John",
      date: "2025-07-25",
      time: "14:30",
      notes: "Discuss Q3 targets.",
      category: "Meeting",
      archived: false,
    },
    {
      id: 2,
      title: "Doctor Appointment",
      date: "2025-07-26",
      time: "10:00",
      category: "Health",
      archived: false,
    },
    {
      id: 3,
      title: "Doctor Appointment",
      date: "2025-07-26",
      time: "10:00",
      category: "Health",
      archived: false,
    },
  ]);

  const deleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const toggleArchive = (id: number) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, archived: !e.archived } : e
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto  space-y-6">
    <div className="flex items-center gap-3 text-2xl mt-4 font-semibold text-gray-800 dark:text-white mb-6">
            <RiCalendarScheduleFill className="text-indigo-500" />
            <h1>All Events</h1>
          </div>
      {events.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">No events to show</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {events.map(({ id, title, date, time, notes, category, archived }) => (
          <div
            key={id}
            className={`relative p-5 rounded-lg shadow-md border
            ${archived ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 opacity-70" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"}
            flex flex-col justify-between`}
          >
            {/* Top info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Date:</span> {new Date(date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Time:</span> {time}
              </p>
              {notes && (
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 whitespace-pre-wrap">{notes}</p>
              )}
              <p className="mt-3 inline-block text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-300 w-max">
                {category}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => toggleArchive(id)}
                title={archived ? "Unarchive" : "Archive"}
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
              >
                {archived ? <HiOutlineArchive size={22} /> : <HiArchive size={22} />}
              </button>
              <button
                onClick={() => deleteEvent(id)}
                title="Delete"
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
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
