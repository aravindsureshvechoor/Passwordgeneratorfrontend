import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";


export const register = createAsyncThunk(
    'users/register/',
    async ({full_name, email, password }, thunkApi) => {
        const body = JSON.stringify({
            full_name,
            email,
            password
        })
        try {
            const res = await fetch(`${BASE_URL}/api/accounts/register/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            })

            const data = await res.json();
            if (res.status === 201) {
                return data;
            } else {
                return thunkApi.rejectWithValue(data);
            }
        } catch(err) {
            return thunkApi.rejectWithValue(err.response.data);
        };
    }
)



export const getUser = createAsyncThunk('accounts/me', async (_, thunkApi) => {
    // dispatch = useDispatch();
    try {
        const accessToken = localStorage.getItem('access_token');
        const auth_token =  `Bearer ${accessToken}`
        
        if (!accessToken) {
            throw new Error("Access token not found");
        }

        const res = await fetch(`${BASE_URL}/api/accounts/me/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: auth_token,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch user');
        }

        const data = await res.json();
        console.log("GET USER");
        console.log(data);
        console.log("END GET USER");

        const { dispatch } = thunkApi;
        dispatch(loginSuccess(data));
        
        return data;
    } catch (err) {
        return thunkApi.rejectWithValue(err.message || 'Failed to fetch user');
    }
});




export const login = createAsyncThunk(
    'users/login/',
    async ({ email, password }, thunkApi) => {
        const body = JSON.stringify({
            email,
            password
        })
        try {
            const res = await fetch(`${BASE_URL}/api/token/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            })

            const data = await res.json();
            if (res.status === 200) {
                console.log("Logging In User ")
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                const { dispatch } = thunkApi;
                dispatch(getUser());
                return data;
            } else {
                return thunkApi.rejectWithValue(data);
            }
        } catch(err) {
            return thunkApi.rejectWithValue(err.response.data);
        };
    }
);






export const checkAuth = createAsyncThunk('users/verify/', async (_, thunkApi) => {
    const accessToken = localStorage.getItem('access_token');
    const body = JSON.stringify({ token: accessToken });
    
    try {
        const res = await fetch(`${BASE_URL}/api/token/verify/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body,
        });
        const data = await res.json();

        if (res.status === 200) {
            const { dispatch } = thunkApi;
            dispatch(getUser());
            console.log("checkAuth works well");
            return data;
        } else if (res.status === 401) {
            const { dispatch } = thunkApi;
            await dispatch(updateToken());
            const updateTokenResult = thunkApi.getState().userSlice;
            if (updateTokenResult.isAuthenticated) {
                const { dispatch } = thunkApi;
                dispatch(getUser());
                console.log("checkAuth not working well 401")
                return data; 
            } else {
                return thunkApi.rejectWithValue(updateTokenResult.error);
            }
        } else {
            return thunkApi.rejectWithValue(data);
        }
    } catch (err) {
        return thunkApi.rejectWithValue(err.response.data);
    }
});


export const updateToken = createAsyncThunk(
    'users/refresh/',
    async (_, thunkApi) => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            throw new Error('No refresh token found.');
        }
        const body = JSON.stringify({ token : refreshToken })
        try {
            const res = await fetch(`${BASE_URL}/api/token/refresh/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            })
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                const { dispatch } = thunkApi;
                dispatch(getUser());
                return data;
            } else {
                const { dispatch } = thunkApi;
                dispatch(logout());
                return thunkApi.rejectWithValue(data);
            }
        } catch(err) {
            return thunkApi.rejectWithValue(err.response.data);
        };
    }
);

export const logout_token = createAsyncThunk('users/logout', async (_, thunkApi) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return undefined;
});

const initialState = {
    isAuthenticated: false,
    user: null, 
    isSuperuser: false,
    loading: false,
    registered: false,
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            const user = action.payload;
            state.isAuthenticated = true;
            state.user = user;
            // state.accessToken = accessToken;
            // state.refreshToken = refreshToken;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isSuperuser = false;
        },
        updateUserInfo(state, action) {
            const { user } = action.payload;
            state.user = user;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setRegistered(state, action) {
            state.registered = action.payload;
        },
        setSuperuser(state, action) {
            state.isSuperuser = action.payload;
        },
    },
});

export const { loginSuccess, logout, updateUserInfo, setLoading, setRegistered, setSuperuser } = authSlice.actions;

export default authSlice.reducer;

//  export const { resetRegistered } = userSlice.actions;
//  export default userSlice.reducer;
