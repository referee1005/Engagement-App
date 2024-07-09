import React, { Component } from "react";
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Container, Icon, Button, Content } from "native-base";
import colors from "../styles/colors";
import { material } from "react-native-typography";

const bodyMargin = 20;
let orderNumber = 49102;

export default class Checkout extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Checkout: " + navigation.state.params.store.name,
            headerMode: "screen"
        };
    };

    constructor(props) {
        super(props);

        let items = props.navigation.state.params.items.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        this.state = {
            items,
            selectedOption: 0
        };
    }

    renderListItem(item, index, showMinus) {
        return (
            <View
                key={index}
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
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center"
                    }}
                >
                    <Text
                        style={{
                            color: colors.darkGray,
                            paddingRight: 5
                        }}
                    >
                        ${item.amount}
                    </Text>
                    <Text
                        style={{
                            color: colors.gray
                        }}
                    >
                        {item.name}
                    </Text>
                </View>
                {showMinus ? (
                    <TouchableOpacity
                        onPress={() => {
                            let items = this.state.items;
                            items.splice(index, 1);
                            this.props.navigation.state.params.updateItems(items);
                            if (items.length === 0) {
                                this.props.navigation.goBack();
                            } else {
                                this.setState(items);
                            }
                        }}
                    >
                        <Icon
                            style={{
                                fontSize: 20,
                                color: colors.red
                            }}
                            type="Entypo"
                            name="minus"
                        />
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
            </View>
        );
    }

    render() {
        let { navigation } = this.props;
        let { store } = navigation.state.params;
        let { items } = this.state;

        return (
            <Container style={{ display: "flex", flexDirection: "column" }}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: bodyMargin,
                        marginBottom: 0
                    }}
                >
                    <Text style={{ ...material.headlineObject }}>Items</Text>
                    <View
                        style={{
                            borderRadius: 15,
                            backgroundColor: colors.lightGray,
                            display: "flex",
                            flexDirection: "row",
                            flexGrow: 0
                        }}
                    >
                        {store.options.map((option, index) => (
                            <View
                                key={index}
                                style={{
                                    borderRadius: 15,
                                    backgroundColor:
                                        this.state.selectedOption === index
                                            ? colors.gold
                                            : colors.lightGray
                                }}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.setState({ selectedOption: index });
                                    }}
                                >
                                    <Text
                                        style={{
                                            padding: 8,
                                            paddingHorizontal: 12,
                                            color:
                                                this.state.selectedOption === index
                                                    ? colors.white
                                                    : colors.black
                                        }}
                                    >
                                        {option.name}
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        ))}
                    </View>
                </View>

                <View
                    style={{
                        margin: bodyMargin,
                        padding: 8,
                        borderTopColor: colors.darkGray,
                        borderTopWidth: 2,
                        flex: 1
                    }}
                >
                    <ScrollView>
                        {items.map((item, index) => {
                            return this.renderListItem(item, index, true);
                        })}
                        {store.options[this.state.selectedOption].upCharge != 0 ? (
                            this.renderListItem(
                                {
                                    amount: store.options[this.state.selectedOption].upCharge,
                                    name: store.options[this.state.selectedOption].name + " fee"
                                },
                                -1,
                                false
                            )
                        ) : (
                            <View />
                        )}
                    </ScrollView>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text style={{ ...material.subheadingObject }}>
                            Total: $
                            {items.map(item => item.amount).reduce((acc, amount) => acc + amount) +
                                store.options[this.state.selectedOption].upCharge}
                        </Text>
                        <Button
                            onPress={() => {
                                let order = {
                                    items: this.state.items,
                                    orderOption: this.state.selectedOption,
                                    number: orderNumber++,
                                    store,
                                    status: "Received",
                                    time: 7
                                };
                                navigation.state.params.updateOrders(order);

                                navigation.pop();
                                navigation.pop();
                                navigation.navigate("ViewOrder", {
                                    order
                                });
                            }}
                        >
                            <Text
                                style={{
                                    ...material.body2WhiteObject,
                                    paddingRight: 25,
                                    paddingLeft: 25
                                }}
                            >
                                Order
                            </Text>
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }
}
