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
    Label: styled.Text`
        font-size:16px;
        color: #495057;
        margin-bottom:10px;
        font-family:PoppinsMedium;
    `,
    Input: styled.TextInput`
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
        border:1px solid #DDDDDD;
        background-color: #FFFFFF;
        border-radius: 5px;
        color: #8863E6;
        font-size: 16px;
        padding:15px 0;
        margin-bottom:20px;
    `,
    SaveButton: styled.TouchableOpacity`
        background-color:#FF9900;
        justify-content:center;
        align-items:center;
        padding:15px;
        border-radius: 5px;
    `,
    SaveButtonText: styled.Text`
        font-family:PoppinsBold;
        color: #FFFFFF;
        font-weight:bold;
        font-size: 16px;
    `,
    ModalContainer: styled.View`
        flex:1;
        padding:60px 25px 30px;
        background-color:#FFFFFF;
        justify-content:space-between;
        align-items:center;
    `,
    ModalTitle: styled.Text`
        font-family:PoppinsBold;
        font-size:28px;
        color: #495057;
        font-weight:bold;
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
                return "background-color: rgb(165, 220, 134);"
            } else if (props.modalType === 'warning') {
                return "background-color: rgb(250, 206, 168);"
            } else {
                return "background-color: rgb(242, 116, 116);"
            }
        }}
        width:100%;
        padding:15px;
        justify-content:center;
        align-items:center;
        border-radius: 5px;
    `,
}