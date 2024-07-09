/**
 * Feed tab. Holds the game day feed
 */

import React, { Component } from "react";
import { StyleSheet, Image, TouchableHighlight, Linking, View } from "react-native";
import { Text, Card, CardItem, Body, Radio, Button } from "native-base";

function openArticle(navigation, article) {
    navigation.navigate("Article", {
        article
    });
}

const TextFeedItem = props => {
    return (
        <TouchableHighlight onPress={openArticle.bind(this, props.navigation, props.article)}>
            <Card>
                <CardItem header>
                    <Text>{props.article.title}</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{props.article.snippet}</Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Text>{props.article.footer}</Text>
                </CardItem>
            </Card>
        </TouchableHighlight>
    );
};

const ImageFeedItem = props => {
    return (
        <TouchableHighlight onPress={openArticle.bind(this, props.navigation, props.article)}>
            <Card>
                <CardItem header>
                    <Body>
                        <Text>{props.article.title}</Text>
                        <Text note>{props.article.snippet}</Text>
                    </Body>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={{ uri: props.article.imageUrl }}
                        style={{ height: 200, width: null, flex: 1 }}
                    />
                </CardItem>
            </Card>
        </TouchableHighlight>
    );
};

const LinkFeedItem = props => {
    return (
        <TouchableHighlight
            onPress={() => {
                Linking.openURL(props.article.linkUrl).catch(err =>
                    console.error("An error occurred", err)
                );
            }}
        >
            <Card>
                <CardItem header>
                    <Body>
                        <Text>{props.article.title}</Text>
                        <Text note>{props.article.snippet || "video"}</Text>
                    </Body>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={{ uri: props.article.imageUrl }}
                        style={{ height: 200, width: null, flex: 1 }}
                    />
                </CardItem>
            </Card>
        </TouchableHighlight>
    );
};

const PollFeedItem = props => {
    return (
        <Card style={{ zIndex: 0 }}>
            <CardItem header>
                <Text>Poll</Text>
            </CardItem>
            <CardItem cardBody>
                {props.article.imageUrl ? (
                    <Image
                        source={{ uri: props.article.imageUrl }}
                        style={{ height: 200, width: null, flex: 1 }}
                    />
                ) : (
                    <View />
                )}
            </CardItem>
            <CardItem>
                <Body>
                    <Text>{props.article.content}</Text>
                    <Button
                        onPress={() => {
                            console.log(props);
                            props.navigation.navigate("Poll", {
                                article: props.article,
                                onVote: props.onVote
                            });
                        }}
                        success
                        block
                        small
                        style={{ marginTop: 8 }}
                    >
                        <Text>{props.article.alreadyVoted ? "View" : "Vote!"}</Text>
                    </Button>
                </Body>
            </CardItem>
        </Card>
    );
};

export default class FeedItem extends Component {
    render() {
        if (this.props.article.type === "text") {
            return TextFeedItem(this.props);
        } else if (this.props.article.type === "image") {
            return ImageFeedItem(this.props);
        } else if (this.props.article.type === "link") {
            return LinkFeedItem(this.props);
        } else if (this.props.article.type === "poll") {
            return PollFeedItem(this.props);
        }
    }
}
const styles = StyleSheet.create({});
