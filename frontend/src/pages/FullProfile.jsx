
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

import { Profile } from '../components/Profile';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

import {darkTheme, theme} from "../../src/theme";

export const FullProfile = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);

    const { id } = useParams();

    React.useEffect(() => {
        axios
            .get(`/profiles/${id}`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
                console.log('clients DATA!!!!!!!!', res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert('Ошибка при получении клиента');
            });
    }, [id]);

    if (isLoading || !data) {
        return <Profile isLoading={isLoading} />;
    }

    return (
        <div
            style={{
                background: darkTheme.palette.background.default,
                minHeight: "100vh",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Profile
                // id={data._id}
                name={data.name}
                // type={data.typeId.name}
                // user={data.user}
                // createdAt={new Date(data.createdAt).toLocaleDateString('ru-RU')}
                // avatarUrl={data.avatarUrl}
                // isLoading={isLoading}
                // isEditable
            />
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: 'Павел Головин',
                            avatarUrl: 'https://i.ibb.co/tQf3P4G/JCUN13b.jpg',
                        },
                        text: 'мне не нрав...',
                    },
                    {
                        user: {
                            fullName: 'Михаил Мудриченко',
                            avatarUrl: 'https://i.ibb.co/bNBQ7Js/telegram-peer-photo-size-2-5300900941291184389-1-0-0.jpg',
                        },
                        text:
                            'а мне норм',
                    },
                ]}
                isLoading={false}
            >
                <Index />
            </CommentsBlock>
        </div>
    );
};
