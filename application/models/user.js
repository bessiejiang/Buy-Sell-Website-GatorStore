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
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      role: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {}
  );

  User.associate = function(models) {
    // Associations can be defined here
    // See https://sequelize.org/master/manual/associations.html
  };

  return User;
};
