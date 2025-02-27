const Validator = require('validatorjs');

const { Router } = require('express');
const { Film, Studio } = require('../models');

const Controllers = Router()

Controllers.get('/', async (req, res) => {
  try {
    const { cursor, limit = 10 } = req.query;
    const queryOptions = {
      order: [['id', 'ASC']],
      limit: parseInt(limit, 10),
      where: {},
      include: Studio,
    };
    
    if (cursor) queryOptions.where.id = { [Film.sequelize.Op.gt]: cursor };

    const films = await Film.findAll(queryOptions);
    const nextCursor = films.length ? films[films.length - 1].id : null;

    res.status(200).json({ 
      data: films, nextCursor,
      hasNextPage: films.length === parseInt(limit, 10), 
      message: 'Get films Successfully' 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

Controllers.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id, { include: Studio });
    if (!film) return res.status(404).json({ message: 'Film not found', });

    res.status(200).json({
      data: film,       
      message: 'Get film Successfully' 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

Controllers.post('/', async (req, res) => {
  try {
    const { title, genre, release_date, studio_id } = req.body;

    const rules = {
      title: 'required|string|min:2|max:100',
      genre: 'string|min:3|max:50',
      release_date: 'date',
      studio_id: 'required|integer|min:1'
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }
    
    const studio = await Studio.findByPk(studio_id);
    if (!studio) return res.status(404).json({ message: 'Studio not found' });

    const film = await Film.create({ title, genre, release_date, studio_id });
    res.status(201).json({
      data: film,       
      message: 'Create film Successfully' 
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
      title: 'string|min:2|max:100',
      genre: 'string|min:3|max:50',
      release_date: 'date',
      studio_id: 'integer|min:1'
    };

    const validation = new Validator(updateData, rules);
    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }

    const film = await Film.findByPk(id);
    if (!film) return res.status(404).json({ message: 'Film not found' });

    await film.update(updateData, { fields: Object.keys(updateData) });
    res.status(200).json({ 
      message: 'Film updated successfully', 
      data: film 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

Controllers.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id);
    if (!film) return res.status(404).json({ message: 'Film not found' });

    await film.destroy();
    res.status(200).json({ message: 'Film deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = Controllers
