import { useState } from "react";
import { Modal, View, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { Feather } from '@expo/vector-icons';
import styles from './style';

const { width } = Dimensions.get('window');

const SelectCategoryButton = ({ opcoes, onChangeSelect, text, categoryName = null, buttonSpace }) => {
    const [texto, setTexto] = useState(text);
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState(categoryName);

    const renderOptions = (item) => {
        return (
            <TouchableOpacity style={styles.clickCategory} onPress={() => {
                onChangeSelect(item.id);
                setTexto(item.nome);
                setCategory(item.nome);
                setShowModal(false);
            }}>
                <Text style={styles.modalCategory}>{item.nome}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <TouchableOpacity style={styles.selectContainer} onPress={() => setShowModal(true)}>
                <Text style={{
                    fontSize: 16,
                    fontFamily: 'PoppinsRegular',
                    color: buttonSpace === 200 ? '#495057' : '#AAAAAA',
                    width: width - buttonSpace,
                }} numberOfLines={1}>
                    {categoryName === null ? texto : category}
                </Text>
                <Feather name="chevron-down" size={20} color="#AAAAAA" />
            </TouchableOpacity>
            <Modal
                visible={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderTitle}>{text}</Text>
                    <TouchableOpacity style={styles.iconBackground} onPress={() => setShowModal(false)}>
                        <Feather name="x" size={20} color="#FFFFFF" />
                        <Text style={styles.cancel}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={opcoes}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => renderOptions(item)}
                />
            </Modal>
        </View>
    );
};

export default SelectCategoryButton;
