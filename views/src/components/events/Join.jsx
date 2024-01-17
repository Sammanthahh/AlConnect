

import React, { useState, useEffect } from 'react';
import { JoinCard } from '../cards/ModifyEvent';
import axios from 'axios';
import './ue.css';
import { useAuth } from '../../components/auth/AuthContext';

export default function Join() {
  const { user } = useAuth();
  const [eventsByCategory, setEventsByCategory] = useState({});

  useEffect(() => {
    const fetchEventsByCategory = async (category) => {
      try {
        const response = await axios.get(`https://ab-6ybe.onrender.com/api/events/category/${category}`);
        setEventsByCategory((prevEvents) => ({ ...prevEvents, [category]: response.data }));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEventsByCategory('professional development');
    fetchEventsByCategory('networking');
    fetchEventsByCategory('campus events');
  }, []);

  const handleJoinEvent = async (eventId) => {
    if (!user) {
      alert('Please log in first.'); // Display alert if user is not logged in
      return;
    }

    try {
      const response = await axios.post(`https://ab-6ybe.onrender.com/api/events/join`, {
        userId: user._id,
        eventId: eventId,
      });

      console.log(response.data);
      alert('Successfully joined event')
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  const renderEvents = (category) => {
    if (!eventsByCategory[category]) return null;

    return eventsByCategory[category].map((event) => {
      const eventDate = new Date(event.date);
      const dayOfWeek = eventDate.toLocaleDateString('en-US', { weekday: 'short' });
      const day = eventDate.getDate();

      return (
        <JoinCard
          key={event._id}
          imageUrl={event.image}
          dayOfWeek={dayOfWeek || event.date}
          day={day || ' '}
          title={event.title}
          description={event.description}
          onJoin={() => handleJoinEvent(event._id)}
        />
      );
    });
  };

  return (
    <div className="join" id='event'>
      <div className="join-header">
        <h2>Join these events</h2>
        <div className="text">Check out some of the events other Alumni will be attending!</div>
      </div>

      <div className="event-cont">
        <div className="e-sect">
          <div className="header">Professional</div>
          <div className="events">{renderEvents('professional development')}</div>
        </div>

        <div className="e-sect">
          <div className="header">Networking</div>
          <div className="events">{renderEvents('networking')}</div>
        </div>

        <div className="e-sect">
          <div className="header">Campus Events</div>
          <div className="events">{renderEvents('campus events')}</div>
        </div>
      </div>
    </div>
  );
}

