# Mini Event Scheduler with AI-Powered Categorization

**Live Demo**: [https://mellifluous-faun-0202a8.netlify.app](https://mellifluous-faun-0202a8.netlify.app)  
**API Base URL**: [https://mini-event-scheduler.onrender.com](https://mini-event-scheduler.onrender.com)

Mini Event Scheduler is a full-stack event management application that allows users to create, edit, and delete events. The application integrates AI through OpenRouter to automatically categorize events based on their title and notes. The categories include:

- **Work** – Meetings, tasks, deadlines, and professional activities
- **Personal** – Birthdays, family events, and personal appointments
- **Other** – Anything that doesn’t fit in Work or Personal

The project is built using **React**, **Express**, and **TypeScript**, and emphasizes performance, clarity, and intelligent automation.

---

## Features

- Create, update, and delete events
- Automatic event categorization using AI
- Fast and responsive UI built with React and Vite
- RESTful API with Express and TypeScript
- Clean and minimal design
- Fully responsive for all devices

---

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **AI Integration**: OpenRouter API
- **Deployment**: Netlify (Frontend), Render (Backend)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sulayman-WebMaster/-Mini-Event-Scheduler.git
cd -Mini-Event-Scheduler
```
## setup frontend
```bash
cd client
npm install
npm run dev
```
## setup backend
```bash
cd ../server
npm install
npm run dev
```
## Environment Variables
```bash
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
```

##  Available Endpoints

| Method | Endpoint       | Description                          |
|--------|----------------|--------------------------------------|
| GET    | `/events`      | Retrieve all events                  |
| POST   | `/events`      | Create a new event (AI categorized)  |
| PUT    | `/events/:id`  | Update an existing event             |
| DELETE | `/events/:id`  | Delete an event                      |


## AI Categorization Prompt
The following prompt is used in the backend when sending a request to OpenRouter to categorize events:
Copy
Edit
```bash
Categorize the event based on its title and notes into one of the following:
- Work (e.g., meeting, project, client, deadline)
- Personal (e.g., birthday, family, party)
- Other (if it doesn't match Work or Personal)

Return only one word: "Work", "Personal", or "Other".

Title: [event title]
Notes: [event notes]
```

## Project Structure
bash
Copy
Edit
-Mini-Event-Scheduler/
├── client/        # React frontend with Vite
├── server/        # Express backend with TypeScript
├── README.md      # Project documentation

Author
Developed by [https://www.developer-sulayman.online](https://www.developer-sulayman.online)