// Home.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Manager } from '../components/Manager';
import { Client } from '../components/Client';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchManagers, transferClients } from '../redux/slices/managers';
import { fetchClients } from '../redux/slices/clients';
import {darkTheme, theme} from "../../src/theme";
export const Home = () => {
    const dispatch = useDispatch();
    const { managers } = useSelector((state) => state.managers);
    const { clients } = useSelector((state) => state.clients);
    const userData = useSelector((state) => state.auth.data);

    const isClientsLoading = clients.status === 'loading';
    const isManagersLoading = managers.status === 'loading';

    const [selectedClients, setSelectedClients] = useState([]);

    useEffect(() => {
        dispatch(fetchManagers());
        dispatch(fetchClients());
        // dispatch()
    }, [dispatch]);

    console.log(managers);
    // console.log(clients);


    const handleTransferButtonClick = () => {
        // Handle the transfer logic using the selected clients
        const sourceManagerId = 'yourSourceManagerId';  // Replace with the actual source manager ID
        const targetManagerId = 'yourTargetManagerId';  // Replace with the actual target manager ID

        dispatch(transferClients({ sourceManagerId, targetManagerId, clientIds: selectedClients }));
        // Reset the selected clients state
        setSelectedClients([]);
    };


    return (
        <div
            style={{
                background: darkTheme.palette.background.default,
                minHeight: "100vh",
                justifyContent: "center",
                alignItems: "center"
            }}
        >

            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="Текущие менеджеры" />
                <Tab label="Популярные" />
            </Tabs>
            <Grid container spacing={4} >
                <Grid xs={8} item>
                    {/* Ваш код для отображения менеджеров */}
                    {(isManagersLoading ? [...Array(5)] : managers.items).map((obj, index) =>
                        isManagersLoading ? (
                            <Manager key={index} isLoading={true} />
                        ) : (
                            <Manager
                                id={obj._id}
                                fullName={`${obj.fullName}`}
                                user={obj.user}
                                userData={userData}
                                createdAt={new Date(obj.createdAt).toLocaleDateString('ru-RU')}
                                // dishes={sortDishesByTypeOrder([...obj.dishes])}
                                clients={obj.clients}
                                profile={obj.profile}
                                isEditable={userData?._id === obj.user._id}
                            />
                        )
                    )}
                </Grid>
                <Grid xs={4} item>
                    {(isClientsLoading ? [...Array(5)] : clients.items).map((obj, index) =>
                        isClientsLoading ? (
                            <Client key={index} isLoading={true} />
                        ) : (
                            <Client
                                key={obj._id}
                                id={obj._id}
                                name={obj.name}
                                user={obj.user}
                                type={obj.typeId.name}
                                avatarUrl={obj.avatarUrl}
                                isLoading={false}
                                isEditable={userData?._id === obj?.user}
                                // isEditable={true}
                            />
                        )
                    )}
                </Grid>
            </Grid>
        </div>
    );
};


