import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInvoice } from '../controllers/invoiceSlice.js';
import { getReceipt } from '../controllers/receiptSlice.js';

function ReceiptComponent() {
  const { id } = useParams();

  const {
    invoice_id,
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
    receipt_id,
    payment_date,
    payment_time,
    payment_amount,
    payment_method,
    balance,
  } = useSelector((state) => state.receipt);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvoice(id));
    dispatch(getReceipt(id));
  }, [dispatch, id]);

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
          <div className="tr">
            <div className="th">
              <h4>RECEIPT NUMBER</h4>
            </div>
            <div className="td">{receipt_id}1</div>
            <div className="th">
              <h4>PAYMENT METHOD</h4>
            </div>
            <div className="td">{payment_method}</div>
          </div>
          <div className="tr">
            <div className="th">
              <h4>INVOICE NUMBER</h4>
            </div>
            <div className="td">{invoice_id}</div>
          </div>
          <div className="tr">
            <div className="th" colSpan={2}>
              <h4>PAID BY</h4>
            </div>
          </div>
          <div className="tr client-details">
            <div className="td">
              {first_name} {last_name} O/B/O {company_name} {tax_id} US EIN 27-1234567
            </div>
          </div>
          <div className="tr address">
            <div className="td">{address_line_1}</div>
          </div>
          <div className="tr address">
            <div className="td">{address_line_2}</div>
          </div>
          <div className="tr address">
            <div className="td">{city}</div>
          </div>
          <div className="tr address">
            <div className="td">{state}</div>
          </div>
          <div className="tr address">
            <div className="td">{zipcode}</div>
          </div>
          <div className="tr">
            <div className="td">{phone}</div>
          </div>
          <div className="tr">
            <div className="td">{user_email}</div>
          </div>
          <div className="tr">
            <div className="th">
              <h4>PAYMENT DATE</h4>
            </div>
            <div className="td">
              {payment_date} @ {payment_time}
            </div>
          </div>
        </div>

        <div className="tbody">
          <div className="tr">
            <div className="th">
              <h4>NO.</h4>
            </div>
            <div className="th">
              <h4>DESCRIPTION</h4>
            </div>
            <div className="th">
              <h4>TOTAL</h4>
            </div>
          </div>
          {selections &&
            selections.length > 0 &&
            selections.map((selection) => (
              <div className="tr">
                <div className="td">{selection.id}</div>
                <div className="td">{selection.description}</div>
                <div className="td">
                  {new Intl.NumberFormat('us', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(selection.cost)}
                </div>
              </div>
            ))}
        </div>

        <div className="tfoot">
          <div className="tr">
            <div className="th">
              <h4>SUBTOTAL</h4>
            </div>
            <div className="subtotal">
              <h4>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(subtotal)}
              </h4>
            </div>
          </div>
          <div className="tr">
            <div className="th">
              <h4>TAX</h4>
            </div>
            <div className="td">
              <h4>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(tax)}
              </h4>
            </div>
          </div>
          <div className="tr">
            <div className="th">
              <h4>GRAND TOTAL</h4>
            </div>
            <div className="th grand-total">
              <h4>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(grand_total)}
              </h4>
            </div>
            <div className="th">
              <h4>AMOUNT PAID</h4>
            </div>
            <div className="th amount-paid">
              <h4>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(payment_amount)}
              </h4>
            </div>
          </div>
          <div className="tr">
            <div className="th">
              <h4>BALANCE</h4>
            </div>
            <div className="th balance">
              <h4>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(balance)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceiptComponent;
