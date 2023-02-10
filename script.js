const gameBoard = (() => {
  // const boardArr = ['', '', '', '', '', '', '', '', '']

  let boardArr = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]

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

  // players.boxesMarked = [
  //   ['', '', ''],
  //   ['', '', ''],
  //   ['', '', ''],
  // ]
  //
  // function getBoxesMarked() {
  //   return players.boxesMarked
  // }

  function getPlayers() {
    return players
  }

  return { getPlayers }
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

const startGame = (() => {
  let selector = gameController()
  const markCell = document.querySelectorAll('.cells')

  let checkWinner = (array, player) => {
    for (let i = 0; i < 3; i++) {
      if (
        array[i][0] === player.choice &&
        array[i][1] === player.choice &&
        array[i][2] === player.choice
      ) {
        // alert(`winner is ${player.name}`)
        return 1
      }
    }
    for (let j = 0; j < 3; j++) {
      if (
        array[0][j] === player.choice &&
        array[1][j] === player.choice &&
        array[2][j] === player.choice
      ) {
        // alert(`winner is ${player.name}`)
        return 1
      }
    }
    if (
      array[0][0] === player.choice &&
      array[1][1] === player.choice &&
      array[2][2] === player.choice
    ) {
      // alert(`winner is ${player.name}`)
      return 1
    }
    if (
      array[0][2] === player.choice &&
      array[1][1] === player.choice &&
      array[2][0] === player.choice
    ) {
      // alert(`winner is ${player.name}`)
      return 1
    }
  }

  markCell.forEach((cell) => {
    cell.addEventListener('click', markXorY)
  })

  function markXorY(e) {
    let tg = e.target
    let currentPlayer = selector.getCurrPlayer()
    let board = gameBoard.getBoardArr()
    if (tg.textContent === '') {
      let row = tg.getAttribute('mindex')
      let col = tg.getAttribute('nindex')
      tg.textContent = currentPlayer.getPlayers().choice
      board[row][col] = tg.textContent
      selector.swapPlayers()
      if (checkWinner(board, currentPlayer.getPlayers()) === 1)
        alert(`${currentPlayer.getPlayers().name} wins`)
      // console.log(checkWinner(board, currentPlayer.getPlayers()))
    }
    if (board.every((element) => element !== null)) alert("it's a tie")
  }
})()
