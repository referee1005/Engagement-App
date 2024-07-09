/**
 * Feed tab. Holds the game day feed
 */

import React, { Component } from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import { Container, Text, Body, Title, Content } from "native-base";
import { material, systemWeights } from "react-native-typography";

export default class Article extends Component {
    static navigationOptions = ({ navigation }) => {
        console.log(navigation);
        return {
            title: navigation.state.params.article.title,
            headerMode: "screen"
        };
    };

    renderContent(content) {
        if (!Array.isArray(content)) {
            content = [content];
        }
        return content.map((displayObject, index) => {
            if (displayObject.type === "title") {
                return (
                    <Title style={styles.articleTitle} key={index}>
                        {displayObject.content}
                    </Title>
                );
            } else if (displayObject.type === "header") {
                return (
                    <Title style={styles.articleHeader} key={index}>
                        {displayObject.content}
                    </Title>
                );
            } else if (displayObject.type === "text") {
                return (
                    <Text style={styles.articleText} key={index}>
                        {displayObject.content}
                    </Text>
                );
            } else if (displayObject.type === "image") {
                return (
                    <Image
                        key={index}
                        source={{ uri: displayObject.content }}
                        style={{ height: 200, width: null, flex: 1 }}
                    />
                );
            } else if (displayObject.type === "paragraph") {
                return (
                    <View key={index} style={styles.articleParagraph}>
                        {this.renderContent(displayObject.content)}
                    </View>
                );
            }
        });
    }

    render() {
        let { navigation } = this.props;
        let { article } = navigation.state.params;
        console.log(article);
        return (
            <Container>
                <ScrollView>
                    <Body style={styles.articleBody}>
                        <Content>{this.renderContent(article.content)}</Content>
                    </Body>
                </ScrollView>
            </Container>
        );
    }
}

const articleMargin = 20;
const paragraphMargin = 10;
const textMargin = 8;

const styles = StyleSheet.create({
    articleTitle: {
        ...material.headlineObject,
        ...systemWeights.bold,
        margin: articleMargin
    },
    articleHeader: {
        ...material.titleObject,
        ...systemWeights.semibold,
        fontSize: 20,
        textAlign: "left"
    },
    articleParagraph: {
        marginTop: paragraphMargin,
        marginBottom: paragraphMargin,
        marginLeft: articleMargin,
        marginRight: articleMargin
    },
    articleText: {
        lineHeight: 24,
        marginBottom: textMargin
    },
    articleBody: {
        display: "flex",
        justifyContent: "flex-start"
    }
});
