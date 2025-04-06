import React from "react"
import { StyleSheet, Text } from "react-native"

export default props =>{
    const color = props.color === 'black'? '#739552' : '#EBECD0'
    const styles = StyleSheet.create({
        peca:{
            fontSize: 40,
            color: props.cor === 'w'? '#b8b1b0': 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 50,
        }
    })
    return(
        <Text style={styles.peca}>
            {props.tipo}
            {props.tipo === null && props.select? 'o': null}
        </Text>
    )
}

