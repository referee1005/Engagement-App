/**
 * Feed tab. Holds the game day feed
 */

import React, { Component } from "react";
import { StyleSheet, Image, ScrollView, View, Animated } from "react-native";
import { Container, Text, Body, Content, Radio, Button } from "native-base";
import { iOSColors, material, materialColors } from "react-native-typography";

const screenMargin = 20;
const buttonSpacing = 8;
const foregroundColors = [iOSColors.green, iOSColors.red, iOSColors.blue, iOSColors.yellow];
const baseBarHeight = 20;
const barHeight = 170;
const barSlideAnimationTime = 700;
const textFadeAnimationTime = 60;

export default class FanGame extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.game.name,
            headerMode: "screen"
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            questionNumber: 0,
            selected: -1,
            numCorrect: 0
        };
    }

    renderPoll() {
        let { game } = this.props.navigation.state.params;
        console.log(game);
        let question = game.questions[this.state.questionNumber];
        let buttonType = this.state.selected === -1 ? { disabled: true } : { primary: true };

        return (
            <View>
                <Text style={{ margin: screenMargin }}>
                    {game.questions[this.state.questionNumber].question}
                </Text>
                {question.options.map((option, index) => (
                    <View
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        <Radio
                            selected={this.state.selected === index}
                            onPress={() => {
                                this.setState({ selected: index });
                            }}
                            style={{
                                paddingLeft: screenMargin,
                                paddingRight: buttonSpacing
                            }}
                        />
                        <Text
                            onPress={() => {
                                this.setState({ selected: index });
                            }}
                        >
                            {option}
                        </Text>
                    </View>
                ))}
                <Button
                    onPress={() => {
                        let correct = this.state.numCorrect;
                        if (this.state.selected === question.correct) {
                            correct++;
                        }
                        this.setState({
                            questionNumber: this.state.questionNumber + 1,
                            selected: -1,
                            numCorrect: correct
                        });
                    }}
                    {...buttonType}
                    style={{ margin: screenMargin }}
                    full
                >
                    <Text>Submit</Text>
                </Button>
            </View>
        );
    }

    renderResults() {
        return (
            <View style={styles.resultsContainer}>
                <Text>You got {this.state.numCorrect} correct!</Text>
            </View>
        );
    }

    render() {
        let { game } = this.props.navigation.state.params;
        console.log(this.state.questionNumber);
        console.log(game.questions.length);
        return (
            <ScrollView style={{ backgroundColor: "#fff" }}>
                <Body style={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
                    {this.state.questionNumber >= game.questions.length
                        ? this.renderResults()
                        : this.renderPoll()}
                </Body>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    resultsContainer: {
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "row",
        margin: screenMargin,
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    resultsItem: {
        flexBasis: "48%"
    },
    barBackground: {
        backgroundColor: iOSColors.midGray,
        display: "flex",
        justifyContent: "flex-end"
    },
    pollResultText: {
        ...material.titleObject,
        alignSelf: "center"
    },
    percentageText: {
        color: materialColors.whitePrimary,
        alignSelf: "center"
    }
});
