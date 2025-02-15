const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Gadget = require('../models/gadget');
const router = express.Router();

//func for generating random success probability
const generateMissionSuccessProbability = () => {
  return Math.floor(Math.random() * 51) + 50; 
};

// GET all gadgets
router.get('/', async (req, res) => {
  try {
    const { status } = req.query; // Get the status from the query parameters

        let whereClause = {};
        if (status) {
            whereClause.status = status; // Apply filter if status 
        }
    const gadgets = await Gadget.findAll({
        where: whereClause,
        attributes: ['id', 'name', 'codename', 'status', 'decommissionedAt', 'createdAt', 'updatedAt'] 
    });
    if (!gadgets) return res.status(404).json({ error: 'Gadget not found' });

    const modifiedGadgets = gadgets.map(gadget => ({
      ...gadget.toJSON(),
      missionSuccessProbability: `${generateMissionSuccessProbability()}% success probability`
  }));
    res.json(modifiedGadgets);
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
