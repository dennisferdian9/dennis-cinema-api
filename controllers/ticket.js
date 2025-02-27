const { Router } = require('express');
const Validator = require('validatorjs');

const Controllers = Router()
const { Ticket, Showtime } = require('../models');

Controllers.get('/', async (req, res) => {
  try {
    const { cursor, limit = 10 } = req.query;
    const queryOptions = {
      order: [['id', 'ASC']],
      limit: parseInt(limit, 10),
      where: {},
      include: Showtime,
    };
    if (cursor) queryOptions.where.id = { [Ticket.sequelize.Op.gt]: cursor };

    const tickets = await Ticket.findAll(queryOptions);
    const nextCursor = tickets.length ? tickets[tickets.length - 1].id : null;

    res.status(200).json({ 
      data: tickets, 
      nextCursor, 
      hasNextPage: tickets.length === parseInt(limit, 10),
      message: 'get tickets successfully'
     });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

Controllers.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id, { include: Showtime });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json({
      data: ticket,
      message: 'get ticket successfully'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

Controllers.post('/', async (req, res) => {
  try {
    const { showtime_id, seat_number, price } = req.body;

    const rules = {
      showtime_id: 'required|integer|min:1',
      seat_number: 'required|string|min:1|max:10',
      price: 'required|numeric|min:0'
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) return res.status(400).json({ errors: validation.errors.all() });

    const showtime = await Showtime.findByPk(showtime_id);
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });

    const ticket = await Ticket.create({ showtime_id, seat_number, price });
    res.status(201).json({
      data: ticket,
      message: 'Create ticket successfully'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

Controllers.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData  = req.body;

    const rules = {
      showtime_id: 'integer|min:1',
      seat_number: 'string|min:1|max:10',
      price: 'numeric|min:0'
    };

    const validation = new Validator(updateData, rules);
    if (validation.fails()) return res.status(400).json({ errors: validation.errors.all() });

    const ticket = await Ticket.findByPk(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    await ticket.update(updateData, { fields: Object.keys(updateData) });
    res.status(200).json({ 
      message: 'Ticket updated successfully', 
      data: ticket 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// Delete Ticket
Controllers.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    await ticket.destroy();
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = Controllers
