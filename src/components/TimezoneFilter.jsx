import React from 'react';

const timezones = [
    { value: 'Asia/Kolkata', label: 'Asia/Kolkata' },
    { value: 'America/New_York', label: 'America/New_York' },
    { value: 'Europe/London', label: 'Europe/London' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
    { value: 'Australia/Sydney', label: 'Australia/Sydney' },
];

const TimezoneFilter = ({ selectedTimezone, onTimezoneChange }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            {/* <label htmlFor="timezone-select">Select Timezone:</label> */}
            <select
                id="timezone-select"
                value={selectedTimezone}
                onChange={(e) => onTimezoneChange(e.target.value)}
            >
                {timezones.map((timezone) => (
                    <option key={timezone.value} value={timezone.value}>
                        {timezone.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TimezoneFilter;