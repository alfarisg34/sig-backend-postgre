const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const path = require('path');
const logger = require('morgan');

const apiRoutes = require("./routes/index");

module.exports = async function (app) {
    
    app.use(cors())
    app.options('*', cors())

    app.use(helmet())

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (_req, res) => res.send('the server is run!'))
    app.use("/api", apiRoutes);

    // catch 404 and forward to error handler
    app.use(require('./middleware/catch404'));

    // error handler
    app.use(require('./middleware/errorHandler'));
}