// client.model.js
import mongoose from 'mongoose';

import ManagersModel from './Managers.js';
import ClientsModel from './Clients.js';

const ClientSchema = new mongoose.Schema({
    name: { // имя и оргформа
        type: String,
        required: true,
    },
    typeId: { // требуемый профиль обслуживания
        type: String,
        ref: 'Profile',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    avatarUrl: String,

});

ClientSchema.pre('save', async function (next) {
    const client = this;

    // Проверяем, изменился ли тип обслуживания
    if (client.isModified('typeId')) {
        const type = await ClientsModel.findById(client.typeId);

        // Получаем всех клиентов, с этим типом
        const clients = await ManagersModel.find({ 'clients': client._id });

        // Обновляем
        for (const client of clients) {
            client.clients = client.clients.map(managerClientId =>
                managerClientId.equals(client._id) ? client._id : managerClientId
            );
            await client.save();
        }
    }

    next();
});



export default mongoose.model('Client', ClientSchema);
