const moment = require("moment");
const clc = require("cli-color");

module.exports = args => {
  let myargs = args.slice(2);
  myargs = myargs.filter(item => item.includes("from") || item.includes("to"));
  let dates = {
    from: null,
    to: null
  };
  for (let myarg of myargs) {
    let foo = myarg.split("=");
    if (moment(foo[1]).isValid()) {
      dates[foo[0]] = foo[1];
    } else {
      console.log(
        clc.red(
          `[Error] Param is not valid! Require parameter '${foo[0]}' must be date format YYYY-MM-DD.`
        )
      );
    }
  }

  return dates;
};
