// manager.model.js
import mongoose from 'mongoose';

const ManagerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    clients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client',
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    profile: {
        type: String,
        ref: 'Profile',
        required: true,
    },
}, {
    timestamps: true,
});




export default mongoose.model('Manager', ManagerSchema);
