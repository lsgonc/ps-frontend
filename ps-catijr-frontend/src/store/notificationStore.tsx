// store/notificationStore.js
import { create } from "zustand";

// Define the store
const useNotificationStore = create((set) => ({
    message: null, // Current notification message
    showNotification: (message:string) => set({ message }), // Function to show a notification
    hideNotification: () => set({ message: null }), // Function to hide the notification
}));

export default useNotificationStore;