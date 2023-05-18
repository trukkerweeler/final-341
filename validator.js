const { check, validationResult } = require('express-validator')

exports.validateAssignedTo = [
check('assigned_to')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('assigned to can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),

(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    return res.status(200).json({errors: errors.array()});
    next();
},
];





// const { body, validationResult } = require('express-validator')
// const userValidationRules = () => {
//   return [
//     // created date must be a date
//     body('created_date').isDate(),
//     // description must be at least 12 chars long
//     body('description').isLength({ min: 12 }),
//   ]
// }

// const validate = (req, res, next) => {
//   const errors = validationResult(req)
//   if (errors.isEmpty()) {
//     return next()
//   }
//   const extractedErrors = []
//   errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

//   return res.status(422).json({
//     errors: extractedErrors,
//   })
// }