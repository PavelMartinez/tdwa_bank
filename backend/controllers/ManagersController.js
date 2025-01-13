import { ManagersModel, ClientsModel, ProfileModel } from '../models/index.js';
export const getOne = async (req, res) => {
    try {
        const managerId = req.params.id;
        const manager = await ManagersModel
            .findById(managerId)
            .populate({
            path: 'user',
            select: '-passwordHash'
        })
            .populate({
            path: 'clients', // Указываем путь к полю client внутри массива clients
                populate: {
                    path: 'typeId',
                }

        })
            .exec();

        if (!manager) {
            return res.status(404).json({
                message: 'Меню не найдено',
            });
        }

        res.json(manager);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Ошибка сервера',
        });
    }
};
export const getAll = async (req, res) => {
    try {

        const managers = await ManagersModel.find().populate({
            path: 'user',
            select: '-passwordHash' // исключаем поле passwordHash
        }).populate({
            path: 'clients', // Указываем путь к полю client внутри массива clients
            populate: {
                path: 'typeId',
            }

        })
            .exec();

        res.json(managers);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Не удалось получить всех менеджеров",
        });
    }
};
export const create = async (req, res) => {
    try {
        const { fullName, clients, profile } = req.body;
        console.log(req.body)
        const userId = req.userId;

        // Если проверка успешна, создаем и сохраняем менеджера
        const doc = new ManagersModel({
            fullName,
            clients,
            profile,
            user: userId,
        });
        const manager = await doc.save();

        res.json(manager);

    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Не удалось создать менеджера",
        });
    }
};
export const remove = async (req, res) => {
    try {
        const managerId = req.params.id;
        const result = await ManagersModel.findByIdAndDelete(managerId);

        if (!result) {
            return res.status(404).json({
                message: 'Менеджер не найдено',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось удалить менеджера',
        });
    }
};
export const update = async (req, res) => {
    try {
        const managerId = req.params.id;
        const { fullName, clients, profile } = req.body;

        console.log(req.body)



        await ManagersModel.updateOne(
            {
                _id: managerId,
            },
            {
                fullName,
                clients,
                profile,
                user: req.userId,
            }
        );
        res.json({
            success: true,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Не удалось обновить менеджера',
        });
    }
};


export const transferClients = async (req, res) => {
    try {
        const sourceManagerId = req.body.sourceManagerId;
        const targetManagerId = req.body.targetManagerId;
        const clientIdsToTransfer = req.body.clientIds;

        // Находим исходного и целевого менеджера
        const sourceManager = await ManagersModel.findById(sourceManagerId);
        const targetManager = await ManagersModel.findById(targetManagerId);

        // Проверяем, что оба менеджера существуют
        if (!sourceManagerId || !targetManagerId) {
            return res.status(404).json({
                message: 'Один из менеджеров не найден',
            });
        }

        // Переносим клиента от исходного менеджера к целевому
        sourceManagerId.clients = sourceManager.clients.filter(clientId => !clientIdsToTransfer.includes(clientId.toString()));
        targetManagerId.clients = [...targetManager.clients, ...clientIdsToTransfer];

        // Сохраняем обновленных менеджеров
        await sourceManagerId.save();
        await targetManagerId.save();

        res.json({
            success: true,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Не удалось выполнить перенос клиента',
        });
    }
};