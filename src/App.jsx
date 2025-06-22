import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch ,useHistory} from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ClassesList from './components/Classes/ClassesList';
import BookingsPage from './components/Bookings/BookingsPage';
import UserIcon from './components/User/UserIcon';
import './App.css';
const RedirectToRootOnRefresh = () => {
    const history = useHistory();
    useEffect(() => {
        if (window.location.pathname !== '/') {
            history.replace('/');
        }
    }, [history]);
    return null;
};
const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <Router>
        <RedirectToRootOnRefresh />
            <div className="app-center">
                <UserIcon user={user} onLogout={handleLogout} />
                <Switch>
                    <Route path="/login">
                        <Login onLogin={handleLogin} />
                    </Route>
                    <Route path="/signup">
                        <Signup setUser={setUser} />
                    </Route>
                    <Route path="/classes">
                        <ClassesList user={user} />
                    </Route>
                    <Route path="/bookings">
                        <BookingsPage userEmail={user ? user.email : ''} />
                    </Route>
                    <Route exact path="/">
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;