# HSK Text Analyzer API

This API allows users to analyze text input and categorize Chinese characters based on HSK levels (1–6).

## Features

- Accepts a POST request with a JSON payload containing text.
- Splits and processes the text to identify characters belonging to different HSK levels.
- Returns a JSON response with unique characters for each HSK level.

---

## Usage Instructions

### 1\. API Endpoint

The API has a single **POST** route:

`POST /`

### 2\. Request Format

The body of the request should be in JSON format. Include a property named `test` containing the text to analyze.

#### Example Request:

`curl -X POST https://<your-api-url>/ \ -H "Content-Type: application/json" \ -d '{   "test":"你好，这是一个HSK测试的例子。" }'`

### 3\. Response Format

The API returns a JSON object where each key represents an HSK level (`one` to `six`), and the value is an array of unique characters from the input text that belong to that HSK level.

#### Example Response:

`{   "one": ["你", "好", "是"],   "two": ["个"],   "three": [],   "four": ["例", "子"],   "five": [],   "six": [] }`

### 4\. Requirements

- Ensure your request origin is allowed (CORS is restricted to specific origins).

---

## Setup for Local Development

### 1\. Prerequisites

- Node.js installed
- npm or yarn installed

### 2\. Installation

Clone the repository and install dependencies:

`git clone <repository-url> cd <repository-folder> npm install`

### 3\. Start the Server

Run the server:

`PORT=3000 node server.js`

The server will be available at `http://localhost:3000`.

### 4\. Environment Variables

Set the `PORT` variable in your `.env` file or pass it directly when running the server.

---

## Notes

- The API is hosted on `https://hsk-analyser-api.onrender.com`
- You can see what it can do at: `https://hsk-text-analyser.vercel.app/`
- This API is configured to process Chinese text and categorize characters by HSK level.
- The character lists (`hskOne` to `hskSix`) are imported from the `wordLists.js` file.
- Bear in mind that the API is hosted on the free tier on Render so the first call may be unsuccessful as the server may have spun down. Wait a minute and try again.

---
