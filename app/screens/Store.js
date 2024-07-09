import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Fab, Root, Container, Icon, Toast } from "native-base";
import colors from "../styles/colors";

export default class Store extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.store.name,
            headerMode: "screen"
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    updateItems(items) {
        this.setState({ items });
    }

    render() {
        let { navigation } = this.props;
        let { store } = navigation.state.params;

        let canBuy = store.options.length > 0;

        return (
            <Root>
                <Container>
                    <ScrollView>
                        {store.items.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    if (canBuy) {
                                        Toast.show({
                                            text: "Added item to cart",
                                            duration: 1500
                                        });

                                        var items = this.state.items;
                                        items.push(item);
                                        this.setState({ items });
                                    }
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        alignContent: "center",
                                        padding: 14,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.lightGray
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: colors.darkGray
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignContent: "center"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: colors.gray,
                                                paddingRight: 5
                                            }}
                                        >
                                            ${item.amount}
                                        </Text>
                                        {canBuy ? (
                                            <Icon
                                                style={{
                                                    fontSize: 20,
                                                    color: colors.lightGray
                                                }}
                                                type="Entypo"
                                                name="plus"
                                            />
                                        ) : (
                                            <View />
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {canBuy ? (
                        <Fab
                            active={this.state.items.length > 0}
                            style={{
                                backgroundColor:
                                    this.state.items.length > 0 ? colors.gold : colors.lightGray
                            }}
                            position="bottomRight"
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.items.length > 0) {
                                        navigation.navigate("Checkout", {
                                            items: this.state.items,
                                            store,
                                            updateItems: this.updateItems.bind(this),
                                            updateOrders: navigation.state.params.updateOrders
                                        });
                                    }
                                }}
                            >
                                <Icon
                                    name="shopping-cart"
                                    type="FontAwesome"
                                    style={{ color: colors.white }}
                                />
                            </TouchableOpacity>
                        </Fab>
                    ) : (
                        <View />
                    )}
                </Container>
            </Root>
        );
    }
}
