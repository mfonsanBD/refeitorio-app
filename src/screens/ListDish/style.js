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
  List: styled.FlatList``,
  LoadingArea: styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
  `,
  Category: styled.TouchableHighlight`
    background-color: #FFFFFF;
    margin-bottom: 10px;
    padding: 20px 10px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  DishButton: styled.View`
    background-color:#EDEDED;
    padding: 5px 10px;
    border-radius: 5px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  ModalActionContainer: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
  `,
  ModalContent: styled.View`
    width:90%;
    border-top-width:5px;
    border-top-color:#FF9900;
    background-color:#FFFFFF;
    padding:20px 50px;
    align-items: center;
  `,
  ModalHeader: styled.View`
    width: 100%;
    align-items: flex-end;
    padding: 0 20px;
    margin-bottom: 10px;
  `,
  Close: styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #FF9900;
    justify-content: center;
    align-items: center;
  `,
  Actions: styled.View`
    flex-direction: row;
  `,
  ActionsItem: styled.TouchableOpacity`
    flex: 1;
    background-color: ${(props) => props.action === "edit" ? '#EDEDED' : 'rgb(242, 116, 116)'};
    padding: 10px;
    border-radius: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
  `,
  DeleteActionItem: styled.TouchableOpacity`
    background-color: ${(props) => props.action === "edit" ? '#F9F9F9' : 'rgb(242, 116, 116)'};
    padding: 10px 15px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
  `,
  EditActionItem: styled.TouchableOpacity`
    width: 100%;
    background-color: #FF9900;
    padding: 10px 15px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
  `,
  Checkbox: styled.TouchableOpacity`
    flex-direction: row;
  `,
  InputArea: styled.View`
    width: 100%;
    text-align: left;
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
  ToogleDishStatus: styled.View`
    width:100%;
    margin:20px 0px;
    flex-direction:row;
  `,
  Select: styled.View`
    width:100%;
    border:1px solid #DDDDDD;
    background-color: #FFFFFF;
    border-radius: 5px;
    color: #8863E6;
    font-size: 16px;
    padding:15px 0;
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
  EmptyDish: styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
  `,
}