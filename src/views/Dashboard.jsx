import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserScheduleComponent from './dashboard/UserSchedule';
import UserReceiptComponent from './dashboard/UserReceipt';
import UserInvoiceComponent from './dashboard/UserInvoice';
import UserQuoteComponent from './dashboard/UserQuote';

function DashboardComponent() {
  return (
    <>
      <UserScheduleComponent />
      <UserReceiptComponent />
      <UserInvoiceComponent />
      <UserQuoteComponent />
    </>
  );
}

export default DashboardComponent;
