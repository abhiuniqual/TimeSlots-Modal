import React, { useState } from "react";
import Modal from "./Modal";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const App = () => {
  const [modal, setModal] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(-1);
  const [timeSlots, setTimeSlots] = useState([
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
  ]);

  const handleOnSave = async (
    times: { open: string; close: string }[],
    selectedDay: number[]
  ) => {
    const selectedTimeSlots = [...timeSlots];
    (await selectedDay) &&
      (await selectedDay.length) > 0 &&
      (await selectedDay.map((day) => {
        selectedTimeSlots[day] = [...times];
      }));
    setTimeSlots(selectedTimeSlots);
    setModal(false);
  };

  const handleDayClick = (index: number) => {
    setSelectedDayIndex(index);
    setModal(true);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="mb-2">Select availability for time</p>
        {days.map((day, index) => (
          <div className="flex justify-between gap-2" key={index}>
            <p>{day}</p>
            <p
              className="cursor-pointer flex flex-col"
              onClick={() => handleDayClick(index)}
            >
              {timeSlots[index].map((slot, idx) => (
                <span key={idx}>
                  {slot.open} - {slot.close}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
      {modal && (
        <Modal
          day={selectedDayIndex}
          onClose={() => setModal(false)}
          onTimeSave={handleOnSave}
          initialTime={timeSlots[selectedDayIndex]}
        />
      )}
    </>
  );
};

export default App;
