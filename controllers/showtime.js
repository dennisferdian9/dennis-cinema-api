const { Router } = require('express');
const validator = require('validatorjs');

const { Showtime, Film } = require('../models');

const Controllers = Router()

Controllers.get('/', async (req, res) => {
  try {
    const { cursor, limit = 10 } = req.query;
    const queryOptions = {
      order: [['id', 'ASC']],
      limit: parseInt(limit, 10),
      where: {},
      include: Film,
    };
    if (cursor) queryOptions.where.id = { [Showtime.sequelize.Op.gt]: cursor };

    const showtimes = await Showtime.findAll(queryOptions);
    const nextCursor = showtimes.length ? showtimes[showtimes.length - 1].id : null;
    
    res.status(200).json({ 
      data: showtimes, 
      nextCursor, 
      hasNextPage: showtimes.length === parseInt(limit, 10),
      message: 'Get Showtimes Successfully' 
     });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

Controllers.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findByPk(id, { include: Film });
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });

    res.status(200).json({
        data: showtime,       
        message: 'Get Showtime Successfully' 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

Controllers.post('/', async (req, res) => {
  try {
    const { film_id, start_time, end_time } = req.body;
    const rules = {
      film_id: 'required|integer|min:1',
      start_time: 'required|date',
      end_time: 'date'
    };

    const validation = new validator(req.body, rules);
    if (validation.fails()) return res.status(400).json({ errors: validation.errors.all() });

    const film = await Film.findByPk(film_id);
    if (!film) return res.status(404).json({ message: 'Film not found' });

    const showtime = await Showtime.create({ film_id, start_time, end_time });
    res.status(201).json({
      data: showtime,       
      message: 'Create Showtime Successfully' 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

Controllers.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const rules = {
      film_id: 'integer|min:1',
      start_time: 'date',
      end_time: 'date'
    };

    const validation = new validator(updateData, rules);
    if (validation.fails()) return res.status(400).json({ errors: validation.errors.all() });


    const showtime = await Showtime.findByPk(id);
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });

    await showtime.update(updateData, { fields: Object.keys(updateData) });
    res.status(200).json({ 
      message: 'Showtime updated successfully', 
      data: showtime 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

Controllers.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findByPk(id);
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });

    await showtime.destroy();
    res.status(200).json({ message: 'Showtime deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = Controllers
