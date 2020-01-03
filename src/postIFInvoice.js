const fetch = require("node-fetch");
const c = require("../constants");
const _ = require("lodash");
const moment = require("moment");

module.exports = async (invoice, companies) => {
  let company = _.find(companies, o => invoice.clientId === o.clientId);
  let companyName;
  _.isUndefined(company)
    ? (companyName = "unknow")
    : (companyName = company.organizationName);

  let dueDate = moment(invoice.dueDate);
  let issueDate = moment(invoice.issueDate);

  let services = [];

  services = invoice.entries.map(item => ({
    name: `${item.name}`,
    tax_symbol: "23",
    quantity: item.quantity,
    unit_net_price: item.unitCost * 100,
    net_price: 12300
  }));

  let req = await fetch(`${c.api.infakt.endpoint}/invoices.json`, {
    method: "post",
    body: JSON.stringify({
      invoice: {
        invoice_date: invoice.issueDate,
        sale_date: invoice.issueDate,
        payment_date: dueDate.isValid()
          ? invoice.dueDate
          : issueDate.add(15, "days").format("YYYY-MM-DD"),

        notes: invoice.publicHash,

        client_company_name: companyName,
        services: services
      }
    }),
    headers: {
      "Content-Type": "application/json",
      "X-inFakt-ApiKey": c.api.infakt.token
    }
  });

  return req;
};
