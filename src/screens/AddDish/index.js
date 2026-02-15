import React, { useState, useEffect } from 'react';
import { Modal, Text, StyleSheet } from 'react-native';
import api from '../../service/api';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SelectCategoryButton from '../../components/SelectCategoryButton';

export default function AddDish(){
    const navigation = useNavigation();

    const [categoryList, setCategoryList] = useState([]);

    const getCategories = async () => {
        const request = await api.getCategoriesList();
        setCategoryList(request);
    }

    useEffect(()=>{
        getCategories();
    },[]);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showDangerModal, setShowDangerModal] = useState(false);

    const [warningMessage, setWarningMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('Infelizmente não foi possível criar um cardápio. Tente novamente em alguns instantes.');

    const modaltypes = [
        {
            show: showSuccessModal,
            title: 'Parabéns',
            type: 'success',
            iconName: 'check',
            message: 'Prato adicionado com sucesso.'
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

    const [dishName, setDishName] = useState('');
    const [dishCategory, setDishCategory] = useState('');

    const addDish = async () => {
        if(dishName === ''){
            setWarningMessage("O campo NOME DO PRATO é obrigatório!");
            setShowWarningModal(true);
        }
        else if(dishCategory === ''){
            setWarningMessage("O campo CATEGORIA é obrigatório!");
            setShowWarningModal(true);
        }
        else{
            const request = await api.insertDish(dishName, dishCategory);

            if(!request.error){
                setShowSuccessModal(true);
                setDishName('');
                setDishCategory('');
            }
            else{
                setWarningMessage(request.error);
                setShowWarningModal(true);
            }
        }
    }

    return(
        <D.Container>
            <D.Header>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={()=>navigation.goBack()}/>
                <Text style={style({}).headerTitle}>Adicionar Prato</Text>
            </D.Header>
            <D.Label>Nome do Prato</D.Label>
            <D.Input
                placeholder="Ex.: Bisteca Grelhada"
                placeholderTextColor="#C4C4C4"
                value={dishName}
                onChangeText={t=>setDishName(t)}
            />
            <D.Label>Categoria</D.Label>
            <SelectCategoryButton
                opcoes={categoryList}
                onChangeSelect={(id)=>setDishCategory(id)}
                text="Escolha uma opção..."
                buttonSpace={100}
            />

            <D.SaveButton onPress={addDish}>
                <Text style={style({}).saveButtonText}>Adicionar Prato</Text>
            </D.SaveButton>

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
                            <D.TwoButton>
                                <D.BackToHome
                                    modalType={item.type}
                                    onPress={()=>setShowSuccessModal(false)}
                                >
                                    <Text style={style({modalType: item.type}).backToHomeText}>
                                        Adicionar Outro Prato
                                    </Text>
                                </D.BackToHome>
                                <D.BackToHome
                                    modalType={item.type}
                                    style={{backgroundColor:'#AAAAAA'}}
                                    onPress={()=>navigation.navigate('Home')}
                                >
                                    <Text style={style({modalType: item.type}).backToHomeText}>
                                        Voltar para o Inicio
                                    </Text>
                                </D.BackToHome>
                            </D.TwoButton>
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
    saveButtonText: {
        fontFamily:'PoppinsBold',
        color: '#FFFFFF',
        fontSize: 16
    },
    modalTitle: {
        fontFamily:'PoppinsBold',
        fontSize: 28,
        color: '#495057'
    },
    message: {
        fontFamily:'PoppinsMedium',
        width: props.modalType === 'success' ? '50%' : '100%',
        textAlign:'center',
        fontSize:18,
        color: '#AAAAAA',
    },
    backToHomeText: {
        color: props.modalType === 'warning' ? '#333333' : '#FFFFFF',
        fontFamily:'PoppinsBold',
        textAlign:'center',
    }
})