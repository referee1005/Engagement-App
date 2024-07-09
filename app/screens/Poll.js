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

export default class Poll extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Poll",
            headerMode: "screen"
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            selected: -1,
            article: this.props.navigation.state.params.article,
            pollHeightPercentage: [],
            pollOpacities: [],
            pollAnimation: []
        };

        this.state.article.votes.forEach((item, index) => {
            this.state.pollHeightPercentage.push(new Animated.Value(0));
            this.state.pollOpacities.push(new Animated.Value(0));

            this.state.pollAnimation.push(
                Animated.sequence([
                    Animated.timing(this.state.pollHeightPercentage[index], {
                        toValue: (item * (barHeight - baseBarHeight)) / 100 + baseBarHeight,
                        duration: barSlideAnimationTime
                    }),
                    Animated.timing(this.state.pollOpacities[index], {
                        toValue: 1,
                        duration: textFadeAnimationTime,
                        useNativeDriver: true
                    })
                ])
            );
        });
    }

    renderPoll() {
        let { navigation } = this.props;
        let { article } = this.state;
        let buttonType = this.state.selected === -1 ? { disabled: true } : { primary: true };

        return (
            <View>
                {article.options.map((option, index) => (
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
                        navigation.state.params.onVote(this.state.selected);
                        this.setState({ article: { ...this.state.article, alreadyVoted: true } });
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
        let { article } = this.state;

        this.state.pollAnimation.forEach(anim => anim.start());

        return (
            <View style={styles.resultsContainer}>
                {article.votes.map((num, index) => (
                    <View key={index} style={styles.resultsItem}>
                        <Text style={styles.pollResultText}>{article.options[index]}</Text>
                        <View style={{ ...styles.barBackground, height: barHeight }}>
                            <Animated.View
                                style={{
                                    height: this.state.pollHeightPercentage[index],
                                    backgroundColor:
                                        foregroundColors[index % foregroundColors.length]
                                }}
                            >
                                <Animated.Text
                                    style={{
                                        ...styles.percentageText,
                                        opacity: this.state.pollOpacities[index]
                                    }}
                                >
                                    {article.votes[index]}%
                                </Animated.Text>
                            </Animated.View>
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    render() {
        let { article } = this.state;
        console.log(article);
        return (
            <ScrollView style={{ backgroundColor: "#fff" }}>
                <Body style={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
                    {article.imageUrl ? (
                        <Image
                            source={{ uri: article.imageUrl }}
                            style={{ width: "100%", height: 200 }}
                        />
                    ) : (
                        <View />
                    )}
                    <Text style={{ margin: screenMargin }}>{article.content}</Text>
                    {article.alreadyVoted ? this.renderResults() : this.renderPoll()}
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
