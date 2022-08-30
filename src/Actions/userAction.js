export const loginAction = (data) => {
    console.log("Data dari page LOGIN", data);
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const logoutAction = () => {
    localStorage.removeItem('HelloLog')
    return {
        type: "LOGOUT_SUCCESS"
    }
}