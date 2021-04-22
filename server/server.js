require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/Routes');

app.use(cors());
app.use(express.json());

//ROUTES
 
app.use('/', routes);

const port = process.env.PORT || 5001

 app.listen(port, () => {
     console.log(`server is running on port ${port}`);
 });


 