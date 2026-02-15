import React, { useState, useEffect } from 'react';
import { Modal, Alert, Switch, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../service/api';

const AddMenu = (props) => {
    const navigation = useNavigation();

    const [showSuccessModal, setShowSuccessModal]   = useState(false);
    const [showWarningModal, setShowWarningModal]   = useState(false);
    const [showDangerModal, setShowDangerModal]     = useState(false);
    
    const [button, setButton]                       = useState('saveMenu');
    const [loading, setLoading]                     = useState(false);

    const [successMessage, setSuccessMessage]       = useState('Cardápio de hoje montado e disponível!');
    const [warningMessage, setWarningMessage]       = useState('Ao menos um prato precisa estar selecionado para criar um cardápio.');
    const [errorMessage, setErrorMessage]           = useState('Infelizmente não foi possível criar um cardápio. Tente novamente em alguns instantes.');

    const [listCategoryDishes, setListCategoryDishes] = useState([]);

    const getCategoryDishes = async () => {
        setLoading(true);
        const request = await api.getCategoryDishes();
        setListCategoryDishes(request);
        setLoading(false);
    }

    useEffect(()=>{
        getCategoryDishes();
    },[]);

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

    const toggleDishes = (id) => {
        let newDish = [...props.dishes];

        if(!props.dishes.includes(id)){
            newDish.push(id);
        }
        else{
            newDish = newDish.filter(items=>items!=id);
        }

        props.setDishes(newDish);
    }

    const saveMenu = async () => {
        if(props.dishes.length === 0){
            setShowWarningModal(true);
        }else{
            await api.deleteMenu(props.menu);
            const resultado = await api.saveMenu(props.dishes);
            if(!resultado.error){
                setShowSuccessModal(true);
            }
            else{
                setShowWarningModal(true);
                warningMessage(resultado.error);
            }
        }
    }

    const alertDishDisabled = () => {
        Alert.alert(
        "Atenção!",
        "Prato desabilitado.",
        [
          { text: "Ok" }
        ]
      );
    }

    return(
        <D.Container>
            <D.Header>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={()=>navigation.goBack()}/>
                <Text style={style({}).headerTitle}>Montar Cardápio</Text>
            </D.Header>

            {loading &&
                <D.LoadingArea>
                    <ActivityIndicator size="large" color="#FF9900" />
                </D.LoadingArea>
            }
            {!loading &&
                <D.List
                    data={listCategoryDishes}
                    renderItem={({item: categories}) => (
                        <>
                            {categories.prato.length !== 0 &&
                            <D.ItemsCategories>
                                <Text style={style({}).label}>{categories.nome}</Text>
                                {categories.prato.map((dish, index)=>(
                                    dish.categoria_id === categories.id &&
                                    <D.DishContainer key={index}>
                                        <D.Dish onPress={
                                            dish.status
                                            ? ()=>toggleDishes(dish.id)
                                            : ()=>alertDishDisabled()
                                        }>
                                            <>
                                            {props.dishes.includes(dish.id) && dish.status &&
                                                <MaterialCommunityIcons name="checkbox-marked" size={24} color="#0D6EFD" />                                     
                                            }
                                            {!props.dishes.includes(dish.id) && dish.status &&
                                                <MaterialCommunityIcons name="square-outline" size={24} color="#AAAAAA" />
                                            }
                                            {!props.dishes.includes(dish.id) && !dish.status &&
                                                <MaterialCommunityIcons name="close-box-outline" size={24} color="#F27474" />
                                            }
                                            </>
                                            <Text style={style({}).dishName}>{dish.nome}</Text>
                                        </D.Dish>
                                    </D.DishContainer>

                                ))}
                            </D.ItemsCategories>
                            }
                        </>
                    )}
                    keyExtractor={categories => String(categories.id)}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={getCategoryDishes}
                />
            }

            <D.SaveButton onPress={saveMenu}>
                <Text style={style({}).saveButtonText}>Salvar Cardápio</Text>
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
                            <>
                            {button === 'saveDishUpdate' &&
                            <D.TwoButton>
                                <D.BackToHome
                                    modalType={item.type}
                                    onPress={()=>setShowSuccessModal(false)}
                                >
                                    <Text style={style({modalType: item.type}).backToHomeText}>
                                        Montar um Cardápio
                                    </Text>
                                </D.BackToHome>
                                <D.BackToHome
                                    modalType={item.type}
                                    style={{backgroundColor:'#AAAAAA'}}
                                    onPress={()=>navigation.navigate('Home')}
                                >
                                    <Text style={style({modalType: item.type}).backToHomeText}>
                                        Voltar para a Tela Inicial
                                    </Text>
                                </D.BackToHome>
                            </D.TwoButton>}
                            {button === 'saveMenu' &&
                                <D.BackToHome
                                    modalType={item.type}
                                    button={'saveMenu'}
                                    onPress={()=>navigation.navigate('Home')}
                                >
                                    <Text style={style({modalType: item.type}).backToHomeText}>
                                        Voltar para a Tela Inicial
                                    </Text>
                                </D.BackToHome>
                            }
                            </>
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

const mapStateToProps = (state) => {
    return{
        dishes: state.userReducer.dishes,
        menu: state.userReducer.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setDishes:(dishes)=>dispatch(
            {
                type: 'SET_DISHES', 
                payload: {dishes}
            }
        )
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(AddMenu);

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
        fontFamily:'PoppinsRegular'
    },
    dishName: {
        fontSize:16,
        marginLeft:5,
        color: '#AAAAAA',
        fontFamily:'PoppinsRegular'
    }
})