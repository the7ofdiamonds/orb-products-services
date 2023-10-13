import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserScheduleComponent from './dashboard/UserSchedule';

function DashboardComponent() {
  return (
    <>
      <UserScheduleComponent />
      
    </>
  );
}

export default DashboardComponent;
