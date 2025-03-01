# Stable Diffusion Web App 🌐🎨  

A web-based application for AI-powered image generation using **Stable Diffusion**. This project consists of a **FastAPI backend** and a **React frontend**, providing a smooth and interactive experience for users.  

## 🚀 Features  
- 🎮 AI-generated images from text prompts  
- 🎨 Customizable settings for enhanced image control  
- ⚡ Fast and responsive web interface  

## 📂 Project Structure  
```
/Stable-Diffusion-WebApp
│── /API      # Backend (FastAPI)
│── /APP      # Frontend (React)
│── README.md
```

## 🔧 Setup & Running the Project  

### 1⃣ Start the Backend (API)  
1. Open a terminal and navigate to the `API` folder:  
   ```sh
   cd API
   ```
2. Install dependencies (if not installed yet):  
   ```sh
   pip install -r requirements.txt
   ```
3. Get your **Hugging Face Auth Token** from [Hugging Face](https://huggingface.co/settings/tokens) and add it to the appropriate configuration file or environment variable.  
4. Run the API using **Uvicorn**:  
   ```sh
   uvicorn api:app --reload
   ```
5. The backend should now be running at `http://127.0.0.1:8000/`.  

### 2⃣ Start the Frontend (React)  
1. Open a new terminal and navigate to the `APP` folder:  
   ```sh
   cd APP
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the React development server:  
   ```sh
   npm start
   ```
4. Open `http://localhost:3000` in your browser to use the app.  

## 🛠️ Tech Stack  
- **Backend:** FastAPI, Uvicorn  
- **Frontend:** React, JavaScript  
- **AI Model:** Stable Diffusion  

## 🐝 License  
This project is open-source under the **MIT License**.  

