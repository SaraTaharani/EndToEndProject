
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { getData, postNewObject } from '../../Fetch';
// import { AutoComplete } from 'primereact/autocomplete';
// import SignUp from '../Pages/SignUp';
// import '../css/calendar.css';

// const localizer = momentLocalizer(moment);

// function Calendar1() {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [disabled, setDisabled] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newEvent, setNewEvent] = useState({ type: '', userId: '', start: null, end: null });
//   const [clients, setClients] = useState([]);
//   const [filteredClients, setFilteredClients] = useState([]);
//   const [email, setEmail] = useState('');
//   const [showSignUp, setShowSignUp] = useState(false);
//   const [activityTimes, setActivityTimes] = useState([]);

//   const clickRef = useRef(null);

//   useEffect(() => {
//     getData("clients")
//       .then(data => {
//         setClients([...data]);
//       })
//       .catch((error) => {
//         console.error('Error fetching clients data:', error);
//       });

//     getData("calendar")
//       .then((data) => {
//         const formattedEvents = formatEvents(data.turns);
//         const formattedDisabled = formatDisabled(data.disabledTurns);
//         const formattedActivity = formatActivityTime(data.activityTime);
//         setDisabled(formattedDisabled);
//         setActivityTimes(formattedActivity);
//         setEvents([...formattedEvents, ...formattedDisabled]);
//       })
//       .catch((error) => {
//         console.error('Error fetching calendar data:', error);
//       });
//   }, []);

//   const formatEvents = (turns) => {
//     return turns.map((event) => {
//       const start = moment(event.date).set({ hour: event.hour, minute: event.minutes }).toDate();
//       const end = moment(event.date).set({ hour: event.hour + 1, minute: event.minutes }).toDate();
//       return {
//         title: `${event.name},${event.type}`,
//         start: start,
//         end: end,
//         ...event
//       };
//     }).filter(event => event !== null);
//   };

//   const formatDisabled = (disabledTurns) => {
//     return disabledTurns.map((event) => {
//       const start = moment(event.date)
//       .hour(event.startTimeHour)
//       .minute(event.startTimeMinutes)
//       .toDate();

//     const end = moment(event.date)
//       .hour(event.endTimeHour)
//       .minute(event.endTimeMinutes)
//       .toDate();
//       return {
//         title: 'לא מאופשר',
//         start: start,
//         end: end      };
//     }).filter(event => event !== null);
//   };

//   const formatActivityTime = (activityTime) => {
//     const now = moment();
//     return activityTime.map((activity) => {
//       const start = now.clone().day(activity.day).hour(activity.startTimeHour).minute(activity.startTimeMinutes).toDate();
//       const end = now.clone().day(activity.day).hour(activity.endTimeHour).minute(activity.endTimeMinutes).toDate();
//       return {
//         start: start,
//         end: end,
//         activity: true
//       };
//     });
//   };

//   const handleSelectEvent = (event) => {
//     if (!event.disabled) {
//       setSelectedEvent(event);
//     }
//   };

//   const isWithinActivityTime = (slotStart, slotEnd) => {
//     return activityTimes.some(activity =>
//       moment(slotStart).isBetween(activity.start, activity.end, null, '[)') &&
//       moment(slotEnd).isBetween(activity.start, activity.end, null, '(]')
//     );
//   };

//   const onSelectSlot = useCallback((slotInfo) => {
//     const isDisabled = disabled.some(
//       (d) =>
//         moment(d.start).isSame(slotInfo.start, 'day') &&
//         moment(d.start).hour() <= moment(slotInfo.start).hour() &&
//         moment(d.end).hour() >= moment(slotInfo.end).hour() &&
//         moment(d.start).minute() <= moment(slotInfo.start).minute() &&
//         moment(d.end).minute() >= moment(slotInfo.end).minute()
//     );

//     if (!isDisabled && isWithinActivityTime(slotInfo.start, slotInfo.end)) {
//       window.clearTimeout(clickRef.current);
//       clickRef.current = window.setTimeout(() => {
//         setNewEvent({ type: '', userId: '', start: slotInfo.start, end: slotInfo.end });
//         setShowModal(true);
//       }, 250);
//     }
//   }, [disabled, activityTimes]);

//   const handleSaveEvent = () => {
//     const eventToSave = {
//       date: moment(newEvent.start).format('YYYY-MM-DD'),
//       hour: moment(newEvent.start).hour(),
//       minutes: moment(newEvent.start).minutes(),
//       userId: newEvent.userId,
//       typeId: newEvent.type
//     };

//     postNewObject('turns', eventToSave)
//       .then((data) => {
//         const formattedEvents = formatEvents(data);
//         setEvents([...formattedEvents, ...disabled]);
//         setShowModal(false);
//       })
//       .catch(error => {
//         console.error('Error saving new event:', error);
//       });
//   };

//   const handleCancelModal = () => {
//     setSelectedEvent(null);
//   };

//   const eventStyleGetter = (event) => {
//     if (event.disabled) {
//       return {
//         style: {
//           backgroundColor: 'lightgray',
//           opacity: 0.5,
//           cursor: 'not-allowed'
//         }
//       };
//     }
//     return {};
//   };
//   const slotPropGetter = (date) => {
//     const isActivityTime = activityTimes.some(activity =>
//       moment(date).isBetween(activity.start, activity.end, null, '[)')
//     );

//     return {
//       className: isActivityTime ? 'active-slot' : '',
//       style: {
//         backgroundColor: isActivityTime ? 'white' : '#CCCCCC',
//         cursor: isActivityTime ? 'pointer' : 'not-allowed'
//       }
//     };
//   };


//   const handleTypeOfTurn = (event) => {
//     const value = event.target.value;
//     setNewEvent(prevEvent => ({
//       ...prevEvent,
//       type: value
//     }));
//   };

//   const searchEmail = (event) => {
//     setFilteredClients(clients.filter(client => client.email.toLowerCase().includes(event.query.toLowerCase())));
//   };

//   const handleClientSelect = (client) => {
//     setNewEvent(prevNewEvent => ({
//       ...prevNewEvent,
//       userId: client.id,
//       clientName: client.name
//     }));
//     setEmail(client.email);
//   };

//   return (
//     <div>
//       <button className='buttonOptions' onClick={() => setShowSignUp(true)}>הוספת לקוחה</button>
//       <div className="myCustomHeight">
//         <Calendar
//           onSelectSlot={onSelectSlot}
//           selectable
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           defaultView={Views.WEEK}
//           onSelectEvent={handleSelectEvent}
//           eventPropGetter={eventStyleGetter}
//           slotPropGetter={slotPropGetter}
//           style={{ height: '500px' }}
//           messages={{
//             date: 'תאריך',
//             next: 'הבא',
//             back: 'קודם',
//             today: 'היום',
//             month: 'חודש',
//             week: 'שבוע',
//             day: 'יום',
//             agenda: 'סדר היום',
//           }}
//         />
//         {selectedEvent && (
//           <div className="modal-event">
//             <h2>פרטים נוספים</h2>
//             <p><strong>סוג התור:</strong> {selectedEvent.type}</p>
//             <p><strong>שם:</strong> {selectedEvent.name}</p>
//             <p><strong>מייל:</strong> {selectedEvent.email}</p>
//             <p><strong>מספר פלאפון:</strong> {selectedEvent.phone1}</p>
//             {selectedEvent.type === "מדידות" &&
//               <>
//                 <p><strong>ת"ז:</strong> {selectedEvent.userId}</p>
//                 <p><strong>תאריך חתונה:</strong> {selectedEvent.weddingDate}</p>
//               </>
//             }
//             <p><strong>שעת התחלה:</strong> {moment(selectedEvent.start).format('DD/MM/YYYY HH:mm')}</p>
//             <p><strong>שעת סיום:</strong> {moment(selectedEvent.end).format('DD/MM/YYYY HH:mm')}</p>
//             <button onClick={handleCancelModal}>סגור</button>
//           </div>
//         )}

//         {showModal && (
//           <div className="modal">
//             <div className="modal-content">
//               <h2>קביעת תור חדש</h2>
//               <label>
//                 סוג תור:
//                 <br />
//                 <label>
//                   <input type="radio" name="type" value="1" onChange={handleTypeOfTurn} />
//                   מדידות
//                 </label>
//                 <label>
//                   <input type="radio" name="type" value="2" onChange={handleTypeOfTurn} />
//                   התרשמות
//                 </label>
//               </label>
//               <br />
//               <label>
//                 שם לקוחה:
//                 <AutoComplete
//                   value={email}
//                   suggestions={filteredClients}
//                   completeMethod={searchEmail}
//                   onChange={(e) => setEmail(e.value)}
//                   onSelect={(e) => handleClientSelect(e.value)}
//                   field="email"
//                   placeholder="הכניסי מייל של לקוחה"
//                 />
//               </label>
//               <button onClick={handleSaveEvent}>שמור</button>
//               <button onClick={() => setShowModal(false)}>בטל</button>
//             </div>
//           </div>
//         )}
//       </div>
//       {showSignUp && (
//         <div className="modal">
//           <div className="modal-content">
//             <SignUp setUserData={() => setShowSignUp(false)} />
//             <button onClick={() => setShowSignUp(false)}>סגור</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Calendar1;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getData, postNewObject } from '../../Fetch';
import { AutoComplete } from 'primereact/autocomplete';
import SignUp from '../Pages/SignUp';
import '../css/calendar.css';

const localizer = momentLocalizer(moment);

function Calendar1() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [disabled, setDisabled] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ type: '', userId: '', start: null, end: null });
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [email, setEmail] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [activityTimes, setActivityTimes] = useState([]);
  const [isAddingNewEvent, setIsAddingNewEvent] = useState(false); // State to track if user is adding a new event
  const [isDisablingTime, setIsDisablingTime] = useState(false); // State to track if user is disabling time slot

  const clickRef = useRef(null);

  useEffect(() => {
    getData("clients")
      .then(data => {
        setClients([...data]);
      })
      .catch((error) => {
        console.error('Error fetching clients data:', error);
      });

    getData("calendar")
      .then((data) => {
        const formattedEvents = formatEvents(data.turns);
        const formattedDisabled = formatDisabled(data.disabledTurns);
        const formattedActivity = formatActivityTime(data.activityTime);
        setDisabled(formattedDisabled);
        setActivityTimes(formattedActivity);
        setEvents([...formattedEvents, ...formattedDisabled]);
      })
      .catch((error) => {
        console.error('Error fetching calendar data:', error);
      });
  }, []);

  const formatEvents = (turns) => {
    return turns.map((event) => {
      const start = moment(event.date).set({ hour: event.hour, minute: event.minutes }).toDate();
      const end = moment(event.date).set({ hour: event.hour + 1, minute: event.minutes }).toDate();
      return {
        title: `${event.name},${event.type}`,
        start: start,
        end: end,
        ...event
      };
    }).filter(event => event !== null);
  };

  const formatDisabled = (disabledTurns) => {
    return disabledTurns.map((event) => {
      const start = moment(event.date)
        .hour(event.startTimeHour)
        .minute(event.startTimeMinutes)
        .toDate();

      const end = moment(event.date)
        .hour(event.endTimeHour)
        .minute(event.endTimeMinutes)
        .toDate();

      return {
        title: 'לא מאופשר',
        start: start,
        end: end
      };
    }).filter(event => event !== null);
  };

  const formatActivityTime = (activityTime) => {
    const now = moment();
    return activityTime.map((activity) => {
      const start = now.clone().day(activity.day).hour(activity.startTimeHour).minute(activity.startTimeMinutes).toDate();
      const end = now.clone().day(activity.day).hour(activity.endTimeHour).minute(activity.endTimeMinutes).toDate();
      return {
        start: start,
        end: end,
        activity: true
      };
    });
  };

  const handleSelectEvent = (event) => {
    if (!event.disabled) {
      setSelectedEvent(event);
    }
  };

  const isWithinActivityTime = (slotStart, slotEnd) => {
    return activityTimes.some(activity =>
      moment(slotStart).isBetween(activity.start, activity.end, null, '[)') &&
      moment(slotEnd).isBetween(activity.start, activity.end, null, '(]')
    );
  };

  const onSelectSlot = useCallback((slotInfo) => {
    const isDisabled = disabled.some(
      (d) =>
        moment(d.start).isSame(slotInfo.start, 'day') &&
        moment(d.start).hour() <= moment(slotInfo.start).hour() &&
        moment(d.end).hour() >= moment(slotInfo.end).hour() &&
        moment(d.start).minute() <= moment(slotInfo.start).minute() &&
        moment(d.end).minute() >= moment(slotInfo.end).minute()
    );

    if (!isDisabled && isWithinActivityTime(slotInfo.start, slotInfo.end)) {
      window.clearTimeout(clickRef.current);
      clickRef.current = window.setTimeout(() => {
        setNewEvent({ type: '', userId: '', start: slotInfo.start, end: slotInfo.end });
        setShowModal(true);
      }, 250);
    }
  }, [disabled, activityTimes]);

  const handleSaveEvent = (start, end) => {
    setNewEvent({ type: '', userId: '', start: start, end: end }); // Initialize new event state
    setShowModal(true); // Show modal for adding new event
  };

  const handleSaveDisabledTime = (start, end) => {
    const disabledTimeToSave = {
      date: moment(start).format('YYYY-MM-DD'),
      startTimeHour: moment(start).hour(),
      startTimeMinutes: moment(start).minutes(),
      endTimeHour: moment(end).hour(),
      endTimeMinutes: moment(end).minutes()
    };

    postNewObject('disabledTurns', disabledTimeToSave)
      .then((data) => {
        const formattedDisabled = formatDisabled(data);
        setDisabled([...disabled, ...formattedDisabled]);
        setShowModal(false);
        setIsDisablingTime(false); // Reset state to false after save
      })
      .catch(error => {
        console.error('Error saving disabled time:', error);
      });
  };

  const handleCancelModal = () => {
    setSelectedEvent(null);
    setIsAddingNewEvent(false); // Reset state to false if user cancels
    setIsDisablingTime(false); // Reset state to false if user cancels
  };

  const eventStyleGetter = (event) => {
    if (event.disabled) {
      return {
        style: {
          backgroundColor: 'lightgray',
          opacity: 0.5,
          cursor: 'not-allowed'
        }
      };
    }
    return {};
  };

  const slotPropGetter = (date) => {
    const startOfDay = moment(date).startOf('day').add(8, 'hours');
    const endOfDay = moment(date).startOf('day').add(22, 'hours');

    const isActivityTime = activityTimes.some(activity =>
      moment(date).isBetween(activity.start, activity.end, null, '[)')
    );

    return {
      className: isActivityTime ? 'active-slot' : '',
      style: {
        backgroundColor: isActivityTime ? 'white' : '#CCCCCC',
        cursor: isActivityTime ? 'pointer' : 'not-allowed'
      }
    };
  };

  const handleTypeOfTurn = (event) => {
    const value = event.target.value;
    setNewEvent(prevEvent => ({
      ...prevEvent,
      type: value
    }));
  };

  const searchEmail = (event) => {
    setFilteredClients(clients.filter(client => client.email.toLowerCase().includes(event.query.toLowerCase())));
  };

  const handleClientSelect = (client) => {
    setNewEvent(prevNewEvent => ({
      ...prevNewEvent,
      userId: client.id,
      clientName: client.name
    }));
    setEmail(client.email);
  };

  const handleDisableTime = () => {
    setIsDisablingTime(true); // Set state to true when disabling time
    setShowModal(true); // Show modal for disabling time
  };

  return (
    <div>
      <button className='buttonOptions' onClick={() => setShowSignUp(true)}>הוספת לקוחה</button>
      <div className="myCustomHeight">
        <Calendar
          onSelectSlot={onSelectSlot}
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.WEEK}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          slotPropGetter={slotPropGetter}
          style={{ height: '500px' }}
          messages={{
            date: 'תאריך',
            next: 'הבא',
            back: 'קודם',
            today: 'היום',
            month: 'חודש',
            week: 'שבוע',
            day: 'יום',
            agenda: 'סדר היום',
          }}
        />
        {selectedEvent && (
          <div className="modal-event">
            <h2>פרטים נוספים</h2>
            <p><strong>סוג התור:</strong> {selectedEvent.type}</p>
            <p><strong>שם:</strong> {selectedEvent.name}</p>
            <p><strong>מייל:</strong> {selectedEvent.email}</p>
            <p><strong>מספר פלאפון:</strong> {selectedEvent.phone1}</p>
            {selectedEvent.type === "מדידות" &&
              <>
                <p><strong>ת"ז:</strong> {selectedEvent.userId}</p>
                <p><strong>תאריך חתונה:</strong> {selectedEvent.weddingDate}</p>
              </>
            }
            <p><strong>שעת התחלה:</strong> {moment(selectedEvent.start).format('DD/MM/YYYY HH:mm')}</p>
            <p><strong>שעת סיום:</strong> {moment(selectedEvent.end).format('DD/MM/YYYY HH:mm')}</p>
            <button onClick={handleCancelModal}>סגור</button>
          </div>
        )}

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>קביעת תור חדש</h2>
              <label>
                סוג תור:
                <br />
                <label>
                  <input type="radio" name="type" value="1" onChange={handleTypeOfTurn} />
                  מדידות
                </label>
                <label>
                  <input type="radio" name="type" value="2" onChange={handleTypeOfTurn} />
                  התרשמות
                </label>
              </label>
              <br />
              <label>
                שם לקוחה:
                <AutoComplete
                  value={email}
                  suggestions={filteredClients}
                  completeMethod={searchEmail}
                  onChange={(e) => setEmail(e.value)}
                  onSelect={(e) => handleClientSelect(e.value)}
                  field="email"
                  placeholder="הכניסי מייל של לקוחה"
                />
              </label>
              <button onClick={handleSaveEvent}>שמור</button>
              <button onClick={() => setShowModal(false)}>בטל</button>
            </div>
          </div>
        )}

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>פעולה נדרשת</h2>
              {!isDisablingTime && (
                <>
                  <button onClick={() => setShowModal(true)}>קביעת תור חדש</button>
                  <button onClick={handleDisableTime}>הפך ללא מאופשר</button>
                </>
              )}
              <button onClick={() => setShowModal(false)}>בטל</button>
            </div>
          </div>
        )}
      </div>
      {showSignUp && (
        <div className="modal">
          <div className="modal-content">
            <SignUp setUserData={() => setShowSignUp(false)} />
            <button onClick={() => setShowSignUp(false)}>סגור</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar1;