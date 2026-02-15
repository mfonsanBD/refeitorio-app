import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Home from './screens/Home';

import AddCategory from './screens/AddCategory';
import ListCategory from './screens/ListCategory';

import AddDish from './screens/AddDish';
import ListDish from './screens/ListDish';

import AddMenu from './screens/AddMenu';
import ViewMenus from './screens/ViewMenus';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator 
                initialRouteName="Home" 
                screenOptions={{ headerShown: false }}
            >
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="ListCategory" component={ListCategory}/>
                <AppStack.Screen name="AddCategory" component={AddCategory}/>
                <AppStack.Screen name="ListDish" component={ListDish}/>
                <AppStack.Screen name="AddDish" component={AddDish}/>
                <AppStack.Screen name="AddMenu" component={AddMenu}/>
                <AppStack.Screen name="ViewMenus" component={ViewMenus}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}