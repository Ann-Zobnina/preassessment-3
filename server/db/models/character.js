const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Character.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      alive: DataTypes.BOOLEAN,
      type: DataTypes.STRING,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Character',
    },
  );
  return Character;
};
