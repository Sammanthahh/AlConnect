// CreateEventModal.js
import React, { useState } from 'react';
import './ue.css'

const CreateEventModal = ({ onClose }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    // Add logic to send the event data to your backend API
    console.log('Event Data:', eventData);

    // Close the modal
    onClose();
  };

  return (
    <div className="modal" >
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create Event</h2>
        <form>
          <label>Title:</label>
          <input type="text" name="title" value={eventData.title} onChange={handleInputChange} />

          <label>Description:</label>
          <textarea name="description" value={eventData.description} onChange={handleInputChange} />

          <label>Date:</label>
          <input type="date" name="date" value={eventData.date} onChange={handleInputChange} />

          <label>Location:</label>
          <input type="text" name="location" value={eventData.location} onChange={handleInputChange} />

          <label>Category:</label>
          <select name="category" value={eventData.category} onChange={handleInputChange}>
            <option value="">Select Category</option>
            <option value="professional development">Professional Development</option>
            <option value="networking">Networking</option>
            <option value="campus events">Campus Events</option>
          </select>

          <label>Image URL:</label>
          <input type="text" name="image" value={eventData.image} onChange={handleInputChange} />

          <button type="button" onClick={handleSubmit}>Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
