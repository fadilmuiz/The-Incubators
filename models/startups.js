'use strict';
const customAge = require('../helpers/age')

const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StartUps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StartUps.belongsTo(models.Incubators)
    }

    static getStartUpByRoleOfFounder (roleOfFounder) {
      return this.findAll({
        include : [{
          model : sequelize.models.Incubators // gua pindahin ke dari controller ke sini
        }],
        where : {
          roleOfFounder : { [Op.iLike]: `%${roleOfFounder}%` }
        }
      }) 
    }

    get formatedDate(){
      let objectDate = new Date(this.dateFound);
      return objectDate.toISOString().split('T')[0]
    }

    get age() {
      const currentDate = new Date();
      const startUpDate = new Date(this.dateFound);
      const ageInMilliseconds = currentDate - startUpDate;
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
      return Math.floor(ageInYears);
    }

  }
  StartUps.init({
    startUpName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : true,
        notNull : true
      }
    },
    founderName: 
    {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : true,
        notNull : true
      }},
    dateFound: {
      type:DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty : true,
        notNull : true,
        currentAge(value) {
          if (customAge (value) < 5) {
            throw ('Startup age must be over 5 years')
          }
        }
      }
    },
    educationOfFounder:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : true,
        notNull : true
      }},
    roleOfFounder:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : true,
        notNull : true
      }},
    IncubatorId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty : true,
        notNull : true
      }},
    valuation: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : true,
        notNull : true
      }},
  }, {
    sequelize,
    modelName: 'StartUps',
    validate: {
      checkRole() {
        if ((this.roleOfFounder === 'Hustler') !== (this.educationOfFounder === 'S2') || (this.educationOfFounder === 'S3') ) {
          throw ('The role of Founder Hustler can only be occupied by founders with a minimum education of S2!');
        }
      }
    }
  });
  return StartUps;
};