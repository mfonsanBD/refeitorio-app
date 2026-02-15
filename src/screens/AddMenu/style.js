import styled from "styled-components";

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color:#F5F6FA;
        padding: 25px;
    `,
    Header: styled.View`
        margin-top: 20px;
        margin-bottom: 20px;
        flex-direction:row;
        align-items:center;
    `,
    List: styled.FlatList`
        margin:0 0 15px;
    `,
    SaveButton: styled.TouchableOpacity`
        background-color:#FF9900;
        justify-content:center;
        align-items:center;
        padding:15px;
        border-radius: 5px;
    `,
    ItemsCategories: styled.View`
        margin-bottom:20px;
        padding-bottom:20px;
        border-bottom-width: 1px;
        border-bottom-color:#C4C4C4;
    `,
    DishContainer: styled.View`
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
    `,
    Dish: styled.TouchableOpacity`
        flex-direction:row;
        align-items:center;
        padding:5px 0;
        margin-bottom:5px;
    `,
    DishButton: styled.TouchableOpacity`
    `,
    ModalContainer: styled.View`
        flex:1;
        padding:60px 25px 30px;
        background-color:#FFFFFF;
        justify-content:space-between;
        align-items:center;
    `,
    CircleOpacity: styled.View`
        width:135px;
        height:135px;
        
        ${props => {
            if (props.modalType === 'success') {
                return "background-color: rgba(165, 220, 134, 0.1);"
            } else if (props.modalType === 'warning') {
                return "background-color: rgba(250, 206, 168, 0.1);"
            } else {
                return "background-color: rgba(242, 116, 116, 0.1);"
            }
        }}

        border-radius:70px;
        justify-content:center;
        align-items:center;
    `,
    Circle: styled.View`
        width:100px;
        height:100px;
        
        ${props => {
            if (props.modalType === 'success') {
                return "background-color: rgb(165, 220, 134);"
            } else if (props.modalType === 'warning') {
                return "background-color: rgb(250, 206, 168);"
            } else {
                return "background-color: rgb(242, 116, 116);"
            }
        }}

        border-radius:50px;
        justify-content:center;
        align-items:center;
    `,
    TwoButton: styled.View`
        width:100%;
        flex-direction:row;
        justify-content:space-between;
    `,
    BackToHome: styled.TouchableOpacity`
        ${props => {
            if (props.modalType === 'success') {
                let width;

                if(props.button === 'saveMenu'){
                    width = 'width:100%';
                }else{
                    width = 'width:48%';
                }

                return "background-color: rgb(165, 220, 134);"+width+";padding:15px 30px 10px;"
                
            } else if (props.modalType === 'warning') {
                return "background-color: rgb(250, 206, 168);width:100%;padding:15px;"
            } else {
                return "background-color: rgb(242, 116, 116);width:100%;padding:15px;"
            }
        }}

        justify-content:center;
        align-items:center;
        border-radius: 5px;
    `,
    ActionsMain: styled.View`
        flex:1;
        background-color:rgba(0, 0, 0, 0.8);
    `,
    ModalActionsContainer: styled.View`
        width:100%;
        border-top-width:5px;
        border-top-color:#FF9900;
        background-color:#FFFFFF;
        padding:20px 50px 50px;
        position:absolute;
        bottom:0;
        display:flex;
        align-items:flex-end;
        justify-content:space-between;
    `,
    CloseModalButton:styled.TouchableOpacity`
        width: 40px;
        height: 40px;
        justify-content:center;
        align-items:center;
        background-color:#FF9900;
        border-radius:20px;
    `,
    ToogleDishStatus: styled.View`
        width:100%;
        margin:50px 0px 30px;
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
    `,
    Input: styled.TextInput`
        width:100%;
        border:1px solid #DDDDDD;
        background-color: #FFFFFF;
        border-radius: 5px;
        color: #495057;
        font-size: 16px;
        padding:10px;
        margin-bottom:20px;
        font-family:PoppinsRegular;
    `,
    Select: styled.View`
        width:100%;
        border:1px solid #DDDDDD;
        background-color: #FFFFFF;
        border-radius: 5px;
        color: #8863E6;
        font-size: 16px;
        padding:15px 0;
        margin-bottom:20px;
    `,
    SaveChangesButton: styled.TouchableOpacity`
        width:100%;
        background-color:#FF9900;
        justify-content:center;
        align-items:center;
        padding:15px;
        border-radius: 5px;
    `,
    LoadingArea: styled.View`
        flex:1;
        align-items: center;
        justify-content: center;
    `,
}