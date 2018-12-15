import React, { Component } from 'react'
import { Text, View, Button, Image, StyleSheet, TextInput, TouchableOpacity, TouchableHighlight, ScrollView, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import ListItem from '../components/ListItem'

class TodoScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemArray: [
                {
                    'itemName': 'text 1',
                }
            ],
            itemText: '',
        }
        this.addItem = this.addItem.bind(this)
    }
    static navigationOptions = {
        tabBarLabel: 'Todo',
        tabBarIcon: ({tintColor}) => {
            return (<Icon name="list-alt" size={35} color="gray" style={{color:tintColor}}/>);
        },
    }
    saveItems() {
        let item = this.state.itemText
        AsyncStorage.setItem('item', item)
        this.setState({item:item, savedItem:item, item:''})
    }
    componentWillMount() {
        this.getItems()
    }
    getItems() {
        AsyncStorage.getItem('item').then((item) => {
            this.setState({item: item, saveitem: item})
        })
    }
    addItem() {
        if(this.state.itemText) {
            this.state.itemArray.push({'itemName': this.state.itemText});
            this.setState({'itemArray': this.state.itemArray})
            this.setState({'itemText': ''});
        }
        let item = this.state.itemText
        AsyncStorage.setItem('item', item)
        this.setState({item:item, savedItem:item, item:''})
    }
    delItem(key) {
        this.state.itemArray.splice(key, 1);
        this.setState({itemArray: this.state.itemArray});
    }
    render() {
        let myItems = this.state.itemArray.map((val, key) => {
            return <ListItem key={key} keyval={key} val={val} delMe={() =>this.delItem(key)} />
        });
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Todo List {"\n"} Please add a todo item</Text>
                </View>

                <View style={styles.myBod}>
                    <TextInput style={styles.input}
                        underLineColorAndroid="transparent"
                        placeholder="New Item"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={(itemText) => this.setState({itemText})}
                        value={this.state.itemText} />
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={this.addItem}>
                        <Text style={styles.submitButtonText}>
                            <Icon name="plus" size={30} />
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.hr}>Todo List</Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {myItems}
                </ScrollView>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>This is my footer...</Text>
                </View>
            </View>
        );
    }
}
export default TodoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    myBody: {
        justifyContent: 'center'
    },
    header: {
        textAlign: 'center',
        marginBottom: 20 
    },
    headerText: {
        textAlign: 'center',
        fontSize: 30,
        color: '#4D167C',
        fontWeight: 'bold',
        marginRight: 20,
        marginLeft: 20,
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        width: 300,
        height: 50,
        padding: 10,
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 30
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 150,
        backgroundColor: '#36EA29',
        alignSelf: 'center',
        marginBottom: 20
    },
    hr: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#4D167C',
        fontWeight: 'bold',
        marginBottom: 15
    }
});