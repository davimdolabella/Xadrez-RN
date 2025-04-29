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
import initialTabuleiro from './logical/tabuleiro'
import FimdeJogo from './components/FimdeJogo'
// [piece, color, piecemoves, selectable, number of threats]

const cols = 'abcdefgh'
const pecas = ['p', 't', 'c', 'b', 'ra', 're']


const InitialState = () => ({
  tabuleiro: JSON.parse(JSON.stringify(initialTabuleiro)),
  turn: 'w',
  selects: [null, null],
  select: false,
  enpassant: null,
  roque: [true, true],
  xeque: false,
  fimdejogo:{
    vencedor: null,
    empate: false
  }
});

export default class Xadrez extends React.Component {
  tabuleirowidth = Dimensions.get('window').width
  quadradosize = this.tabuleirowidth / 8
  
  state = InitialState()
  // gettabuleiro = JSON.parse(JSON.stringify(this.state.tabuleiro))
  fimdejogo = (cor ,tabuleiro) => {
    const movimentos = {
      t: torre,
      b: bispo,
      c: cavalo,
      ra: rainha,
      re: rei
    }
    let novoTabuleiro = JSON.parse(JSON.stringify(tabuleiro));
    
    let tabuleirosimulacao = []
    for (let col = 0; col < 8; col++) {
      for (let lin = 0; lin < 8; lin++) {
        let posicpossiveis = []
        const pecaclicada = novoTabuleiro[lin][col]
        const peca_detail = {
          nome: pecaclicada[0],
          cor: pecaclicada[1],
          col: col,
          lin: lin,
          selectable: pecaclicada[2],
          piecemoves: pecaclicada[3]
        }
        if (peca_detail.nome !== null && peca_detail.cor === cor) {
          const funcaoMovimento = movimentos[peca_detail.nome]
          if (funcaoMovimento) {
            posicpossiveis = funcaoMovimento(peca_detail, novoTabuleiro, this.is_valid, pecas)
          }
          if (peca_detail.nome === 'p'){
            posicpossiveis = peao(peca_detail,novoTabuleiro, this.state.enpassant, this.is_valid, pecas)
          }

          Array.from({ length: 8 }).map((_, col2) => (
            Array.from({ length: 8 }).map((_, lin2) => {
              const existe = posicpossiveis.some(p => p[0] === lin2 && p[1] === col2);
              let peca = novoTabuleiro[lin2][col2] 
              if (existe) {
                tabuleirosimulacao = this.simularmovimento([peca_detail.lin, peca_detail.col],[lin2,col2],novoTabuleiro)
                tabuleirosimulacao = this.calcameacas(tabuleirosimulacao,false)
                if(!this.rei_em_xeque(cor, tabuleirosimulacao)){
                  novoTabuleiro[lin2][col2] = [peca[0], peca[1], true, peca[3], peca[4]]
                }
              }
              })
          ))
        } 
      }
    }
    
    
    let totalmovimentos = 0;

    Array.from({ length: 8 }).map((_, col) => {
      Array.from({ length: 8 }).map((_, lin) => {
        let peca = novoTabuleiro[lin][col];
        if (peca[2]) {
          totalmovimentos += 1; 
        }
      })
    });

    if(totalmovimentos === 0){  
      if(this.rei_em_xeque(cor, tabuleiro)){
        this.setState({fimdejogo : {vencedor: cor === 'w' ? 'b' : 'w', empate: false}})
      }else{
        this.setState({fimdejogo : {vencedor: null, empate: true}})
      }
    }
  };

  rei_em_xeque = (color, tabuleiro) =>{
    let rei = null
    Array.from({ length: 8 }).forEach((_, col) => (
      Array.from({ length: 8 }).forEach((_, lin) => {
        let peca = tabuleiro[lin][col]
        if(peca[0] === 're' && peca[1] === color){
          rei = peca
        }
      })
    ))
    return rei ? rei[4] > 0 : false
  }
  simularmovimento = (origem, destino, tabuleiro) =>{
    
    let newtabuleiro = JSON.parse(JSON.stringify(tabuleiro))
    newtabuleiro[destino[0]][destino[1]] = newtabuleiro[origem[0]][origem[1]]
    newtabuleiro[origem[0]][origem[1]] = [null,null,false,0,0]
    return newtabuleiro
  }
  calcameacas = (tabuleiro, setState = true)=>{
    
    let novotabuleiro = JSON.parse(JSON.stringify(tabuleiro))
    
    Array.from({ length: 8 }).map((_, col) => (
      Array.from({ length: 8 }).map((_, lin) => {
        let peca = novotabuleiro[lin][col]
        novotabuleiro[lin][col] = [peca[0], peca[1], false, peca[3], 0]
      })
    ))

    Array.from({ length: 8 }).map((_, col) => (
      Array.from({ length: 8 }).map((_, lin) => {
        let peca = novotabuleiro[lin][col]
        novotabuleiro = this.mostrarcasaspossiveis({
          nome: peca[0],
          cor: peca[1],
          col: col,
          lin: lin,
          selectable: peca[2],
          piecemoves: peca[3] },false, novotabuleiro, setState)

      })
    ))
    
    if(!setState){
      return novotabuleiro
    }
    
  }
  is_valid = (lin_or_col) => lin_or_col < 8 && lin_or_col >= 0

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
      this.mostrarcasaspossiveis(peca_detail, true, this.state.tabuleiro)
    }
    if (this.state.select === false && peca_detail.nome !== null && peca_detail.cor === this.state.turn) {
      this.setState({
        selects: [peca_detail, null],
        select: true,
      })
      this.mostrarcasaspossiveis(peca_detail, true, this.state.tabuleiro)

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
          
          tabuleiro = this.calcameacas(tabuleiro,false)
          
          if(this.rei_em_xeque(this.state.turn === 'w' ? 'b' : 'w', tabuleiro)){
            this.setState({xeque: true})
          }else{
            this.setState({xeque:false})
          }
          this.fimdejogo(this.state.turn === 'w' ? 'b' : 'w', tabuleiro)
          
          
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

  mostrarcasaspossiveis = (peca_detail, before = true, tabuleiro, setState= true) => {
    let posicpossiveis = []
    let tabuleiroalternativo = []
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
      if(before){
        posicpossiveis = peao(peca_detail,tabuleiro, this.state.enpassant, this.is_valid, pecas)
      }else{
        posicpossiveis = peao(peca_detail,tabuleiro, this.state.enpassant, this.is_valid, pecas,true)
      }   
    }
    Array.from({ length: 8 }).map((_, col) => (
        Array.from({ length: 8 }).map((_, lin) => {
          const existe = posicpossiveis.some(p => p[0] === lin && p[1] === col);
          let peca = tabuleiro[lin][col] 
          if (existe && before) {
            
            tabuleiroalternativo = this.simularmovimento([peca_detail.lin, peca_detail.col],[lin,col],tabuleiro)
            tabuleiroalternativo = this.calcameacas(tabuleiroalternativo,false)
            if(!this.rei_em_xeque(peca_detail.cor, tabuleiroalternativo)){
              tabuleiro[lin][col] = [peca[0], peca[1], true, peca[3], peca[4]]
            }
          }else if(!before && existe){
            tabuleiro[lin][col] = [peca[0], peca[1], false, peca[3], peca[4]+1]
          }
          })
    ))
    if(setState){
      this.setState({
        tabuleiro,
      })
    }else{
      return tabuleiro
    }
    
  }
  
  

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.reiniciar}
          onPress={() => this.setState(InitialState())}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Reiniciar</Text>
        </TouchableOpacity>
        <FimdeJogo
          visible={this.state.fimdejogo.vencedor !== null || this.state.fimdejogo.empate}
          vencedor={this.state.fimdejogo.vencedor}
          empate={this.state.fimdejogo.empate}
          onClose={() => this.setState(InitialState())}/>
        <View style={styles.tabuleiro}>
          {Array.from({ length: 8 }).map((_, col) => (
            <View key={col} style={styles.col}>
              {Array.from({ length: 8 }).map((_, lin) => {
                const color = (col + lin) % 2 === 0 ? 'white' : 'black'
                let peca_detail = this.state.tabuleiro[lin][col] 
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
                      xeque={this.state.xeque && peca_detail[0] === 're' && peca_detail[1] === this.state.turn? true: false}
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
