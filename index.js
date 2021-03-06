const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = "BUY_CAKE"
const BUY_ICECREAM = "BUY_ICECREAM "
//define action --> An action is an object with type property

// {
//    type:BUY_CAKE ,
//    info:'First redux action'
// }

//Action Creator ---> is a function That returns the action

function buyCake() {
    return {
        type:BUY_CAKE ,
        info:'First redux action'
     }
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM
    }
}

// <--Implementing Reducer-->
//(previousState, action) => newState

//state of application

// const initialState = {
//     numOfCakes : 10, 
//     numOfIceCreams: 20
// }


//two object for initial state
const initialCakeState = {
    numOfCakes : 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20
}


// <--Implementing Reducer-->

//reducer function which controls how the state transtion happens


// const reducer = (state = initialState, action) => {
//     switch(action.type){
//         case BUY_CAKE: return {
//             ...state, 
//             numOfCakes: state.numOfCakes - 1
//         }

//         case BUY_ICECREAM: return {
//             ...state,
//             numOfIceCreams: state.numOfIceCreams - 1
//         }
//         default:return state
//     }
// }

//spliting reducers into two

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state, 
            numOfCakes: state.numOfCakes - 1
        }    
        default:return state
    }
}


const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default:return state
    }
}

//holding multiple reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer,applyMiddleware(logger))
// const store = createStore(reducer) //redux store holding the application state
console.log("initial state", store.getState()); //allowing access to the state via getState()

// store.subscribe(() => console.log('Updated state', store.getState())) //Allow the app to subscribe to changes in the store ,that is acchieved by using subscribe method

// const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake()) //dispatch method accepts a action method as an parameter
store.dispatch(buyCake()) // Allow state to be updated via dispatch(action)
store.dispatch(buyCake()) 
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

unsubscribe()