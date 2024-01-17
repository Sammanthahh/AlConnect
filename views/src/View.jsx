import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap'; // Make sure you have Bootstrap CSS properly imported
import axios from 'axios';

const EventCRUD = () => {
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        category: '',
    });

    // Add a state to track the event being updated
    const [selectedEvent, setSelectedEvent] = useState(null);

    const apiUrl = 'http://localhost:3000/api/events'; // Use the API route you provided

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/events`);
            setEvents(response.data);
        } catch (error) {
            console.error('Failed to fetch events', error);
        }
    };

    const handleAddEvent = async () => {
        try {
            const response = await axios.post(`${apiUrl}/events`, newEvent);
            setEvents((prevEvents) => [...prevEvents, response.data]);
            setShowAddEventModal(false); // Close the modal after adding an event
        } catch (error) {
            console.error('Error creating event', error);
        }
    };

    const handleUpdateEvent = async () => {
        if (!selectedEvent) return;

        try {
            const response = await axios.put(`${apiUrl}/events/${selectedEvent._id}`, selectedEvent);
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === selectedEvent._id ? response.data : event
                )
            );
            setShowUpdateModal(false);
        } catch (error) {
            console.error('Error updating event', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`${apiUrl}/events/${eventId}`);
            setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    const handleOpenUpdateModal = (event) => {
        setSelectedEvent(event);
        setShowUpdateModal(true);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Welcome to ALUMNCONNECT</h1>
            <Button variant="primary" onClick={() => setShowAddEventModal(true)}>
                ADD EVENT
            </Button>

            <Modal show={showAddEventModal} onHide={() => setShowAddEventModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter event title"
                                value={newEvent.title}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, title: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter event date"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter event location"
                                value={newEvent.location}
                                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter event description"
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={newEvent.category}
                                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                            >
                                <option value="">Select category</option>
                                <option value="Professional Development">Professional Development</option>
                                <option value="Networking">Networking</option>
                                <option value="Campus Events">Campus Events</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddEventModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddEvent}>
                        Save Event
                    </Button>
                </Modal.Footer>
            </Modal>

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
                                value={selectedEvent ? selectedEvent.title : ''}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter event date"
                                value={selectedEvent ? selectedEvent.date : ''}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        date: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter event location"
                                value={selectedEvent ? selectedEvent.location : ''}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        location: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter event description"
                                value={selectedEvent ? selectedEvent.description : ''}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedEvent ? selectedEvent.category : ''}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        category: e.target.value,
                                    })
                                }
                            >
                                <option value="">Select category</option>
                                <option value="Professional Development">Professional Development</option>
                                <option value="Networking">Networking</option>
                                <option value="Campus Events">Campus Events</option>
                            </Form.Control>
                        </Form.Group>
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

            <div className="event-list">
                {events.length === 0 ? (
                    <p>No events available</p>
                ) : (
                    events.map((event) => (
                        <Card key={event._id} className="mb-3">
                            <Card.Body>
                                <Card.Title>{event.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {event.date} - {event.location}
                                </Card.Subtitle>
                                <Card.Text>{event.description}</Card.Text>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteEvent(event._id)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="info"
                                    onClick={() => handleOpenUpdateModal(event)}
                                >
                                    Update
                                </Button>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default EventCRUD;
