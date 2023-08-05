const express = require("express");
const app = express();
const port = 3000;
const Router = require('./routers/routers')

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use('/', Router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });