import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'

//------------------------ Constants
export const DO_LOGIN = 'DO_LOGIN'
export const DO_SIGNUP = 'DO_SIGNUP'
export const DO_LOGOUT = 'DO_LOGOUT'
export const SAVE_PROFILE = 'SAVE_PROFILE'
export const GET_PROFILE = 'GET_PROFILE'
export const DO_TOKEN = 'DO_TOKEN'
//------------------------ Actions

export const login = createAction(DO_LOGIN)
export const signup = createAction(DO_SIGNUP)
export const logout = createAction(DO_LOGOUT, () => {
  localStorage.removeItem('jogging_tracker')
})
export const saveProfile = createAction(SAVE_PROFILE)
export const getProfile = createAction(GET_PROFILE)
export const doToken = createAction(DO_TOKEN)

const getInitialState = () => {
    let authRestore = JSON.parse(localStorage.getItem('jogging_tracker') || null)
    return authRestore ? {
        token: authRestore.token,
        me: authRestore.info,
        status: 'INIT',
        error: null
    } : {
        token: null,
        me: null,
        status: 'INIT',
        error: null
    }
}
//------------------------ Reducer

export default handleActions({
    [requestSuccess(DO_TOKEN)]: (state, { payload }) => ({
        ...state,
        token: payload.data.access,
        status: requestSuccess(DO_TOKEN)
    }),

    [requestSuccess(DO_SIGNUP)]: (state, { payload }) => ({
        ...state,
        status: requestSuccess(DO_SIGNUP),
        error: null
      }),
      
      [requestFail(DO_SIGNUP)]: (state, { payload }) => ({
        ...state,
        token: null,
        status: requestFail(DO_SIGNUP),
        me: null,
        error: payload
      }),

      [DO_LOGOUT]: (state, {payload}) => ({
        ...state,
        token: null,
        state: DO_LOGOUT,
        me: null,
        error:null
      }),

      [requestSuccess(SAVE_PROFILE)]: (state, { payload }) => ({
        ...state,
        status: requestSuccess(SAVE_PROFILE),
        me: payload,
        error: null
      }),

      [requestSuccess(GET_PROFILE)]: (state, { payload }) => ({
        ...state,
        status: requestSuccess(GET_PROFILE),
        me: payload.data,
        error: null
      }),
}, getInitialState())