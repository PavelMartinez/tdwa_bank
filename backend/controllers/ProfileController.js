import { validationResult } from 'express-validator';
import {ProfileModel} from '../models/index.js';


export const getOne = async (req, res) => {
    try {
        const profileId = req.params.id;
        const profile = await ProfileModel.findById(profileId)
            .exec();

        if (!profile) {
            return res.status(404).json({
                message: 'Профиль не найден',
            });
        }

        res.json(profile);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Ошибка сервера',
        });
    }
};

export const getAllProfiles = async (req, res) => {
    try {
        const types = await ProfileModel.find();
        res.json(types);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось получить все типы блюд',
        });
    }
};
export const createProfile = async (req, res) => {
    try {
        // Валидация запроса
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Извлечение данных из запроса
        const { name } = req.body;

        // Создание нового типа
        const newType = new ProfileModel({
            name,
        });

        // Сохранение в базе данных
        await newType.save();

        res.status(201).json(newType);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ошибка сервера',
        });
    }
};
