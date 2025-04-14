export default (peca_detail, getpecadetail, enpassant, is_valid, pecas) =>{
    
        let direction = peca_detail.cor === 'w'? 1 : -1
        let posicpossiveis = []
        let diagonaldireita = [null,null]
        let diagonalesquerda = [null,null]
        let andada2 = [null, null]
        let andada1 = [null,null]
        if (is_valid(peca_detail.lin -1 * direction) && is_valid(peca_detail.col + 1 *direction)){
          diagonaldireita = getpecadetail(peca_detail.lin -1 * direction, peca_detail.col + 1 * direction)
        }
        if (is_valid(peca_detail.lin -1 * direction) && is_valid(peca_detail.col - 1 *direction)){
          diagonalesquerda = getpecadetail(peca_detail.lin -1 * direction, peca_detail.col -1 * direction)
        }
        if (is_valid(peca_detail.lin - 1 * direction) ){
          andada1 = getpecadetail(peca_detail.lin - 1 * direction, peca_detail.col)
        }
        if (is_valid(peca_detail.lin - 2 * direction) ){
          andada2 = getpecadetail(peca_detail.lin - 2 * direction, peca_detail.col)
        }
        
        
        if(enpassant !== null){
          if(peca_detail.lin === enpassant.lin && peca_detail.col - 1 * direction ===  enpassant.col){
              posicpossiveis.push([peca_detail.lin -1 * direction, peca_detail.col - 1* direction])
          }else if (peca_detail.lin === enpassant.lin && peca_detail.col + 1 * direction ===  enpassant.col){
              posicpossiveis.push([peca_detail.lin -1 * direction, peca_detail.col + 1* direction])
          }   
        }
        if (pecas.includes(diagonaldireita[0]) && diagonaldireita[1] !== peca_detail.cor){
          posicpossiveis.push([peca_detail.lin -1 * direction, peca_detail.col + 1* direction])
        }
        if (pecas.includes(diagonalesquerda[0]) && diagonalesquerda[1] !== peca_detail.cor){
          posicpossiveis.push([peca_detail.lin -1 * direction, peca_detail.col - 1* direction])
        }
        if(!pecas.includes(andada1[0])){
          posicpossiveis.push([peca_detail.lin- 1 * direction, peca_detail.col ])
    
          if (peca_detail.piecemoves === 0 && !pecas.includes(andada2[0])) {
            posicpossiveis.push([peca_detail.lin - 2 * direction, peca_detail.col])
          }
        }
        return posicpossiveis
    
      }

