const models = require('../models');

const Admin = models.Admin;


module.exports.uploadProfil = async (req, res) => {
    const { id } = req.params;

    try {
        req.file.fieldname = "profil";
        if (req.file == undefined) {
            return res.send("Vous devez sélectionner un fichier");
        }

        await Admin.update(
            { picture: `./uploads/${req.file.fieldname}/${req.file.filename}` },
            { where: { id: id } }
        )
            .then((updateProfil) => {
                if (!updateProfil) return res.status(404).json('Fichier non trouvé');
                return res.status(200).json('Votre photo de profil a été mise à jour.')
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);


    }




}