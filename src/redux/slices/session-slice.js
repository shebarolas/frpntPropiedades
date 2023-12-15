import {createSlice} from '@reduxjs/toolkit';
import {ACCESS_TOKEN} from '../../config/constants';
import {instance} from '../../config/axios';

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSession: (state, action) => {
            state.user = action.payload
        },
        setIsLoading : (state, action)  => {
            state.loading = action.payload
        }
    }
});

export const {setSession, setIsLoading} = sessionSlice.actions;
export default sessionSlice.reducer;

export const loadSession = () => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token !== null) {
        const res = await instance.get("/user/sessionLoading");
        console.log(res.data);
        
        dispatch(setSession(res.data));
      } else {
        dispatch(setSession(null));
      }
    } catch (e) {
      dispatch(setSession(null));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  export const logOut = () => (dispatch) => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(setSession(null));
  };