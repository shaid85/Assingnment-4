# Assignment-4

### 📚 Library Management System using React, Redux Toolkit Query (RTK Query), and TypeScript.

## 📚 Welcome to - **My Library Management System**

### Live Demo

- [PH_L2B5-Assignment-4](https://assingnment-4-chi.vercel.app/)

## Getting Started

### ✅ Technologies Used

- React

- TypeScript

- Redux Toolkit Query (RTK Query)

- React Router DOM

- Tailwind CSS

- Vite

- React Hot Toast

- Vercel (Deployment)

### Start Process

#### Create a new Vite project with Typescript

```bash
npm create vite@latest my-app -- --template react-ts

```

Install Redux Toolkit and React-Redux

```bash
npm install @reduxjs/toolkit react-redux

```

Install Tailwind CSS for vite

```bash
npm install tailwindcss @tailwindcss/vite

```

then Configure the Vite plugin - vite.config.ts
then import Tailwind CSS in index.ccs file.

Install react-router

```bash
npm i react-router

```

Install react toast

```bash
npm i react-hot-toast

```

## Deploy on Vercel

Github to Vercel :

Create versel.json file

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
