import React from 'react'
import {Text,View, Dimensions} from 'react-native'
import Quadrado from './components/Quadrado'
const lins = 'abcdefgh'
export default class Xadrez extends React.Component{
    tabuleirowidth = Dimensions.get('window').width
    quadradosize = this.tabuleirowidth / 8

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.tabuleiro}>
                    {Array.from({ length: 8 }).map((_, lin) => (
                        <View key={lin} style={styles.lin}>
                            {Array.from({ length: 8 }).map((_, col) => {
                                const color = (lin + col) % 2 === 0 ? 'white' : 'black';
                                return <Quadrado key={`${lin}-${col}`} lin={lins[lin]} col={-1 *(col -8)} color={color} size={this.quadradosize} />
                            })}
                        </View>
                    ))}
                    
                </View>
            </View>
        )
    }
}
const styles = {
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#302E2B',
    },
    tabuleiro:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
}