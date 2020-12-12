import { loadState, saveState } from '../localStorage';

const initState = {
    logined: false,
    currentUser: null,
    profilePic: '',
    usertype: null,
    error: {usernameError: '', passwordError: ''}
}

if (!loadState("userReducer")){
    saveState("userReducer", initState)	
}

const userReducer = (state = loadState("userReducer"), action) => {
    switch (action.type) {
        case 'ERROR':
            return {login: false, currentUser: null, usertype: null, error: {usernameError: action.error.username, passwordError: action.error.password}}
        case 'LOGIN':
            // check user type 
            return {logined: true, currentUser: action.username, profilePic: action.profilePic, usertype: action.usertype, error: {usernameError: '', passwordError: ''}}
        case 'LOGOUT':
            // check user type 
            return {logined: false, currentUser: null, profilePic: '', usertype: null, error: {usernameError: '', passwordError: ''}}
        default:
            return state
    }
}


export default userReducer;