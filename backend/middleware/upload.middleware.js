const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Veuillez télécharger uniquement des images au format(jpeg, jpg, png)');
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = `../frontend/public/uploads/` + file.fieldname;
        if (file.fieldname === "profil") {
            cb(null, dir);
        } else if (file.fieldname === "category") {
            cb(null, `../frontend/public/uploads/category`);
        } else {
            cb(null, `../frontend/public/uploads/food`);
        }
    },
    filename: (req, file, cb) => {
        let extension = MIME_TYPES[file.mimetype];
        let fileName = "";
        fileName = file.originalname + '.' + extension;
        cb(null, `panini_${Date.now()}_${fileName}`);
    }
});

module.exports = multer({ storage: storage, fileFilter: imageFilter })