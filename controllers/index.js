const { Router } = require('express');

const Controllers = Router()
const filmControllers = require('./film')
const studioControllers = require('./studio')
const showtimeControllers = require('./showtime')
const ticketControllers = require('./ticket')

Controllers.get('/ping', (req, res) => {
  res.json({
    code: 200,
    message: 'Pong',
    data: null,
    errors: null,
  })
})

Controllers.use('/film', filmControllers);
Controllers.use('/studio', studioControllers);
Controllers.use('/ticket', ticketControllers);
Controllers.use('/showtime', showtimeControllers);



exports.Controllers = Controllers
