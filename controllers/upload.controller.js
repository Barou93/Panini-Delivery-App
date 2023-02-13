const models = require("../models");

const Admin = models.Admin;
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

module.exports.uploadProfil = async (req, res) => {
  const { id } = req.params;
  try {
    req.file.fieldname = "profil";
    if (req.file === undefined) {
      return res.send("Vous devez sélectionner une image");
    }
    await Admin.update(
      {
        picture: `${req.protocol}://${req.get("host")}/uploads/${req.file.fieldname}/${req.file.filename}`,
      },
      { where: { id } }
    ).then((updateProfil) => {
      if (!updateProfil) return res.status(404).json("Fichier non trouvé");
      if (updateProfil) {
        return res.status(200).json("Votre photo de profil a été mis à jour");
      }
    });
  } catch (error) {
    console.log(error);
    return res.send(`Erreur lors du téléchargement d'images: ${error}`);
  }
};
