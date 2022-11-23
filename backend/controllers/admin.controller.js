const models = require('../models');
const Admin = models.Admin;

/**
 * 
 * @param {String} req 
 * @param {String} res 
 *  @param {Number} Pagination
 */

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


module.exports.getAdmins = async (req, res) => {

    try {
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);

        //Filter les données par pagination pour ne pas surcharger le serveur

        let page = 0;


        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }

        let size = 0;

        if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)) {
            size = sizeAsNumber;
        }

        const allAdmins = await Admin.findAndCountAll({
            limit: size,
            offset: page * size,
            order: [['createdAt', 'DESC']]

        })
        return res.send({
            content: allAdmins.rows,
            totalPages: Math.ceil(allAdmins.count / Number.parseInt(size))
        })

    } catch (error) {

    }
}



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