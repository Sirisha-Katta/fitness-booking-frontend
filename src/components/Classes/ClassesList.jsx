import { useEffect, useState,useRef } from 'react';
import { fetchClasses, fetchUserBookings } from '../../api/api';
import TimezoneFilter from '../TimezoneFilter';
import { bookClass } from '../../api/api';
import { DateTime } from "luxon";

const ClassesList = ({ user }) => {
    const [classes, setClasses] = useState([]);
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timezone, setTimezone] = useState('Asia/Kolkata');
    const [bookingMsg, setBookingMsg] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');
    const msgTimeout = useRef();
    const handleTimezoneChange = (newTimezone) => {
        setTimezone(newTimezone);
        setBookingMsg('');
        setBookingStatus('');
        if (msgTimeout.current) clearTimeout(msgTimeout.current);
    };
    const now = new Date();
    // Function to check if a class is already booked by the user in the current timezone
    const isClassBooked = (classItem) => {
        if (!user || !user.email) return false;
        
        return userBookings.some(booking => 
            booking.class_id === classItem.class_id && 
            booking.client_email === user.email &&
            booking.timezone === timezone
        );
    };
    useEffect(() => {
        if (bookingMsg) {
            msgTimeout.current = setTimeout(() => {
                setBookingMsg('');
                setBookingStatus('');
            }, 2500);
        }
        return () => clearTimeout(msgTimeout.current);
    }, [bookingMsg]);
    // Fetch classes and user bookings
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [classesData, bookingsData] = await Promise.all([
                    fetchClasses(timezone),
                    user && user.email ? fetchUserBookings(user.email) : Promise.resolve([])
                ]);
                setClasses(classesData);
                setUserBookings(bookingsData || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [timezone, user]);


const formatDateTime = (isoString, timezone) => {
    try {
        return DateTime.fromISO(isoString, { zone: 'utc' })
            .setZone(timezone)
            .toFormat("dd/MM/yyyy HH:mm:ss");
    } catch (err) {
        console.error("Date formatting error:", err);
        return isoString;
    }
};


    const handleBookClass = async (classItem) => {
    setBookingMsg('');
    setBookingStatus('');
    
    if (!user || !user.name || !user.email) {
        setBookingMsg('Please log in to book a class.');
        setBookingStatus('error');
        return;
    }

    // Check if already booked in this timezone
    if (isClassBooked(classItem)) {
        setBookingMsg('You have already booked this class in this timezone.');
        setBookingStatus('error');
        return;
    }
    console.log('classItem.datetime:', classItem.datetime, 'timezone:', timezone);
        const bookingPayload = {
        name: user.name,
        email: user.email,
        class_id: classItem.class_id,
        timezone: timezone,
        datetime: classItem.datetime, 
        instructor: classItem.instructor,
        class_name: classItem.name
    };
    console.log('Booking payload:', bookingPayload);

    try {
        const response = await bookClass(bookingPayload);
        console.log('Booking response:', response);

        setBookingMsg(`Successfully booked ${classItem.name}!`);
        setBookingStatus('success');
        
        // Update local state to reflect the new booking
        const newBooking = {
            class_id: classItem.class_id,
            client_email: user.email,
            timezone: timezone,
            class_name: classItem.name,
            datetime: classItem.datetime,
            instructor: classItem.instructor
        };
        setUserBookings(prev => [...prev, newBooking]);
        
        // Update available slots locally
        setClasses(prev => prev.map(cls => 
            cls.class_id === classItem.class_id 
                ? { ...cls, available_slots: cls.available_slots - 1 }
                : cls
        ));
        
    } catch (err) {
        setBookingMsg('Class is already been booked!');
        setBookingStatus('error');
        console.error('Booking error:', err);
    }
};

    if (loading) return <div className="loading">Loading classes...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="classes-list">
            <h3 className="greeting" style={{ textTransform: 'uppercase' }}>Hi{user && user.name ? `, ${user.name}` : ''}!</h3>
            <TimezoneFilter selectedTimezone={timezone} onTimezoneChange={handleTimezoneChange} />
            <h2>Available Classes</h2>
             {bookingMsg && (
                <div className={`booking-message ${bookingStatus}`}>
                    {bookingMsg}
                </div>
            )}
            <ul className="classes-list__items" style={{ paddingInline: 0 }}>
                {classes
                .filter(classItem => classItem.available_slots > 0) 
                .filter(classItem => {
                const classTime = new Date(classItem.datetime);
                return classTime > now; 
            })

                .map((classItem) => {
                    const isBooked = isClassBooked(classItem);
                    
                    return (
                        <li key={classItem.id} className="class-item">
                            <div className="class-info">
                                <strong 
                                    className="class-name" 
                                    style={{ 
                                        color: '#a0d9ef', 
                                        fontSize: '1.5rem',
                                        textAlign: 'center',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    {classItem.name}
                                </strong>
                                <div className="class-details">
                                    <div 
                                        className="class-datetime"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.5rem 0',
                                            borderBottom: '1px solid rgba(160, 217, 239, 0.1)'
                                        }}
                                    >
                                        <span style={{ fontWeight: 'normal', textTransform: 'uppercase' }}>
                                            Date & Time:
                                        </span>
                                        <span style={{ color: '#a0d9ef' }}>
                                            {formatDateTime(classItem.datetime, timezone)}
                                        </span>
                                    </div>
                                    <div 
                                        className="class-instructor"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.5rem 0',
                                            borderBottom: '1px solid rgba(160, 217, 239, 0.1)'
                                        }}
                                    >
                                        <span style={{ fontWeight: 'normal', textTransform: 'uppercase' }}>
                                            Instructor:
                                        </span>
                                        <span style={{ color: '#a0d9ef' }}>
                                            {classItem.instructor}
                                        </span>
                                    </div>
                                    <div 
                                        className="class-slots"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.5rem 0',
                                            borderBottom: '1px solid rgba(160, 217, 239, 0.1)'
                                        }}
                                    >
                                        <span style={{ fontWeight: 'normal', textTransform: 'uppercase' }}>
                                            Available Slots:
                                        </span>
                                        <span style={{ 
                                            color: classItem.available_slots <= 5 ? '#ff6b6b' : '#a0d9ef',
                                            fontWeight: 'bold'
                                        }}>
                                            {classItem.available_slots}
                                        </span>
                                    </div>
                                    <div 
                                        className="class-timezone"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.5rem 0',
                                            borderBottom: '1px solid rgba(160, 217, 239, 0.1)'
                                        }}
                                    >
                                        <span style={{ fontWeight: 'normal', textTransform: 'uppercase' }}>
                                            Timezone:
                                        </span>
                                        <span style={{ color: '#a0d9ef' }}>
                                            {timezone}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                className="book-button"
                                style={{
                                    alignSelf: 'center',
                                    display: 'block',
                                    margin: '1rem auto 0 auto',
                                    backgroundColor: isBooked ? '#4CAF50' : '',
                                    color: isBooked ? 'white' : '',
                                    cursor: isBooked ? 'default' : 'pointer',
                                    opacity: isBooked ? 0.8 : 1
                                }}
                                onClick={() => !isBooked && handleBookClass(classItem)}
                                disabled={isBooked}
                            >
                                {isBooked ? 'Booked' : 'Book Class'}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ClassesList;