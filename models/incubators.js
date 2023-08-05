'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Incubators extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Incubators.hasMany(models.StartUps)
    }
  }
  Incubators.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    location: DataTypes.STRING,
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Incubators',
    hooks: {
      beforeCreate: (Incubators) => {
        const value = {
          International: "1992-A",
          National: "1994-B",
          Province: "1996-C",
        } // gk usah pake percondisian karna beda jadi gk bakal ketemu
          const date = new Date().getTime()
          let code = value[Incubators.level] + "-" + date
          Incubators.code = code
      },
    }
  });
  return Incubators;
};