export default function (state = {
    inputdata: {},
}, action) {

    switch (action.type) {
        case 'SUBMIT_FORM':
            return { ...state, inputdata: action.payload }

        default:
            return state;
    }


}