import { Router } from "express";
import { Event } from "../types/Event";
import { v4 as uuidv4 } from "uuid";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const events: Event[] = [];


const llm = new ChatOpenAI({
  temperature: 0.2,
  modelName: "openai/gpt-3.5-turbo",
  openAIApiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "http://localhost",
      "X-Title": "event-categorizer",
    },
  },
});



async function categorizeEventWithAI(
  title: string,
  notes?: string
): Promise<Event["category"]> {
  const prompt = `
You are an intelligent event classifier. Based on the title and notes, classify the event into one of the following categories:

- **Work** (e.g., meetings, deadlines, projects, clients)
- **Personal** (e.g., birthdays, family, social gatherings)
- **Other** (if it doesn't clearly match Work or Personal)

Return ONLY one of these exact words: "Work", "Personal", or "Other".

Event Title: ${title}
Event Notes: ${notes || "None"}

Category:
`;

  const res = await llm.invoke([
    new SystemMessage(" event classifier."),
    new HumanMessage(prompt),
  ]);

  const category = res.text.trim();

  if (["Work", "Personal", "Other"].includes(category)) {
    return category as Event["category"];
  }

  return "Other";
}


router.post("/", async (req, res) => {
  const { title, date, time, notes } = req.body;

  if (!title || !date || !time) {
    return res
      .status(400)
      .json({ error: "Title, date, and time are required." });
  }

  let category: Event["category"];
  try {
    category = await categorizeEventWithAI(title, notes);
  } catch (err) {
    console.error("Categorization error:", err);
    category = "Other"; 
  }

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


router.get("/", (_req, res) => {
  const sorted = [...events].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`);
    const dateTimeB = new Date(`${b.date}T${b.time}`);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });
  res.json(sorted);
});


router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const event = events.find((e) => e.id === id);

  if (!event) return res.status(404).json({ error: "Event not found." });

  event.archived = true;
  res.json(event);
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) return res.status(404).json({ error: "Event not found." });

  const removed = events.splice(index, 1)[0];
  res.json(removed);
});

export default router;
