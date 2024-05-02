import React, { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import axios from 'axios';

const CalenderComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('https://empbackend.vercel.app/auth/get_events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {

        console.error(error);
      });
  };

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarauth = selected.view.calendar;
    calendarauth.unselect();

    if (title) {
      const newEvent = {
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };

      if (selected.event?.id) {
        const confirmDelete = confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
          axios.post('https://empbackend.vercel.app/auth/delete_event', { id: selected.event.id })
            .then(response => {
              console.log(response.data);
              calendarauth.getEventById(selected.event.id).remove();
            })
            .catch(error => {
              console.error(error);
            });
        }
      } else {
        axios.post('https://empbackend.vercel.app/auth/add_event', newEvent)
          .then(response => {
            console.log(response.data);
            calendarauth.addEvent(newEvent);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };

  return (
    <div className='flex justify-center'>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin,
        ]}
        initialView="dayGridMonth"
        height="75vh"
        selectable={true}
        select={handleDateClick}
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
      />
    </div>
  );
};

export default CalenderComponent;

