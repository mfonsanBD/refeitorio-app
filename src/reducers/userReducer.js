const initialState = {
    dishes: [], //pratos escolhidos
    menu: '', //id do cardápio do dia
};

export default function userReducer(state = initialState, action) {
    switch(action.type){
        case 'SET_DISHES':
            return {
                ...state, 
                dishes: action.payload.dishes
            };
        case 'SET_MENU':
            return {
                ...state,
                menu: action.payload.menu
            };
        default:
            return state;
    }
}