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
  // dateStr is in "DD/MM/YYYY HH:mm:ss"
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('/');
  // JS Date: new Date(year, monthIndex, day, hour, minute, second)
  const [hour, minute, second] = timePart.split(':');
  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second)
  );
  // Format as you wish, e.g. toLocaleString()
  return date.toLocaleString();
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
                        <strong>Date & Time:</strong> {formatDateTime(booking.datetime, booking.timezone)}
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