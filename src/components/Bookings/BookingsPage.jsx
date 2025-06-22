import React, { useEffect, useState } from 'react';
import { fetchBookings } from '../../api/api';

const BookingsPage = ({ userEmail, timezone = 'Asia/Kolkata' }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getBookings = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await fetchBookings(userEmail);
                console.log('Fetched bookings:', data); // <-- ADD THIS LINE
                setBookings(data);
            } catch (err) {
                setError('Failed to fetch bookings.');
            } finally {
                setLoading(false);
            }
        };
        if (userEmail) {
            getBookings();
        }
    }, [userEmail]);

    // Example for ClassesList.jsx and BookingsPage.jsx

function formatDateTime(dateStr) {
    if (!dateStr) return '';
    // If already in "DD/MM/YYYY HH:mm:ss" format, just return it
    if (/^\d{2}\/\d{2}\/\d{4}[, ]/.test(dateStr)) {
        return dateStr;
    }
    // If ISO string, format as DD/MM/YYYY, HH:mm:ss
    // Remove timezone offset if present
    let [datePart, timePart] = dateStr.split('T');
    if (!timePart) return dateStr; // fallback
    // Remove timezone info from time part (split at + or -)
    timePart = timePart.split('+')[0].split('-')[0];
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}, ${timePart}`;
}
    if (!userEmail) {
        return <div>Please log in to view your bookings.</div>;
    }

    if (loading) return <div>Loading bookings...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Your Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                    <li key={booking.id} className="booking-item">
                        <div>
                        <strong>Class:</strong> {booking.class_name}
                        </div>
                        <div>
                        <strong>Date & Time:</strong> {formatDateTime(booking.datetime)}
                        </div>
                        <div>
                        <strong>Instructor:</strong> {booking.instructor}
                        </div>
                        <div>
                        <strong>Timezone:</strong> {booking.timezone}
                        </div>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookingsPage;