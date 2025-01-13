import {Routes, Route} from 'react-router-dom';
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";


import {Header} from "./components";
import {Home, FullManager, Registration, AddProfile, AddClient, AddManager, Login, FullClient, FullProfile} from "./pages";
import React from 'react';
import {logout, selectIsAuth} from "./redux/slices/auth";
import {fetchAuthMe} from "./redux/slices/auth";


function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    React.useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])
    return (
        <>
            <Header/>
            <Container maxWidth="lg" >
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/manager/:id" element={<FullManager/>}/>
                    <Route path="/manager/:id/edit" element={<AddManager/>}/>
                    <Route path="/client/:id" element={<FullClient/>}/>
                    <Route path="/client/:id/edit" element={<AddClient/>}/>
                    <Route path="/profile/:id" element={<FullProfile/>}/>
                    <Route path="/add-profile" element={<AddProfile/>}/>
                    <Route path="/add-client" element={<AddClient/>}/>
                    <Route path="/add-manager" element={<AddManager/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>

                    {/*<FullPost />*/}
                    {/*<AddManager />*/}
                    {/*<Login />*/}
                    {/*<Registration />*/}
                </Routes>

            </Container>
        </>
    );
}

export default App;
