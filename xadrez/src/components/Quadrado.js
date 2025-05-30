import React from "react"
import { TouchableHighlight, StyleSheet, View } from "react-native"

export default  props => {
    const color = props.color === 'black'? '#739552' : '#EBECD0'
    const size = props.size
    const styles = StyleSheet.create({
        quadrado: {
            width: size || 50,
            height: size || 50,
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
    return (
        <TouchableHighlight onPress={props.onPress} >
            <View style={styles.quadrado}>
                {props.children}
            </View>
        </TouchableHighlight>
    )
    
}
