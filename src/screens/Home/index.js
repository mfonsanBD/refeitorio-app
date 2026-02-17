import { View, Text, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function Home() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Refeitório</Text>
            <TouchableHighlight style={styles.card} onPress={() => { navigation.navigate('ListCategory') }} underlayColor="#ededed">
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                    <View>
                        <Text style={styles.descriptionTop}>Lista de</Text>
                        <Text style={styles.descriptionBottom}>Categorias</Text>
                    </View>
                    <View style={styles.button}>
                        <AntDesign name="right" size={24} color="#FFFFFF" />
                    </View>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.card} onPress={() => { navigation.navigate('ListDish') }} underlayColor="#ededed">
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                    <View>
                        <Text style={styles.descriptionTop}>Lista de</Text>
                        <Text style={styles.descriptionBottom}>Pratos</Text>
                    </View>
                    <View style={styles.button}>
                        <AntDesign name="right" size={24} color="#FFFFFF" />
                    </View>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.card} onPress={() => { navigation.navigate('ViewMenus') }} underlayColor="#ededed">
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                    <View>
                        <Text style={styles.descriptionTop}>Cardápio</Text>
                        <Text style={styles.descriptionBottom}>De Hoje</Text>
                    </View>
                    <View style={styles.button}>
                        <AntDesign name="right" size={24} color="#FFFFFF" />
                    </View>
                </View>
            </TouchableHighlight>
        </SafeAreaView>
    );
}
