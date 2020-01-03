const fetch = require("node-fetch");
const c = require("../constants");
const _ = require("lodash");
const clc = require("cli-color");

module.exports = async () => {
  try {
    let body = await fetch(
      `${c.api.timecamp.endpoint}/client/api_token/${c.api.timecamp.token}/format/json`
    );
    body = await body.json();
    body = _.values(body);
    return body;
  } catch (e) {
    console.log(clc.red(e.message));
  }
};
