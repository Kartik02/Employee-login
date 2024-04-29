import React, { useState } from 'react';
import FullCalendar from "@fullcalendar/react"; 
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

const CalenderComponent = () =>
 {
  // eslint-disable-next-line
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
      const title = prompt("Please enter a new title for your event");
      const calendarApi = selected.view.calendar;
      calendarApi.unselect();

      if (title) {
        const eventData = {
          title: title,
          start: selected.startStr,
          end: selected.endStr,
          allDay: selected.allDay,
        };

        fetch('/api/add_event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.message); // Print the message from the backend
          calendarApi.addEvent({
            id: `${selected.dateStr}-${title}`,
            title,
            start: selected.startStr,
            end: selected.endStr,
            allDay: selected.allDay,
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
  };


  const handleEventClick = (selected) => {
      if (
        window.confirm(
          `Are you sure you want to delete the event '${selected.event.title}'`
        )
      ) {
        const eventData = {
          id: selected.event.id,
        };

        fetch('/api/delete_event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.message); // Print the message from the backend
          selected.event.remove(); // Remove the event from the calendar
        })
        .catch(error => {
          console.error('Error:', error);
        });
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
      eventClick={handleEventClick}
      events={currentEvents}
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
