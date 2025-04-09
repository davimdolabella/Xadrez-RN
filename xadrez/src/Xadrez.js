import React from 'react'
import { View, Dimensions, Text, TouchableHighlight } from 'react-native'
import Quadrado from './components/Quadrado'
import Peca from './components/Peca'

const lins = 'abcdefgh'

const initialTabuleiro = [
  ['t_b', 'c_b', 'b_b', 'ra_b', 're_b', 'b_b', 'c_b', 't_b'],
  ['p_b', 'p_b', 'p_b', 'p_b', 'p_b', 'p_b', 'p_b', 'p_b'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['p_w', 'p_w', 'p_w', 'p_w', 'p_w', 'p_w', 'p_w', 'p_w'],
  ['t_w', 'c_w', 'b_w', 'ra_w', 're_w', 'b_w', 'c_w', 't_w'],
]

const initialstate = {
  tabuleiro: JSON.parse(JSON.stringify(initialTabuleiro)),
  turn: 'w',
  selects: [null, null],
  select: false,
}

export default class Xadrez extends React.Component {
  tabuleirowidth = Dimensions.get('window').width
  quadradosize = this.tabuleirowidth / 8

  state = {
    tabuleiro: JSON.parse(JSON.stringify(initialTabuleiro)),
    turn: 'w',
    selects: [null, null],
    select: false,
  }

  pecaclicada = (peca_detail) => {
    if (this.state.select === false && peca_detail.nome !== null && peca_detail.cor === this.state.turn) {
      this.setState({
        selects: [peca_detail, null],
        select: true,
      })
      this.mostrarcasaspossiveis(peca_detail)

    }else if(peca_detail.selectable){
        let tabuleiro = this.state.tabuleiro
        let peca = this.state.selects[0]
        tabuleiro[peca.col][peca.lin] = null
        tabuleiro[peca_detail.col][peca_detail.lin] = peca.nome+'_'+ peca.cor + '_n_'+ peca.piecemoves + 1
            this.setState({
                selects: [null, null],
                select: false,
                turn: this.state.turn === 'w' ? 'b' : 'w',
                tabuleiro
            })
          this.limparcasaspossiveis()
        }
  }
  limparcasaspossiveis = () => {
    let tabuleiro = this.state.tabuleiro
    Array.from({ length: 8 }).map((_, lin) => (
      Array.from({ length: 8 }).map((_, col) => {
        let peca_detail =
          this.state.tabuleiro[col][lin] !== null
            ? this.state.tabuleiro[col][lin].split('_')
            : [null, null]
        if (peca_detail[2] === 'o') {
          tabuleiro[col][lin] = peca_detail[0] + '_' + peca_detail[1] + '_n_' + peca_detail[3]
        }
      })
    ))
    this.setState({
      tabuleiro,
    })
  }
  mostrarcasaspossiveis = (peca_detail) => {
    let posicpossiveis = []
    let tabuleiro =  this.state.tabuleiro
    if (peca_detail.nome === 'p'){
      if (peca_detail.cor === 'w') {
        posicpossiveis.push([peca_detail.col- 1, peca_detail.lin ])
        if (peca_detail.piecemoves === 0) {
          posicpossiveis.push([peca_detail.col - 2, peca_detail.lin])
        }
      } else {
        posicpossiveis.push([peca_detail.col+ 1, peca_detail.lin ])
        if (peca_detail.piecemoves === 0) {
          posicpossiveis.push([peca_detail.col + 2, peca_detail.lin])
        }
      }
    }
    Array.from({ length: 8 }).map((_, lin) => (
        Array.from({ length: 8 }).map((_, col) => {
          const existe = posicpossiveis.some(p => p[0] === col && p[1] === lin);
          let peca_detail =
                  this.state.tabuleiro[col][lin] !== null
                    ? this.state.tabuleiro[col][lin].split('_')
                    : [null, null]
          if (existe) {
            tabuleiro[col][lin] = peca_detail !== null? peca_detail[0]+'_'+ peca_detail[1] + '_o_' + peca_detail[3] : 'o_'
          }
            })
    ))
    this.setState({
      tabuleiro,
    })
  }
  
  

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.reiniciar}
          onPress={() => this.setState(initialstate)}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Reiniciar</Text>
        </TouchableHighlight>
        <View style={styles.tabuleiro}>
          {Array.from({ length: 8 }).map((_, lin) => (
            <View key={lin} style={styles.lin}>
              {Array.from({ length: 8 }).map((_, col) => {
                const color = (lin + col) % 2 === 0 ? 'white' : 'black'
                let peca_detail =
                  this.state.tabuleiro[col][lin] !== null
                    ? this.state.tabuleiro[col][lin].split('_')
                    : [null, null]

                peca_detail = peca_detail[0] !== null && peca_detail[0] === 'o' ? [null,null,'o',null] : peca_detail

                return (
                  <Quadrado
                    key={`${lin}-${col}`}
                    lin={lins[lin]}
                    col={-1 * (col - 8)}
                    color={color}
                    size={this.quadradosize}
                    onPress={() =>
                      this.pecaclicada({
                        nome: peca_detail[0],
                        cor: peca_detail[1],
                        lin: lin,
                        col: col,
                        selectable: peca_detail[2] === 'o',
                        piecemoves: peca_detail[3] ? parseInt(peca_detail[3]) : 0

                      })
                    }
                  >
                    <Peca
                      tipo={peca_detail[0]}
                      cor={peca_detail[1]}
                      lin={lins[lin]}
                      col={-1 * (col - 8)}
                      select={peca_detail[2] === 'o'}
                    />
                  </Quadrado>
                )
              })}
            </View>
          ))}
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#302E2B',
  },
  tabuleiro: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reiniciar: {
    marginBottom: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
}
