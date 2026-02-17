import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../service/api';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DishItem from '../../components/DishItem';

export default function ListDish() {
    const navigation = useNavigation();

    const [dishList, setDishList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getDishes = async () => {
        setLoading(true);
        const request = await api.getDishList();
        setDishList(request);
        setLoading(false);
    };

    const getCategories = async () => {
        const request = await api.getCategoriesList();
        setCategoryList(request);
    };

    useEffect(() => {
        getDishes();
        getCategories();
    }, []);

    const refresh = () => {
        getDishes();
    };

    const Separator = () => <View style={{ height: 16 }} />;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333333" onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Lista de Pratos</Text>
                <MaterialCommunityIcons name="plus-box" size={28} color="#333333" onPress={() => navigation.navigate("AddDish")} />
            </View>

            {loading &&
                <View style={styles.loadingArea}>
                    <ActivityIndicator size="large" color="#FF9900" />
                </View>
            }
            {!loading && dishList.length === 0 &&
                <View style={styles.emptyDish}>
                    <MaterialCommunityIcons name="information-outline" size={60} color="#AAAAAA" />
                    <Text style={styles.EmptyDishText}>Nenhum prato cadastrado no sistema.</Text>
                </View>
            }
            {!loading &&
              <FlatList
                data={dishList}
                renderItem={({ item: dish }) => (
                  <DishItem dish={dish} categoryList={categoryList} refresh={() => refresh()} />
                )}
                keyExtractor={dish => String(dish.id)}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={getDishes}
                ItemSeparatorComponent={Separator}
              />
            }
        </SafeAreaView>
    );
}
