import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'

//------------------------ Constants
export const DO_LOGIN = 'DO_LOGIN'
export const DO_SIGNUP = 'DO_SIGNUP'

//------------------------ Actions

export const login = createAction(DO_LOGIN)
export const signup = createAction(DO_SIGNUP)

const getInitialState = () => {
    let authRestore = JSON.parse(localStorage.getItem('jogging_tracker') || null)
    return authRestore ? {
        token: authRestore.token,
        me: authRestore.info,
        status: 'INIT',
        error: null
    } : {
        toekn: null,
        me: null,
        status: 'INIT',
        error: null
    }
}
//------------------------ Reducer

export default handleActions({
    [requestSuccess(DO_LOGIN)]: (state, { payload }) => ({
        ...state,
        token: payload.token,
        status: requestSuccess(DO_LOGIN),
        me: payload.info
      }),
    
    [requestFail(DO_LOGIN)]: (state, { payload }) => ({
        ...state,
        token: null,
        status: requestFail(DO_LOGIN),
        me: null,
        error: payload
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
}, getInitialState())