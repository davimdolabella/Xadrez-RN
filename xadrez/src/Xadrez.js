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
            })
        }

  }

  mostrarcasaspossiveis = (peca) => {
    // Limpa seleções anteriores
    const tabuleiro = this.state.tabuleiro.map(linha =>
      linha.map(p => {
        if (p && typeof p === 'string') {
          let parts = p.split('_')
          if (parts.length < 3) return p
          parts[2] = null // remove 'o' de casas marcadas como selecionáveis
          return parts.join('_')
        }
        return p
      })
    )
  
    // Teste simples: marca uma casa à frente do peão
    if (peca.nome === 'p') {
      let dir = peca.cor === 'w' ? -1 : 1
      let newRow = peca.lin + dir
      let col = peca.col
  
      if (
        newRow >= 0 && newRow < 8 &&
        tabuleiro[newRow][col] === null
      ) {
        tabuleiro[newRow][col] = 'o_o_o' // marca como selecionável
      }
    }
  
    this.setState({ tabuleiro })
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
