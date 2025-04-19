export default (col_or_lin = "lin" , up_or_down = "down",peca_detail, getpecadetail ,is_valid , pecas )=>{
    let posicpossiveis = []
    let direction = up_or_down === "down"? 1 : -1
    let lin = col_or_lin === "lin" ? peca_detail.lin + 2 * direction: peca_detail.lin
    let col = col_or_lin === "col" ? peca_detail.col + 2 * direction: peca_detail.col
    if(col_or_lin === "lin" && is_valid(lin) && (is_valid(col - 1) || is_valid(col+ 1))){ 
        let peca1 =  is_valid(col + 1)? getpecadetail(lin, col + 1): [null,peca_detail.cor]
        let peca2 = is_valid(col - 1)? getpecadetail(lin, col - 1): [null,peca_detail.cor]
        if( is_valid(col + 1) && !pecas.includes(peca1[0]) || peca1[1] !== peca_detail.cor){
            posicpossiveis.push([lin , col + 1])
        }
        if( is_valid(col - 1) && !pecas.includes(peca2[0]) || peca2[1] !== peca_detail.cor){
            posicpossiveis.push([lin , col - 1])
        }
    }else if(col_or_lin === "col" && is_valid(col) && (is_valid(lin - 1) || is_valid(lin+ 1))){ 
        let peca1 =  is_valid(lin - 1)? getpecadetail(lin - 1, col) : [null,peca_detail.cor]
        let peca2 = is_valid(lin + 1)? getpecadetail(lin + 1, col) : [null,peca_detail.cor]
        if( is_valid(lin - 1)&&!pecas.includes(peca1[0]) || peca1[1] !== peca_detail.cor){
            posicpossiveis.push([lin - 1 ,col])
        }
        if(is_valid(lin + 1)&&!pecas.includes(peca2[0]) || peca2[1] !== peca_detail.cor){
            posicpossiveis.push([lin + 1, col])
        }
    }
    return posicpossiveis
}