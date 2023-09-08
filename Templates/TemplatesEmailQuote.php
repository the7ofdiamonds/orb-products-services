<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <section>
        <h2 className="title">QUOTE</h2>
        <div className="invoice-card card">
            <table className="invoice-table" id="service_invoice">
                <thead className="invoice-table-head" id="service-total-header">
                    <tr>
                        <th className="bill-to-label" colSpan={2}>
                            <h4>BILL TO:</h4>
                        </th>
                        <td className="bill-to-name" colSpan={2}>
                            {CUSTOMER_NAME}
                        </td>
                        {Array.isArray(customer_tax_ids) &&
                        customer_tax_ids.length > 0 &&
                        customer_tax_ids.map((tax, index) => (
                        <>
                            <td className="bill-to-tax-id-type" key={index}>
                                {tax.type}
                            </td>
                            <td className="bill-to-tax-id" key={index}>
                                {tax.value}
                            </td>
                        </>
                        ))}
                    </tr>
                    <tr className="bill-to-address">
                        <td></td>
                        <td></td>
                        <td colSpan={2}>{address_line_1}</td>
                        <td>{address_line_2}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td className="bill-to-city">{city}</td>
                        <td className="bill-to-state">{state}</td>
                        <td className="bill-to-zipcode">{postal_code}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td className="bill-to-phone">{customer_phone}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td className="bill-to-email" colSpan={2}>
                            {CUSTOMER_EMAIL}
                        </td>
                        <td></td>
                    </tr>
                    <tr className="bill-to-due">
                        <th className="bill-to-due-date-label" colSpan={2}>
                            <h4>DUE DATE</h4>
                        </th>
                        <td className="bill-to-due-date" colSpan={2}>
                            {dueDate ? dueDate : 'N/A'}
                        </td>
                        <th className="bill-to-total-due-label">
                            <h4>TOTAL DUE</h4>
                        </th>
                        <td className="bill-to-total-due">
                            <h4>
                                {amount_due
                                ? new Intl.NumberFormat('us', {
                                style: 'currency',
                                currency: 'USD',
                                }).format(amountDue)
                                : 'N/A'}
                            </h4>
                        </td>
                    </tr>
                    <tr className="invoice-labels">
                        <th>
                            <h4 className="number-label">NO.</h4>
                        </th>
                        <th colSpan={4}>
                            <h4 className="description-label">DESCRIPTION</h4>
                        </th>
                        <th>
                            <h4 className="total-label">TOTAL</h4>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {items &&
                    items.length > 0 &&
                    items.map((item) => (
                    <tr id="quote_option">
                        <td className="feature-id">{item.price.product}</td>
                        <td className="feature-name" id="feature_name" colSpan={4}>
                            {item.description}
                        </td>
                        <td className="feature-cost  table-number" id="feature_cost">
                            <h4>
                                {new Intl.NumberFormat('us', {
                                style: 'currency',
                                currency: 'USD',
                                }).format(item.amount / 100)}
                            </h4>
                        </td>
                    </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th>
                            <h4 className="subtotal-label">SUBTOTAL</h4>
                        </th>
                        <td>
                            <h4 className="subtotal table-number">
                                {new Intl.NumberFormat('us', {
                                style: 'currency',
                                currency: 'USD',
                                }).format(subTotal)}
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th>
                            <h4 className="tax-label">TAX</h4>
                        </th>
                        <td>
                            <h4 className="tax table-number">
                                {new Intl.NumberFormat('us', {
                                style: 'currency',
                                currency: 'USD',
                                }).format(Tax)}
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th>
                            <h4 className="grand-total-label">GRAND TOTAL</h4>
                        </th>
                        <th>
                            <h4 className="grand-total table-number">
                                {new Intl.NumberFormat('us', {
                                style: 'currency',
                                currency: 'USD',
                                }).format(grandTotal)}
                            </h4>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>

    </section>
</body>

</html>