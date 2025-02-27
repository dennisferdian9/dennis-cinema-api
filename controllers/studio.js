const { Router } = require('express');
const Validator = require('validatorjs');

const { Studio } = require('../models');
const Controllers = Router()

Controllers.get('/', async (req, res) => {
  try {
    const { cursor, limit = 10 } = req.query;

    const queryOptions = {
      order: [['id', 'ASC']],
      limit: parseInt(limit, 10),
      where: {},
    };
    if (cursor) {
      queryOptions.where.id = { [Studio.sequelize.Op.gt]: cursor };
    }

    const studios = await Studio.findAll(queryOptions);
    const nextCursor = studios.length >= limit ? studios[studios.length - 1].id : null;

    res.status(200).json({
      data: studios,
      nextCursor,
      hasNextPage: studios.length === parseInt(limit, 10),
      message: 'get Studios successfully'
    });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

Controllers.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const studio = await Studio.findByPk(id);

    res.status(200).json({
      data: studio,
      message: 'get Studio successfully'
    });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

Controllers.post('/', async (req, res) => {
  try {
    const { name, location } = req.body;
    const rules = {
      name: 'string|min:2|max:100',
      location: 'string|min:2|max:255'
    };

    // Validate only provided fields
    const validation = new Validator(updateData, rules);
    if (validation.fails()) return res.status(400).json({ errors: validation.errors.all() });

    const studio = await Studio.create({ name, location });
    res.status(201).json({
      data: studio,
      message: 'Create Studio successfully'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

Controllers.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const rules = {
      name: 'string|min:2|max:100',
      location: 'string|min:2|max:255'
    };

    const validation = new Validator(updateData, rules);
    if (validation.fails()) return res.status(400).json({ errors: validation.errors.all() });

    const studio = await Studio.findByPk(id);

    if (!studio) {
      res.status(404).json({ message: 'studio not found' });
    }

    await studio.update(updateData, { fields: Object.keys(updateData) });

    res.status(200).json({
      data: studio,
      message: 'Studio update successfully'
    });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

Controllers.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const studio = await Studio.findByPk(id);

    if (!studio) {
      res.status(404).json({ message: 'studio not found' });
    }

    await studio.destroy()

    res.status(200).json({
      message: 'Studio deleted successfully'
    });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = Controllers
