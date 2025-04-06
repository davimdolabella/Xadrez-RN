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
    if (!this.state.select) {
        if (peca_detail.cor !== this.state.turn) {
          return
        }
      if (peca_detail.nome !== null) {
        this.setState({ select: true, selects: [peca_detail, null] })
      } else {
        return
      }
    } else {
      const tabuleiro = this.state.tabuleiro
      const posicpeca1 = [this.state.selects[0].col, this.state.selects[0].lin]
      const posicpeca2 = [peca_detail.col, peca_detail.lin]
      const peca1 = this.state.tabuleiro[posicpeca1[0]][posicpeca1[1]]
      const peca2 = this.state.tabuleiro[posicpeca2[0]][posicpeca2[1]]
      if (peca1 === peca2 || this.state.selects[0].cor === peca_detail.cor) {
        this.setState({ select: false, selects: [null, null]})
        return
        }
      tabuleiro[posicpeca2[0]][posicpeca2[1]] = peca1
      tabuleiro[posicpeca1[0]][posicpeca1[1]] = null
      this.setState({ select: false, selects: [null, null], tabuleiro, turn: this.state.turn === 'w' ? 'b' : 'w' })
    }
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
                const peca_detail =
                  this.state.tabuleiro[col][lin] !== null
                    ? this.state.tabuleiro[col][lin].split('_')
                    : [null, null]

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
                      })
                    }
                  >
                    <Peca
                      tipo={peca_detail[0]}
                      cor={peca_detail[1]}
                      lin={lins[lin]}
                      col={-1 * (col - 8)}
                      select={this.state.select}
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
