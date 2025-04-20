import React from 'react'
import { View, Dimensions, Text, TouchableOpacity } from 'react-native'
import Quadrado from './components/Quadrado'
import Peca from './components/Peca'
import peao from './logical/peao'
import torre from './logical/torre'
import rainha from './logical/rainha'
import bispo from './logical/bispo'
import cavalo from './logical/cavalo'
import rei from './logical/rei'
import tabuleiro from './logical/tabuleiro'
// [piece, color, piecemoves, selectable, number of threats]

const cols = 'abcdefgh'
const pecas = ['p', 't', 'c', 'b', 'ra', 're']
const initialTabuleiro = tabuleiro

const initialstate = {
  tabuleiro: JSON.parse(JSON.stringify(initialTabuleiro)),
  turn: 'w',
  selects: [null, null],
  select: false,
  enpassant: null,
  roque: [true,true],
  xeque: false
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
    roque: [true,true],
    xeque: false
  }
  // this_is_xeque = (lin,col)=>{
  //   let peca = this.getpecadetail(lin,col)
  //   let posicpossiveis = []
  //   const movimentos = {
  //     t: torre,
  //     b: bispo,
  //     c: cavalo,
  //     ra: rainha,
  //     re: rei
  //   }
  //   const funcaoMovimento = movimentos[peca_detail.nome]
  //   if (funcaoMovimento && (peca_detail.nome === 're' || !this.state.xeque)) {
  //     posicpossiveis = funcaoMovimento(peca_detail, this.getpecadetail, this.is_valid, pecas)
  //   }
  //   if (peca_detail.nome === 'p' && !this.state.xeque){
  //     posicpossiveis = peao(peca_detail, this.getpecadetail, this.state.enpassant, this.is_valid, pecas)
  //   }
  //   for(let i = 0; i < 7; i++){
  //     console.warn(posicpossiveis[i])
  //   }
  // }
  is_valid = (lin_or_col) => lin_or_col < 8 && lin_or_col >= 0
  // getpecadetail = (lin, col)=>{
  //   let tabuleiro = this.state.tabuleiro
  //   let peca_detail = tabuleiro[lin][col] !== null ? tabuleiro[lin][col].split('_') : [null, null]
  //   return peca_detail
  // }
  
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
        let anterior = this.is_valid(peca_detail.lin+1) && this.is_valid(peca_detail.lin-1)? 
        tabuleiro[this.state.turn === 'w'? peca_detail.lin + 1: peca_detail.lin-1][ peca_detail.col] : false
        if(this.state.enpassant != null && anterior){
          if(peca.nome === 'p' && anterior[0] === 'p'){
            tabuleiro[this.state.turn === 'w'? peca_detail.lin + 1: peca_detail.lin-1][peca_detail.col] = [null,null,false,0,0]
          }
          this.setState({enpassant: null})
        }else if(peca.nome === 'p' && peca.piecemoves === 0 && (peca_detail.lin === peca.lin + 2 || peca_detail.lin === peca.lin - 2)){
          this.setState({enpassant:peca_detail})
        }
          tabuleiro[peca.lin][peca.col] = [null,null,false,0,0]
          let piecemoves = Number(peca.piecemoves) + 1
          tabuleiro[peca_detail.lin][peca_detail.col] = [peca.nome,peca.cor,false,piecemoves,0]
          this.setState({
              selects: [null, null],
              select: false,
              turn: this.state.turn === 'w' ? 'b' : 'w',
              tabuleiro
          })
          this.limparcasaspossiveis()
          // if(this.this_is_xeque(peca_detail.lin, peca_detail.col)){
          //   console.warn('xeque')
          // }
          
    }
  }

  limparcasaspossiveis = () => {
    let tabuleiro = this.state.tabuleiro
    Array.from({ length: 8 }).map((_, col) => (
      Array.from({ length: 8 }).map((_, lin) => {
        let peca_detail = tabuleiro[lin][col]
        if (peca_detail[2]) {
          tabuleiro[lin][col] = [peca_detail[0], peca_detail[1], false, peca_detail[3], peca_detail[4]]
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
      b: bispo,
      c: cavalo,
      ra: rainha,
      re: rei
    }
    const funcaoMovimento = movimentos[peca_detail.nome]
    if (funcaoMovimento) {
      posicpossiveis = funcaoMovimento(peca_detail, tabuleiro, this.is_valid, pecas)
    }
    if (peca_detail.nome === 'p'){
      posicpossiveis = peao(peca_detail,tabuleiro, this.state.enpassant, this.is_valid, pecas)
    }
    console.warn(tabuleiro)
    Array.from({ length: 8 }).map((_, col) => (
        Array.from({ length: 8 }).map((_, lin) => {
          const existe = posicpossiveis.some(p => p[0] === lin && p[1] === col);
          let peca = this.state.tabuleiro[lin][col] 
          if (existe) {
            tabuleiro[lin][col] =[peca[0], peca[1], true, peca[3], peca[4]]
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
                let peca_detail = this.state.tabuleiro[lin][col] 

                // peca_detail = peca_detail[0] !== null && peca_detail[0] === 'o' ? [null,null,'o',null] : peca_detail

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
                        selectable: peca_detail[2],
                        piecemoves: peca_detail[3] 
                      })
                    }
                  >
                    <Peca
                      tipo={peca_detail[0]}
                      cor={peca_detail[1]}
                      col={cols[col]}
                      lin={-1 * (lin - 8)}
                      select={peca_detail[2]}
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
