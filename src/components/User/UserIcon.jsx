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
        {isClassesPage && (
           <Link 
    to="/bookings"
    style={{
        color: '#a0d9ef',
        textDecoration: 'none',
        position: 'relative',
        transition: 'all 0.3s ease',
        fontWeight: '800',
        fontSize: '1.4rem',  
        padding: '1rem 2rem',  
        borderRadius: '12px',  
        background: 'rgba(160, 217, 239, 0.1)',
        border: '2px solid rgba(160, 217, 239, 0.3)',  
        backdropFilter: 'blur(10px)',
        display: 'inline-block',  
        minWidth: '150px',  
        textAlign: 'center',  
        letterSpacing: '0.5px'  
    }}
    // onMouseEnter={(e) => {
    //     e.target.style.color = '#ffffff';
    //     e.target.style.textShadow = '0 0 15px rgba(160, 217, 239, 0.9)'; 
    //     e.target.style.background = 'rgba(160, 217, 239, 0.25)';  
    //     e.target.style.transform = 'translateY(-3px) scale(1.05)';  
    //     e.target.style.boxShadow = '0 8px 25px rgba(160, 217, 239, 0.4)';  
    //     e.target.style.border = '2px solid rgba(160, 217, 239, 0.6)';  
    // }}
    // onMouseLeave={(e) => {
    //     e.target.style.color = '#a0d9ef';
    //     e.target.style.textShadow = 'none';
    //     e.target.style.background = 'rgba(160, 217, 239, 0.1)';
    //     e.target.style.transform = 'translateY(0) scale(1)';
    //     e.target.style.boxShadow = 'none';
    //     e.target.style.border = '2px solid rgba(160, 217, 239, 0.3)';
    // }}
>
    Bookings
</Link>
        )}
    </div>
);
};

export default UserIcon;