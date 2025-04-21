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
            width: '100%',
            height:'100%',
            backgroundColor: props.xeque?  'rgba(186, 41, 41, 0.47)':'rgba(0, 0, 0, 0)'
        },
        select:{
            position: 'absolute',
            top: props.tipo !== null? -40 : -36,
            fontSize: props.tipo !== null? 80 : 90,
            color:'rgba(0,0,0,0.2)',
            fontWeight: 'bold',
            textAlign: 'center',
        }
    })
    return(
        <>
        <Text style={styles.peca}>
            {props.tipo === 'p'? '♟' : null}
            {props.tipo === 't'? '♖' : null}
            {props.tipo === 'c'? '♞' : null}
            {props.tipo === 'b'? '♗' : null}
            {props.tipo === 'ra'? '♕' : null}
            {props.tipo === 're'? '♔' : null}
            
        </Text>
        <Text style={styles.select}>
            {props.select? props.tipo === null? '•': 'o' :null}
        </Text>
        
        </>
        
    )
}

