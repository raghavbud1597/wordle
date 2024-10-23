// components/ToastProvider.tsx
"use client"; // This ensures that this component is rendered only on the client

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return <ToastContainer />;
}