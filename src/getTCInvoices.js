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
        `${c.api.timecamp.endpoint}/invoice/api_token/${c.api.timecamp.token}/format/json`
      );
      body = await body.json();
      body = _.values(body);

      body = body.filter(item => {
        return moment(item.issueDate).isBetween(from, to, null, []);
      });

      return body;
    } else {
      console.log(clc.red("Param `date` cannot be empty or is invalid!"));
      return null;
    }
  } catch (e) {
    console.log(clc.red(e.message));
  }
};
