// ManagerManager.jsx
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';

import styles from './Manager.module.scss';
import { UserInfo } from '../UserInfo';
import { ManagerSkeleton } from './Skeleton';
import { useDispatch } from "react-redux";
import { fetchRemoveManager } from "../../redux/slices/managers";
import { Client } from "../Client";
import axios from "../../axios";

export const Manager = ({
                         id,
                         fullName,
                         profile,
                         createdAt,
                            typeList,
                         user,
                         clients,
                         isFullManager,
                         isLoading,
                         isEditable,
                         userData,
                     }) => {
    const dispatch = useDispatch();
    if (isLoading) {
        return <ManagerSkeleton/>;
    }

    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить менеджера?')) {
            dispatch(fetchRemoveManager(id));
        }
    };

    return (
        <div className={clsx(styles.root, { [styles.rootFull]: isFullManager })}>

            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/manager/${id}/edit`}>
                        <IconButton color="primary">
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            <div className={styles.wrapper}>
                <UserInfo {...user} additionalText={createdAt} />
                <div className={styles.indention}>
                    <h2 className={clsx(styles.day, { [styles.dayFull]: isFullManager })}>
                        {isFullManager ? (
                            <>{fullName} - {profile}</>
                        ) : (
                            <Link to={`/manager/${id}`}>
                                {fullName} - {profile}
                            </Link>
                        )}
                    </h2>
                    {clients && (
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {clients.map((client, index) => (

                                <Client
                                    key={client._id}
                                    id={client._id}
                                    name={client.name}
                                    user={client.user}
                                    managerId={id}
                                    type={client.typeId.name}
                                    avatarUrl={client.avatarUrl}
                                    isLoading={false}
                                    isEditable={userData?._id === user?._id}

                                    flag={{
                                        fullName,
                                        clients: clients.filter((d, i) => i !== index).map((d) => d._id),
                                        profile,
                                    }}

                                />
                            ))}
                        </List>
                    )}
                </div>
            </div>
        </div>
    );
};
