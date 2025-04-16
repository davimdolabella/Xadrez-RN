export default(col_or_lin = "lin" , up_or_down = "down",peca_detail, getpecadetail ,is_valid , pecas )=>{
    let posicpossiveis = []
    let direction = up_or_down === "down"? 1 : -1
    for (let i = 1; i < 8; i++){
        let lin = col_or_lin === "lin" ? peca_detail.lin + i * direction: peca_detail.lin
        let col = col_or_lin === "col" ? peca_detail.col + i * direction: peca_detail.col
        if((is_valid(lin) && (col_or_lin === "lin")) || (is_valid(col) && (col_or_lin === "col"))){ 
            
            let peca =  getpecadetail(lin, col)
            if(!pecas.includes(peca[0]) || peca[1] !== peca_detail.cor){
                posicpossiveis.push([lin , col])
                if(peca[1] !== peca_detail.cor && (peca[1] === 'w' || peca[1] === 'b')){break}
            }else{break}
        }else{break}
    }
    return posicpossiveis
}