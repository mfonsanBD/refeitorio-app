import styles, { getModalColors } from "./style";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SelectCategoryButton from "../SelectCategoryButton";
import api from "../../service/api";

const DishItem = ({ dish, categoryList, refresh }) => {
    const [modalDish, setModalDish] = useState({});

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showDangerModal, setShowDangerModal] = useState(false);

    const [successMessage, setSuccessMessage] = useState('Prato atualizado com sucesso!');
    const [warningMessage, setWarningMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('Infelizmente não foi possível atualizar o prato. Tente novamente em alguns instantes.');

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

    const [optionsModal, setOptionsModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [newDishName, setNewDishName] = useState('');
    const [newDishCategory, setNewDishCategory] = useState('');

    const options = (name, id, categoryName, categoryId) => {
        setModalDish({ name, id, categoryName, categoryId });
        setNewDishName(name);
        setNewDishCategory(categoryId);
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

    const deleteDish = async (id) => {
        const resultado = await api.deleteDish(id);
        if (!resultado.error) {
            setDeleteModal(false);
            setSuccessMessage("Prato excluído com sucesso!");
            setShowSuccessModal(true);
        }
        else {
            setWarningMessage(resultado.error);
            setShowWarningModal(true);
        }
    };

    const updateDish = async (id) => {
        if (newDishName === '') {
            setWarningMessage("O campo NOME DO PRATO é obrigatório.");
            setShowWarningModal(true);
        }
        else {            
            const resultado = await api.updateDish(newDishName, newDishCategory, id);

            if (!resultado.error) {
                setEditModal(false);
                setSuccessMessage("Prato atualizado com sucesso!");
                setShowSuccessModal(true);
            }
            else {
                setWarningMessage(resultado.error);
                setShowWarningModal(true);
            }
        }
    };

    const toggleDishStatus = async (id, status) => {
        const resultado = await api.updateDishStatus(!status, id);

        if (!resultado.error) {
            refresh();
        }
        else {
            setWarningMessage(resultado.error);
            setShowWarningModal(true);
        }
    };
  return (
    <View>
      <TouchableHighlight style={styles.category} onPress={() => options(dish.nome, dish.id, dish.categoria.nome, dish.categoria.id)} underlayColor="#ededed">
        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', flex: 1, gap: 12}}>
          <View style={{ width: '100%', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text style={styles.categoryName}>{dish.nome}</Text>
            <Text style={styles.dishCategoryName}>Categoria: {dish.categoria.nome}</Text>
          </View>

          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', alignContent: 'space-between'}}>
            <TouchableOpacity style={styles.toogleDishStatus} onPress={() => toggleDishStatus(dish.id, dish.status)}>
                <View style={[styles.checkbox, { backgroundColor: dish.status ? '#FF9900' : '#FFFFFF', borderColor: dish.status ? '#FF9900' : '#C4C4C4' }]}>
                    {dish.status && <MaterialCommunityIcons name="check" size={18} color="#FFFFFF" />}
                </View>
                <Text style={styles.toogleDishStatusText}>{dish.status ? "Ativo" : "Inativo"}</Text>
            </TouchableOpacity>

            <View style={styles.dishButton}>
                <MaterialCommunityIcons name="square-edit-outline" size={24} color="#333333" />
            </View>
          </View>
        </View>
      </TouchableHighlight>

    {/* Options Modal */}
      <Modal
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={optionsModal}
          onRequestClose={() => setOptionsModal(false)}
      >
          <View style={styles.modalActionContainer}>
              <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.close} onPress={() => setOptionsModal(false)}>
                      <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
              </View>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>O que deseja fazer com o prato: <Text style={styles.modalTitleCategoryName}>{modalDish.name}</Text>?
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
          <View style={styles.modalActionContainer}>
              <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.close} onPress={() => setDeleteModal(false)}>
                      <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
              </View>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Tem certeza que deseja excluir o prato: <Text style={styles.modalTitleCategoryName}>{modalDish.name}</Text>?
                  </Text>
                  <View style={styles.actions}>
                      <TouchableOpacity style={styles.deleteActionItemEdit} onPress={() => setDeleteModal(false)}>
                          <Text style={styles.actionTitleEdit}>Não, Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.deleteActionItemDelete} onPress={() => deleteDish(modalDish.id)}>
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
          <View style={styles.modalActionContainer}>
              <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.close} onPress={() => setEditModal(false)}>
                      <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
              </View>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Editando o prato: <Text style={styles.modalTitleCategoryName}>{modalDish.name}</Text>.
                  </Text>
                  <View style={styles.inputArea}>
                      <Text style={styles.label}>Nome do Prato</Text>
                      <TextInput
                          style={styles.input}
                          placeholder={modalDish.name}
                          placeholderTextColor="#C4C4C4"
                          value={newDishName}
                          onChangeText={t => setNewDishName(t)}
                      />
                      <Text style={styles.label}>Categoria</Text>
                      <SelectCategoryButton
                          opcoes={categoryList}
                          onChangeSelect={(id) => setNewDishCategory(id)}
                          text="Categoria"
                          categoryName={modalDish.categoryName}
                          buttonSpace={200}
                      />
                  </View>
                  <View style={styles.actions}>
                      <TouchableOpacity style={styles.editActionItem} onPress={() => updateDish(modalDish.id)}>
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
                          onPress={() => [refresh(), setShowSuccessModal(false)]}
                      >
                          <Text style={[styles.backToHomeText, { color: '#FFFFFF' }]}>
                              Voltar para a Lista
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
    </View>
  )
}

export default DishItem;