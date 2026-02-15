import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import S from './style';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function Home(){
    const navigation = useNavigation();
      
    return(
        <S.Container>
            <StatusBar style="auto" />
            <Text style={style.title}>Refeitório</Text>
            <S.Card onPress={()=>{navigation.navigate('ListCategory')}} underlayColor="#ededed">
                <>
                <S.Description>
                    <Text style={style.descriptionTop}>Lista de</Text>
                    <Text style={style.descriptionBottom}>Categorias</Text>
                </S.Description>
                <S.Button>
                    <AntDesign name="right" size={24} color="#FFFFFF" />
                </S.Button>
                </>
            </S.Card>
            <S.Card onPress={()=>{navigation.navigate('ListDish')}} underlayColor="#ededed">
                <>
                <S.Description>
                    <Text style={style.descriptionTop}>Lista de</Text>
                    <Text style={style.descriptionBottom}>Pratos</Text>
                </S.Description>
                <S.Button>
                    <AntDesign name="right" size={24} color="#FFFFFF" />
                </S.Button>
                </>
            </S.Card>
            <S.Card onPress={()=>{navigation.navigate('ViewMenus')}} underlayColor="#ededed">
                <>
                <S.Description>
                    <Text style={style.descriptionTop}>Cardápio</Text>
                    <Text style={style.descriptionBottom}>De Hoje</Text>
                </S.Description>
                <S.Button>
                    <AntDesign name="right" size={24} color="#FFFFFF" />
                </S.Button>
                </>
            </S.Card>
        </S.Container>
    )
}

const style = StyleSheet.create({
    title: {
        fontSize:36,
        color: '#FFFFFF',
        marginBottom:30,
        textTransform:'uppercase',
        fontFamily:'PoppinsBold',
    },
    descriptionTop:{
        fontSize:18,
        color:'#C4C4C4',
        textTransform:'uppercase',
        fontFamily:'PoppinsRegular',
    },
    descriptionBottom:{
        fontSize:18,
        color:'#FF9900',
        textTransform:'uppercase',
        fontFamily:'PoppinsBold',
        marginTop:-10,
    }
})