const { check } = require('express-validator');

//validacion para crear una task
exports.createTaskValidator = [
    check('title')
        .notEmpty().withMessage('Se debe de ingresar un Titulo')
        .isLength({ min: 3 }).withMessage('El titulo debe de tener mas de 3 caracteres'),

    check('description')
        .optional()
        .isString().withMessage('La descripcion debe de ser un String'),

    check('state')
        .optional()
        .isInt({ min: 0, max: 1 }).withMessage('El state debe de ser 0 o 1')
];

//Validacion para actualizar una task
exports.updateTaskValidator = [
    check('title')
        .optional()
        .isString().withMessage('Title debe ser un String'),

    check('description')
        .optional()
        .isString().withMessage('Description debe ser un String'),

    check('state')
        .optional()
        .isInt({ min: 0, max: 1 }).withMessage('El state debe de ser 0 o 1')
];

// Validación para IDs por URL
exports.idValidator = [
    check('id_task')
        .isNumeric().withMessage('Task ID debe de ser Numerico')
];