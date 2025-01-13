import { body } from 'express-validator';


export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const managersCreateValidation = [
    body('fullName', 'Неправильно указано ФИО менеджера').isString(),
    body('clients', 'Неправильно указаны клиенты').isArray(),
];

export const clientsValidation = [
    body('name', 'Укажите наименование и орг форму юр. лица').isString(),
    body('typeId', 'Укажите профиль обслуживания').isMongoId(), // предполагая, что typeId - ObjectId типа

];

export const profilesValidation = [
    body('name', 'Укажите профиль обслуживания').isString(),
];



