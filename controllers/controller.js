const { Incubators, StartUps } = require('../models');
const customAge = require('../helpers/age')
const rupiah = require('../helpers/money');
const { Op } = require('sequelize');
const startups = require('../models/startups');



class Controller {
    static readIncubator(req, res) {
        Incubators.findAll()
        .then(data => {
            res.render("readIncubator", {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addIncubator(req, res) {
        res.render("addFormIncubator")
    }

    static postIncubator (req, res) {
        const { name, location, level } = req.body
        // console.log(req.body);
        Incubators.create({ name, location, level })
        .then(data => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static detailIncubator (req, res) {
        const id = req.params.incubatorId;
        const { deleted } = req.query

        Incubators.findByPk(id, {
            include: [
                {model : StartUps}
            ]
        })
        .then(data => {
            res.render('incubatorDetail', {data, customAge, rupiah, deleted})
            // console.log(" satu",data.dataValues.StartUps);
            // console.log(" dua",data.dataValues.StartUps);
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addStartUp (req, res) {
        const id = req.params.incubatorId;
        const { errors } = req.query

        Incubators.findByPk(id, {
            include: [
                {model: StartUps}
            ]
        })
        .then(data => {
            res.render('formStartUp', {data , errors})
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }

    static postStartUp (req, res) {
        const id = req.params.incubatorId;
        const { startUpName, founderName, dateFound, educationOfFounder, roleOfFounder, valuation } = req.body

        StartUps.create({ startUpName, founderName, dateFound, educationOfFounder, roleOfFounder, valuation ,IncubatorId : id})

        .then(data => {
            res.redirect('/incubators/' + id)
        })
        .catch(err => {
            if(err.name === 'SequelizeValidationError') {
                let temp = err.errors.map(el => el.message)
                // res.send(temp)
                res.redirect(`/incubators/${id}/startUp/add?errors=${temp}`)
            }else {
                res.send(err)
            }
        })
    }

    static editStartUp (req, res) {
        const { startUpId } = req.params;
        // console.log(req.params);
        
        StartUps.findOne({
            where: {
                id : startUpId
            },
            include: [
                {model: Incubators }
            ]
        })
        .then(data => {
            // res.send(data)
            res.render('formEditStartUp', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static postEditStartUp(req, res) {
        const { incubatorId, startUpId } = req.params;
        const { startUpName, founderName, dateFound, educationOfFounder, roleOfFounder, valuation } = req.body

        StartUps.update({ 
            startUpName, 
            founderName, 
            dateFound, 
            educationOfFounder, 
            roleOfFounder, 
            valuation ,
            IncubatorId : incubatorId }, {
                where : {
                    id : startUpId
                },
                include: [
                    {model: Incubators }
                ]
        })
        .then(data => {
            res.redirect('/incubators/' + incubatorId)
        })
        .catch(err => {
            res.send (err)
        })
    }

    static deleteStartUp (req, res) {
        const { incubatorId, startUpId } = req.params;
        let deleted

        StartUps.findByPk(startUpId)
        .then(data => {
            deleted = `${data.startUpName} with ${data.founderName}`
            return StartUps.destroy({
                where : {
                    id : startUpId
                }
            })
        })
        .then(() => {
            // res.send(deleted)
            res.redirect(`/incubators/${incubatorId}?deleted=${deleted}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    

    static readStartUp (req, res) {
        let { roleOfFounder } = req.query

        if(!roleOfFounder){
            roleOfFounder = ''
        }
        StartUps.getStartUpByRoleOfFounder(roleOfFounder)
        .then(data => {
            // res.send(data)
            res.render("readStartUp", {data, rupiah})
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })

    }
}

module.exports = Controller