/**
 * If you modify something here, make sure to update the seeders folder and run:
 * ```
 * ./scripts/db reset
 * ```
 *
 * WARNING: That will remove all data from the database and replace it with only
 *          the data from the seeders folder!
 *
 * To create a new model, copy and change an existing one. Then make sure to add
 * it to the ../migrations/setup.js file.
 */

module.exports = (sequelize, DataTypes) => {
  // The name should always be singular (ie. Model not Models)
  // Available DataTypes: https://sequelize.org/master/manual/data-types.html
  const Item = sequelize.define(
    "Item",
    {
      title: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      photo: DataTypes.TEXT,
      tag: DataTypes.TEXT,
      approval: {
        type: DataTypes.ENUM,
        values: ["pending", "approved", "rejected"]
      },
      UserId:  DataTypes.INTEGER,
      CategoryId:  DataTypes.INTEGER,
    },
    {}
  );

  Item.associate = function(models) {
    // Associations can be defined here
    // See https://sequelize.org/master/manual/associations.html

    // Add UserId to Item
    models.Item.belongsTo(models.User);

    // Add CategoryId to Item
    models.Item.belongsTo(models.Category);
  };

  return Item;
};
