import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReceipt } from '../controllers/receiptSlice.js';

function ReceiptComponent() {
  const { id } = useParams();

  const { loading, error, receipt } = useSelector((state) => state.receipt);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getReceipt(id));
  }, [dispatch]);

  // const navigate = useNavigate();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="receipt" id="receipt">
      <div className="receipt-card card">
        <table className="receipt-table" id="service_receipt">
          {receipt && (
            <>
              <thead className="receipt-table-head" id="service-total-header">
                <tr>
                  <th className="paid-by-label" colSpan={'2'}>
                    <h4>PAID BY:</h4>
                  </th>
                  <td className="paid-by-name" colSpan={'4'}>
                    {receipt.name}
                  </td>
                </tr>
                <tr className="paid-by-address">
                  <td></td>
                  <td></td>
                  <td colSpan={'3'}>{receipt.street_address}</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td className="paid-by-city">{receipt.city}</td>
                  <td className="paid-by-state">{receipt.state}</td>
                  <td className="paid-by-zipcode">{receipt.zipcode}</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td className="paid-by-phone" colSpan={'2'}>
                    {receipt.phone}
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td className="paid-by-email" colSpan={'2'}>
                    {receipt.email}
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th className="paid-by-paid-label" colSpan={'2'}>
                    <h4>PAID ON</h4>
                  </th>
                  <td className="paid-by-date" colSpan={'2'}>
                    {receipt.start_date} @ {receipt.start_time}
                  </td>
                  <th className="paid-by-amount-label">
                    <h4>AMOUNT</h4>
                  </th>
                  <th className="paid-by-amount">
                    <h4>{receipt.payment_amount}</h4>
                  </th>
                </tr>
                <tr>
                  <th className="invoice-item-number-label">
                    <h4>NO.</h4>
                  </th>
                  <th className="invoice-item-description-label" colSpan={'4'}>
                    <h4>DESCRIPTION</h4>
                  </th>
                  <th className="invoice-item-total-label">
                    <h4>TOTAL</h4>
                  </th>
                </tr>
              </thead>

              <tbody className="invoice-table-body">
                <tr id="quote_option">
                  <td className="feature-id">1</td>
                  <td className="feature-name" id="feature_name" colSpan={'4'}>
                    Theme
                  </td>
                  <td className="feature-cost  table-number" id="feature_cost">
                    <h4>$40.00</h4>
                  </td>
                </tr>
              </tbody>

              <tfoot className="invoice-table-footer">
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th className="subtotal-label">
                    <h4>SUBTOTAL</h4>
                  </th>
                  <td className="subtotal table-number">
                    <h4>{receipt.subtotal}</h4>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th className="tax-label">
                    <h4>TAX</h4>
                  </th>
                  <td className="tax table-number">
                    <h4>{receipt.tax}</h4>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th className="grand-total-label">
                    <h4>GRAND TOTAL</h4>
                  </th>
                  <td className="grand-total table-number">
                    <h4>{receipt.grand_total}</h4>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th className="amount-paid-label">
                    <h4>AMOUNT PAID</h4>
                  </th>
                  <td className="amount-paid table-number">
                    <h4>{receipt.payment_amount}</h4>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th className="balance-label">
                    <h4>BALANCE</h4>
                  </th>
                  <th className="balance table-number">
                    <h4>{receipt.balance}</h4>
                  </th>
                </tr>
              </tfoot>
            </>
          )}
        </table>
      </div>
    </div>
  );
}

export default ReceiptComponent;
