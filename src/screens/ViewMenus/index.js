import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import D from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../service/api';

const ViewMenus = (props) => {
    const navigation = useNavigation();

    const [menu, setMenu] = useState('');
    const [loading, setLoading] = useState(false);

    const getMenuDishes = async () => {
        props.setDishes([]);
        setLoading(true);
        const resultado = await api.getMenuDishes();
        setMenu(resultado);
        setLoading(false);

        const array = [];
        resultado.map(categoria=>{
            categoria.prato.map(prato=>{
                array.push(prato.id);
                prato.cardapios.map(cardapio=>{
                    props.setMenu(cardapio.id);
                })
            })
        });
        props.setDishes(array);
    }

    useEffect(()=>{
        getMenuDishes();
    },[]);

    return(
        <D.Container>
            <D.Header>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={()=>navigation.goBack()}/>
                <Text style={style({}).headerTitle}>Cardápio de Hoje</Text>
                <MaterialCommunityIcons
                    name={menu.length === 0 ? "plus-box" : "square-edit-outline"}
                    size={24}
                    color="#333333"
                    onPress={()=>navigation.navigate("AddMenu")}
                />
            </D.Header>
            
            {loading &&
                <D.LoadingArea>
                    <ActivityIndicator size="large" color="#FF9900" />
                </D.LoadingArea>
            }
            {!loading && menu.length === 0 &&
                <D.EmptyMenu>
                    <MaterialCommunityIcons name="information-outline" size={60} color="#AAAAAA" />
                    <Text style={style({}).EmptyMenuText}>Cardápio de hoje ainda não criado.</Text>
                </D.EmptyMenu>
            }
            {!loading && menu.length !== 0 &&
                <D.List
                    data={menu}
                    renderItem={({item: menu}) => (
                        <>
                            <D.ItemsCategories>
                                <D.DishContainer>
                                    <D.Dish>
                                        <Text style={style({}).categoryName}>
                                            {menu.nome}
                                        </Text>
                                        {menu.prato.map(prato => (
                                            <View style={style({}).dishView} key={prato.id}>
                                                <MaterialCommunityIcons name="minus" size={24} color="#AAAAAA" />
                                                <Text style={style({}).dishName}>
                                                    {prato.nome}
                                                </Text>
                                            </View>
                                        ))}
                                    </D.Dish>
                                </D.DishContainer>
                            </D.ItemsCategories>
                        </>
                    )}
                    keyExtractor={menu => String(menu.id)}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={getMenuDishes}
                />
            }
        </D.Container>
    )
}

const mapStateToProps = (state) => {
    return{}
}

const mapDispatchToProps = (dispatch) => {
    return{
        setDishes:(dishes)=>dispatch({type: 'SET_DISHES', payload: {dishes}}),
        setMenu:(menu)=>dispatch({type: 'SET_MENU', payload: {menu}}),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ViewMenus);

const style = (props) => StyleSheet.create({
    headerTitle: {
        flex: 1,
        textAlign:'center',
        fontSize:18,
        fontFamily:'PoppinsBold',
        color: '#333333'
    },
    dishView:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    dishName:{
        fontSize:16,
        fontFamily:'PoppinsRegular',
        color: '#AAAAAA',
        marginLeft: 5,
    },
    categoryName:{
        fontSize:16,
        fontFamily:'PoppinsMedium',
        color: '#495057',
        marginLeft: 5,
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
    EmptyMenuText: {
        width: '70%',
        fontFamily:'PoppinsMedium',
        textAlign:'center',
        fontSize:18,
        color: '#AAAAAA',
    },
})