import React, { useState, useEffect } from 'react';
import { Modal, Text, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../service/api';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ListCategory(){
    const navigation = useNavigation();

    const [showSuccessModal, setShowSuccessModal]   = useState(false);
    const [showWarningModal, setShowWarningModal]   = useState(false);
    const [showDangerModal, setShowDangerModal]     = useState(false);

    const [successMessage, setSuccessMessage]       = useState('Categoria atualizada com sucesso!');
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

    const [categoryList, setCategoryList] = useState([]);
    const [modalCategory, setModalCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    const [optionsModal, setOptionsModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [newCategoryName, setNewCategoryName] = useState('');

    const getCategories = async () => {
      setLoading(true);
      const request = await api.getCategoriesList();
      setCategoryList(request);
      setLoading(false);
    }

    useEffect(()=>{
        getCategories();
    },[]);

    const options = (name, id) => {
      setModalCategory({name, id});
      setNewCategoryName(name);
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

    const deleteCategory = async (id) => {
      const resultado = await api.deleteCategory(id);
      if(!resultado.error){
        setDeleteModal(false);
        setSuccessMessage("Categoria excluída com sucesso!");
        setShowSuccessModal(true);
      }
      else{
        setWarningMessage(resultado.error);
        setShowWarningModal(true);
      }
    }

    const updateCategory = async (id) => {
      if(newCategoryName === ''){
        setWarningMessage("O campo NOME DA CATEGORIA é obrigatório.");
        setShowWarningModal(true);
      }
      else{
        const resultado = await api.updateCategory(newCategoryName, id);

        if(!resultado.error){
          setEditModal(false);
          setShowSuccessModal(true);
        }
        else{
          setWarningMessage(resultado.error);
          setShowWarningModal(true);
        }
      }
    }

    const refresh = () => {
      getCategories();
      setShowSuccessModal(false);
    }

    return(
      <D.Container>
        <D.Header>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={()=>navigation.goBack()}/>
          <Text style={style({}).headerTitle}>Lista de Categorias</Text>
          <MaterialCommunityIcons name="plus-box" size={28} color="#333333" onPress={()=>navigation.navigate("AddCategory")}/>
        </D.Header>

        {loading &&
          <D.LoadingArea>
            <ActivityIndicator size="large" color="#FF9900" />
          </D.LoadingArea>
        }
        {!loading && categoryList.length === 0 &&
          <D.EmptyCategory>
              <MaterialCommunityIcons name="information-outline" size={60} color="#AAAAAA" />
              <Text style={style({}).EmptyCategoryText}>Nenhuma categoria cadastrada no sistema.</Text>
          </D.EmptyCategory>
        }
        {!loading &&
          <D.List
          data={categoryList}
          renderItem={({item: category}) => (
            <D.Category onPress={()=>options(category.nome, category.id)} underlayColor="#ededed">
              <>
              <Text style={style({}).categoryName}>{category.nome}</Text>
              <D.DishButton>
                <MaterialCommunityIcons name="square-edit-outline" size={24} color="#333333" />
              </D.DishButton>
              </>
            </D.Category>
          )}
          keyExtractor={category => String(category.id)}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={getCategories}
          />
        }
        <Modal 
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={optionsModal}
          onRequestClose={()=>setOptionsModal(false)}
          >
            <D.ModalActionsContainer>
              <D.ModalHeader>
                <D.Close onPress={()=>setOptionsModal(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                </D.Close>
              </D.ModalHeader>
              <D.ModalContent>
                <Text style={style({}).modalTitle}>O que deseja fazer com a categoria: <Text style={style({}).modalTitleCategoryName}>{modalCategory.name}</Text>?
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
            </D.ModalActionsContainer>
        </Modal>
        <Modal 
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={deleteModal}
          onRequestClose={()=>setDeleteModal(false)}
        >
            <D.ModalActionsContainer>
              <D.ModalHeader>
                <D.Close onPress={()=>setDeleteModal(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                </D.Close>
              </D.ModalHeader>
              <D.ModalContent>
                <Text style={style({}).modalTitle}>Tem certeza que deseja excluir a categoria: <Text style={style({}).modalTitleCategoryName}>{modalCategory.name}</Text>?
                </Text>
                <D.Actions>
                  <D.DeleteActionItem onPress={()=>setDeleteModal(false)} action="edit">
                    <Text style={style({action: "edit"}).ActionTitle}>Não, Cancelar</Text>
                  </D.DeleteActionItem>
                  <D.DeleteActionItem onPress={()=>deleteCategory(modalCategory.id)} action="delete">
                    <Text style={style({action: "delete"}).ActionTitle}>Sim, Excluir</Text>
                  </D.DeleteActionItem>
                </D.Actions>
              </D.ModalContent>
            </D.ModalActionsContainer>
        </Modal>
        <Modal 
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={editModal}
          onRequestClose={()=>setEditModal(false)}>
            <D.ModalActionsContainer>
              <D.ModalHeader>
                <D.Close onPress={()=>setEditModal(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                </D.Close>
              </D.ModalHeader>
              <D.ModalContent>
                <Text style={style({}).modalTitle}>Editando a categoria: <Text style={style({}).modalTitleCategoryName}>{modalCategory.name}</Text>.
                </Text>
                <D.InputArea>
                  <D.Label>Nome da Categoria</D.Label>
                  <D.Input
                    placeholder={modalCategory.name}
                    placeholderTextColor="#C4C4C4"
                    value={newCategoryName}
                    onChangeText={t=>setNewCategoryName(t)}
                  />
                </D.InputArea>
                <D.Actions>
                  <D.EditActionItem onPress={()=>updateCategory(modalCategory.id)}>
                    <Text style={style({action: "delete"}).ActionTitle}>Salvar Alterações</Text>
                  </D.EditActionItem>
                </D.Actions>
              </D.ModalContent>
            </D.ModalActionsContainer>
        </Modal>

        {modaltypes.map((item, index)=>(
            <Modal key={index} animationType="slide" transparent={true} statusBarTranslucent={true} visible={item.show}>
                <D.ModalContainer>
                    <Text style={style({}).modalTitleText}>{item.title}!</Text>
                    <D.CircleOpacity modalType={item.type}>
                        <D.Circle modalType={item.type}>
                            <MaterialCommunityIcons name={item.iconName} size={60} color={item.type === 'warning' ? "#333333" : "#FFFFFF"} />
                        </D.Circle>
                    </D.CircleOpacity>

                    <Text style={style({modalType: item.type}).message}>{item.message}</Text>
                    
                    {item.type === 'success' &&
                        <D.BackToHome 
                            modalType={item.type} 
                            onPress={()=>refresh()}
                        >
                            <Text
                                style={style({modalType: item.type}).backToHomeText}
                            >
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
                        <D.BackToHome 
                            modalType={item.type} 
                            onPress={()=>navigation.navigate('Home')}
                        >
                            <Text
                                style={style({modalType: item.type}).backToHomeText}
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
      color: '#AAAAAA'
    },
    modalTitle: {
      width: '100%',
      textAlign:'center',
      fontSize:16,
      fontFamily:'PoppinsRegular',
      color: '#666666',
      marginBottom: 20
    },
    modalTitleCategoryName: {
      color: '#FF9900',
      fontFamily:'PoppinsBold',
    },
    ActionTitle: {
      fontSize: 16,
      color: props.action === "delete" ? '#FFFFFF' : '#AAAAAA',
      fontFamily:'PoppinsMedium',
    },
    modalTitleText: {
        fontFamily:'PoppinsBold',
        fontSize: 28,
        color: '#495057'
    },
    message: {
        fontFamily:'PoppinsMedium',
        width: props.modalType === 'success' ? '70%' : '100%',
        textAlign:'center',
        fontSize:18,
        color: '#AAAAAA',
    },
    backToHomeText: {
        color: props.modalType === 'warning' ? '#333333' : '#FFFFFF',
        fontFamily:'PoppinsBold',
        textAlign:'center',
    },
    EmptyCategoryText: {
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