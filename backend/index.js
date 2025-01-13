import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import {registerValidation, loginValidation, managersCreateValidation, clientsValidation, profilesValidation} from './validations.js';
import {checkAuth, handleValidationErrors} from "./utils/index.js";
import { UserController, ManagersController, ClientsController, ProfileController } from './controllers/index.js'
import 'dotenv/config'




mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB OKAY!"))
    .catch((err) => console.log("ERROR IN DB!", err));

const app = express();


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


// login
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// upload any img
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    try {
        res.json({
            url: `/uploads/${req.file.originalname}`,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Не удалось загрузить картинку',
        });
    }
});

// managers all api
app.get('/managers/:id', ManagersController.getOne);
app.get('/managers', ManagersController.getAll);
app.post('/managers', checkAuth, managersCreateValidation, handleValidationErrors, ManagersController.create);
app.delete('/managers/:id', checkAuth, managersCreateValidation, ManagersController.remove);
app.patch('/managers/:id', checkAuth, managersCreateValidation, handleValidationErrors, ManagersController.update);
app.post('/managers/transferClients', checkAuth, handleValidationErrors, ManagersController.transferClients);


// clients all api
app.get('/clients', ClientsController.getAll);
app.get('/clients/:id', ClientsController.getOne);
app.post('/clients', checkAuth, clientsValidation, handleValidationErrors, ClientsController.create);
app.patch('/clients/:id', checkAuth, clientsValidation, handleValidationErrors, ClientsController.update);
app.delete('/clients/:id', checkAuth, ClientsController.remove);


// types all api есть проверки на авторизацию и мини проверки с помощью express-validator
app.get('/profiles/:id', ProfileController.getOne)
app.get('/profiles', ProfileController.getAllProfiles);
app.post('/profiles', checkAuth, profilesValidation, handleValidationErrors, ProfileController.createProfile);

// app.get('/types', TypeController.getAllTypes);
// app.post('/types', checkAuth, typeValidation, handleValidationErrors, TypeController.createType);

app.listen(process.env.API_PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server OK!")
});

