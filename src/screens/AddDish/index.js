import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../service/api';
import styles, { getModalColors } from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SelectCategoryButton from '../../components/SelectCategoryButton';

export default function AddDish() {
    const navigation = useNavigation();

    const [categoryList, setCategoryList] = useState([]);

    const getCategories = async () => {
        const request = await api.getCategoriesList();
        setCategoryList(request);
    };

    useEffect(() => {
        getCategories();
    }, []);

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
        if (dishName === '') {
            setWarningMessage("O campo NOME DO PRATO é obrigatório!");
            setShowWarningModal(true);
        }
        else if (dishCategory === '') {
            setWarningMessage("O campo CATEGORIA é obrigatório!");
            setShowWarningModal(true);
        }
        else {
            const request = await api.insertDish(dishName, dishCategory);

            if (!request.error) {
                setShowSuccessModal(true);
                setDishName('');
                setDishCategory('');
            }
            else {
                setWarningMessage(request.error);
                setShowWarningModal(true);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Adicionar Prato</Text>
            </View>
            <Text style={styles.label}>Nome do Prato</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex.: Bisteca Grelhada"
                placeholderTextColor="#C4C4C4"
                value={dishName}
                onChangeText={t => setDishName(t)}
            />
            <Text style={styles.label}>Categoria</Text>
            <SelectCategoryButton
                opcoes={categoryList}
                onChangeSelect={(id) => setDishCategory(id)}
                text="Escolha uma opção..."
                buttonSpace={100}
            />

            <TouchableOpacity style={styles.saveButton} onPress={addDish}>
                <Text style={styles.saveButtonText}>Adicionar Prato</Text>
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

                        <Text style={[styles.message, { width: item.type === 'success' ? '50%' : '100%' }]}>{item.message}</Text>

                        {item.type === 'success' &&
                            <View style={styles.twoButton}>
                                <TouchableOpacity
                                    style={[styles.backToHomeHalf, { backgroundColor: getModalColors(item.type).bg }]}
                                    onPress={() => setShowSuccessModal(false)}
                                >
                                    <Text style={[styles.backToHomeText, { color: '#FFFFFF' }]}>
                                        Adicionar Outro Prato
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.backToHomeHalf, { backgroundColor: '#AAAAAA' }]}
                                    onPress={() => navigation.navigate('Home')}
                                >
                                    <Text style={[styles.backToHomeText, { color: '#FFFFFF' }]}>
                                        Voltar para o Inicio
                                    </Text>
                                </TouchableOpacity>
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
