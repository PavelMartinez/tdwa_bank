import React from "react";
import { useParams } from "react-router-dom";
import axios from '../axios'

import { Manager } from "../components/Manager";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import {darkTheme, theme} from "../../src/theme";

export const FullManager = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);

    const {id} = useParams();

    React.useEffect(() => {
        axios
            .get(`/managers/${id}`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
                console.log('DATA!!!!!!!!', res.data)
            })
            .catch((err) => {
                console.warn(err);
                alert('Ошибка при получении менеджера');
            })
    }, []);

    if(isLoading || !data) {
        return <Manager isLoading={isLoading} isFullManager />;
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
        <Manager
            id={data._id}
            fullName={`${data.fullName}`}
            profile={data.profile}
            // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
            user={
                data.user
            }
            createdAt={new Date(data.createdAt).toLocaleDateString('ru-RU')}
            clients={([...data.clients])}
            // viewsCount={150}
            // commentsCount={3}
            // tags={['react', 'fun', 'typescript']}
            isEditable
        />
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Сергей Приходько",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Самый лучший, большое спасибо",
          },
          {
            user: {
              fullName: "Людмила-Годзила",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "Маловат",
          },
            {
                user: {
                    fullName: "Гарри Купергсберг",
                    avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "Считаю, что данный специалист недостаточно квалифицированный",
            },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </div>


  );
};
