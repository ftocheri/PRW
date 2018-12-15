import React, { Component } from 'react'
import { Text, View, Button, Image, StyleSheet, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class ListItem extends Component {
    render() {
        const item = this.props.item;
        return(
            <View key={this.props.keyval} style={styles.listItem}>
                <Text style={styles.itemText}>{this.props.val.itemName}</Text>
                <TouchableOpacity onPress={this.props.delMe} style={styles.delItem}>
                    <Icon name="trash" size={25} />
                </TouchableOpacity>
            </View>
        );
    }
}
export default ListItem;

const styles = StyleSheet.create({
    listItem: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#4D167C',
    },
    itemText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#4D167C',
        fontSize: 20
    },
    delItem: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F74444',
        padding: 10,
        bottom: 0,
        top: 0,
        right: 0,
    },
})