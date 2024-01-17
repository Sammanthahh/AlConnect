import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../cards/ModifyEvent";
import { RegisteredCard } from "../cards/ModifyEvent";

import Button from "../button/Button";
import im4 from "../../assets/im2.png";
import "./ue.css";
import { useAuth } from "../../components/auth/AuthContext";

export default function UpcomingEvents({ alumniId }) {
  const { user } = useAuth();
  const userId = user._id;
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    image: "",
  });

  const [categories, setCategories] = useState([
    "professional development",
    "networking",
    "campus events",
  ]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const organizedResponse = await axios.get(
          `https://ab-6ybe.onrender.com/api/events/organized/${alumniId}`
        );
        setOrganizedEvents(organizedResponse.data);

        const registeredResponse = await axios.get(
          `https://ab-6ybe.onrender.com/api/events/registered-not-organized/${alumniId}`
        );
        setRegisteredEvents(registeredResponse.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        // Fetch categories from the backend or use a static array
        setCategories([
          "professional development",
          "networking",
          "campus events",
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchEvents();
    fetchCategories();
  }, [organizedEvents,registeredEvents]);

  const handleCreateEvent = async () => {
    try {
      // const alumniId = '65593158581be534d0740fc3';
      const eventData = { ...formData, organizer: alumniId };

      const response = await axios.post(
        "https://ab-6ybe.onrender.com/api/events",
        eventData
      );
      console.log(response.data);
      alert('Event creation successful')

      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        image: "",
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleLeaveEvent = async (eventId) => {
    try {
      console.log("Leaving event with ID:", eventId);

      // Make an API request to leave the event
      await axios.post("https://ab-6ybe.onrender.com/api/events/leave", {
        eventId,
        userId,
      });

      // Update the state to reflect the change
      setRegisteredEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );

      console.log("Left event with ID:", eventId);
    } catch (error) {
      console.error("Error leaving event:", error);
    }
  };

  const handleModifyEvent = async (
    eventId,
    updatedTitle,
    updatedDescription
  ) => {
    try {
      // Make an API request to update the event in the state
      const updatedEvents = registeredEvents.map((event) =>
        event._id === eventId
          ? { ...event, title: updatedTitle, description: updatedDescription }
          : event
      );

      setRegisteredEvents(updatedEvents);
    } catch (error) {
      console.error("Error updating event in state:", error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`https://ab-6ybe.onrender.com/api/events/${eventId}`);

      setRegisteredEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  return (
    <div className="upcoming">
      <h1>Upcoming Events</h1>

      <div className="organised">
        <h2>Organized Events</h2>
        <div className="org-sect">
          {organizedEvents.map((event) => {
            const eventDate = new Date(event.date);
            const dayOfWeek = eventDate.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const day = eventDate.getDate();

            return (
              <Card
                key={event._id}
                eventId={event._id}
                imageUrl={event.image}
                dayOfWeek={dayOfWeek}
                day={day}
                title={event.title}
                description={event.description}
                onModify={handleModifyEvent}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>

      <div className="organised">
        <h2>Registered Events</h2>
        <div className="org-sect">
          {registeredEvents.map((event) => {
            const eventDate = new Date(event.date);
            const dayOfWeek = eventDate.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const day = eventDate.getDate();

            return (
              <RegisteredCard
                key={event._id}
                _id={event._id}
                imageUrl={event.image}
                dayOfWeek={dayOfWeek}
                day={day}
                title={event.title}
                description={event.description}
                onLeaveEvent={handleLeaveEvent}
              />
            );
          })}
        </div>
      </div>

      <div className="create-event">
        <div className="image-section">
          <img src={im4} alt="Missing" className="image" />
        </div>
        {showCreateForm ? (
          <form>
            <div className="form-section">
              <label>
                Title:
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </label>

              <label>
                Description:
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </label>

              <label>
                Date:
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </label>

              <label>
                Location:
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </label>

              <label>
                Category:
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Image:
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </label>

              {/* Submit button */}
              <Button
                classs="btn-action"
                text="Create Event"
                onClick={handleCreateEvent}
              />
            </div>
          </form>
        ) : (
          // Create Event button
          <div className="text-side">
            <h2>Make Your Own Event</h2>
            <div className="ts">
              Are you a registered member of ALC and would like to ADD an event?
            </div>
            <Button
              classs="btn-action"
              text="Create Event"
              style={{ padding: "15px" }}
              onClick={() => setShowCreateForm(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
