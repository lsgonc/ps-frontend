// Notification.js
"use client";

import { useEffect } from "react";
import useNotificationStore from "../store/notificationStore"; // Import the global store

export default function Notification() {
    const { message, hideNotification } = useNotificationStore(); // Use the global store

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                hideNotification(); // Hide the notification after 3 seconds
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message, hideNotification]);

    if (!message) return null;

    return (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-[#4E4E4E] text-[#029008] py-1 px-4 rounded-xl flex items-center gap-6 border">
            <div className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full text-black">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            <span>{message}</span>
            <button onClick={hideNotification} className="bg-transparent font-bold">
                X
            </button>
        </div>
    );
}