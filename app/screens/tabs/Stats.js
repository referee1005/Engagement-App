/**
 * Feed tab. Holds the game day feed
 */

import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Container, Header, Body, Title } from "native-base";
import colors from "../../styles/colors";
import { material, robotoWeights } from "react-native-typography";

// const stats = {
//     team1: {
//         name: "Georgia Tech",
//         score: 66,
//         color: colors.gold,
//         stats: [
//             { name: "First Downs", value: 28 },
//             { name: "Yotal Yards", value: 554 },
//             { name: "Rushing Yards", value: 542 },
//             { name: "Rushing Attempts", value: 65 },
//             { name: "Yards per Rush", value: 8.3 },
//             { name: "Passing Yards", value: 12 },
//             { name: "Completions", value: 1 },
//             { name: "Pass Attempts", value: 2 },
//             { name: "Yards per Pass", value: 6 },
//             { name: "Turnovers", value: 0 },
//             { name: "Fumbles", value: 0 },
//             { name: "Interceptions", value: 0 }
//         ]
//     },
//     team2: {
//         name: "Louisville",
//         score: 31,
//         color: "#dd1925",
//         stats: [
//             { name: "First Downs", value: 23 },
//             { name: "Yotal Yards", value: 483 },
//             { name: "Rushing Yards", value: 113 },
//             { name: "Rushing Attempts", value: 23 },
//             { name: "Yards per Rush", value: 4.9 },
//             { name: "Passing Yards", value: 370 },
//             { name: "Completions", value: 27 },
//             { name: "Pass Attempts", value: 44 },
//             { name: "Yards per Pass", value: 8.4 },
//             { name: "Turnovers", value: 1 },
//             { name: "Fumbles", value: 2 },
//             { name: "Interceptions", value: 1 }
//         ]
//     }
// };

const stats = {
    team1: {
        name: "Georgia Tech",
        score: 38,
        color: colors.gold,
        stats: [
            { name: "First Downs", value: 27 },
            { name: "Yotal Yards", value: 565 },
            { name: "Rushing Yards", value: 461 },
            { name: "Rushing Attempts", value: 74 },
            { name: "Yards per Rush", value: 6.2 },
            { name: "Passing Yards", value: 104 },
            { name: "Completions", value: 2 },
            { name: "Pass Attempts", value: 2 },
            { name: "Yards per Pass", value: 52 },
            { name: "Turnovers", value: 3 },
            { name: "Fumbles", value: 3 },
            { name: "Interceptions", value: 0 }
        ]
    },
    team2: {
        name: "North Carolina",
        score: 31,
        color: "#99badd",
        stats: [
            { name: "First Downs", value: 19 },
            { name: "Yotal Yards", value: 374 },
            { name: "Rushing Yards", value: 166 },
            { name: "Rushing Attempts", value: 36 },
            { name: "Yards per Rush", value: 4.6 },
            { name: "Passing Yards", value: 208 },
            { name: "Completions", value: 18 },
            { name: "Pass Attempts", value: 31 },
            { name: "Yards per Pass", value: 6.7 },
            { name: "Turnovers", value: 3 },
            { name: "Fumbles", value: 0 },
            { name: "Interceptions", value: 3 }
        ]
    }
};

const basketballStats = {
    team1: {
        name: "Georgia Tech",
        score: 87,
        color: colors.gold,
        stats: [{ name: "Shot Efficiency", value: 43.6 }]
    },
    team2: {
        name: "Florida Tech",
        score: 36,
        color: "#990000",
        stats: [{ name: "Shot Efficiency", value: 25.2 }]
    }
};

export default class Stats extends Component {
    renderTeam(team) {
        return (
            <View
                style={{
                    backgroundColor: team.color,
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
                    {team.score}
                </Text>
                <Text style={{ ...material.subheadingWhiteObject }}>{team.name}</Text>
            </View>
        );
    }

    renderRow(team1Stat, team2Stat, team1Color, team2Color, key) {
        return (
            <View
                key={key}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.lightGray
                }}
            >
                <Text
                    style={{
                        color: team1Color
                    }}
                >
                    {team1Stat.value}
                </Text>
                <Text>{team1Stat.name}</Text>
                <Text
                    style={{
                        color: team2Color
                    }}
                >
                    {team2Stat.value}
                </Text>
            </View>
        );
    }

    renderTable(stats) {
        return (
            <View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottomColor: colors.darkGray,
                        paddingBottom: 2,
                        borderBottomWidth: 2
                    }}
                >
                    <Text style={{ ...material.titleObject, color: stats.team1.color }}>
                        {stats.team1.name}
                    </Text>
                    <Text style={{ ...material.titleObject, color: stats.team2.color }}>
                        {stats.team2.name}
                    </Text>
                </View>
                {stats.team1.stats.map((stat, row) => {
                    return this.renderRow(
                        stats.team1.stats[row],
                        stats.team2.stats[row],
                        stats.team1.color,
                        stats.team2.color,
                        row
                    );
                })}
            </View>
        );
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: colors.headerColor }}>
                    <Body>
                        <Title style={{ color: colors.headerText }}>Score and Statistics</Title>
                    </Body>
                </Header>
                <View
                    style={{
                        paddingTop: 5,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        borderBottomColor: colors.lightGray,
                        borderBottomWidth: 1
                    }}
                >
                    {this.renderTeam(stats.team1)}
                    {this.renderTeam(stats.team2)}
                </View>
                <ScrollView>
                    <View style={{ margin: 15 }}>{this.renderTable(stats)}</View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({});
