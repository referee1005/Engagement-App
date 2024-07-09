/**
 * Creates tab navigation
 */

import React, { Component } from "react";
import {
    Dimensions,
    Image,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { Icon, Header, Title, Body, Container, Text } from "native-base";
import BottomSlideUpContent from "../../components/BottomSlideUpContent";
import colors from "../../styles/colors";
import locations from "../../data/map/Map";
import ImageZoom from "react-native-image-pan-zoom";
import blankMap from "../../data/map/blank.jpg";

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: blankMap,
            selected: -1
        };
    }

    render() {
        let { width, height } = Dimensions.get("window");
        return (
            <Container>
                <Header style={{ backgroundColor: colors.headerColor }}>
                    <Body>
                        <Title style={{ color: colors.headerText }}>Map and Guidance</Title>
                    </Body>
                </Header>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.retractTab();
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <ImageZoom
                            cropWidth={width}
                            cropHeight={320}
                            imageWidth={width}
                            imageHeight={320}
                            minScale={1}
                            style={{ position: "absolute", top: 10, height: "100%" }}
                            onClick={() => {
                                this.retractTab();
                            }}
                        >
                            <Image source={this.state.map} style={{ height: 320, width: width }} />
                        </ImageZoom>
                    </View>
                </TouchableWithoutFeedback>

                <BottomSlideUpContent
                    downHeight={217}
                    upPercentage={0.6}
                    downController={retractTab => {
                        this.retractTab = retractTab;
                    }}
                >
                    <Container style={{ display: "flex", flexDirection: "column" }}>
                        <View
                            style={{
                                backgroundColor: colors.headerColor,
                                height: 50,
                                justifyContent: "center",
                                flexGrow: 0,
                                elevation: 2
                            }}
                        >
                            <Title
                                style={{
                                    color: colors.headerText,
                                    paddingLeft: 15,
                                    alignSelf: "flex-start"
                                }}
                            >
                                Locations
                            </Title>
                        </View>
                        <ScrollView keyboardShouldPersistTaps="always" style={{ height: 40 }}>
                            {locations.map((location, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        this.retractTab();
                                        this.setState({ map: location.map, selected: index });
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
                                        onPress={() => {
                                            this.setState({ map: location.map });
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    this.state.selected === index
                                                        ? colors.gold
                                                        : colors.darkGray
                                            }}
                                        >
                                            {location.des}
                                        </Text>
                                        <Icon
                                            style={{
                                                fontSize: 20,
                                                color:
                                                    this.state.selected === index
                                                        ? colors.gold
                                                        : colors.lightGray
                                            }}
                                            name="search"
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Container>
                </BottomSlideUpContent>
            </Container>
        );
    }
}

const styles = StyleSheet.create({});
