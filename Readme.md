# InFakt - TimeCamp Integration

This app is a simple tool to copy invoices from TimeCamp (invoices module) to InFakt App.

## Installation and running

1. Create `constants.js` from template `constants.tpl.js` and add your secret tokens.

```sh
$ cp constant.tpl.js constans.js
```

2. Install dependencies and run `copy_invoices_to_infakt` with range date parameters `from` and `to`

```sh
$ npm install
$ npm run copy_invoices_to_infakt from=YYYY-MM-DD to=YYYY-MM-DD
```

## Todos

- Multicurrency
- Integration with customers
- Exporting/Importing statuses

## License

MIT
