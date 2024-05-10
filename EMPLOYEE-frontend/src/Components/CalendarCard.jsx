import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import Modal from 'react-modal'; // Import modal component

// Set the root element for accessibility
Modal.setAppElement('#root');

const CalendarCard = ({ events, onDateClick, onEventClick, onTitleEdit }) => {
    return (
        <div className="tw-card">
            <div className="tw-card-header">
                <h5 className="tw-card-title">Calendar</h5>
            </div>
            <div className="tw-card-body">
                <div className="tw-row">
                    <div className="tw-col">
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                            initialView="dayGridMonth"
                            height="auto" // Set height to auto to make it responsive
                            selectable={true}
                            select={onDateClick}
                            eventClick={onEventClick}
                            events={events}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarCard;
