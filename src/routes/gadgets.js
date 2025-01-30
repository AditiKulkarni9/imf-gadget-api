const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Gadget = require('../models/gadget');
const router = express.Router();

// GET all gadgets
router.get('/', async (req, res) => {
  try {
    const gadgets = await Gadget.findAll({
        attributes: ['id', 'name', 'codename', 'status', 'decommissionedAt', 'createdat', 'updatedat'] // Ensure brand is fetched
    });
    if (!gadgets) return res.status(404).json({ error: 'Gadget not found' });
    res.json(gadgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Add a gadget
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const gadget = await Gadget.create({ id: uuidv4(), name, codename: `Code-${uuidv4().slice(0, 8)}` });
    res.status(201).json(gadget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH: Update a gadget
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const gadget = await Gadget.findByPk(req.params.id);
    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });

    await gadget.update({ status });
    res.json(gadget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Decommission a gadget
router.delete('/:id', async (req, res) => {
  try {
    const gadget = await Gadget.findByPk(req.params.id);
    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });

    await gadget.update({ status: 'Decommissioned', decommissionedAt: new Date() });
    res.json({ message: 'Gadget decommissioned', gadget });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Trigger Self-Destruct Sequence
router.post('/:id/self-destruct', async (req, res) => {
    try {
      const gadget = await Gadget.findByPk(req.params.id);
      if (!gadget) return res.status(404).json({ error: 'Gadget not found' });
  
      
      const confirmationCode = Math.floor(100000 + Math.random() * 900000);
  
      await gadget.update({ status: 'Destroyed' });
  
      res.json({ message: 'Self-destruct sequence initiated', confirmationCode });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
