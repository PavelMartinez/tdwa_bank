import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from '../../axios';

import styles from './AddManager.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, Navigate, useParams } from 'react-router-dom';

import {darkTheme, theme} from "../../theme";

export const AddManager = () => {
    const {id} = useParams();
    const isAuth = useSelector(selectIsAuth);
    const [fullName, setFullName] = useState('');
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [existingClients, setExistingClients] = useState([]);
    const [profile, setProfile] = useState('');
    const [error, setError] = useState('');
    const [createdManager, setCreatedManager] = useState(null);
    const [typeList, setTypeList] = useState([]);
    const [typeId, setTypeId] = useState('');
    const navigate = useNavigate();
    const [selectedProfile, setSelectedProfile] = useState('');
    const [profileId, setProfileId] = useState('');

    const [debugTypeId, setDebugTypeId] = useState('');

    const isEditing = Boolean(id);

    useEffect(() => {
        // Получение списка профилей обслуживания с сервера
        axios.get('/profiles').then((response) => {
            setTypeList(response.data);
        });
    }, []);

    useEffect(() => {
        // Получение списка существующих клиентов с сервера
        axios.get('/clients').then((response) => {
            setExistingClients(response.data);
        });
    }, []);

    React.useEffect(() => {
        if(id) {
            axios.get(`/managers/${id}`).then(({data}) => {
                setFullName(data.fullName);
                setClients(data.clients);
                setProfile(data.profile);
            })
        }
    }, [])

    const handleAddClient = async () => {
        try {
            if (!selectedClient) {
                alert('Выберите клиента');
                return;
            }

            // Получение информации о выбранном клиенте
            const response = await axios.get(`/clients/${selectedClient}`);
            const clientInfo = response.data;

            // Check if the profile of the selected client matches the profile of the manager
            if (clientInfo.typeId._id !== selectedProfile) {
                alert('Выбранный клиент имеет другой профиль обслуживания');
                return;
            }

            // Check if the maximum number of clients is reached
            if (clients.length >= 4) {
                alert('Достигнуто максимальное количество клиентов (4)');
                return;
            }

            // Добавление выбранного клиента в список клиентов менеджера
            setClients((prevClients) => [...prevClients, clientInfo]);
            // Сброс выбранного клиента
            setSelectedClient('');
        } catch (error) {
            console.error('Ошибка при получении информации о клиенте:', error);
            // Обработка ошибки, например, вывод сообщения пользователю
            setError('Ошибка при получении информации о клиенте');
        }
    };


    const handleProfileChange = async (e) => {
        try {
            const selectedProfileId = e.target.value;


            // Make sure your server expects ID, not name
            const response = await axios.get(`/profiles/${selectedProfileId}`);
            setSelectedProfile(response.data._id)
            setProfile(response.data.name);
            setDebugTypeId(e.target.value);
            console.log(response.data.name)
            console.log('Selected Profile ID:', selectedProfileId);
        } catch (error) {
            console.error('Error fetching profile information:', error);
            setError('Error fetching profile information');
        }
    };





    const handleRemoveClient = (clientId) => {
        setClients((prevClients) => prevClients.filter((client) => client._id !== clientId));
    };

    const handleCreateManager = async () => {
        try {
            if (clients.length === 0) {
                alert('Добавьте клиентов менеджеру');
                return;
            }
            const fields = {
                fullName,
                clients,
                profile,
            };

            const {data} = isEditing
                ? await axios.patch(`/managers/${id}`, fields)
                : await axios.post('/managers', fields);

            const _id = isEditing ? id : data._id;
            navigate(`/manager/${_id}`)

            // Дополнительные действия, например, перенаправление на страницу с созданным менеджером
        } catch (error) {
            console.error('Ошибка при создании менеджера:', error);
            alert(error.data?.message || 'Ошибка при создании менеджера');
        }
    };

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/" />;
    }


    return (
        <div
            style={{
                background: darkTheme.palette.background.default,
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
        <Paper style={{ padding: 30 }}>

            <TextField
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="ФИО менеджера..."
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <Select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                displayEmpty
                fullWidth
                classes={{ root: styles.select }}
            >
                <MenuItem value="" disabled>
                    Выберите клиента
                </MenuItem>
                {existingClients.map((client) => (
                    <MenuItem key={client._id} value={client._id}>
                        {client.name}
                    </MenuItem>
                ))}
            </Select>

            <Button variant="outlined" size="large" onClick={handleAddClient}>
                Добавить клиента
            </Button>

            <div className={styles.clientsContainer}>
                <p>Выбранные клиенты:</p>
                <ul>
                    {clients.map((clientInfo) => (
                        <li key={clientInfo._id}>
                            {clientInfo.name}
                            <Button onClick={() => handleRemoveClient(clientInfo._id)}>Удалить</Button>
                        </li>
                    ))}
                </ul>
            </div>
            <Select
                style={{ marginBottom: 15 }}
                value={selectedProfile}
                onChange={handleProfileChange}
                displayEmpty
                fullWidth
            >
                <MenuItem value="" disabled>
                    Выберите профиль обслуживания
                </MenuItem>
                {typeList.map((type) => (
                    <MenuItem key={type._id} value={type._id} >
                        {type.name}
                    </MenuItem>
                ))}
            </Select>

            {/*<TextField*/}
            {/*    classes={{ root: styles.title }}*/}
            {/*    variant="standard"*/}
            {/*    placeholder="Профиль обслуживания..."*/}
            {/*    fullWidth*/}
            {/*    value={profile}*/}
            {/*    onChange={(e) => setProfile(e.target.value)}*/}
            {/*/>*/}

            <div className={styles.buttons}>
                <Button size="large" variant="contained" onClick={handleCreateManager}>
                    {isEditing ? 'Сохранить' : 'Создать менеджера'}
                </Button>
                <a href="/">
                    <Button size="large">Отмена</Button>
                </a>
            </div>

        </Paper>
        </div>
    );
};
