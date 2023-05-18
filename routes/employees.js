const router = require('express').Router();
const employeesController = require('../controllers/employees');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', employeesController.getAll);
router.get('/:id', employeesController.getOne);
router.post('/', isAuthenticated, employeesController.createEmployee);
router.put('/:id', isAuthenticated, employeesController.updateEmployee);
router.delete('/:id', isAuthenticated, employeesController.deleteEmployee);

module.exports = router;