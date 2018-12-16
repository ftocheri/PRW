import React, { Component } from 'react'
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native'

class HomeModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
        }
    }

    toggleModal(visible) {
        this.setState({modalVisible: visible});
    }
    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose= {() => {
                        console.log("Modal has been closed.") }}>
                    <View style={styles.modal}>
                        <Text style={styles.text}>Modal is Open</Text>
                        <TouchableHighlight onPress={() => {
                            this.toggleModal(!this.state.modalVisible)}}>
                                <Text style={styles.text}>Close Modal</Text>
                            </TouchableHighlight>
                    </View>
                </Modal>
                <TouchableHighlight onPress= {() => {this.toggleModal(true)}}>
                    <Text style={styles.text}>Open Modal</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
export default HomeModal

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        backgroundColor: 'yellow',
        padding: 100
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4D167C',
        padding: 100
    },
    text: {
        color: "green",
        marginTop: 10
    }
})
