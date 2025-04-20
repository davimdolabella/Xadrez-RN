import diagonalposics from "./diagonalposics"


export default (peca_detail, getpecadetail, is_valid, pecas) =>{
    let posicpossiveis = []
    posicpossiveis.push(...diagonalposics("right", "down", peca_detail, getpecadetail, is_valid, pecas))
    posicpossiveis.push(...diagonalposics("right", "up", peca_detail, getpecadetail, is_valid, pecas))
    posicpossiveis.push(...diagonalposics("left", "down", peca_detail, getpecadetail, is_valid, pecas))
    posicpossiveis.push(...diagonalposics("left", "up", peca_detail, getpecadetail, is_valid, pecas))
    return posicpossiveis
}

