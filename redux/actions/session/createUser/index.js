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
        fetch()

    }
}

const configureUserInfo = (userInfo) => {
    const {} = userInfo;
}

export default createUser;