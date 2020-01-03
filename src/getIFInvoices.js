const fetch = require("node-fetch");
const c = require("../constants");
const _ = require("lodash");
const moment = require("moment");
const clc = require("cli-color");

module.exports = async date => {
  try {
    let from = moment(date.from, "YYYY-MM-DD");
    let to = moment(date.to, "YYYY-MM-DD");

    if (!_.isUndefined(date) && from.isValid() && to.isValid()) {
      let body = await fetch(
        `${c.api.infakt.endpoint}/invoices.json?offset=0&limit=100&fields=notes,number,client_company_name,invoice_date&q[invoice_date_gteq]=${date.from}&q[invoice_date_lteq]=${date.to}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "X-inFakt-ApiKey": c.api.infakt.token
          }
        }
      );
      body = await body.json();

      return _.values(body.entities);
    } else {
      console.log(clc.red("Param `date` cannot be empty or is invalid!"));
      return null;
    }
  } catch (e) {
    console.error(clc.red(e.message));
  }
};
