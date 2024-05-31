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
    axios.get('https://rmbackend.vercel.app/auth/get_events')
      .then(response => {
        setCurrentEvents(response.data);
        localStorage.setItem('events', JSON.stringify(response.data));
      })
      .catch(error => {
        console.error('Error fetching events:', error);
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
        creationDate: new Date().toISOString(),
      };

      axios.post('https://rmbackend.vercel.app/auth/add_event', newEventObj)
        .then(response => {
          setCurrentEvents([...currentEvents, { id: response.data.id, ...newEventObj }]);
          localStorage.setItem('events', JSON.stringify([...currentEvents, { id: response.data.id, ...newEventObj }]));
          handleModalClose();
        })
        .catch(error => {
          console.error('Error adding event:', error);
        });
    }
  };

  const handleEditEvent = () => {
    if (newEvent.id && newEvent.title) {
      axios.post(`https://rmbackend.vercel.app/auth/update_event/${newEvent.id}`, { title: newEvent.title })
        .then(response => {
          setCurrentEvents(currentEvents.map(event => event.id === newEvent.id ? { ...event, title: newEvent.title } : event));
          localStorage.setItem('events', JSON.stringify(currentEvents.map(event => event.id === newEvent.id ? { ...event, title: newEvent.title } : event)));
          handleModalClose();
        })
        .catch(error => {
          console.error('Error updating event:', error);
        });
    }
  };

  const handleDeleteEvent = (eventId) => {
    axios.post(`https://rmbackend.vercel.app/auth/delete_event`, { id: eventId })
      .then(response => {
        setCurrentEvents(currentEvents.filter(event => event.id !== eventId));
        localStorage.setItem('events', JSON.stringify(currentEvents.filter(event => event.id !== eventId)));
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
                color: 'black'
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
              onKeyPress={handleKeyPress}
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
                    onClick={() => handleDeleteEvent(newEvent.id)}
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
