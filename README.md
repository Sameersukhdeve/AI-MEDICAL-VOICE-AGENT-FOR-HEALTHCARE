# 🧠 AI Medical Voice Agent

An intelligent **AI-powered Medical Voice Assistant** built using **Next.js, modern AI models, and voice processing pipelines**.

This project demonstrates how **voice-enabled AI systems can assist users in healthcare-related conversations** by converting **speech → text → AI reasoning → voice response** in real time.

The system allows users to **ask medical-related questions using voice** and receive **AI-generated spoken responses**, creating a natural conversational experience.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

# 🚀 Key Features

✅ **Voice-Based Interaction**
Users can interact with the system completely using voice commands.

✅ **Speech-to-Text Conversion (STT)**
User voice input is converted into text for processing using modern speech recognition pipelines.

✅ **AI-Powered Medical Query Processing**
The transcribed text is sent to an AI model that understands the query and generates a contextual response.

✅ **Text-to-Speech Conversion (TTS)**
The AI-generated response is converted into natural speech output.

✅ **Real-Time Conversational Flow**
The entire pipeline runs quickly to provide near real-time responses.

✅ **Modern UI Interface**
Built with Next.js and Tailwind CSS for a fast and responsive web interface.

---

# 🛠 Tech Stack

## Frontend

* **Next.js** – React framework for building fast web applications
* **React.js** – Component-based UI development
* **TypeScript** – Type-safe JavaScript development
* **Tailwind CSS** – Utility-first CSS framework for modern UI design

## AI / Voice Processing

* **Speech-to-Text (STT)** for converting voice input into text
* **Large Language Model (LLM)** for processing medical queries
* **Text-to-Speech (TTS)** for converting responses back into voice
* **Prompt Engineering** to generate relevant and safe medical responses

## Development Tools

* **Node.js**
* **Git & GitHub**
* **Modern Web APIs (MediaRecorder / Web Speech API)**

---

# 🏗 System Architecture

The project implements a **complete AI voice agent pipeline**.

User Voice Input
↓
Speech Capture via Browser Microphone
↓
Speech-to-Text Processing
↓
AI Query Understanding using LLM
↓
Response Generation
↓
Text-to-Speech Conversion
↓
Voice Output to User

This pipeline creates a **fully functional conversational voice assistant**.

---

# ⚙️ Implementation Details (What I Built)

## 1️⃣ Voice Input Capture

The application captures voice input from the user using **browser microphone APIs**.

Steps implemented:

1. User clicks the **Start Voice Interaction** button.
2. The browser activates the **microphone input**.
3. Audio data is captured and streamed.
4. The recorded speech is converted into text using STT.

Technologies used:

* Web Speech API
* MediaRecorder API

---

## 2️⃣ Speech-to-Text Processing

The recorded voice input is processed to extract text.

Pipeline:

Voice Audio → Speech Recognition Engine → Text Transcript

Example:

User says:

> "What are the symptoms of flu?"

Converted text:

```
What are the symptoms of flu?
```

This text is then sent to the AI processing module.

---

## 3️⃣ AI Query Processing

The system uses an **AI language model** to interpret and respond to medical-related queries.

Steps:

1. The user transcript is sent to the AI model.
2. A carefully designed **prompt** ensures responses remain relevant and informative.
3. The AI generates a structured answer.

Example prompt structure:

```
You are a helpful medical assistant.
Provide general medical information but do not provide diagnosis.
User question: {query}
```

This ensures **safe AI behavior**.

---

## 4️⃣ Response Generation

The AI returns a structured response such as:

Example response:

> "Common symptoms of flu include fever, cough, sore throat, body aches, fatigue, and headache."

This response is then passed to the **Text-to-Speech engine**.

---

## 5️⃣ Text-to-Speech Conversion

The generated text response is converted back into voice.

Pipeline:

AI Text Response → TTS Engine → Audio Playback

The user hears the response directly through their device.

---

# 💡 Challenges Solved

During development, the following technical challenges were addressed:

### 1️⃣ Real-Time Voice Processing

Ensuring minimal delay between **speech input and AI response**.

### 2️⃣ AI Prompt Optimization

Designing prompts so the AI provides **informative but safe medical responses**.

### 3️⃣ Voice Pipeline Integration

Connecting **STT → AI Model → TTS** into a seamless pipeline.

### 4️⃣ UI Responsiveness

Designing a smooth user interface for real-time voice interaction.

---

# 🎯 Use Cases

• AI-powered medical chatbot
• Voice-enabled telemedicine assistant
• Healthcare accessibility tools
• AI virtual health assistants

---

# 🌟 Key Highlights

✔ Built a **complete AI voice interaction pipeline**
✔ Integrated **speech recognition with AI models**
✔ Developed a **full-stack AI-powered healthcare assistant**
✔ Implemented **real-time voice processing**
✔ Demonstrated **AI + Web Development integration**

---

# 📈 Future Improvements

Planned enhancements include:

* Multi-language voice support
* Medical symptom classification using ML
* Integration with healthcare APIs
* Patient health record integration
* Mobile-first interface
* AI voice emotion detection

---

# 📂 Project Setup

Clone the repository

```
git clone https://github.com/your-username/ai-medical-voice-agent.git
```

Install dependencies

```
npm install
```

Run the development server

```
npm run dev
```

Open in browser

```
http://localhost:3000
```

---

# 👨‍💻 Author

**Sameer Sk**

AI / ML Enthusiast | Full Stack Developer

Interested in building **AI-powered systems, voice agents, and intelligent applications.**

---

# ⭐ Support

If you found this project useful, consider giving it a **star ⭐ on GitHub**.
It helps others discover the project and supports future development.
