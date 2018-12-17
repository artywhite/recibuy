const express = require('express');
const mongoose = require('mongoose');

const { wrap } = require('src/middleware');

const { UnitModel } = require('src/db/models');

const unitRouter = express.Router();

unitRouter.get('/', async (req, res) => {
  const { ids } = req.query;
  console.warn('units.get', ids);
  let units;

  if (ids) {
    const idsNormalized = Array.isArray(ids) ? ids : [ids];
    units = await UnitModel.find({
      _id: { $in: idsNormalized.map(i => mongoose.Types.ObjectId(i)) },
    });
  } else {
    units = await UnitModel.find();
  }

  res.send(units);
});

unitRouter.post(
  '/',
  wrap(async (req, res) => {
    const { name } = req.body;

    if (!name) {
      throw new Error(`Not all fields specified`);
    }

    const draftUnit = {
      name,
    };

    const newUnit = await UnitModel.create(draftUnit);

    res.send(newUnit);
  })
);

module.exports = unitRouter;
