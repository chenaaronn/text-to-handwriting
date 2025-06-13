# ✍️ HandwriteAI

Transform typed text into personalized, realistic handwriting using machine learning.

## 🌟 Overview

HandwriteAI is a web-based application that transforms typed text into personalized, realistic handwriting using a machine learning model trained on a user's own handwriting. Users can write directly in the app using a stylus, generate text-to-handwriting outputs that mimic their writing style, and fine-tune layout, spacing, and styling before exporting to PDF or PNG.

## 🚀 Features

- **In-app handwriting capture**: Write directly in the browser using a stylus
- **Personalized handwriting synthesis**: Generate text in your own handwriting style
- **Interactive canvas editing**: Drag, resize, and reposition handwritten elements
- **Multiple paper styles**: Lined, dot grid, blank, and custom backgrounds
- **Export options**: PDF and PNG formats optimized for Notability/GoodNotes or printing

## 🛠️ Tech Stack

### Frontend

- React with TypeScript
- Konva.js for canvas manipulation
- TailwindCSS for styling
- Vite for build tooling

### Backend

- FastAPI (Python)
- PyTorch for ML model
- SQLite for development (PostgreSQL for production)
- Redis for caching

## 🏗️ Project Structure

```
handwriteai/
├── frontend/           # React frontend application
├── backend/           # FastAPI backend server
├── ml/               # Machine learning model and training
└── docs/             # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Poetry (Python package manager)

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/handwriteai.git
   cd handwriteai
   ```

2. Set up the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Set up the backend:

   ```bash
   cd backend
   poetry install
   poetry run uvicorn app.main:app --reload
   ```

4. Set up the ML environment:
   ```bash
   cd ml
   poetry install
   ```

### Docker Quickstart

To simplify the setup process, you can use Docker:

1. Install Docker:

   - **Mac**: Download and install [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
   - **Windows**: Download and install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
   - **Linux**: Follow the [Docker Engine installation guide](https://docs.docker.com/engine/install/)

2. Start Docker:

   - **Mac/Windows**: Launch Docker Desktop from your Applications folder
   - Wait for Docker to start (you'll see the whale icon in your menu bar/taskbar)
   - The icon should stop animating when Docker is ready

3. From the project root, run:

   ```bash
   docker compose up --build
   ```

   This will start:

   - Frontend (Production): http://localhost:3000
   - Backend API: http://localhost:8000
   - ML container (for training/experiments) with bash access

4. To access the ML container for training:

   ```bash
   docker compose exec ml bash
   ```

5. For development with live reload, you have two options:
   - **Option 1**: Uncomment the volume mounts in `docker-compose.yml` for Docker-based development
   - **Option 2**: Run the frontend locally:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
     This will start the development server at http://localhost:5173 with hot reloading

Note: If you're using an older version of Docker, you might need to install Docker Compose separately and use `docker-compose` instead of `docker compose`.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📫 Contact

For any questions or feedback, please open an issue in the GitHub repository.
