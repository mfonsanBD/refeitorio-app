import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import styles, { getModalColors } from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../service/api';

export default function AddMenu() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const dishes = useSelector(state => state.userReducer.dishes);
    const menu = useSelector(state => state.userReducer.menu);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showDangerModal, setShowDangerModal] = useState(false);

    const [button, setButton] = useState('saveMenu');
    const [loading, setLoading] = useState(false);

    const [successMessage, setSuccessMessage] = useState('Cardápio de hoje montado e disponível!');
    const [warningMessage, setWarningMessage] = useState('Ao menos um prato precisa estar selecionado para criar um cardápio.');
    const [errorMessage, setErrorMessage] = useState('Infelizmente não foi possível criar um cardápio. Tente novamente em alguns instantes.');

    const [listCategoryDishes, setListCategoryDishes] = useState([]);

    const getCategoryDishes = async () => {
        setLoading(true);
        const request = await api.getCategoryDishes();
        setListCategoryDishes(request);
        setLoading(false);
    };

    useEffect(() => {
        getCategoryDishes();
    }, []);

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

    const setDishes = (dishes) => dispatch({ type: 'SET_DISHES', payload: { dishes } });

    const toggleDishes = (id) => {
        let newDish = [...dishes];

        if (!dishes.includes(id)) {
            newDish.push(id);
        }
        else {
            newDish = newDish.filter(items => items !== id);
        }

        newDish = [...new Set(newDish)];
        setDishes(newDish);
    };

    const saveMenu = async () => {
        if (dishes.length === 0) {
            setShowWarningModal(true);
        } else {
            const uniqueDishes = [...new Set(dishes)];

            if (menu) {
                await api.deleteMenu(menu);
            }

            const resultado = await api.saveMenu(uniqueDishes);
            if (!resultado.error) {
                setShowSuccessModal(true);
            }
            else {
                setShowWarningModal(true);
                setWarningMessage(resultado.error);
            }
        }
    };

    const alertDishDisabled = () => {
        Alert.alert(
            "Atenção!",
            "Prato desabilitado.",
            [
                { text: "Ok" }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Montar Cardápio</Text>
            </View>

            {loading &&
                <View style={styles.loadingArea}>
                    <ActivityIndicator size="large" color="#FF9900" />
                </View>
            }
            {!loading &&
                <FlatList
                    style={styles.list}
                    data={listCategoryDishes}
                    renderItem={({ item: categories }) => (
                        <View>
                            {categories.prato.length !== 0 &&
                                <View style={styles.itemsCategories}>
                                    <Text style={styles.label}>{categories.nome}</Text>
                                    {categories.prato.map((dish, index) => (
                                        dish.categoria_id === categories.id &&
                                        <View style={styles.dishContainer} key={index}>
                                            <TouchableOpacity style={styles.dish} onPress={
                                                dish.status
                                                    ? () => toggleDishes(dish.id)
                                                    : () => alertDishDisabled()
                                            }>
                                                <View>
                                                    {dishes.includes(dish.id) && dish.status &&
                                                        <MaterialCommunityIcons name="checkbox-marked" size={24} color="#0D6EFD" />
                                                    }
                                                    {!dishes.includes(dish.id) && dish.status &&
                                                        <MaterialCommunityIcons name="square-outline" size={24} color="#AAAAAA" />
                                                    }
                                                    {!dishes.includes(dish.id) && !dish.status &&
                                                        <MaterialCommunityIcons name="close-box-outline" size={24} color="#F27474" />
                                                    }
                                                </View>
                                                <Text style={styles.dishName}>{dish.nome}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            }
                        </View>
                    )}
                    keyExtractor={categories => String(categories.id)}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={getCategoryDishes}
                />
            }

            <TouchableOpacity style={styles.saveButton} onPress={saveMenu}>
                <Text style={styles.saveButtonText}>Salvar Cardápio</Text>
            </TouchableOpacity>

            {modaltypes.map((item, index) => (
                <Modal key={index} animationType="slide" transparent={true} statusBarTranslucent={true} visible={item.show}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{item.title}!</Text>
                        <View style={[styles.circleOpacity, { backgroundColor: getModalColors(item.type).bgOpacity }]}>
                            <View style={[styles.circle, { backgroundColor: getModalColors(item.type).bg }]}>
                                <MaterialCommunityIcons name={item.iconName} size={60} color={item.type === 'warning' ? "#333333" : "#FFFFFF"} />
                            </View>
                        </View>

                        <Text style={[styles.message, { width: item.type === 'success' ? '60%' : '100%' }]}>{item.message}</Text>

                        {item.type === 'success' &&
                            <View>
                                {button === 'saveDishUpdate' &&
                                    <View style={styles.twoButton}>
                                        <TouchableOpacity
                                            style={[styles.backToHomeHalf, { backgroundColor: getModalColors(item.type).bg }]}
                                            onPress={() => setShowSuccessModal(false)}
                                        >
                                            <Text style={[styles.backToHomeText, { color: '#FFFFFF' }]}>
                                                Montar um Cardápio
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.backToHomeHalf, { backgroundColor: '#AAAAAA' }]}
                                            onPress={() => navigation.navigate('Home')}
                                        >
                                            <Text style={[styles.backToHomeText, { color: '#FFFFFF' }]}>
                                                Voltar para a Tela Inicial
                                            </Text>
                                        </TouchableOpacity>
                                    </View>}
                                {button === 'saveMenu' &&
                                    <TouchableOpacity
                                        style={[styles.backToHome, { backgroundColor: getModalColors(item.type).bg }]}
                                        onPress={() => navigation.navigate('Home')}
                                    >
                                        <Text style={[styles.backToHomeText, { color: '#FFFFFF' }]}>
                                            Voltar para a Tela Inicial
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        }
                        {item.type === 'warning' &&
                            <TouchableOpacity
                                style={[styles.backToHome, { backgroundColor: getModalColors(item.type).bg }]}
                                onPress={() => setShowWarningModal(false)}
                            >
                                <Text style={[styles.backToHomeText, { color: '#333333' }]}>
                                    Corrigir
                                </Text>
                            </TouchableOpacity>
                        }
                        {item.type === 'danger' &&
                            <TouchableOpacity
                                style={[styles.backToHome, { backgroundColor: getModalColors(item.type).bg }]}
                                onPress={() => navigation.navigate('Home')}
                            >
                                <Text style={[styles.backToHomeText, { color: '#FFFFFF' }]}>
                                    Voltar para a Tela Inicial
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </Modal>
            ))}
        </SafeAreaView>
    );
}
