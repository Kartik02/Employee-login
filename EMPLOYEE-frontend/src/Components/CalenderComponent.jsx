import React, { useState, useEffect } from 'react';
import CalendarCard from './CalendarCard';
import Modal from 'react-modal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { universalurl } from '../helper';


const CalendarComponent = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ id: '', title: '', start: '', end: '', allDay: false });

  const getEvents = () => {
    axios.get(`${universalurl}/auth/get_events`)
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
  };

  useEffect(() => {
    getEvents();
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

      axios.post(`${universalurl}/auth/add_event`, newEventObj)
        .then(response => {
          getEvents();
          handleModalClose();
          Swal.fire({
            title: 'Event Added Successfully!',
            text: `The event "${newEvent.title}" has been added.`,
            icon: 'success'
          });
        })
        .catch(error => {
          console.error('Error adding event:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while adding the event. Please try again.',
            icon: 'error'
          });
        });
    }
  };

  const handleEditEvent = () => {
    if (newEvent.id && newEvent.title) {
      axios.post(`${universalurl}/auth/update_event/${newEvent.id}`, { title: newEvent.title })
        .then(response => {
          getEvents();
          handleModalClose();
          Swal.fire({
            title: 'Event Updated Successfully!',
            text: `The event "${newEvent.title}" has been updated.`,
            icon: 'success'
          });
        })
        .catch(error => {
          console.error('Error updating event:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while editing the event. Please try again.',
            icon: 'error'
          });
        });
    }
  };

  const handleDeleteEvent = (eventId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${universalurl}/auth/delete_event`, { id: eventId })
          .then(response => {
            getEvents();
            handleModalClose();
            Swal.fire({
              title: "Deleted!",
              text: "Your event has been deleted.",
              icon: "success"
            });
          })
          .catch(error => {
            console.error('Error deleting event:', error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the event. Please try again.",
              icon: "error"
            });
          });
      }
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
