const router = require('express').Router();

const optionController = require('../controllers/option.controller');

//Routes

router.post('/', optionController.createOption);
router.get('/', optionController.getAllOptions);
router.get('/:id', optionController.showOption);
router.put('/:id', optionController.updateOption);
router.delete('/:id', optionController.deleteOption);


module.exports = router;