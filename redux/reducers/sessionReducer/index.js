
const initialState = {
    userInfo: {
        userId: '',
        firstName: '',
        lastName: '',
        age: '',
        weight: '',
        height: '',
        contactInfo: {
            email: '',
            phoneNumber: ''
        },
    },
    sessionInfoLoading: false
}

const sessionReducer = (state=initialState, action) => {
    let {type} = action;
    switch(type) {
        default:
            return {
                ...state
            }
    }
}

export default sessionReducer;