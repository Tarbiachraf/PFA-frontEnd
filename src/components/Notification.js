import React from 'react'

const getCurrentFormattedDate = () => {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const now = new Date();
  const dayName = weekdays[now.getDay()];
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  
  return `${dayName} ${hours}:${minutes}`;
}

const Notification = ({notification}) => {
    return (
        <div>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item">
                <i className="far fa-bell" /> {notification}
                <span className="float-right text-muted text-sm">{getCurrentFormattedDate()} mins</span>
            </a>
        </div>
    )
}

export default Notification;
