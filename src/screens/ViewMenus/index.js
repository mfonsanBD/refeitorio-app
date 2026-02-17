import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../service/api';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ViewMenus() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [menuList, setMenuList] = useState([]);
    const [menuId, setMenuId] = useState(null);
    const [loading, setLoading] = useState(false);

    const getMenus = async () => {
        setLoading(true);
        const request = await api.getMenuDishes();
        setLoading(false);

        if (request.error || !request || !request.pratos) {
            setMenuList([]);
            setMenuId(null);
        } else {
            setMenuId(request.id);

            // Agrupa os pratos por categoria
            const categoriesMap = {};
            request.pratos.forEach(item => {
                const catId = item.prato.categoria.id;
                const catNome = item.prato.categoria.nome;

                if (!categoriesMap[catId]) {
                    categoriesMap[catId] = {
                        id: catId,
                        nome: catNome,
                        pratos: [],
                    };
                }

                categoriesMap[catId].pratos.push({
                    id: item.prato.id,
                    nome: item.prato.nome,
                });
            });

            const grouped = Object.values(categoriesMap);            
            setMenuList(grouped);

            // Persist to redux
            const allDishIds = [...new Set(request.pratos.map(item => item.prato.id))];
            dispatch({ type: 'SET_DISHES', payload: { dishes: allDishIds } });
            dispatch({ type: 'SET_MENU', payload: { menu: request.id } });
        }
    };

    useEffect(() => {
        getMenus();
    }, []);

    const renderDish = (dish) => (
        <View style={styles.dishView} key={String(dish.id)}>
            <MaterialCommunityIcons name="minus" size={20} color="#AAAAAA" />
            <Text style={styles.dishName}>{dish.nome}</Text>
        </View>
    );

    const renderCategory = ({ item: category }) => (
        <View style={styles.itemsCategories}>
            <View style={styles.dishContainer}>
                <View style={styles.dish}>
                    <Text style={styles.categoryName}>{category.nome}</Text>
                    {category.pratos.map(dish => renderDish(dish))}
                </View>
            </View>
        </View>
    );    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Cardápio de Hoje</Text>
                <MaterialCommunityIcons
                    name={menuId ? "square-edit-outline" : "plus-box"}
                    size={28}
                    color="#333333"
                    onPress={() => navigation.navigate("AddMenu")}
                />
            </View>

            {loading && (
                <View style={styles.loadingArea}>
                    <ActivityIndicator size="large" color="#FF9900" />
                </View>
            )}
            {!loading && menuList.length === 0 && (
                <View style={styles.emptyMenu}>
                    <MaterialCommunityIcons name="information-outline" size={60} color="#AAAAAA" />
                    <Text style={styles.EmptyMenuText}>Nenhum cardápio cadastrado para hoje.</Text>
                </View>
            )}
            {!loading && menuList.length > 0 && (
                <FlatList
                    style={styles.list}
                    data={menuList}
                    renderItem={renderCategory}
                    keyExtractor={category => String(category.id)}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={getMenus}
                />
            )}
        </SafeAreaView>
    );
}
