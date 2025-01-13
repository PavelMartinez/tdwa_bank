// Profile.jsx
import React from 'react';
import { ListItem, ListItemText, Typography} from '@mui/material';
import clsx from "clsx";
import styles from "./Profile.module.scss";


export const Profile = ({
                            id,
                            name,
                        }) => {

    return (
        <div className={clsx(styles.root)}>
            <div className={styles.wrapper}>
                <div className={styles.indention}>
                    <React.Fragment key={id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={
                                    <Typography
                                        sx={{ color: 'white' }}
                                        component="span"
                                        variant="body1"
                                    >
                                        {`Созданный профиль обслуживания: ${name}`}
                                    </Typography>
                                }
                            />
                        </ListItem>

                    </React.Fragment>
                </div>
            </div>
        </div>
    );
};
