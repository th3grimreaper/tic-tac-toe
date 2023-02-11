const gameBoard = (() => {
  // const boardArr = ['', '', '', '', '', '', '', '', '']

  let boardArr = ['', '', '', '', '', '', '', '', '']

  function getBoardArr() {
    return boardArr
  }

  return { getBoardArr }
})()

const playerInit = (name, choice) => {
  const players = {
    name,
    choice,
  }

  players.boxesMarked = []

  function getBoxesMarked(value) {
    players.boxesMarked.push(value)
  }

  function getPlayers() {
    return players
  }

  return { getPlayers, getBoxesMarked }
}

const gameController = () => {
  let playerOne = ''
  let playerTwo = ''
  let currChoice = ''
  let currentPlayer = ''
  let choice = document.getElementsByName('choice')
  const button = document.querySelector('.submit-btn')
  let inputOne = document.querySelector('#player-one')
  let inputTwo = document.querySelector('#player-two')
  const form = document.querySelector('.player-data')

  function saveData(e) {
    choice.forEach((val) => {
      if (val.checked === true) {
        currChoice = val.value
      }
    })
    e.preventDefault()
    playerOne = playerInit(inputOne.value, currChoice)
    playerTwo = playerInit(inputTwo.value, currChoice === 'X' ? 'O' : 'X')
    currentPlayer = playerOne
    form.reset()
  }

  button.addEventListener('click', saveData)

  function getCurrPlayer() {
    return currentPlayer
  }

  function swapPlayers() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne
  }

  return { swapPlayers, getCurrPlayer }
}

const checkWin = () => {
  const winCombi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  function getwinCombi() {
    return winCombi
  }

  return { getwinCombi }
}

const startGame = (() => {
  let selector = gameController()
  const markCell = document.querySelectorAll('.cells')

  function getWinByIndex(array, index, player) {
    for (let i = 0; i < 8; i++) {
      let j = 0
      if (
        array[index[i][j]] === player.choice &&
        array[index[i][(j += 1)]] === player.choice &&
        array[index[i][(j += 1)]] === player.choice
      ) {
        j = 0
        return 1
      }
    }
  }

  markCell.forEach((cell) => {
    cell.addEventListener('click', markXorY)
  })

  function markXorY(e) {
    let tg = e.target
    let currentPlayer = selector.getCurrPlayer()
    let board = gameBoard.getBoardArr()
    let winIndex = checkWin().getwinCombi()
    if (tg.textContent === '') {
      let index = tg.getAttribute('index')
      tg.textContent = currentPlayer.getPlayers().choice
      board[index] = tg.textContent
      // console.log(board)
      currentPlayer.getBoxesMarked(tg.textContent)
      selector.swapPlayers()
      if (getWinByIndex(board, winIndex, currentPlayer.getPlayers()) === 1)
        alert(`${currentPlayer.getPlayers().name} wins`)
      if (!board.includes('')) alert('tie')
    }
  }
})()
