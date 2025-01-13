// Client.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Clear";
import { fetchRemoveClient } from "../../redux/slices/clients";
import {fetchUpdateManager} from "../../redux/slices/managers"
import clsx from "clsx";
import styles from "./Client.module.scss";
import {useDispatch} from "react-redux";
import {ManagerSkeleton} from "../../components/Manager/Skeleton";


export const Client = (
    {
        id,
        name,
        type,
        managerId,
        avatarUrl,
        isLoading,
        isEditable,
        flag
    }) => {
    const dispatch = useDispatch();
    if (isLoading) {
        return <ManagerSkeleton/>;
    }
    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить клиента?')) {
            if(!flag) {
                dispatch(fetchRemoveClient(id));
            } else {
                dispatch(fetchUpdateManager({ managerId: managerId, id: id, flag: flag }));
            }
            // Вместо fetchRemoveManager используем fetchRemoveClient
            // Обратите внимание, что передаем id клиента, а не менеджера

        }
    };

    return (
        <div className={clsx(styles.root)}>
            {isLoading ? (
                <div>Loading client...</div>
            ) : (
                <>
                    {isEditable && (
                        <div className={styles.editButtons}>
                            <Link to={`/client/${id}/edit`}>
                                <IconButton color="primary">
                                    <EditIcon/>
                                </IconButton>
                            </Link>
                            <IconButton onClick={onClickRemove} color="secondary">
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    )}
                    <div className={styles.wrapper}>
                        {/*<UserInfo {...user} additionalText={createdAt}/>*/}
                        <div className={styles.indention}>
                            <h2 className={clsx(styles.day)}>
                                <Link to={`/client/${id}`}>
                                    <ListItemAvatar>
                                        <Avatar alt={type} src={`http://localhost:4444${avatarUrl}`}/>
                                    </ListItemAvatar>
                                    {name}
                                </Link>
                            </h2>

                            <React.Fragment key={id}>
                                <ListItem alignItems="flex-start">
                                    {/*<ListItemAvatar>*/}
                                    {/*    <Avatar alt={type} src={`http://localhost:4444${avatarUrl}`}/>*/}
                                    {/*</ListItemAvatar>*/}
                                    <ListItemText

                                        primary={
                                            <Typography
                                                sx={{ color: 'white'}}  // Set the color to white
                                                component="span"
                                                variant="body1"
                                            >
                                                {type}
                                            </Typography>
                                        }

                                    />
                                </ListItem>
                                {/*<Divider variant="inset" component="li"/>*/}
                            </React.Fragment>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
