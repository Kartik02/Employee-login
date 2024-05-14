import React, { useState, useEffect } from 'react';
import CalendarCard from './CalendarCard';
import Modal from 'react-modal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const CalendarComponent = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ id: '', title: '', start: '', end: '', allDay: false });

  useEffect(() => {
    // Fetch events from the database
    axios.get('http://localhost:5000/auth/get_events')
      .then(response => {
        setCurrentEvents(response.data);
        // Store events in local storage
        localStorage.setItem('events', JSON.stringify(response.data));
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        // If fetching from database fails, try to load events from local storage
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
          setCurrentEvents(JSON.parse(storedEvents));
        }
      });
  }, []);

  const handleDateClick = (selected) => {
    setNewEvent({
      id: '',
      title: '',
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
    });
    setModalIsOpen(true);
  };

  const handleEventClick = (selected) => {
    setNewEvent({
      id: selected.event.id,
      title: selected.event.title,
      start: selected.event.start,
      end: selected.event.end,
      allDay: selected.event.allDay,
    });
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    setNewEvent({
      ...newEvent,
      title: event.target.value,
    });
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const newEventObj = {
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
        allDay: newEvent.allDay,
        creationDate: new Date().toISOString(), // Store the creation date
      };

      axios.post('http://localhost:5000/auth/add_event', newEventObj)
        .then(response => {
          setCurrentEvents([...currentEvents, { id: response.data.id, ...newEventObj }]);
          // Update local storage with new events
          localStorage.setItem('events', JSON.stringify([...currentEvents, { id: response.data.id, ...newEventObj }]));
          handleModalClose();
        })
        .catch(error => {
          console.error('Error adding event:', error);
        });
    }
  };

  const handleEditEvent = () => {
    if (!newEvent || !newEvent.start) {
      console.error('Invalid newEvent object:', newEvent);
      return;
    }

    const updatedEvents = currentEvents.map(event => {
      if (event.id === newEvent.id) {
        return {
          ...event,
          title: newEvent.title,
          start: new Date(newEvent.start).toISOString(), // Convert to UTC format
          end: new Date(newEvent.end).toISOString(), // Convert to UTC format
        };
      }
      return event;
    });

    // Send the updated event data to the backend
    axios.post(`http://localhost:5000/auth/update_event/${newEvent.id}`, {
      title: newEvent.title,
      start: new Date(newEvent.start).toISOString(), // Convert to UTC format
      end: new Date(newEvent.end).toISOString(), // Convert to UTC format
    })
      .then(() => {
        setCurrentEvents(updatedEvents); // Update the events array in the state after the backend request is successful
        handleModalClose();
      })
      .catch(error => {
        console.error('Error updating event:', error);
      });
  };

  const handleDeleteEvent = () => {
    const updatedEvents = currentEvents.filter(event => event.id !== newEvent.id);

    // Send a request to delete the event from the backend
    axios.post(`http://localhost:5000/auth/delete_event/${newEvent.id}`)
      .then(() => {
        setCurrentEvents(updatedEvents); // Update the events array in the state after the backend request is successful
        handleModalClose();
      })
      .catch(error => {
        console.error('Error deleting event:', error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddEvent();
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <CalendarCard
            events={currentEvents}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            onTitleEdit={handleInputChange}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleModalClose}
            style={{
              overlay: {
                position: 'Fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                zIndex: 1000,
              },
              content: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                width: '400px',
                maxWidth: '90%',
                zIndex: 1001,
              },
            }}
          >
            <h2>{newEvent.id ? 'Edit Event' : 'Add Event'}</h2>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress} // Add event listener for Enter key
              className="form-control mb-3"
            />
            <div className="d-flex justify-content-between">
              {newEvent.id ? (
                <>
                  <button
                    onClick={handleEditEvent}
                    className="btn btn-primary"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={handleDeleteEvent}
                    className="btn btn-danger"
                  >
                    <FaTrash /> Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddEvent}
                  className="btn btn-primary"
                >
                  Add Event
                </button>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
