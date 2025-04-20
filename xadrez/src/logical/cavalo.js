import lposics from "./lposics"
export default (peca_detail, getpecadetail, is_valid, pecas) =>{
    let posicpossiveis = []
    posicpossiveis.push(...lposics("lin","down",peca_detail,getpecadetail,is_valid,pecas))
    posicpossiveis.push(...lposics("lin","up",peca_detail,getpecadetail,is_valid,pecas))
    posicpossiveis.push(...lposics("col","down",peca_detail,getpecadetail,is_valid,pecas))
    posicpossiveis.push(...lposics("col","up",peca_detail,getpecadetail,is_valid,pecas))
    return posicpossiveis
}
