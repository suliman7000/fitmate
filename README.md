# FitMate — Personal Gym

A personal gym dashboard built with React, Vite, Node.js, Express and MongoDB.

## Requirements
- Node.js 20+
- MongoDB Atlas account (or local MongoDB)
- Optional: OpenAI API key for the AI coach

## 1. Configure the backend
Open `server/.env.example`, copy it to `server/.env`, then set:
- `MONGODB_URI`: your MongoDB connection string
- `OPENAI_API_KEY`: optional, for AI coach
- `OPENAI_MODEL`: defaults to `gpt-4.1-mini`

Never put API keys in the React frontend.

## 2. Install and run
Open two terminals:

Terminal 1:
```bash
cd server
npm install
npm run dev
```

Terminal 2:
```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal (usually http://localhost:5173).

The backend runs on http://localhost:5000.

## 3. First launch
On first server start, the app seeds your profile, weekly split, exercise library and initial Push/Pull logs if the database is empty.

The initial profile uses the details available when this project was prepared:
- Current weight: 67 kg
- Goal weight: 72 kg
- Split: Push / Pull / Rest / Legs / Rest / Upper / Rest

Some workout weights are recorded as a starting-to-ending progression, not exact per-set entries. The app labels them as notes rather than pretending they are exact set records.

## AI Coach
Add an OpenAI API key to `server/.env` and restart the backend. Without a key, the rest of the app works normally and the AI page explains how to enable the coach.

## Notes
- This is a personal starter application, not a medical service.
- Keep `server/.env` private.
- Before exposing this app publicly, add authentication, rate limiting, HTTPS and stricter access controls.
