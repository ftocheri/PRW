import React, { Component } from 'react'
import { Text, View, Button, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

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
            <Text>Home Page</Text>
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
    myBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    myRed: {
        color: 'red',
    },
});