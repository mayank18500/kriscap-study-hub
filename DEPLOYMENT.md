# Deployment Guide

## 1. Environment Variables (Backend)

When deploying the **Backend** service to Render, you must add the following Environment Variables in the "Environment" tab:

| Key | Value | Description |
| :--- | :--- | :--- |
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB connection string. |
| `JWT_SECRET` | `...` | A long random string for security. |
| `EMAIL_USER` | `Address` | Your Gmail address. |
| `EMAIL_PASS` | `...` | Your Gmail App Password. |
| `ALLOWED_ORIGINS` | `https://your-frontend-url.onrender.com` | The URL of your deployed frontend. |
| `CLOUDINARY_CLOUD_NAME`| `...` | Your Cloudinary Cloud Name. |
| `CLOUDINARY_API_KEY` | `...` | Your Cloudinary API Key. |
| `CLOUDINARY_API_SECRET`| `...` | Your Cloudinary API Secret. |
| `RAZORPAY_KEY_ID` | `...` | Your Razorpay Key ID. |
| `RAZORPAY_KEY_SECRET` | `...` | Your Razorpay Key Secret. |
| `FRONTEND_URL` | `https://your-frontend-url.onrender.com` | URL of your deployed frontend (no trailing slash). |

## 2. Environment Variables (Frontend)

The **Frontend** service is configured to automatically pull the API URL from the backend service, so you **do not** need to manually set `VITE_API_URL` if you deploy both from the same Blueprint.

## 3. Deployment Steps

1.  Push your latest code to GitHub.
2.  Go to Render and create a new **Blueprint Instance**.
3.  Connect your repository.
4.  Render will automatically detect the `render.yaml` file and create two services:
    *   `kriscap-study-hub-backend` (Web Service)
    *   `kriscap-study-hub-frontend` (Static Site)
5.  **Important**: The deployment might fail initially because the Environment Variables are missing.
6.  Go to the **Backend Service** dashboard > **Environment**.
7.  Add all the variables listed above.
8.  Manually redeploy the Backend.
9.  Once the Backend is live, copy its URL.
10. Go to the **Frontend Service** dashboard.
11. If the auto-linking didn't work (rare), manually add `VITE_API_URL` with the backend URL.
