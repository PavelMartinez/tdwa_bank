// profile.model.js
import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

export default mongoose.model('Profile', ProfileSchema);
