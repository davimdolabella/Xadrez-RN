import straightposics from "./straightposics"
export default (peca_detail, getpecadetail, is_valid, pecas) =>{
    let posicpossiveis = []
    posicpossiveis.push(...straightposics("lin", "down", peca_detail, getpecadetail, is_valid, pecas))
    posicpossiveis.push(...straightposics("lin", "up", peca_detail, getpecadetail, is_valid, pecas))
    posicpossiveis.push(...straightposics("col", "down", peca_detail, getpecadetail, is_valid, pecas))
    posicpossiveis.push(...straightposics("col", "up", peca_detail, getpecadetail, is_valid, pecas))
    return posicpossiveis
}

