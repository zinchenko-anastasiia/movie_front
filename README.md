# Movies Frontend

## 🚀 Run Locally

```bash
npm install
npm run dev
```

The frontend will be available at:

[http://localhost:3000](http://localhost:3000)

---

## 🐳 Run with Docker

### 1. Build Docker Image
```bash
docker build -t your_account/movies-frontend .
```

### 2. Run Docker Container
```bash
docker run --name movies-frontend -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 your_account/movies-frontend
```

The frontend will be available at:

[http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Variables

- `API_URL` — backend API endpoint (default: `http://localhost:8000/api/v1`)

---

## 📦 Tech Stack

- Node.js
- React
- Docker