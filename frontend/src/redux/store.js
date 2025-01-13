import {configureStore} from "@reduxjs/toolkit";
import {managersReducer} from "./slices/managers";
import {authReducer} from "./slices/auth"
import {clientsReducer} from "./slices/clients";

const store = configureStore({
    reducer: {
        managers: managersReducer,
        auth: authReducer,
        clients: clientsReducer,
    }
});

export default store;