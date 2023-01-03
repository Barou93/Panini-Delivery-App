const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Veuillez télécharger un fichier SVP!", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = `../frontend/public/uploads/` + file.fieldname;
    if (file.fieldname === "profil") {
      cb(null, dir);
    } else if (file.fieldname === "category") {
      cb(null, dir);
    } else {
      cb(null, `../frontend/public/uploads/food`);
    }
  },
  filename: (req, file, cb) => {
    let fileExtension = file.originalname
      .split(".")
      [file.originalname.split(".").length - 1].toLocaleLowerCase();
    let extension = MIME_TYPES[file.mimetype];
    file.extension = fileExtension.replace("/jpeg/i", "jpg"); // all jpeg images to jpg

    cb(
      null,
      `${file.originalname.replace(/\W|jpeg|jpg|png/g, "")}.${fileExtension}` // Removes non-words form filename
    );
  },
});

//Add a constraints to upload files
const limits = (req, file, cb) => {
  const fileSize = 5 * 1024 * 1024; // 5MB max file size
  if (file.size >= fileSize) {
    cb("Vous ne pouvez pas télécharger un fichier de plus de 5MB", false);
  } else {
    cb(null, true);
  }
};

module.exports = multer({ storage: storage, fileFilter: imageFilter, limits });
