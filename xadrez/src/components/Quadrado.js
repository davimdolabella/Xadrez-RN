import React from "react"
import { TouchableHighlight, StyleSheet, View } from "react-native"

export default  props => {
    const color = props.color === 'black'? '#739552' : '#EBECD0'
    const size = props.size
    const col = props.col || 0
    const lin = props.lin || 0
    const styles = StyleSheet.create({
        quadrado: {
            width: size || 50,
            height: size || 50,
            backgroundColor: color,
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
