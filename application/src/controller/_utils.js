exports = module.exports = {
  toJSON(item) {
    if (Array.isArray(item)) {
      return item.map(exports.toJSON);
    }

    return item && item.get({ plain: true });
  }
};
