/**
 * Main Screen. Holds the tab navigation
 */

import { StyleSheet } from "react-native";
import Feed from "./tabs/Feed";
import Map from "./tabs/Map";
import Stats from "./tabs/Stats";
import Shop from "./tabs/Shop";
import FanCenter from "./tabs/FanCenter";
import TabNavigationCreator from "../components/TabNavigation";

/**
 * Tab object with config info about each tab
 */
const tabs = {
    Feed: { screen: Feed },
    Map: { screen: Map },
    Game: { screen: Stats },
    Shop: { screen: Shop },
    Rewards: { screen: FanCenter }
};
export default TabNavigationCreator(tabs);

const styles = StyleSheet.create({});
