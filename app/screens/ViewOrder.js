import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Container, Icon, Button, Content } from "native-base";
import colors from "../styles/colors";
import { material } from "react-native-typography";

const bodyMargin = 20;

export default class ViewOrder extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Order: " + navigation.state.params.order.number,
            headerMode: "screen"
        };
    };

    constructor(props) {
        super(props);
    }

    renderListItem(item, index) {
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
            </View>
        );
    }

    render() {
        let { navigation } = this.props;
        let { order } = navigation.state.params;
        let { store, items, status } = order;

        return (
            <Container style={{ display: "flex", flexDirection: "column" }}>
                <Text style={{ ...material.display1Object, margin: bodyMargin }}>
                    Status: {status}
                </Text>
                <Text style={{ margin: bodyMargin, marginBottom: 0 }}>Items</Text>

                <View
                    style={{
                        margin: bodyMargin,
                        marginTop: 0,
                        paddingTop: 2,
                        padding: 8,
                        borderTopColor: colors.darkGray,
                        borderTopWidth: 2,
                        flex: 1
                    }}
                >
                    <ScrollView>
                        {items.map((item, index) => {
                            return this.renderListItem(item, index);
                        })}
                        {store.options[order.orderOption].upCharge != 0 ? (
                            this.renderListItem(
                                {
                                    amount: store.options[order.orderOption].upCharge,
                                    name: store.options[order.orderOption].name + " fee"
                                },
                                -1
                            )
                        ) : (
                            <View />
                        )}
                        <Text style={{ paddingVertical: 2 }}>
                            Total: $
                            {items.map(item => item.amount).reduce((acc, amount) => acc + amount) +
                                store.options[order.orderOption].upCharge}
                        </Text>
                    </ScrollView>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text style={{}}>Estimated time: {order.time} minutes</Text>
                    </View>
                </View>
            </Container>
        );
    }
}
