import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../button/Button";
import Card from "./ModifyEvent";
import { RegisteredCard } from "./ModifyEvent";
import "./cards.css";

export default function AlumniRecord({ name }) {
  const [alumniDetails, setAlumniDetails] = useState({});
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const id = alumniDetails._id;

  useEffect(() => {
    const fetchAlumniDetails = async () => {
      try {
        const response = await axios.get(
          `https://ab-6ybe.onrender.com/api/alumni/username/${name}`
        );
        setAlumniDetails(response.data);
      } catch (error) {
        console.error("Error fetching alumni details:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const responseOrganized = await axios.get(
          `https://ab-6ybe.onrender.com/api/events/organized/${id}`
        );
        setOrganizedEvents(responseOrganized.data);

        const responseRegistered = await axios.get(
          `https://ab-6ybe.onrender.com/api/events/registered-not-organized/${id}`
        );
        setRegisteredEvents(responseRegistered.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    // Fetch alumni details and events
    fetchAlumniDetails();
    fetchEvents();
  }, [id, name, registeredEvents]);

  const handleDeleteAlumni = async () => {
    try {
      const response = await axios.delete(
        `https://ab-6ybe.onrender.com/api/alumni/${id}`
      );
      console.log(response.data);
      // Optionally, you can navigate the user or update the UI accordingly.
    } catch (error) {
      console.error("Error deleting alumni:", error);
      setErrorMessage("Error deleting alumni");
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

  const handleDeleteEvent = async (eventId) => {
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
    <div className="alumni-record">
      <div className="alumni">
        <div className="alumni-img">
          <img
            src={
              alumniDetails.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="alumni"
            className="al-img"
          />
        </div>
        <div className="alumni-info">
          <div className="alumni-name">
            {alumniDetails.username && (
              <>
                {alumniDetails.username}
                <div>
                  <div className="alumni-title">
                    {alumniDetails.graduationYear}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <Button
          classs="btn-action"
          text="Delete Alumni"
          onClick={handleDeleteAlumni}
        />
      </div>

      <div className="events">
        <h2>Organised Events</h2>
        {Array.isArray(organizedEvents) ? (
          organizedEvents.map((event) => {
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
                onDelete={handleDeleteEvent}
              />
            );
          })
        ) : (
          <p>No organized events</p>
        )}
      </div>

      <div className="events">
        <h2>Registered Events</h2>
        {Array.isArray(registeredEvents) ? (
          registeredEvents.map((event) => {
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
              />
            );
          })
        ) : (
          <p>No registered events</p>
        )}
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
