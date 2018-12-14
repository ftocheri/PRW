import React, { Component } from 'react'
import { Text, View, Button, Image, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class TodoScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor, focused}) => {
            return (
                <MaterialIcons
                    name="change-history"
                    size={26}
                    style={{color: tintColor}}>
                </MaterialIcons>
            )
        }
    }
    render() {
        return(
            <View style={styles.container}>
            <Text>Todo Page</Text>
            </View>
        );
    }
}
export default TodoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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