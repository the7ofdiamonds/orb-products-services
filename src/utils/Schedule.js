export const combineDateTimeToTimestamp = (dateString, timeString) => {
    const date = new Date(dateString);
    const [hours, minutes] = timeString.split(':');
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return (date.getTime()) / 1000;
}

export const formattedDate = (start_date) => {
    const date = new Date(start_date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const formattedTime = (start_time) => {
    const [time, period] = start_time.split(' ');
    const [hours, minutes] = time.split(':');

    let formattedHours = parseInt(hours, 10);
    if (period === 'PM' && formattedHours !== 12) {
        formattedHours += 12;
    } else if (period === 'AM' && formattedHours === 12) {
        formattedHours = 0;
    }

    const formattedHoursString = String(formattedHours).padStart(2, '0');
    const formattedMinutesString = String(minutes).padStart(2, '0');

    return `${formattedHoursString}:${formattedMinutesString}:00`;
}

export const combineDateTime = (start_date, start_time) => {
    const date = formattedDate(start_date);
    const time = formattedTime(start_time);

    return `${date}T${time}`
}

export const formatTime = (time) => {
    const hr = time.split(':')[0];

    return new Date(0, 0, 0, hr, 0, 0, 0).toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
    });
}

export const formatOfficeHours = (office_hours) => {
    let officeHours = [];

    office_hours.map((day) => {
        let workDay = {};

        if (day.start === '' || day.end === '') {
            workDay = {
                'dayofweek': day.day,
                'start': day.start,
                'end': day.end
            };
        } else {
            workDay = {
                'dayofweek': day.day,
                'start': formatTime(day.start),
                'end': formatTime(day.end)
            };
        }

        officeHours.push(workDay);
    });

    return officeHours;
};

export const datesAvail = (events) => {
    return events.map((event) => {
        const dateTime = event.start;
        const date = dateTime.split('T')[0];
        const year = date.split('-')[0];
        const month = date.split('-')[1];
        const day = date.split('-')[2];
        const formatedDate = `${month}-${day}-${year}`;

        return new Date(formatedDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    });
};

export const timesAvail = (events, selectedIndex) => {
    const dateSelected = events[selectedIndex];
    const dateTime = dateSelected.start;
    const time = dateTime.split('T')[1];
    const start = time.split('-')[0];
    const endTime = time.split('-')[1];
    const startHour = parseInt(start, 10);
    const endHour =
        parseInt(endTime, 10) < 12
            ? parseInt(endTime, 10) + 12
            : parseInt(endTime, 10);

    const hours = [];

    for (let i = startHour; i <= endHour; i++) {
        hours.push(i);
    }

    return hours.map((hr) => {
        return new Date(0, 0, 0, hr, 0, 0, 0).toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
        });
    });
};