const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)


const app = express();

app.use(express.json());
app.use(routes);


app.listen(process.env.PORT || 3333);
