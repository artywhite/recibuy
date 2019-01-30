const mongoose = require('mongoose');

const { unitSchema } = require('../schemes');

unitSchema.statics.createOrGetExisted = async function(params) {
  const existed = await this.findOne(params);
  if (existed) {
    return existed;
  }

  return await this.create(params);
};

// Note: this should be after all enchances in schema (last line in this file among with exports)
const UnitModel = mongoose.model('Unit', unitSchema);

module.exports = UnitModel;
