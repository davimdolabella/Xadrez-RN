import React from "react"
import { StyleSheet, Text } from "react-native"

export default props =>{
    const color = props.color === 'black'? '#739552' : '#EBECD0'
    const styles = StyleSheet.create({
        peca:{
            fontSize: 40,
            color: props.cor === 'w'? '#b8b1b0':props.cor === 'b'? 'black': 'rgba(0,0,0,0.2)',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 50,
        }
    })
    return(
        <Text style={styles.peca}>
            {props.tipo === 'null'? 'o' : props.tipo}
            {props.tipo === null && props.select? 'x': null}
        </Text>
    )
}

