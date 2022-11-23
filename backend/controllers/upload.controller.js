const models = require("../models");

const Admin = models.Admin;
const path = require('path');
const sharp = require("sharp");
const fs = require("fs");

module.exports.uploadProfil = async (req, res) => {
  const { id } = req.params;
  try { 
    const { file } = req;
    file.fieldname = "profil";
    const { filename: profil } = req.file;

    //Store the compress image with resize name
    const resize = file.destination + '/' + 'resized_' + profil;


    // Convert any input to very high quality JPEG output
    await sharp(file.path)
      .resize(200, 200)
      .jpeg(
        {
          quality: 80,
          chromaSubsampling: '4:4:4' 
        }
      )
      .toFile(resize);
    //delete path img in the memory 
    fs.unlinkSync(file.path)

      await Admin.update(
    {
      picture: resize,
    },
    { where: { id } }
  ).then((updateProfil) => {
    if (!updateProfil) return res.status(404).json("Fichier non trouvé");
    if (updateProfil) {
      return res
      .status(200)
      .json("Votre photo de profil a été mis à jour");
    }
  });
    
    
  } catch (error) {
    console.log(error);
    return res.send(`Erreur lors du téléchargement d'images: ${error}`);
  }
};
