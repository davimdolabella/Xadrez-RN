import React from 'react'
import { View, Dimensions, Text, TouchableOpacity } from 'react-native'
import Quadrado from './components/Quadrado'
import Peca from './components/Peca'
import peao from './pecas/peao'
import torre from './pecas/torre'
import rainha from './pecas/rainha'

const cols = 'abcdefgh'
const pecas = ['p', 't', 'c', 'b', 'ra', 're']
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
  enpassant: null,
  roque: [true,true]
}

export default class Xadrez extends React.Component {
  tabuleirowidth = Dimensions.get('window').width
  quadradosize = this.tabuleirowidth / 8

  state = {
    tabuleiro: JSON.parse(JSON.stringify(initialTabuleiro)),
    turn: 'w',
    selects: [null, null],
    select: false,
    enpassant: null, 
    roque: [true,true]
  }
  is_valid = (lin_or_col) => lin_or_col < 8 && lin_or_col >= 0
  getpecadetail = (lin, col)=>{
    let tabuleiro = this.state.tabuleiro
    let peca_detail = tabuleiro[lin][col] !== null ? tabuleiro[lin][col].split('_') : [null, null]
    return peca_detail
  }
  pecaclicada = (peca_detail) => {
    if (this.state.selects[0] !== null && (peca_detail.nome === null && !peca_detail.selectable))  {
      this.setState({
        selects: [null, null],
        select: false,
      })
      this.limparcasaspossiveis()
      
    }else if(this.state.selects[0] !== null && peca_detail.cor === this.state.turn){
      this.limparcasaspossiveis()
      this.setState({
        selects: [peca_detail, null],
        select: true,
      })
      this.mostrarcasaspossiveis(peca_detail)
    }
    if (this.state.select === false && peca_detail.nome !== null && peca_detail.cor === this.state.turn) {
      this.setState({
        selects: [peca_detail, null],
        select: true,
      })
      this.mostrarcasaspossiveis(peca_detail)

    }else if(peca_detail.selectable){
        let tabuleiro = this.state.tabuleiro
        let peca = this.state.selects[0]
        let anterior = this.getpecadetail(this.state.turn === 'w'? peca_detail.lin + 1: peca_detail.lin-1, peca_detail.col)
        if(this.state.enpassant != null){
          if(peca.nome === 'p' && anterior[0] === 'p'){
            tabuleiro[this.state.turn === 'w'? peca_detail.lin + 1: peca_detail.lin-1][peca_detail.col] = null
          }
          this.setState({enpassant: null})
        }else if(peca.nome === 'p' && peca.piecemoves === 0 && (peca_detail.lin === peca.lin + 2 || peca_detail.lin === peca.lin - 2)){
          this.setState({enpassant:peca_detail})
        }

        tabuleiro[peca.lin][peca.col] = null
        tabuleiro[peca_detail.lin][peca_detail.col] = peca.nome+'_'+ peca.cor + '_n_'+ peca.piecemoves + 1
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
    Array.from({ length: 8 }).map((_, col) => (
      Array.from({ length: 8 }).map((_, lin) => {
        let peca_detail = this.getpecadetail(lin,col)
        if (peca_detail[2] === 'o') {
          tabuleiro[lin][col] = peca_detail[0] + '_' + peca_detail[1] + '_n_' + peca_detail[3]
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
    const movimentos = {
      t: torre,
      ra: rainha
    }
    const funcaoMovimento = movimentos[peca_detail.nome]
    if (funcaoMovimento) {
      posicpossiveis = funcaoMovimento(peca_detail, this.getpecadetail, this.is_valid, pecas)
    }
    if (peca_detail.nome === 'p'){
      posicpossiveis = peao(peca_detail, this.getpecadetail, this.state.enpassant, this.is_valid, pecas)
    }
    Array.from({ length: 8 }).map((_, col) => (
        Array.from({ length: 8 }).map((_, lin) => {
          const existe = posicpossiveis.some(p => p[0] === lin && p[1] === col);
          let peca_detail =
                  this.state.tabuleiro[lin][col] !== null
                    ? this.state.tabuleiro[lin][col].split('_')
                    : [null, null]
          if (existe) {
            tabuleiro[lin][col] = peca_detail !== null? peca_detail[0]+'_'+ peca_detail[1] + '_o_' + peca_detail[3] : 'o_'
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
        <TouchableOpacity
          style={styles.reiniciar}
          onPress={() => this.setState(initialstate)}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Reiniciar</Text>
        </TouchableOpacity>
        <View style={styles.tabuleiro}>
          {Array.from({ length: 8 }).map((_, col) => (
            <View key={col} style={styles.col}>
              {Array.from({ length: 8 }).map((_, lin) => {
                const color = (col + lin) % 2 === 0 ? 'white' : 'black'
                let peca_detail =
                  this.state.tabuleiro[lin][col] !== null
                    ? this.state.tabuleiro[lin][col].split('_')
                    : [null, null]

                peca_detail = peca_detail[0] !== null && peca_detail[0] === 'o' ? [null,null,'o',null] : peca_detail

                return (
                  <Quadrado
                    key={`${col}-${lin}`}
                    color={color}
                    size={this.quadradosize}
                    onPress={() =>
                      this.pecaclicada({
                        nome: peca_detail[0],
                        cor: peca_detail[1],
                        col: col,
                        lin: lin,
                        selectable: peca_detail[2] === 'o',
                        piecemoves: peca_detail[3] ? parseInt(peca_detail[3]) : 0

                      })
                    }
                  >
                    <Peca
                      tipo={peca_detail[0]}
                      cor={peca_detail[1]}
                      col={cols[col]}
                      lin={-1 * (lin - 8)}
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
