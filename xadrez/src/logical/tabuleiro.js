// [piece, color, selectable,piecemoves, number of threats]
const tabuleiro = [
    [
      ['t', 'b', false, 0, 0],
      ['c', 'b', false, 0, 0],
      ['b', 'b', false, 0, 0],
      ['ra', 'b', false, 0, 0],
      ['re', 'b', false, 0, 0],
      ['b', 'b', false, 0, 0],
      ['c', 'b', false, 0, 0],
      ['t', 'b', false, 0, 0]
    ],
    [
      ['p', 'b', false, 0, 0],
      ['p', 'b', false, 0, 0],
      ['p', 'b', false, 0, 0],
      ['p', 'b', false, 0, 0],
      ['p', 'b', false, 0, 0],
      ['p', 'b', false, 0, 0],
      ['p', 'b', false, 0, 0],
      ['p', 'b', false, 0, 0]
    ],
    [
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0]
    ],
    [
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0]
    ],
    [
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0],
      [null, null, false, 0, 0]
    ],
    [
        [null, null, false, 0, 0],
        [null, null, false, 0, 0],
        [null, null, false, 0, 0],
        [null, null, false, 0, 0],
        [null, null, false, 0, 0],
        [null, null, false, 0, 0],
        [null, null, false, 0, 0],
        [null, null, false, 0, 0]
    ],
    [
      ['p', 'w', false, 0, 0],
      ['p', 'w', false, 0, 0],
      ['p', 'w', false, 0, 0],
      ['p', 'w', false, 0, 0],
      ['p', 'w', false, 0, 0],
      ['p', 'w', false, 0, 0],
      ['p', 'w', false, 0, 0],
      ['p', 'w', false, 0, 0]
    ],
    [
      ['t', 'w', false, 0, 0],
      ['c', 'w', false, 0, 0],
      ['b', 'w', false, 0, 0],
      ['ra', 'w', false, 0, 0],
      ['re', 'w', false, 0, 0],
      ['b', 'w', false, 0, 0],
      ['c', 'w', false, 0, 0],
      ['t', 'w', false, 0, 0]
    ]
  ]

export default tabuleiro