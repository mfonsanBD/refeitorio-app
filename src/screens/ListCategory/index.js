import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, TouchableHighlight, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../service/api';
import styles, { getModalColors } from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ListCategory() {
    const navigation = useNavigation();

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showDangerModal, setShowDangerModal] = useState(false);

    const [successMessage, setSuccessMessage] = useState('Categoria atualizada com sucesso!');
    const [warningMessage, setWarningMessage] = useState('Ao menos um prato precisa estar selecionado para criar um cardápio.');
    const [errorMessage, setErrorMessage] = useState('Infelizmente não foi possível criar um cardápio. Tente novamente em alguns instantes.');

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
    };

    useEffect(() => {
        getCategories();
    }, []);

    const options = (name, id) => {
        setModalCategory({ name, id });
        setNewCategoryName(name);
        setOptionsModal(true);
    };

    const actionDeleteModal = () => {
        setOptionsModal(false);
        setDeleteModal(true);
    };

    const actionEditModal = () => {
        setOptionsModal(false);
        setEditModal(true);
    };

    const deleteCategory = async (id) => {
        const resultado = await api.deleteCategory(id);
        if (!resultado.error) {
            setDeleteModal(false);
            setSuccessMessage("Categoria excluída com sucesso!");
            setShowSuccessModal(true);
        }
        else {
            setWarningMessage(resultado.error);
            setShowWarningModal(true);
        }
    };

    const updateCategory = async (id) => {
        if (newCategoryName === '') {
            setWarningMessage("O campo NOME DA CATEGORIA é obrigatório.");
            setShowWarningModal(true);
        }
        else {
            const resultado = await api.updateCategory(newCategoryName, id);

            if (!resultado.error) {
                setEditModal(false);
                setShowSuccessModal(true);
            }
            else {
                setWarningMessage(resultado.error);
                setShowWarningModal(true);
            }
        }
    };

    const refresh = () => {
        getCategories();
        setShowSuccessModal(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Lista de Categorias</Text>
                <MaterialCommunityIcons name="plus-box" size={28} color="#333333" onPress={() => navigation.navigate("AddCategory")} />
            </View>

            {loading &&
                <View style={styles.loadingArea}>
                    <ActivityIndicator size="large" color="#FF9900" />
                </View>
            }
            {!loading && categoryList.length === 0 &&
                <View style={styles.emptyCategory}>
                    <MaterialCommunityIcons name="information-outline" size={60} color="#AAAAAA" />
                    <Text style={styles.EmptyCategoryText}>Nenhuma categoria cadastrada no sistema.</Text>
                </View>
            }
            {!loading &&
                <FlatList
                    data={categoryList}
                    renderItem={({ item: category }) => (
                        <TouchableHighlight style={styles.category} onPress={() => options(category.nome, category.id)} underlayColor="#ededed">
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                                <Text style={styles.categoryName}>{category.nome}</Text>
                                <View style={styles.dishButton}>
                                    <MaterialCommunityIcons name="square-edit-outline" size={24} color="#333333" />
                                </View>
                            </View>
                        </TouchableHighlight>
                    )}
                    keyExtractor={category => String(category.id)}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={getCategories}
                />
            }

            {/* Options Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                statusBarTranslucent={true}
                visible={optionsModal}
                onRequestClose={() => setOptionsModal(false)}
            >
                <View style={styles.modalActionsContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity style={styles.close} onPress={() => setOptionsModal(false)}>
                            <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>O que deseja fazer com a categoria: <Text style={styles.modalTitleCategoryName}>{modalCategory.name}</Text>?
                        </Text>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.actionsItemEdit} onPress={() => actionEditModal()}>
                                <MaterialCommunityIcons name="square-edit-outline" size={24} color="#AAAAAA" />
                                <Text style={styles.actionTitleEdit}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionsItemDelete} onPress={() => actionDeleteModal()}>
                                <MaterialCommunityIcons name="trash-can-outline" size={24} color="#FFFFFF" />
                                <Text style={styles.actionTitleDelete}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Delete Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                statusBarTranslucent={true}
                visible={deleteModal}
                onRequestClose={() => setDeleteModal(false)}
            >
                <View style={styles.modalActionsContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity style={styles.close} onPress={() => setDeleteModal(false)}>
                            <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Tem certeza que deseja excluir a categoria: <Text style={styles.modalTitleCategoryName}>{modalCategory.name}</Text>?
                        </Text>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.deleteActionItemEdit} onPress={() => setDeleteModal(false)}>
                                <Text style={styles.actionTitleEdit}>Não, Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteActionItemDelete} onPress={() => deleteCategory(modalCategory.id)}>
                                <Text style={styles.actionTitleDelete}>Sim, Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Edit Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                statusBarTranslucent={true}
                visible={editModal}
                onRequestClose={() => setEditModal(false)}
            >
                <View style={styles.modalActionsContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity style={styles.close} onPress={() => setEditModal(false)}>
                            <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editando a categoria: <Text style={styles.modalTitleCategoryName}>{modalCategory.name}</Text>.
                        </Text>
                        <View style={styles.inputArea}>
                            <Text style={styles.label}>Nome da Categoria</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={modalCategory.name}
                                placeholderTextColor="#C4C4C4"
                                value={newCategoryName}
                                onChangeText={t => setNewCategoryName(t)}
                            />
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.editActionItem} onPress={() => updateCategory(modalCategory.id)}>
                                <Text style={styles.actionTitleDelete}>Salvar Alterações</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Result Modals */}
            {modaltypes.map((item, index) => (
                <Modal key={index} animationType="slide" transparent={true} statusBarTranslucent={true} visible={item.show}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitleText}>{item.title}!</Text>
                        <View style={[styles.circleOpacity, { backgroundColor: getModalColors(item.type).bgOpacity }]}>
                            <View style={[styles.circle, { backgroundColor: getModalColors(item.type).bg }]}>
                                <MaterialCommunityIcons name={item.iconName} size={60} color={item.type === 'warning' ? "#333333" : "#FFFFFF"} />
                            </View>
                        </View>

                        <Text style={[styles.message, { width: item.type === 'success' ? '70%' : '100%' }]}>{item.message}</Text>

                        {item.type === 'success' &&
                            <TouchableOpacity
                                style={[styles.backToHome, { backgroundColor: getModalColors(item.type).bg }]}
                                onPress={() => refresh()}
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
