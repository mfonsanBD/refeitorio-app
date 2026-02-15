import React, { useState, useEffect } from 'react';
import { Modal, Text, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../service/api';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SelectCategoryButton from '../../components/SelectCategoryButton';

export default function ListDish(){
    const navigation = useNavigation();

    const [showSuccessModal, setShowSuccessModal]   = useState(false);
    const [showWarningModal, setShowWarningModal]   = useState(false);
    const [showDangerModal, setShowDangerModal]     = useState(false);

    const [successMessage, setSuccessMessage]       = useState('Cardápio de hoje montado e disponível!');
    const [warningMessage, setWarningMessage]       = useState('Ao menos um prato precisa estar selecionado para criar um cardápio.');
    const [errorMessage, setErrorMessage]           = useState('Infelizmente não foi possível criar um cardápio. Tente novamente em alguns instantes.');

    const modaltypes = [
        {
            show: showSuccessModal,
            title: 'Parabéns',
            type: 'success',
            iconName: 'check',
            message: successMessage
        },
        {
            show: showWarningModal,
            title: 'Aviso',
            type: 'warning',
            iconName: 'check',
            message: warningMessage
        },
        {
            show: showDangerModal,
            title: 'Erro',
            type: 'danger',
            iconName: 'close',
            message: errorMessage
        },
    ];

    const [dishList, setDishList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [modalCategory, setModalCategory] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const [optionsModal, setOptionsModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [newDishName, setNewDishName]             = useState('');
    const [newDishStatus, setNewDishStatus]         = useState(true);
    const [newDishCategory, setNewDishCategory]     = useState('');
    const [dishId, setDishId]                       = useState('');

    const getDishes = async () => {
      setLoading(true);
      const requestDish = await api.getDishList();
      const requestCategory = await api.getCategoriesList();
      setDishList(requestDish);
      setCategoryList(requestCategory);
      setLoading(false);
    }
    
    useEffect(()=>{
      setNewDishStatus(isEnabled);
    },[isEnabled]);

    useEffect(()=>{
      getDishes();
    },[]);

    const options = (name, id, category, status) => {
      setModalCategory({name, id, category, status});
      setNewDishName(name);
      setNewDishCategory(category);
      setIsEnabled(status);
      setDishId(id);
      setOptionsModal(true);
    }

    const actionDeleteModal = () => {
      setOptionsModal(false);
      setDeleteModal(true);
    }

    const actionEditModal = () => {
      setOptionsModal(false);
      setEditModal(true);
    }

    const deleteDish = async (id) => {
      const resultado = await api.deleteDish(id);
      if(!resultado.error){
        setDeleteModal(false);
        setSuccessMessage("Prato excluído com sucesso!");
        setShowSuccessModal(true);
        getDishes();
      }
      else{
        setWarningMessage(resultado.error);
        setShowWarningModal(true);
      }
    }

    const updateDish = async () => {
      if(newDishName === ''){
        setWarningMessage('O campo NOME DO PRATO é obrigatório.');
        setShowWarningModal(true);
      }
      else if(newDishCategory === ''){
        setWarningMessage('O campo CATEGORIA é obrigatório.');
        setShowWarningModal(true);
      }
      else{
        const resultado = await api.updateDish(newDishName, newDishCategory, newDishStatus, dishId);
        if(!resultado.error){
          setSuccessMessage('Prato '+ newDishName +' atualizado com sucesso!');
          setShowSuccessModal(true);
          setEditModal(false);
          getDishes();
        }
        else{
          setWarningMessage(resultado.error);
          setShowWarningModal(true);
        }
      }
    }

    const refresh = () => {
      getDishes();
      setShowSuccessModal(false);
    }

    return(
      <D.Container>
        <D.Header>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={()=>navigation.goBack()}/>
          <Text style={style({}).headerTitle}>Lista de Pratos</Text>
          <MaterialCommunityIcons name="plus-box" size={28} color="#333333" onPress={()=>navigation.navigate("AddDish")}/>
        </D.Header>

        {loading &&
          <D.LoadingArea>
            <ActivityIndicator size="large" color="#FF9900" />
          </D.LoadingArea>
        }
        {!loading && dishList.length === 0 &&
          <D.EmptyDish>
              <MaterialCommunityIcons name="information-outline" size={60} color="#AAAAAA" />
              <Text style={style({}).EmptyDishText}>Nenhum prato cadastrado no sistema.</Text>
          </D.EmptyDish>
        }
        {!loading &&
          <D.List
          data={dishList}
          renderItem={({item: dish}) => (
            <D.Category onPress={()=>options(dish.nome, dish.id, dish.categoria_id, dish.status)} underlayColor="#ededed">
              <>
              <Text style={style({}).categoryName}>{dish.nome}</Text>
              <D.DishButton>
                <MaterialCommunityIcons name="square-edit-outline" size={24} color="#333333" />
              </D.DishButton>
              </>
            </D.Category>
          )}
          keyExtractor={dish => String(dish.id)}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={getDishes}
          />
        }

        <Modal 
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={optionsModal}
          onRequestClose={()=>setOptionsModal(false)}>
            <D.ModalActionContainer>
              <D.ModalHeader>
                <D.Close onPress={()=>setOptionsModal(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                </D.Close>
              </D.ModalHeader>
              <D.ModalContent>
                <Text style={style({}).modalActionTitle}>O que deseja fazer com o prato: <Text style={style({}).modalTitleCategoryName}>{modalCategory.name}</Text>?
                </Text>
                <D.Actions>
                  <D.ActionsItem onPress={()=>actionEditModal()} action="edit">
                    <MaterialCommunityIcons name="square-edit-outline" size={24} color="#AAAAAA" />
                    <Text style={style({action: "edit"}).ActionTitle}>Editar</Text>
                  </D.ActionsItem>
                  <D.ActionsItem onPress={()=>actionDeleteModal()} action="delete">
                    <MaterialCommunityIcons name="trash-can-outline" size={24} color="#FFFFFF" />
                    <Text style={style({action: "delete"}).ActionTitle}>Excluir</Text>
                  </D.ActionsItem>
                </D.Actions>
              </D.ModalContent>
            </D.ModalActionContainer>
        </Modal>
        <Modal 
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={deleteModal}
          onRequestClose={()=>setDeleteModal(false)}>
            <D.ModalActionContainer>
              <D.ModalHeader>
                <D.Close onPress={()=>setDeleteModal(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                </D.Close>
              </D.ModalHeader>
              <D.ModalContent>
                <Text style={style({}).modalActionTitle}>Tem certeza que deseja excluir o prato: <Text style={style({}).modalTitleCategoryName}>{modalCategory.name}</Text>?
                </Text>
                <D.Actions>
                  <D.DeleteActionItem onPress={()=>setDeleteModal(false)} action="edit">
                    <Text style={style({action: "edit"}).ActionTitle}>Não, Cancelar</Text>
                  </D.DeleteActionItem>
                  <D.DeleteActionItem onPress={()=>deleteDish(modalCategory.id)} action="delete">
                    <Text style={style({action: "delete"}).ActionTitle}>Sim, Excluir</Text>
                  </D.DeleteActionItem>
                </D.Actions>
              </D.ModalContent>
            </D.ModalActionContainer>
        </Modal>
        <Modal 
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={editModal}
          onRequestClose={()=>setEditModal(false)}>
            <D.ModalActionContainer>
              <D.ModalHeader>
                <D.Close onPress={()=>setEditModal(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                </D.Close>
              </D.ModalHeader>
              <D.ModalContent>
                <D.InputArea>
                  <D.Label>Nome do Prato</D.Label>
                  <D.Input
                    placeholder={modalCategory.name}
                    placeholderTextColor="#AAAAAA"
                    value={newDishName}
                    onChangeText={t=>setNewDishName(t)}
                  />
                </D.InputArea>
                <D.InputArea>
                  <D.Label>Categoria</D.Label>
                  <SelectCategoryButton
                    opcoes={categoryList}
                    onChangeSelect={(id) => setNewDishCategory(id)}
                    text="Selecione uma opção..."
                    categoryName={
                      categoryList.map(categoria=>{
                        if (categoria.id === modalCategory.category){
                          return categoria.nome
                        }
                      })
                    }
                    buttonSpace={200}
                  />
                </D.InputArea>
                <D.ToogleDishStatus>
                  <D.Checkbox onPress={() => setIsEnabled(!isEnabled)}>
                    <MaterialCommunityIcons name={isEnabled ? 'square-outline' : 'checkbox-marked' } size={24} color={isEnabled ? '#AAAAAA' : '#0D6EFD' } />
                    <Text style={style({}).toogleDishStatusText}>
                      Desabilitar esse prato.
                    </Text>
                  </D.Checkbox>
                </D.ToogleDishStatus>
                <D.Actions>
                  <D.EditActionItem onPress={()=>updateDish()}>
                    <Text style={style({action: "delete"}).ActionTitle}>Salvar Alterações</Text>
                  </D.EditActionItem>
                </D.Actions>
              </D.ModalContent>
            </D.ModalActionContainer>
        </Modal>

        {modaltypes.map((item, index)=>(
            <Modal key={index} animationType="slide" transparent={true} statusBarTranslucent={true} visible={item.show}>
                <D.ModalContainer>
                    <Text style={style({}).modalTitle}>{item.title}!</Text>
                    <D.CircleOpacity modalType={item.type}>
                        <D.Circle modalType={item.type}>
                            <MaterialCommunityIcons name={item.iconName} size={60} color={item.type === 'warning' ? "#333333" : "#FFFFFF"} />
                        </D.Circle>
                    </D.CircleOpacity>

                    <Text style={style({modalType: item.type}).message}>{item.message}</Text>
                    
                    {item.type === 'success' &&
                      <D.BackToHome
                          modalType={item.type}
                          button={'saveMenu'}
                          onPress={()=>refresh()}
                      >
                          <Text style={style({modalType: item.type}).backToHomeText}>
                              Voltar para a Tela Inicial
                          </Text>
                      </D.BackToHome>
                    }
                    {item.type === 'warning' &&
                        <D.BackToHome 
                            modalType={item.type}
                            onPress={()=>setShowWarningModal(false)}
                        >
                            <Text style={style({modalType: item.type}).backToHomeText}>
                                Corrigir
                            </Text>
                        </D.BackToHome>
                    }
                    {item.type === 'danger' &&
                        <D.BackToHome modalType={item.type}>
                            <Text
                                style={style({modalType: item.type}).backToHomeText}
                                onPress={()=>navigation.navigate('Home')}
                            >
                                Voltar para a Tela Inicial
                            </Text>
                        </D.BackToHome>
                    }
                </D.ModalContainer>
            </Modal>
        ))}
      </D.Container>
    )
}

const style = (props) => StyleSheet.create({
    headerTitle: {
        flex: 1,
        textAlign:'center',
        fontSize:18,
        fontFamily:'PoppinsBold',
        color: '#333333'
    },
    categoryName: {
      width: '70%',
      fontSize: 16,
      fontFamily:'PoppinsMedium',
      color: '#AAAAAA',
    },
    modalActionTitle: {
      width: '100%',
      textAlign:'center',
      fontSize:16,
      fontFamily:'PoppinsRegular',
      color: '#333333',
      marginBottom: 20
    },
    modalTitleCategoryName: {
      fontFamily:'PoppinsBold',
      color: '#FF9900',
    },
    ActionTitle: {
      fontSize: 16,
      color: props.action === "delete" ? '#FFFFFF' : '#AAAAAA',
      fontFamily:'PoppinsMedium',
    },
    modalTitle: {
        fontFamily:'PoppinsBold',
        fontSize: 28,
        color: '#495057'
    },
    message: {
        fontFamily:'PoppinsMedium',
        width: props.modalType === 'success' ? '60%' : '100%',
        textAlign:'center',
        fontSize:18,
        color: '#AAAAAA',
    },
    backToHomeText: {
        color: props.modalType === 'warning' ? '#333333' : '#FFFFFF',
        fontFamily:'PoppinsBold',
        textAlign:'center',
    },
    label: {
        width:'100%',
        fontSize:16,
        color: '#495057',
        marginBottom:10,
        fontFamily:'PoppinsMedium'
    },
    saveChangesButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily:'PoppinsBold',
    },
    toogleDishStatusText: {
        fontSize:16,
        color:'#AAAAAA',
        fontFamily:'PoppinsRegular',
        marginLeft: 5
    },
    EmptyDishText: {
        width: '70%',
        fontFamily:'PoppinsMedium',
        textAlign:'center',
        fontSize:18,
        color: '#AAAAAA',
    },
    actionsText: {
      fontFamily:'PoppinsMedium',
      color: '#333333',
    },
})