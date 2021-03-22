const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default  
const axious = require('axios')
const initialState = {
    loading: false,
    users:[],
    error:''
}

//defining the actions type
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

//action creator

const fetchUsersRequest = () => {
    return{
        type:FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return{
        type:fetchUsersSucess,
        payload: users

    }
}

const fetchUsersFailure = error => {
    return{
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}

//define reducer function

const reducer = (state = initialState, action ) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading:true
            }
        
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading:false,
                users:[],
                error:action.payload
            }    
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axious.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            const users = response.data
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error => {
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

//create redux Store --and pass the reducer function

const store = createStore(reducer,applyMiddleware(thunkMiddleware))

//subscibe to store
store.subscribe(()=> {console.log(store.getState())})
 
//dispatch 

store.dispatch(fetchUsers)