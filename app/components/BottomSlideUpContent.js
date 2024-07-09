/**
 * Feed tab. Holds the game day feed
 */

import React, { Component } from "react";
import {
    Dimensions,
    Animated,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";
import { Container, Header, Body, Title, Left, View, Text } from "native-base";
import colors from "../styles/colors";

const downHeight = 120;
const upPercentage = 0.6;
const animationTime = 100;

export default class BottomSlideUpContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            down: true,
            currentHeight: null
        };
        this.downHeight = props.downHeight || downHeight;
        this.upPercentage = props.upPercentage || upPercentage;
        this.state.currentHeight = new Animated.Value(this.downHeight);

        this.props.downController(() => {
            if (!this.state.down) {
                this.setState({ down: true });
                Animated.timing(this.state.currentHeight, {
                    toValue: this.downHeight,
                    timing: animationTime
                }).start();
            }
        });
    }

    render() {
        let { height } = Dimensions.get("window");

        return (
            <Animated.View
                elevation={40}
                style={{
                    width: "100%",
                    position: "absolute",
                    height: this.state.currentHeight,
                    bottom: 0,
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: "#ddd",
                    borderBottomWidth: 0,
                    borderLeftWidth: 0,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 40,
                    marginTop: 10
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (this.state.down) {
                            this.setState({ down: false });
                            Animated.timing(this.state.currentHeight, {
                                toValue: height * this.upPercentage,
                                timing: animationTime
                            }).start();
                        } else {
                            this.setState({ down: true });
                            Animated.timing(this.state.currentHeight, {
                                toValue: this.downHeight,
                                timing: animationTime
                            }).start();
                        }
                    }}
                >
                    {this.props.children}
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({});
