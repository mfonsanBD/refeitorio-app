import styled from "styled-components";

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color:#FF9900;
        justify-content:center;
        align-items:center;
        padding: 25px;
    `,
    Card: styled.TouchableHighlight`
        background-color:#FFFFFF;
        padding:20px;
        justify-content:space-between;
        align-items:center;
        flex-direction:row;
        width:100%;
        border-radius:10px;
        margin-bottom:10px;
    `,
    Description: styled.View``,
    Button: styled.View`
        background-color:#FF9900;
        padding:12px;
        border-radius:5px;
    `,
}