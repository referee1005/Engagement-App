/**
 * Fan Center tab
 */

// TODO figure out how to switch between tabs and add toast

import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Button
} from "react-native";
import {
    Container,
    Header,
    Title,
    Body,
    Icon,
    Root,
    Toast,
    Right,
    Button as OButton
} from "native-base";
import colors from "../../styles/colors";
import FeedItem from "../../components/FeedItem";
import { material, robotoWeights } from "react-native-typography";
import SegmentedControlTab from "react-native-segmented-control-tab";

const rewards = [
    {
        name: "Free Pretzel",
        points: 20
    },
    {
        name: "Free Hotdog",
        points: 50
    },
    {
        name: "Souvenir Cup",
        points: 80
    },
    {
        name: "GT Fan Shirt",
        points: 1000
    },
    {
        name: "Ticket Upgrade",
        points: 5000
    }
];

const game = {
    name: "Sample Game",
    questions: [
        {
            question: "Name this song!",
            options: ["The middle", "Psycho killer", "Crazy love", "We will rock you"],
            correct: 2
        },
        {
            question: "What year was Georgia Tech founded?",
            options: ["1862", "1849", "1885", "1904"],
            correct: 2
        },
        {
            question: "What was our basketball team's record Coach Pastner's first season?",
            options: ["19-18", "21-16", "25-12", "0-37"],
            correct: 1
        },
        {
            question: "What type of car is the Ramblin' Wreck?",
            options: ["Model A Ford", "Model T Ford", "Nissan Ultima"],
            correct: 0
        }
    ]
};

export default class FanCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 5,
            code: ""
        };
    }

    renderPoints() {
        return (
            <View
                style={{
                    backgroundColor: colors.gold,
                    margin: 15,
                    padding: 10,
                    flex: 1,
                    alignItems: "center"
                }}
            >
                <Text
                    style={{
                        ...material.headlineWhiteObject,
                        ...robotoWeights.bold,
                        paddingTop: 10
                    }}
                >
                    {this.state.points}
                </Text>
                <Text style={{ ...material.subheadingWhiteObject }}>POINTS AVALIABLE</Text>
            </View>
        );
    }

    renderRewards() {
        return (
            <View style={{}}>
                <View
                    style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.lightGray
                    }}
                >
                    <Text>Input Code:</Text>
                    <TextInput
                        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                        onChangeText={text => {
                            this.setState({
                                ...this.state,
                                code: text
                            });
                        }}
                        value={this.state.text}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.code == "code") {
                                this.setState({
                                    ...this.state,
                                    points: (this.state.points += 50)
                                });
                            }
                        }}
                    >
                        <View style={{ alignItems: "flex-end" }}>
                            <Icon name="plus-circle" type="FontAwesome" />
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    {rewards.map((reward, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                if (reward.points <= this.state.points) {
                                    this.setState({
                                        ...this.state,
                                        points: this.state.points - reward.points
                                    });
                                    Toast.show({
                                        text: "Bought Item!",
                                        duration: 1500
                                    });
                                } else {
                                    Toast.show({
                                        text: "Not Enough Points!",
                                        duration: 1500
                                    });
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
                                    {reward.name}
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
                                        Points: {reward.points}
                                    </Text>
                                    <Icon
                                        style={{
                                            fontSize: 20,
                                            color: colors.lightGray
                                        }}
                                        type="Entypo"
                                        name="plus"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }

    renderTrivia() {
        return (
            <View>
                {trivia.map((question, index) => (
                    <FeedItem
                        question={question}
                        key={index}
                        navigation={this.props.navigation}
                        onVote={option => {
                            this.state.article[index].alreadyVoted = true;
                            this.setState({ article: this.state.article });
                        }}
                    />
                ))}
            </View>
        );
    }

    render() {
        return (
            <Root>
                <Container>
                    <Header style={{ backgroundColor: colors.headerColor }}>
                        <Body>
                            <Title style={{ color: colors.headerText }}>Fan Center</Title>
                        </Body>
                        <Right>
                            <OButton
                                hasText
                                transparent
                                onPress={() => {
                                    this.props.navigation.navigate("FanGame", {
                                        game
                                    });
                                }}
                            >
                                <Text>Play Game</Text>
                            </OButton>
                        </Right>
                    </Header>
                    <View
                        style={{
                            paddingTop: 5,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            flexWrap: "wrap"
                        }}
                    >
                        {this.renderPoints()}
                    </View>
                    <View>{this.renderRewards()}</View>
                </Container>
            </Root>
        );
    }
}

const styles = StyleSheet.create({});
