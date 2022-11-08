const models = require('../models');
const Admin = models.Admin;


module.exports.adminInfos = async (req, res) => {

    //Check ID in the req.params

    const { id } = req.params;


    await Admin.findByPk(id, {
        //Get user infos
        attributes: { exclude: ["password"] }
    })
        .then((admin) => {
            if (!admin) return res.status(404).send("Administrateur non disponible");
            return res.status(200).json(admin);
        })
        .catch((err) => {
            res.status(500).send(err)
        })

};


//Delete Admin
module.exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
    const admin = Admin.findOne({ where: { id } });

    //Delete Admin by id
    Admin.destroy({ where: { id } })
        .then((deleteAdmin) => {
            if (!deleteAdmin) return res.status(404).json('Utilisateur non disponible');
            res.status(200).json({ 'message': 'Compte supprimé avec succès' })
        })
        .catch(err => {
            return res.status(500).send(err);
        })

};