import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../service/api';
import styles, { getModalColors } from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddCategory() {
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
        if (categoryName === '') {
            setWarningMessage("O campo NOME DA CATEGORIA é obrigatório!");
            setShowWarningModal(true);
        }
        else {
            const request = await api.insertCategory(categoryName);

            if (!request.error) {
                setShowSuccessModal(true);
                setCategoryName('');
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
                <Text style={styles.headerTitle}>Adicionar Categoria</Text>
            </View>
            <Text style={styles.label}>Nome da Categoria</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex.: Salada, Acompanhamentos, Proteína, etc..."
                placeholderTextColor="#C4C4C4"
                value={categoryName}
                onChangeText={t => setCategoryName(t)}
            />
            <TouchableOpacity style={styles.saveButton} onPress={addCategory}>
                <Text style={styles.saveButtonText}>Adicionar Categoria</Text>
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

                        <Text style={[styles.message, { width: item.type === 'success' ? '70%' : '100%' }]}>{item.message}</Text>

                        {item.type === 'success' &&
                            <TouchableOpacity
                                style={[styles.backToHome, { backgroundColor: getModalColors(item.type).bg }]}
                                onPress={() => navigation.navigate('Home')}
                            >
                                <Text style={[styles.backToHomeText, { color: '#FFFFFF' }]}>
                                    Voltar para a Tela Inicial
                                </Text>
                            </TouchableOpacity>
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
