import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInvoice } from '../controllers/invoiceSlice.js';
import { getReceipt } from '../controllers/receiptSlice.js';

function ReceiptComponent() {
  const { id } = useParams();

  const {
    tax_id,
    company_name,
    first_name,
    last_name,
    address_line_1,
    address_line_2,
    city,
    state,
    zipcode,
    phone,
    user_email,
    selections,
    subtotal,
    tax,
    grand_total,
  } = useSelector((state) => state.invoice);
  const {
    loading,
    error,
    invoice_id,
    payment_date,
    amount_paid,
    card,
    last4,
    balance,
  } = useSelector((state) => state.receipt);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReceipt(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getInvoice(invoice_id));
  }, [dispatch, invoice_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="title">RECEIPT</h2>
      <div className="receipt-card card">
        <div className="thead">
          <div className="tr receipt-number">
            <div className="th">
              <h4>RECEIPT NUMBER</h4>
            </div>
            <div className="td">
              <h5>{id}</h5>
            </div>
          </div>
          <div className="tr payment-date">
            <div className="th">
              <h4>PAYMENT DATE</h4>
            </div>
            <div className="td">
              <h5>
                {payment_date}
              </h5>
            </div>
          </div>
          <div className="tr payment-method">
            <div className="th">
              <h4>PAYMENT METHOD</h4>
            </div>
            <div className="td">
              <h5>{card} {last4}</h5>
            </div>
          </div>
          <div className="tr client-details">
            <div className="th">
              <h4>PAID BY</h4>
            </div>
            <div className="td">
              <h5>
                {first_name} {last_name} O/B/O {company_name} {tax_id} US EIN
                27-1234567
              </h5>
            </div>
            <div className="tr address-line-1">
              <div className="td">
                <h5>{address_line_1}</h5>
              </div>
              <div className="td">
                <h5>{address_line_2}</h5>
              </div>
            </div>
            <div className="tr address-line-2">
              <div className="td">
                <h5>{city}</h5>
              </div>
              <div className="td">
                <h5>{state}</h5>
              </div>
              <div className="td">
                <h5>{zipcode}</h5>
              </div>
            </div>
            <div className="tr phone">
              <div className="td">
                <h5>{phone}</h5>
              </div>
            </div>
            <div className="tr email">
              <div className="td">
                <h5>{user_email}</h5>
              </div>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <th>
              <h4>NO.</h4>
            </th>
            <th>
              <h4>DESCRIPTION</h4>
            </th>
            <th>
              <h4>TOTAL</h4>
            </th>
          </thead>
          <tbody>
            {selections &&
              selections.length > 0 &&
              selections.map((selection) => (
                <tr>
                  <td>
                    <h5>{selection.id}</h5>
                  </td>
                  <td>
                    <h5>{selection.description}</h5>
                  </td>
                  <td className="selections-cost">
                    <h5>
                      {new Intl.NumberFormat('us', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(selection.cost)}
                    </h5>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="tfoot">
          <div className="tr subtotal">
            <div className="th subtotal-label">
              <h4>SUBTOTAL</h4>
            </div>
            <div className="td subtotal-number">
              <h5>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(subtotal)}
              </h5>
            </div>
          </div>
          <div className="tr tax">
            <div className="th tax-label">
              <h4>TAX</h4>
            </div>
            <div className="td tax-number">
              <h5>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(tax)}
              </h5>
            </div>
          </div>
          <div className="tr grand-total">
            <div className="th grand-total-label">
              <h4>GRAND TOTAL</h4>
            </div>
            <div className="td grand-total-number">
              <h5>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(grand_total)}
              </h5>
            </div>
          </div>
          <div className="tr amount-paid">
            <div className="th amount-paid-label">
              <h4>AMOUNT PAID</h4>
            </div>
            <div className="td amount-paid-number">
              <h5>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(amount_paid)}
              </h5>
            </div>
          </div>
          <div className="tr balance">
            <div className="th balance-label">
              <h4>BALANCE</h4>
            </div>
            <div className="td balance-number">
              <h5>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(balance)}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceiptComponent;
