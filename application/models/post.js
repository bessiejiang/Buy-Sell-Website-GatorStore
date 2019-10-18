/**
 * If you modify something here, make sure to update the seeders folder and run:
 * ```
 * ./scripts/db reset
 * ./scripts/db seed
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
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      photo: DataTypes.TEXT,
      tag: DataTypes.TEXT,
      approval: {
        type: DataTypes.ENUM,
        values: ["pending", "approved", "rejected"]
      }
    },
    {}
  );

  Post.associate = function(models) {
    // Associations can be defined here
    // See https://sequelize.org/master/manual/associations.html

    // Add UserId to Post
    models.Post.belongsTo(models.User);

    // Add CategoryId to Post
    // models.Post.belongsTo(models.Category);
  };

  return Post;
};
