const router = require('express').Router();
const nonconformanceController = require('../controllers/nonconformance');
const validateDescription = require('../validator');

router.get('/', nonconformanceController.getAll);
router.get('/:corrective_id', nonconformanceController.getOne);
// router.post('/', validateDescription.validateAssignedTo, nonconformanceController.createNonconformanceRef);
router.post('/', nonconformanceController.createNonconformanceRef);
router.put('/:corrective_id', nonconformanceController.updateNonconformanceRef);
router.delete('/:corrective_id', nonconformanceController.deleteNonconformanceRef);

module.exports = router;