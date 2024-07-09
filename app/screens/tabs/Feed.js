/**
 * Feed tab. Holds the game day feed
 */

import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Container, Header, Body, Title, Text } from "native-base";
import FeedItem from "../../components/FeedItem";
import colors from "../../styles/colors";
import { material } from "react-native-typography";

const articles = [
    {
        id: 1,
        type: "poll",
        content: "Should Oliver become the new starting quarterback?",
        options: ["Yes", "No"],
        alreadyVoted: false,
        votes: [47, 53]
    },
    {
        id: 2,
        type: "link",
        title: "Tech Wins 35-28!",
        snippet: "Click here to watch the highlights.",
        imageUrl:
            "https://cdn.vox-cdn.com/thumbor/5MJ_1Yw7A7QPf_5bAntcGvY5ERo=/0x0:4680x3120/920x613/filters:focal(1558x780:2306x1528):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/62177561/usa_today_11586068.0.jpg",
        linkUrl: "https://www.youtube.com/watch?v=f5bH5Py5h7c&feature=onebox"
        //     content: [
        //         { type: "title", content: "Tech Wins 69-1!" },
        //         {
        //             type: "paragraph",
        //             content: { type: "text", content: "What a great game and a damn good score." }
        //         },
        //         {
        //             type: "image",
        //             content:
        //                 "http://www.rentcafe.com/dmslivecafe/UploadedImages/e44a0982-d9d2-4e92-b90f-b279eaabfe53.jpg"
        //         },
        //         {
        //             type: "paragraph",
        //             content: [
        //                 {
        //                     type: "text",
        //                     content:
        //                         "Well bob, you saw what it said. What a great game and a damn good score. Officia nulla anim nulla ipsum veniam quis sunt. Exercitation laboris excepteur elit laborum aliqua anim sunt amet labore cupidatat qui aliquip. Deserunt do magna eu cupidatat sunt. Magna fugiat et labore est reprehenderit cupidatat sit ad cupidatat."
        //                 },
        //                 {
        //                     type: "text",
        //                     content:
        //                         "Part 2 of this paragraph. FOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO. Pariatur aute est commodo proident aute enim aliquip veniam cupidatat pariatur incididunt amet nisi sint. Deserunt proident dolore laboris deserunt deserunt labore cillum proident veniam proident excepteur in elit. In laborum consectetur ad dolore incididunt dolore. Nisi do labore reprehenderit consectetur culpa ut non in tempor anim Lorem."
        //                 }
        //             ]
        //         },
        //         {
        //             type: "paragraph",
        //             content: [
        //                 { type: "header", content: "P2 Heading" },
        //                 {
        //                     type: "text",
        //                     content: "Paragraph 2 baby. Look at me!!!!!!!!!!!!!!!!!!!!!!!."
        //                 }
        //             ]
        //         }
        //     ]
    },
    {
        id: 3,
        type: "text",
        title: "Benson Out for the Season",
        snippet: "Details on KiVonte Benson's Injury",
        content: [
            { type: "title", content: "Benson's Injury Update" },
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        content:
                            "Georgia Tech's starting B-back KirVonte Benson suffered a kneww injury during the game against USF, Paul Johnson said. Benson hurt his left knee in the first quarter and didn't return to the game. His loss is a failry signifcant one for the Jackets. Benson rushed for 1,053 yards last seaon."
                    },
                    {
                        type: "text",
                        content:
                            "'I feel terrible for him because he's worked hard,' Johnson said. 'He'll be back. He's a strong kid.'"
                    }
                ]
            }
        ]
    },
    // {
    //     id: 4,
    //     type: "poll",
    //     content: "Should we run the triple option again/every? Hmmmmmmm",
    //     options: ["Yes", "No", "Always", "Never again."],
    //     alreadyVoted: false,
    //     votes: [60, 20, 20, 0],
    //     imageUrl:
    //         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/64px-Google_Chrome_icon_%28September_2014%29.svg.png"
    // },
    // {
    //     id: 5,
    //     type: "text",
    //     title: "Beautiful day in the neighborhood",
    //     snippet: "Bobby Dodd is looking awfully nice tonight mkay",
    //     content: "Well bob, you saw what it said. Bobby Dodd is looking awfully nice tonight mkay"
    // },
    {
        id: 6,
        type: "image",
        title: "Beautiful night at Bobby Dodd",
        snippet: "Come out and enjoy our next game!",
        content: "Well bob, you saw what it said. Bobby Dodd is looking awfully nice tonight mkay",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/BobbyDoddStadiumGTMiami2008.jpg/1200px-BobbyDoddStadiumGTMiami2008.jpg"
    },
    {
        id: 7,
        type: "link",
        title: "A miracle has occurred!",
        imageUrl: "http://nique.net/wp-content/uploads/2015/10/FSU-Game-Online2.jpg",
        linkUrl: "https://youtu.be/Sm6eZ9V9RbM"
    }
];

export default class Feed extends Component {
    static navigationOptions = {
        title: "Game Day Feed"
    };

    constructor(props) {
        super(props);

        this.state = {
            articles
        };
    }

    render() {
        return (
            <Container>
                <ScrollView scrollEnabled={true} bounces={true} style={styles.scrollView}>
                    <Text
                        style={{
                            padding: 20,
                            alignSelf: "flex-start",
                            ...material.headlineObject,
                            color: colors.headerText
                        }}
                    >
                        Game Day Feed
                    </Text>
                    {this.state.articles.map((article, index) => (
                        <FeedItem
                            article={article}
                            key={index}
                            navigation={this.props.navigation}
                            onVote={option => {
                                this.state.articles[index].alreadyVoted = true;
                                this.setState({ articles: this.state.articles });
                                console.log("Voted for: " + article.options[option]);
                            }}
                        />
                    ))}
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        marginLeft: 5,
        marginRight: 5
    }
});
