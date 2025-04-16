export default(right_or_left = "right" , up_or_down = "down",peca_detail, getpecadetail ,is_valid , pecas, limit= false )=>{
    console.warn("njn")
    let posicpossiveis = []
    let lin_direction = up_or_down === "down"? 1 : -1
    let col_direction = right_or_left === "right"? 1: -1
    for (let i = 1; i < 8; i++){
        if(limit && i > 1){break}
        let lin =peca_detail.lin + i * lin_direction
        let col =peca_detail.col + i * col_direction
        if(is_valid(lin) && is_valid(col)){ 
            
            let peca =  getpecadetail(lin, col)
            if(!pecas.includes(peca[0]) || peca[1] !== peca_detail.cor){
                posicpossiveis.push([lin , col])
                if(peca[1] !== peca_detail.cor && (peca[1] === 'w' || peca[1] === 'b')){break}
            }else{break}
        }else{break}
    }
    return posicpossiveis
}