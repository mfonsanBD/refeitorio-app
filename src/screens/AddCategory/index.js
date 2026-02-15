import React, { useState } from 'react';
import { Modal, Text, StyleSheet } from 'react-native';
import api from '../../service/api';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddCategory(){
    const navigation = useNavigation();

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
            message: 'Categoria adicionada com sucesso.'
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

    const [categoryName, setCategoryName] = useState('');

    const addCategory = async () => {
        if(categoryName === ''){
            setWarningMessage("O campo NOME DA CATEGORIA é obrigatório!");
            setShowWarningModal(true);
        }
        else{
            const request = await api.insertCategory(categoryName);

            if(!request.error){
                setShowSuccessModal(true);
                setCategoryName('');
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
                <Text style={style({}).headerTitle}>Adicionar Categoria</Text>
            </D.Header>
            <D.Label>Nome da Categoria</D.Label>
            <D.Input
                placeholder="Ex.: Salada, Acompanhamentos, Proteína, etc..."
                placeholderTextColor="#C4C4C4"
                value={categoryName}
                onChangeText={t=>setCategoryName(t)}
            />
            <D.SaveButton onPress={addCategory}>
                <Text style={style({}).saveButtonText}>Adicionar Categoria</Text>
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
        width: props.modalType === 'success' ? '70%' : '100%',
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