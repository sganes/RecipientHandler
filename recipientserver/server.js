const express = require('express');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const recipientsRoute = require('./routes/recipients');

const app = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.use('/api', recipientsRoute);

const port = 3080;

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});