import { ManagersModel, ClientsModel, ProfileModel } from '../models/index.js';

export const getOne = async (req, res) => {
    try {
        const clientId = req.params.id;
        const client = await ClientsModel.findById(clientId)
            .populate({
            path: 'typeId',
        })
            .exec();

        if (!client) {
            return res.status(404).json({
                message: 'Клиент не найден',
            });
        }

        res.json(client);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Ошибка сервера',
        });
    }
};

export const getAll = async (req, res) => {
    try {

        const clients = await ClientsModel.find()
            .populate({
            path: 'typeId'
        })
            .exec();

        res.json(clients);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Не удалось получить клиентов",
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new ClientsModel({
            name: req.body.name,
            typeId: req.body.typeId,
            avatarUrl: req.body.avatarUrl,
            user: req.userId,

        });
        const client = await doc.save();

        res.json(client);

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Не удалось создать клиента",
        });
    }
};

export const remove = async (req, res) => {
    try {
        const clientId = req.params.id;
        const result = await ClientsModel.findByIdAndDelete(clientId);

        if (!result) {
            return res.status(404).json({
                message: 'Клиент не найден',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось удалить Клиента',
        });
    }
};
export const update = async (req, res) => {
    try {
        const clientId = req.params.id;

        // Находим старого клиента
        const oldClient = await ClientsModel.findById(clientId);
        if (!oldClient) {
            return res.status(404).json({
                message: `Клиент с ID ${clientId} не найдено`,
            });
        }

        console.log(oldClient);

        // Проверяем, изменился ли профиль клиента
        if (oldClient.typeId.toString() !== req.body.typeId) {
            // Получаем всех менеджеров, содержащих этого клиента
            const managers = await ManagersModel.find({ 'clients': clientId });


            const typeIds = [];
            for (const manager of managers) {
                try {
                    if (!manager) {
                        return res.status(404).json({
                            message: `Менеджер с ID ${clientId} не найден`,
                        });
                    }

                    const type = await ProfileModel.findById(req.body.typeId);
                    // typeIds.push(client.typeId);
                    console.log(`type: ${type}`)
                    console.log(`type: ${manager.profile}`)
                    // Check if the client's profile matches the manager's profile
                    if (type.name !== manager.profile) {
                        return res.status(400).json({
                            message: `Нельзя обновить профиль клиента, так как он не совпадает с профилем одного из менеджеров`,
                        });
                    }
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({
                        message: "Произошла ошибка при проверке клиента",
                    });
                }
            }
        }

        // Обновляем блюдо
        await ClientsModel.updateOne(
            {
                _id: clientId,
            },
            {
                name: req.body.name,
                typeId: req.body.typeId,
                avatarUrl: req.body.avatarUrl,
                user: req.userId,
            },
        );

        res.json({
            success: true,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Не удалось обновить клиента',
        });
    }
};
