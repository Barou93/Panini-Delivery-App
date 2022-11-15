const models = require('../models');

const { Option } = models;
const jwt = require('jsonwebtoken');

module.exports.createOption = async (req, res) => {
    const token = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);
    const adminId = token.id;

    try {
        const { name, price } = req.body;

        if (adminId) {

            await Option.create({
                name,
                price
            })
                .then((option) => {
                    return res.status(201).json(option);
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
        } else {
            return res.status(401).json('Impossible de faire cette requête')
        }

    } catch (error) {
        return res.status(500).json(error);

    }
}
module.exports.getAllOptions = async (req, res) => {
    await Option.findAll()
        .then((options) => {
            return res.status(200).json(options);
        })
        .catch((err) => {
            return res.status(400).json(err)
        })

}
module.exports.showOption = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Option.findByPk(id)
            .then((option) => {
                return res.status(200).json(option)
            })
            .catch((err) => {
                return res.status(404).json(err + "Option non disponible");
            })


    } catch (error) {
        return res.status(500).json(error);

    }


}
module.exports.updateOption = async (req, res, next) => {
    const token = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);
    const adminId = token.id;

    const optionId = req.params.id;

    const { name, price } = req.body;

    if (adminId) {
        const option = await Option.update({ name, price }, { where: { id: optionId } })

        //Update product options
        if (optionId) {
            if (option) return res.status(200).json(option)
            else return res.status(400).json('Impossible de mettre à jour')
        } else {
            return res.status(404).json('Produit non disponible')
        }

    } else {
        return res.status(401).json(("Non authorisé"))
    }
}
module.exports.deleteOption = async (req, res) => {

    //Delete the option
    try {

        const token = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);
        const adminId = token.id;

        const optionId = req.params.id

        if (adminId) {

            if (optionId) {

                //Check and delete the option
                const deleteOption = await Option.destroy({ where: { id: optionId } });
                if (!deleteOption) res.status(404).json("Cette option n'existe pas")
                return res.status(200).json('Supplément supprimé avec succès.');
            } else {

                return res.status(404).json('Option non disponible');
            }

        } else {
            return res.status(404).json("Vous devez être connecté pour faire cette requête.")
        }


    } catch (error) {
        return res.status(500).json(error);
    }

}