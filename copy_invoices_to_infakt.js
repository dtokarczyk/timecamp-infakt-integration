const _ = require("lodash");
const clc = require("cli-color");
const forAsync = require("for-async");

const getTCInvoices = require("./src/getTCInvoices");
const getIFInvoices = require("./src/getIFInvoices");
const getTCCompanies = require("./src/getTCCompanies");
const postIFInvoice = require("./src/postIFInvoice");
const checkAppArgs = require("./src/checkAppArgs");

const App = async () => {
  let dateArgs = checkAppArgs(process.argv);

  if (dateArgs.from !== null && dateArgs.to !== null) {
    let TCInv = await getTCInvoices({
      from: "2019-12-01",
      to: "2020-12-31"
    });

    let IFInv = await getIFInvoices({
      from: "2019-12-01",
      to: "2019-12-31"
    });

    let TCCompanies = await getTCCompanies();

    forAsync(TCInv, async (invoice, idx) => {
      let found = _.find(IFInv, o => o.notes === invoice.publicHash);
      let TCInvoiceId = `[TC_INV_ID: ${invoice.invoiceId}]`;

      if (_.isUndefined(found)) {
        let resp = await postIFInvoice(invoice, TCCompanies);
        if (resp.status !== 201) {
          console.log(
            clc.red(
              `${TCInvoiceId} During creating invoice got error: ${resp.statusText}`
            )
          );
        } else {
          console.log(
            clc.green(
              `${TCInvoiceId} Created invoice for customer ${invoice.clientId} (TimeCamp ID)`
            )
          );
        }
      } else {
        console.log(
          clc.yellow(
            `${TCInvoiceId} Invoice is exist in InFakt - ID Invoice ${found.number}`
          )
        );
      }
    });
  }
};

App();
