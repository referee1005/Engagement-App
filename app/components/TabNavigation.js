/**
 * Creates tab navigation
 */
import { createBottomTabNavigator } from "react-navigation";
import React from "react";
import { Footer, FooterTab, Button, Text, Icon } from "native-base";
import colors from "../styles/colors";

export default tabs => {
    return createBottomTabNavigator(tabs, {
        initialRouteName: "Game",
        tabBarComponent: props => {
            // Custom tabs
            return (
                <Footer
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        borderBottomWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                    }}
                >
                    <FooterTab>
                        <Button
                            style={{
                                backgroundColor: colors.headerColor
                            }}
                            active={props.navigation.state.index === 0}
                            onPress={() => {
                                props.navigation.navigate("Feed");
                            }}
                        >
                            <Icon
                                style={{
                                    color:
                                        props.navigation.state.index === 0
                                            ? colors.tabTextSelected
                                            : colors.tabText
                                }}
                                name="list"
                            />
                            <Text
                                style={{
                                    color:
                                        props.navigation.state.index === 0
                                            ? colors.tabTextSelected
                                            : colors.tabText
                                }}
                            >
                                Feed
                            </Text>
                        </Button>
                        <Button
                            style={{
                                backgroundColor: colors.headerColor
                            }}
                            active={props.navigation.state.index === 1}
                            onPress={() => {
                                props.navigation.navigate("Map");
                            }}
                        >
                            <Icon
                                style={{
                                    color:
                                        props.navigation.state.index === 1
                                            ? colors.tabTextSelected
                                            : colors.tabText
                                }}
                                name="map"
                            />
                            <Text
                                style={{
                                    color:
                                        props.navigation.state.index === 1
                                            ? colors.tabTextSelected
                                            : colors.tabText
                                }}
                            >
                                Map
                            </Text>
                        </Button>
                        <Button
                            style={{
                                backgroundColor: colors.headerColor
                            }}
                            active={props.navigation.state.index === 2}
                            onPress={() => {
                                props.navigation.navigate("Game");
                            }}
                        >
                            <Icon
                                style={{
                                    color:
                                        props.navigation.state.index === 2
                                            ? colors.tabTextSelected
                                            : colors.tabText
                                }}
                                type="MaterialCommunityIcons"
                                name="football"
                            />
                            <Text
                                style={{
                                    color:
                                        props.navigation.state.index === 2
                                            ? colors.tabTextSelected
                                            : colors.tabText
                                }}
                            >
                                Game
                            </Text>
                        </Button>
                        <Button
                            style={{
                                backgroundColor: colors.headerColor
                            }}
                            active={props.navigation.state.index === 3}
                            onPress={() => {
                                props.navigation.navigate("Shop");
                            }}
                        >
                            <Icon
                                style={{
                                    color:
                                        props.navigation.state.index === 3
                                            ? colors.tabTextSelected
                                            : colors.tabText
                                }}
                                type="MaterialCommunityIcons"
                                name="food"
                            />
                            <Text
                                style={{
                                    color:
                                        props.navigation.state.index === 3
                                            ? colors.tabTextSelected
                                            : colors.tabText
                                }}
                            >
                                Shop
                            </Text>
                        </Button>
                        <Button
                            style={{
                                backgroundColor: colors.headerColor
                            }}
                            active={props.navigation.state.index === 4}
                            onPress={() => {
                                props.navigation.navigate("Rewards");
                            }}
                        >
                            <Icon
                                style={{
                                    color:
                                        props.navigation.state.index === 4
                                            ? colors.tabTextSelected
                                            : colors.tabText
                                }}
                                name="trophy"
                            />
                            <Text
                                style={{
                                    color:
                                        props.navigation.state.index === 4
                                            ? colors.tabTextSelected
                                            : colors.tabText
                                }}
                            >
                                Fans
                            </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    });
};
