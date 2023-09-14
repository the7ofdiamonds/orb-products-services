<tbody>
  <table width="100%">
    <thead>
      <tr>
        <td style="text-align: center;">
          <h2 className="title">{BILLING_TYPE}</h2>
        </td>
      </tr>
    </thead>
    <tbody>
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
            <td>{ADDRESS_LINE_2}</td>
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
                {AMOUNT_DUE}
              </h4>
            </td>
          </tr>
        </thead>