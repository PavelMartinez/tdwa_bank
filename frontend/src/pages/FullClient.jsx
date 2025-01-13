
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

import { Client } from '../components/Client';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

import {darkTheme, theme} from "../../src/theme";

export const FullClient = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);

    const { id } = useParams();

    React.useEffect(() => {
        axios
            .get(`/clients/${id}`)
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
        return <Client isLoading={isLoading} />;
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
            <Client
                id={data._id}
                name={data.name}
                type={data.typeId.name}
                user={data.user}
                createdAt={new Date(data.createdAt).toLocaleDateString('ru-RU')}
                avatarUrl={data.avatarUrl}
                isLoading={isLoading}
                isEditable
            />
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: 'Алексей Буряков',
                            avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'нет слов одни эмоции',
                    }
                ]}
                isLoading={false}
            >
                <Index />
            </CommentsBlock>
        </div>
    );
};
