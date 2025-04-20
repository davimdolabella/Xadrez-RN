import diagonalposics from "./diagonalposics"
import straightposics from "./straightposics"
export default (peca_detail, getpecadetail, is_valid, pecas) =>{
    let posicpossiveis = []
    posicpossiveis.push(...straightposics("lin", "down", peca_detail, getpecadetail, is_valid, pecas, true))
    posicpossiveis.push(...straightposics("lin", "up", peca_detail, getpecadetail, is_valid, pecas, true))
    posicpossiveis.push(...straightposics("col", "down", peca_detail, getpecadetail, is_valid, pecas, true))
    posicpossiveis.push(...straightposics("col", "up", peca_detail, getpecadetail, is_valid, pecas, true))

    posicpossiveis.push(...diagonalposics("right", "down", peca_detail, getpecadetail, is_valid, pecas, true))
    posicpossiveis.push(...diagonalposics("right", "up", peca_detail, getpecadetail, is_valid, pecas, true))
    posicpossiveis.push(...diagonalposics("left", "down", peca_detail, getpecadetail, is_valid, pecas, true))
    posicpossiveis.push(...diagonalposics("left", "up", peca_detail, getpecadetail, is_valid, pecas, true))
    return posicpossiveis
}

