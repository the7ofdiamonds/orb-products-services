export const combineDateTimeToTimestamp = (dateString, timeString) => {
    try {
        const date = new Date(dateString);
        const [hours, minutes] = timeString.split(':');
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date or time format');
        }
        return Math.floor(date.getTime() / 1000);
    } catch (error) {
        console.error('Error in combineDateTimeToTimestamp:', error.message);
        return null;
    }
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
    const availableDates = [];

    for (const key in events) {
        if (events.hasOwnProperty(key)) {
            const [year, month, day] = key.split('-');
            const date = new Date(year, month - 1, day);
            const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
            const formattedDate = date.toLocaleDateString(undefined, options);

            availableDates.push(formattedDate);
        }
    }

    return availableDates;
};

function formatDate(inputDate) {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function addHoursToTime(dateTime, hoursToAdd) {
    const parsedTime = new Date(dateTime);
    parsedTime.setHours(parsedTime.getHours() + hoursToAdd);

    const resultTime = parsedTime.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
    });

    return resultTime;
}

export const timesAvail = (events, key) => {
    const date = formatDate(key);
    const value = events[date];

    const hours = [];

    if (value && value.length > 0) {
        value.forEach((element) => {
            const startHr = element['start'].split(':')[0];
            const endHr = element['end'].split(':')[0];
            const dateTime = `${date}T${element['start']}`;
            let j = parseInt(endHr, 10) - parseInt(startHr, 10);

            if (value.length > 1) {
                for (let i = 0; i < j; ++i) {
                    hours.push(addHoursToTime(`${date}T${element['start']}`, i));
                }
            } else {
                for (let i = 0; i < j; ++i) {
                    hours.push(addHoursToTime(dateTime, i));
                }
            }
        });
    } else {
        console.log('No events found for the given date.');
        return [];
    }

    return hours;
};