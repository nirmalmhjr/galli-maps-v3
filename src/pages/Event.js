import React from "react";
import EventStatusWise from '../components/event-status/EventStatusWise'

function Event() {
  return (
    <div className="bg-[#E0E7ED] h-screen">
      <div className="p-4 ">
        <div>
          <h1 className="text-xl font-bold ">Event</h1>
        </div>
        {/* <div className="p-4"> */}
        <div >
            <EventStatusWise />
        </div>
      </div>
    </div>
  );
}

export default Event;
