// index.js
import express from "express";
import cors from "cors";

import rateLimit from "express-rate-limit";

// ---------- 1. CONFIG -------------------------------------------------
const PORT = process.env.PORT ?? 3000;

// Allow requests only from your Vercel front-end
const corsOptions = {
  origin: "https://hsk-text-analyser.vercel.app",
  optionsSuccessStatus: 200,
};

// Increase JSON body limit (adjust to taste)
const JSON_LIMIT = "1mb";

// ---------- 2. DATA ---------------------------------------------------
import {
  hskOne,
  hskTwo,
  hskThree,
  hskFour,
  hskFive,
  hskSix,
} from "./wordLists.js";

// Convert arrays → Sets once at start-up for O(1) look-ups
const hskSets = {
  one: new Set(hskOne),
  two: new Set(hskTwo),
  three: new Set(hskThree),
  four: new Set(hskFour),
  five: new Set(hskFive),
  six: new Set(hskSix),
};

// ---------- 3. APP ----------------------------------------------------
const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: JSON_LIMIT }));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 30, // 30 requests per IP per minute
  standardHeaders: true, // RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});
app.use(limiter);

/**
 * Utility: strip *all* Unicode punctuation.
 * ECMAScript 2020 adds \p{P} (punctuation) in Unicode property escapes.
 */
const stripPunctuation = (text) => text.replace(/\p{P}/gu, "");

/**
 * POST /
 * Body: { "test": "<Chinese text here>" }
 * Returns: { one: [...], two: [...], ... }
 */
app.post("/", (req, res) => {
  const raw = (req.body?.test ?? "").toString();

  // 1. Normalise & clean
  const cleanText = stripPunctuation(raw);

  // 2. Single-pass scan
  const matches = {
    one: new Set(),
    two: new Set(),
    three: new Set(),
    four: new Set(),
    five: new Set(),
    six: new Set(),
  };

  for (const char of cleanText) {
    // quick checks from most common HSK levels first
    if (hskSets.one.has(char)) matches.one.add(char);
    else if (hskSets.two.has(char)) matches.two.add(char);
    else if (hskSets.three.has(char)) matches.three.add(char);
    else if (hskSets.four.has(char)) matches.four.add(char);
    else if (hskSets.five.has(char)) matches.five.add(char);
    else if (hskSets.six.has(char)) matches.six.add(char);
  }

  // 3. Serialise Sets → Arrays for JSON response
  res.status(201).json({
    one: [...matches.one],
    two: [...matches.two],
    three: [...matches.three],
    four: [...matches.four],
    five: [...matches.five],
    six: [...matches.six],
  });
});

// ---------- 4. START --------------------------------------------------
app.listen(PORT, () => {
  console.log(`HSK analyser running on port ${PORT}`);
});
