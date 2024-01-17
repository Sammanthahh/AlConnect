

import React, { useState } from 'react';
import NavBar from '../../components/navbar/Navbar';
import './home.css';
import im2 from '../../assets/people.png';
import Signin from '../../components/auth/SignIn';
import UpcomingEvents from '../../components/events/UpcomingEvents';
import Join from '../../components/events/Join';
import { useAuth } from '../../components/auth/AuthContext';
import SignUp from '../../components/auth/SignUp';
import Footer from '../../components/footer/Footer';

export default function Home() {
  const { user, logout } = useAuth();
  const [isSignInMode, setSignInMode] = useState(true);

  const handleLogout = () => {
    logout();
  };

  const handleToggleMode = () => {
    setSignInMode(!isSignInMode);
  };

  return (
    <div>
      <div className="home-hero">
        <NavBar />
        <div className="home-main">
          <div className="left">
            <h2 className="main-text">Best way to re-connect with your colleagues!</h2>
            <img src={im2} alt="Missing" className="main-img" />
          </div>
          <div className="right">
            {user ? (
              <div>
                <p>Welcome, {user.username}!</p>
                <p>User ID: {user._id}</p>
                <button onClick={handleLogout}  className='button btn-action'>Logout</button>
              </div>
            ) : isSignInMode ? (
              <Signin />
            ) : (
              <SignUp onSignUpSuccess={() => setSignInMode(true)} />
            )}
            {!user && isSignInMode && (
              <div className="sign-up" style={{textAlign:'center',color:'white'}}>
                Don't have an account? <a href="#" onClick={handleToggleMode}>Sign Up</a>
              </div>
            )}
          </div>
        </div>
      </div>
      {user && <UpcomingEvents alumniId={user._id} />}
      <div className="join-container">
        <Join />
      </div>
     <div id='footer'>
       <Footer />
     </div>

    </div>
  );
}
