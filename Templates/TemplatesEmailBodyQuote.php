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
                        <td className="bill-to-tax-id-type" key={index}>
                            {TAX_TYPE}
                        </td>
                        <td className="bill-to-tax-id" key={index}>
                            {TAX_ID}
                        </td>
                    </tr>
                    <tr className="bill-to-address">
                        <td></td>
                        <td></td>
                        <td colSpan={2}>{ADDRESS_LINE_1}</td>
                        <td>{ADDRESS_LINE_1}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td className="bill-to-city">{CITY}</td>
                        <td className="bill-to-state">{STATE}</td>
                        <td className="bill-to-zipcode">{POSTAL_CODE}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td className="bill-to-phone">{CUSTOMER_PHONE}</td>
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
                            {DUE_DATE}
                        </td>
                        <th className="bill-to-total-due-label">
                            <h4>TOTAL DUE</h4>
                        </th>
                        <td className="bill-to-total-due">
                            <h4>
                                {TOTAL_DUE}
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
                    <tr id="quote_option">
                        <td className="feature-id">{ITEM_ID}</td>
                        <td className="feature-name" id="feature_name" colSpan={4}>
                            {ITEM_NAME}
                        </td>
                        <td className="feature-cost  table-number" id="feature_cost">
                            <h4>
                                {ITEM_PRICE}
                            </h4>
                        </td>
                    </tr>
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
                                {SUBTOTAL}
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
                                {TAX}
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
                                {GRAND_TOTAL}
                            </h4>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>