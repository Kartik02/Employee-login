import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import Modal from 'react-modal';
import styled from 'styled-components';

// Set the root element for accessibility
Modal.setAppElement('#root');

// Define a styled component for the FullCalendar
const ResponsiveCalendar = styled(FullCalendar)`
    max-width: 100%;

    .fc-header-toolbar {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .fc-toolbar-chunk {
            flex: 1 1 auto;
            text-align: center;
        }
    }

    @media (max-width: 768px) {
        .fc-header-toolbar {
            flex-direction: column;

            .fc-toolbar-chunk {
                margin-bottom: 10px;
            }
        }
    }
`;

const CalendarCard = ({ events, onDateClick, onEventClick, onTitleEdit }) => {
    return (
        <div className="tw-card">
            <div className="tw-card-header">
                <h5 className="tw-card-title">Calendar</h5>
            </div>
            <div className="tw-card-body">
                <div className="tw-row">
                    <div className="tw-col">
                        <ResponsiveCalendar
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
