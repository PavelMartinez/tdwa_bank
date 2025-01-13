import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from '../../axios';

import styles from './AddProfile.module.scss';
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {Navigate, useNavigate, useParams} from "react-router-dom";

import {darkTheme, theme} from "../../theme";

export const AddProfile = () => {
    const {id} = useParams();
    const isAuth = useSelector(selectIsAuth);
    const [name, setName] = useState('');
    const navigate = useNavigate();


    const handleCreateProfile = async () => {
        try {
            if (!name) {
                alert('Укажите профиль обслуживания');
                return;
            }

            // Формируем данные для запроса создания профиля обслуживания
            const requestData = {
                name: name,
            };

            const {data} = await axios.post('/profiles', requestData);

            const _id = data._id;
            navigate(`/profile/${_id}`)

        } catch (error) {
            console.error('Ошибка при создании профиля:', error);
            if (error.response) {
                console.error('Ответ сервера:', error.response.data);
            }
            alert(error.response.data.message)

        }
    };


    if(!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/" />
    }

    return (
        <div
            style={{
                background: darkTheme.palette.background.default,
                minHeight: "100vh",
                // display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Paper style={{ padding: 30 }} >
                <TextField
                    classes={{ root: styles.title }}
                    variant="standard"
                    placeholder="Название профиля обслуживания..."
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />


                <div className={styles.buttons}>
                    <Button size="large" variant="contained" onClick={handleCreateProfile}>
                         Создать профиль
                    </Button>
                    <a href="/">
                        <Button size="large">Отмена</Button>
                    </a>
                </div>
            </Paper>
        </div>
    );
};
