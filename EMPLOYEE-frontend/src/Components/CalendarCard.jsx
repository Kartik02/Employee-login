import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");

const ResponsiveCalendar = styled(FullCalendar)`
  max-width: 100%;
  
  // desktop view
.fc-header-toolbar {
  
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

    .fc-toolbar-chunk {
      flex: 1 1 auto;
      text-align: center;
    }
  }


    //---- tab view ------

  @media only screen and (max-width: 768px) {
  .fc .fc-toolbar {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
 
    .tw-card-body {
      width: 100%;
      backgroundcolor:red;

      padding: var(--padding-card, 1rem);
    }

    .fc-daygrid-day,
    .fc-col-header-cell {
      font-size: 14px;
    }

.fc-direction-ltr .fc-daygrid-event.fc-event-end, .fc-direction-rtl .fc-daygrid-event.fc-event-start {
    padding: 0 4px;
    margin-right: 2px;
    text-align: left;
    line-height: unset;
}
    .fc-daygrid-block-event .fc-event-time, .fc-daygrid-block-event .fc-event-title {
    font-size: 10px;
    font-weight: 500;
    margin-left: auto;
    line-height: 1.2;
    min-height: 18px;
    overflow: hidden;
    word-wrap: break-word;
    white-space: normal;
    padding-top: 4px;
    overflow-wrap: break-word;
    padding: 1px;
}
 

    .fc-toolbar-chunk {
      margin-bottom: 10px;
    }
    .fc-event {
      padding: 10px;
    }
  }

  // small size phone view
     @media only screen and (max-width: 350px) {
     .fc-daygrid-block-event .fc-event-time, .fc-daygrid-block-event .fc-event-title {
        font-size: 5px;
        font-weight: 500;
        margin-left: auto;
        line-height: 1.2;
        min-height: 18px;
        overflow: hidden;
        word-wrap: break-word;
        white-space: normal, 
        padding-top: 4px;
        overflow-wrap: break-word;
        padding: 1px;
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
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              initialView="dayGridMonth"
              height="auto"
              selectable={true}
              select={onDateClick}
              eventClick={onEventClick}
              events={events}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              eventChange={onTitleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
