
export const loginUser = (username, password, props) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            
            if (data.errors) {
                dispatch({ type: "ERROR", error: data.errors })
                if (data.errors.username.length > 0) {
                    alert(data.errors.username)
                } else if (data.errors.password.length > 0) {
                    alert(data.errors.password)
                }
            }
            if (data.username) {
                dispatch({ type: "LOGIN", username: data.username, profilePic: data.profilePic, usertype: data.usertype })
                props.history.push('/')
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const signUpUser = (username, password, props) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({ username, password, usertype: 'user' }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            if (data.errors) {
                dispatch({ type: "ERROR", error: data.errors, usertype: 'user'})
                if (data.errors.username.length > 0) {
                    alert(data.errors.username)
                }
            }
            if (data.username) {
                dispatch({ type: "LOGIN", username: data.username, usertype: 'user', profilePic: data.profilePic})
                props.history.push('api')
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const logOutUser = (props) => {
    return async (dispatch, getState) => {
        try {
            await fetch('/api/logout')
            dispatch({ type: "LOGOUT"})
        } catch (err) {
            console.log(err)
        }
    }
}