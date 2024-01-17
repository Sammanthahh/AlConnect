import "./cards.css"; // Import the CSS file for styling
import Button from "../button/Button";
import React, { useState } from "react";
import axios from "axios";

// export default function Card({ imageUrl, dayOfWeek, day, title, description }) {
//   return (
//     <div className="card">
//       <img src={imageUrl} alt="Event" className="card-image" />
//       <div className="card-content">
//         <div className="date-column">
//           <div className="month">{dayOfWeek}</div>
//           <div className="day">{day}</div>
//         </div>
//         <div className="event-column">
//           <div className="event-title">{title}</div>
//           <div className="event-description">{description}</div>
//         </div>
//       </div>
//       <div className="card-action">
//         <Button classs="btn"  text='Modify'/>
//         <Button classs="btn"  text='Delete'/>
//      </div>
//     </div>
//   );
// };

export default function Card({
  eventId,
  imageUrl,
  dayOfWeek,
  day,
  title,
  description,
  onModify,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleSave = async () => {
    try {
      // Make an API request to update the event
      const response = await axios.put(
        `https://ab-6ybe.onrender.com/api/events/${eventId}`,
        {
          title: editedTitle,
          description: editedDescription,
        }
      );

      // Check the response and perform further actions if needed
      console.log(response.data);

      // After saving, exit editing mode
      setIsEditing(false);

      // Trigger the onModify callback with the edited details
      onModify(eventId, editedTitle, editedDescription);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="card">
      <img src={imageUrl} alt="Event" className="card-image" />
      <div className="card-content">
        <div className="date-column">
          <div className="month">{dayOfWeek}</div>
          <div className="day">{day}</div>
        </div>
        <div className="event-column">
          {isEditing ? (
            <div className="edit-form">
              <label>
                Title:
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </label>
              <label>
                Description:
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </label>
              <Button classs="btn" text="Save" onClick={handleSave} />
            </div>
          ) : (
            <>
              <div className="event-title">{title}</div>
              <div className="event-description">{description}</div>
            </>
          )}
        </div>
      </div>
      <div className="card-action">
        {isEditing ? (
          // Allow canceling edit mode
          <Button
            classs="btn"
            text="Cancel"
            onClick={() => setIsEditing(false)}
          />
        ) : (
          <>
            {/* Trigger edit mode */}
            <Button
              classs="btn"
              text="Modify"
              onClick={() => setIsEditing(true)}
            />
            {/* Trigger delete */}
            <Button
              classs="btn"
              text="Delete"
              onClick={() => onDelete(eventId)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export const JoinCard = ({
  imageUrl,
  dayOfWeek,
  day,
  title,
  description,
  onJoin,
}) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="Event" className="card-image" />
      <div className="card-content">
        <div className="date-column">
          <div className="month">{dayOfWeek}</div>
          <div className="day">{day}</div>
        </div>
        <div className="event-column">
          <div className="event-title">{title}</div>
          <div className="event-description">{description}</div>
        </div>
      </div>
      <div
        className="card-action"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button classs="btn" text="Join" onClick={onJoin} />
      </div>
    </div>
  );
};

// export const RegisteredCard = ({ imageUrl, dayOfWeek, day, title, description}) => {
//   return (
//     <div className="card">
//       <img src={imageUrl} alt="Event" className="card-image" />
//       <div className="card-content">
//         <div className="date-column">
//           <div className="month">{dayOfWeek}</div>
//           <div className="day">{day}</div>
//         </div>
//         <div className="event-column">
//           <div className="event-title">{title}</div>
//           <div className="event-description">{description}</div>
//         </div>
//       </div>
//       <div className="card-action" style={{ display: 'flex', justifyContent: 'center' }}>
//         <Button classs="btn" text="Cancel Attendance"  />
//       </div>
//     </div>
//   );
// };

// export const RegisteredCard = ({ imageUrl, dayOfWeek, day, title, description, eventId, onLeaveEvent }) => {
//   const handleLeaveEvent = async () => {
//     try {
//       // Make an API request to leave the event
//       await axios.post('http://localhost:3001/api/events/leave', { eventId });

//       // Trigger the callback to update the UI or perform any other actions
//       if (onLeaveEvent) {
//         onLeaveEvent(eventId);
//       }
//     } catch (error) {
//       console.error('Error leaving event:', error);
//     }
//   };

//   return (
//     <div className="card">
//       <img src={imageUrl} alt="Event" className="card-image" />
//       <div className="card-content">
//         <div className="date-column">
//           <div className="month">{dayOfWeek}</div>
//           <div className="day">{day}</div>
//         </div>
//         <div className="event-column">
//           <div className="event-title">{title}</div>
//           <div className="event-description">{description}</div>
//         </div>
//       </div>
//       <div className="card-action" style={{ display: 'flex', justifyContent: 'center' }}>
//         <Button classs="btn" text="Cancel Attendance" onClick={handleLeaveEvent} />
//       </div>
//     </div>
//   );
// };

export const RegisteredCard = ({
  _id,
  imageUrl,
  dayOfWeek,
  day,
  title,
  description,
  onLeaveEvent,
}) => {
  const handleLeaveClick = () => {
    // Trigger the onLeaveEvent callback with the eventId
    onLeaveEvent(_id);
  };

  return (
    <div className="card">
      <img src={imageUrl} alt="Event" className="card-image" />
      <div className="card-content">
        <div className="date-column">
          <div className="month">{dayOfWeek}</div>
          <div className="day">{day}</div>
        </div>
        <div className="event-column">
          <div className="event-title">{title}</div>
          <div className="event-description">{description}</div>
        </div>
      </div>
      <div
        className="card-action"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          classs="btn"
          text="Cancel Attendance"
          onClick={handleLeaveClick}
        />
      </div>
    </div>
  );
};
