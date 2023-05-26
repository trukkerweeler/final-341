const router = require('express').Router();
const correctiveController = require('../controllers/corrective');
const validateDescription = require('../validator');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', correctiveController.getAll);
router.get('/:id', correctiveController.getOne);
router.post('/', isAuthenticated, correctiveController.createCorrective);
router.put('/:id', isAuthenticated, correctiveController.updateCorrective);
router.delete('/:id', isAuthenticated, correctiveController.deleteCorrective);

module.exports = router;