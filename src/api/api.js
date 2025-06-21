import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your actual API base URL

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchClasses = async (timezone) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/classes`, {
            params: { timezone }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const bookClass = async (bookingData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: bookingData.name,
                email: bookingData.email,
                class_id: bookingData.class_id,
                timezone: bookingData.timezone || 'Asia/Kolkata'
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `Booking failed: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error booking class:', error);
        throw error;
    }
};
export const fetchBookings = async (email) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bookings`, {
            params: { email }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Add this function to your api.js file

export const fetchUserBookings = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                return []; // Return empty array if no bookings found
            }
            throw new Error(`Failed to fetch user bookings: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        throw error;
    }
};

