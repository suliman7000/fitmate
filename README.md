# FitMate — Personal Gym

A personal gym dashboard built with React, Vite, Node.js, Express and MongoDB.

## Requirements
- Node.js 20+
- MongoDB Atlas account (or local MongoDB)
- Optional: OpenAI API key for the AI coach

## 1. Configure the backend
Open `server/.env.example`, copy it to `server/.env`, then set:
- `MONGODB_URI`: your MongoDB connection string
- `HOST=127.0.0.1`: keeps the API reachable only from your own computer while developing (remove it when deploying)
- `APP_PASSWORD`: the password for the login screen (required)
- `JWT_SECRET`: at least 32 random characters (required). Generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
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
- The API is protected by a login (single owner, password from `APP_PASSWORD`), rate limiting, input validation and security headers.
- Before deploying: serve both sides over HTTPS, set `CLIENT_ORIGIN` on the server to your real frontend URL, set `VITE_API_URL` on the client to your real backend URL, and set `TRUST_PROXY=1` if the server runs behind a proxy.

- Never put secrets in the client: any `VITE_*` variable is public in the built site. Only `VITE_API_URL` belongs there.
- Program days map to weekdays as Day 1 = Monday ... Day 7 = Sunday.
