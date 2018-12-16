import React, { Component } from 'react'
import { Text, View, Button, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import HomeModal from '../components/modal'

class HomeScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => {
            return (<Icon name="home" size={35} style={{color:tintColor}}/>);
        },
    }
    render() {
        return(
            <View style={styles.container}>
                <Text>Modal Page</Text>
                <HomeModal />
            </View>
        );
    }
}
export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'FontAwesome'
    },
});