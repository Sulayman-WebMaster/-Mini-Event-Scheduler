import { Router } from "express";
import { Event } from "../types/Event";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const events: Event[] = [];

const keywords = {
  Work: ["meeting", "project", "client", "deadline"],
  Personal: ["birthday", "family", "vacation", "party"],
};

function categorizeEvent(title: string, notes?: string): Event["category"] {
  const text = `${title} ${notes || ""}`.toLowerCase();
  for (const word of keywords.Work) {
    if (text.includes(word)) return "Work";
  }
  for (const word of keywords.Personal) {
    if (text.includes(word)) return "Personal";
  }
  return "Other";
}

// POST /events
router.post("/", (req, res) => {
  const { title, date, time, notes } = req.body;

  if (!title || !date || !time) {
    return res.status(400).json({ error: "Title, date, and time are required." });
  }

  const category = categorizeEvent(title, notes);

  const newEvent: Event = {
    id: uuidv4(),
    title,
    date,
    time,
    notes,
    archived: false,
    category,
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// GET /events
router.get("/", (_req, res) => {
  const sorted = [...events].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`);
    const dateTimeB = new Date(`${b.date}T${b.time}`);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });
  res.json(sorted);
});

// PUT /events/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const event = events.find((e) => e.id === id);

  if (!event) return res.status(404).json({ error: "Event not found." });

  event.archived = true;
  res.json(event);
});

// DELETE /events/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) return res.status(404).json({ error: "Event not found." });

  const removed = events.splice(index, 1)[0];
  res.json(removed);
});

export default router;
