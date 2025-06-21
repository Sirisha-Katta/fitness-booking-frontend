import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const UserIcon = ({ user }) => {
    const location = useLocation();

    const isHomePage = location.pathname === '/';
    const isClassesPage = location.pathname === '/classes';

    if (!user && isHomePage) {
        return (
            <div className="user-icon">
                <div className="user-icon__links">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Nothing is shown on other pages
    }

   return (
    <div 
        className="user-icon__links"
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            padding: '1rem 0'
        }}
    >
        {/* Show Bookings link only on /classes */}
        {isClassesPage && (
           <Link 
    to="/bookings"
    style={{
        color: '#a0d9ef',
        textDecoration: 'none',
        position: 'relative',
        transition: 'all 0.3s ease',
        fontWeight: '800',
        fontSize: '1.4rem',  // Increased from 1.1rem
        padding: '1rem 2rem',  // Increased from 0.5rem 1rem
        borderRadius: '12px',  // Increased from 8px
        background: 'rgba(160, 217, 239, 0.1)',
        border: '2px solid rgba(160, 217, 239, 0.3)',  // Increased border width and opacity
        backdropFilter: 'blur(10px)',
        display: 'inline-block',  // Ensures proper sizing
        minWidth: '150px',  // Added minimum width
        textAlign: 'center',  // Center the text
        letterSpacing: '0.5px'  // Added letter spacing for better appearance
    }}
    onMouseEnter={(e) => {
        e.target.style.color = '#ffffff';
        e.target.style.textShadow = '0 0 15px rgba(160, 217, 239, 0.9)';  // Increased glow
        e.target.style.background = 'rgba(160, 217, 239, 0.25)';  // Increased opacity
        e.target.style.transform = 'translateY(-3px) scale(1.05)';  // Added scale effect
        e.target.style.boxShadow = '0 8px 25px rgba(160, 217, 239, 0.4)';  // Larger shadow
        e.target.style.border = '2px solid rgba(160, 217, 239, 0.6)';  // Brighter border
    }}
    onMouseLeave={(e) => {
        e.target.style.color = '#a0d9ef';
        e.target.style.textShadow = 'none';
        e.target.style.background = 'rgba(160, 217, 239, 0.1)';
        e.target.style.transform = 'translateY(0) scale(1)';
        e.target.style.boxShadow = 'none';
        e.target.style.border = '2px solid rgba(160, 217, 239, 0.3)';
    }}
>
    Bookings
</Link>
        )}
    </div>
);
};

export default UserIcon;