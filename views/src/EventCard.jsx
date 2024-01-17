import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './card.scss';

const EventCard = ({ event, onDelete, onUpdate }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [updatedEvent, setUpdatedEvent] = useState({
        title: event.title,
        date: event.date,
        location: event.location,
        description: event.description,
        category: event.category,
    });

    const handleUpdateEvent = async () => {
        try {
            // Make an API request to update the event
            const response = await axios.put(`http://localhost:3000/api/events/events/${event._id}`, updatedEvent);
            onUpdate(response.data);
            setShowUpdateModal(false);
        } catch (error) {
            console.error('Error updating event', error);
        }
    };

    const handleDeleteConfirmation = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteEvent = async () => {
        try {
            // Make an API request to delete the event
            await axios.delete(`http://localhost:3000/api/events/events/${event._id}`);
            onDelete(event._id);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    return (
        <div className="event-card">
            <div className="card-content">
                <h4>{event.title}</h4>
                <p>{event.date} - {event.location}</p>
                <p>{event.description}</p>
                <button className="delete-button" onClick={handleDeleteConfirmation}>
                    Delete
                </button>
                <button className="update-button" onClick={() => setShowUpdateModal(true)}>
                    Update
                </button>
            </div>

            {/* Modal for updating event */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter event title"
                                value={updatedEvent.title}
                                onChange={(e) => setUpdatedEvent({ ...updatedEvent, title: e.target.value })}
                            />
                        </Form.Group>
                        {/* Add form fields for date, location, description, and category */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateEvent}>
                        Save Event
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirmation Modal for deleting event */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this event?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteEvent}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
