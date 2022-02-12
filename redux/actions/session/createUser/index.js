import RouteConsts from "../../../../config/RouteConsts";
const { baseUrl } = RouteConsts;

const createUser = (newUserInfo) => {

    return async dispatch => {
        dispatch({type: 'SIGNING_UP'});

        let configuredUrl = `${baseUrl}/users`;
        let configuredUserInfo = configureUserInfo(newUserInfo)
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(configuredUserInfo)
        }
        fetch(configuredUrl, options)
            .then(res => res.json())
            .then(data => {
                let { errorHash } = data;
                let { hasError } = errorHash;
                if (hasError === true) {
                    let {message} = errorHash;
                    return dispatch({type: 'SIGN_UP_ERROR', message})
                } else {
                    let {userInfo} = data;
                    return dispatch({type: 'SIGN_UP_SUCCESS', userInfo})
                }
            })

    }
}

const configureUserInfo = (userInfo) => {
    const {firstName, lastName, password, email, phoneNumber, age, weight, height} = userInfo;
    return {
        f_name: firstName,
        l_name: lastName,
        password: password,
        email: email,
        phone_number: phoneNumber,
        age: age,
        weight: weight,
        height: height,
    }
}

export default createUser;