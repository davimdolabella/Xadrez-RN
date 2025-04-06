import React from 'react'
import {Text,View, Dimensions} from 'react-native'
import Quadrado from './components/Quadrado'
import Peca from './components/Peca'
const lins = 'abcdefgh'
const initialTabuleiro =[ ['t_w', 'c_w', 'b_w', 'ra_w',
                    're_w', 'b_w', 'c_w', 't_w'],
                    ['p_w', 'p_w', 'p_w', 'p_w',
                    'p_w', 'p_w', 'p_w', 'p_w'],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    ['p_b', 'p_b', 'p_b', 'p_b',
                        'p_b', 'p_b', 'p_b', 'p_b'],
                    ['t_b', 'c_b', 'b_b', 'ra_b',
                        're_b', 'b_b', 'c_b', 't_b'],
                        
                    ]

export default class Xadrez extends React.Component{
    tabuleirowidth = Dimensions.get('window').width
    quadradosize = this.tabuleirowidth / 8
    state= {
        tabuleiro: initialTabuleiro,
        turn: 'w',
        selects: [null,null],
        select: false
    }
    pecaclicada = () =>{
        this.setState({select: !this.state.select})

    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.tabuleiro}>
                    {Array.from({ length: 8 }).map((_, lin) => (
                        <View key={lin} style={styles.lin}>
                            {Array.from({ length: 8 }).map((_, col) => {
                                const color = (lin + col) % 2 === 0 ? 'white' : 'black';
                                const peca_detail = this.state.tabuleiro[col][lin] !== null ? this.state.tabuleiro[col][lin].split('_') : [null, null]
                                return <Quadrado 
                                        key={`${lin}-${col}`} 
                                        lin={lins[lin]} col={-1 *(col -8)}
                                        color={color} 
                                        size={this.quadradosize}
                                        onPress={() => this.pecaclicada()}>
                                            
                                            <Peca
                                                tipo = {peca_detail[0]}
                                                cor = {peca_detail[1]}
                                                lin={lins[lin]} col={-1 *(col -8)}
                                                select= {this.state.select}
                                            />
                                        </Quadrado>
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