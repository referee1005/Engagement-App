/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container } from "native-base";
import { createStackNavigator } from "react-navigation";
import Home from "./app/screens/Home";
import Article from "./app/screens/Article";
import Poll from "./app/screens/Poll";
import Store from "./app/screens/Store";
import Checkout from "./app/screens/Checkout";
import ViewOrder from "./app/screens/ViewOrder";
import FanGame from "./app/screens/FanGame";

const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    Article: {
        screen: Article
    },
    Poll: {
        screen: Poll
    },
    Store: {
        screen: Store
    },
    Checkout: {
        screen: Checkout
    },
    ViewOrder: {
        screen: ViewOrder
    },
    FanGame: {
        screen: FanGame
    }
};

const StackNavigator = createStackNavigator(screens, {});

export default class App extends Component {
    render() {
        return (
            <Container>
                <StackNavigator />
            </Container>
        );
    }
}

const styles = StyleSheet.create({});
