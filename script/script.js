const gameBoard = (() => {
  const boardArr = ['', '', '', '', '', '', '', '', '']

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

const gameOpts = (() => {
  const modal = document.querySelector('.modal')

  function modalOpen() {
    modal.showModal()
  }

  window.addEventListener('load', modalOpen)

  function getModal() {
    return modal
  }

  return { getModal }
})()

const gameController = () => {
  let playerOne = ''
  let playerTwo = ''
  let currChoice = ''
  let currentPlayer = ''
  const choice = document.getElementsByName('choice')
  const button = document.querySelector('.submit-btn')
  const inputOne = document.querySelector('#player-one')
  const inputTwo = document.querySelector('#player-two')
  const inputRadio = document.querySelector('#x')
  const pg = document.querySelector('.playground')
  const form = document.querySelector('.player-data')

  function checkValidity() {
    if (
      inputOne.reportValidity() === true &&
      inputTwo.reportValidity() === true &&
      inputRadio.reportValidity() === true
    )
      return true
    return false
  }

  function getPlayground() {
    return pg
  }

  function saveData(e) {
    choice.forEach((val) => {
      if (val.checked === true) {
        currChoice = val.value
      }
    })
    e.preventDefault()
    if (checkValidity()) {
      playerOne = playerInit(inputOne.value, currChoice)
      playerTwo = playerInit(inputTwo.value, currChoice === 'X' ? 'O' : 'X')
      currentPlayer = playerOne
      form.reset()
      gameOpts.getModal().close()
      getPlayground().style.display = 'grid'
    }
  }

  button.addEventListener('click', saveData)

  function getCurrPlayer() {
    return currentPlayer
  }

  function swapPlayers() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne
  }

  function resetData() {
    currentPlayer = ''
  }

  return { swapPlayers, getCurrPlayer, resetData, getPlayground }
}

const checkWin = () => {
  const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  function getwinCombo() {
    return winCombo
  }

  return { getwinCombo }
}

const endModal = (() => {
  const modalEnd = document.querySelector('.modal-end')
  const showResult = document.querySelector('.show-result')
  const restartGame = document.querySelector('.restart-btn')

  function getModalEnd() {
    return modalEnd
  }

  function getResult() {
    return showResult
  }

  function getRestartBtn() {
    return restartGame
  }

  return { getModalEnd, getResult, getRestartBtn }
})()

const startGame = (() => {
  const selector = gameController()
  const markCell = document.querySelectorAll('.cells')

  function getWinByIndex(array, index, player) {
    for (let i = 0; i < 8; i += 1) {
      let j = 0
      if (
        array[index[i][j]] === player.choice &&
        array[index[i][j + 1]] === player.choice &&
        array[index[i][j + 2]] === player.choice
      ) {
        j = 0
        return 1
      }
    }
  }

  function markXorY(e) {
    const tg = e.target
    const currentPlayer = selector.getCurrPlayer()
    const board = gameBoard.getBoardArr()
    const winIndex = checkWin().getwinCombo()
    if (tg.textContent === '') {
      const index = tg.getAttribute('index')
      tg.textContent = currentPlayer.getPlayers().choice
      board[index] = tg.textContent
      currentPlayer.getBoxesMarked(tg.textContent)
      selector.swapPlayers()
      if (getWinByIndex(board, winIndex, currentPlayer.getPlayers()) === 1) {
        endModal.getResult().textContent = `${
          currentPlayer.getPlayers().name
        } wins`
        setTimeout(() => endModal.getModalEnd().showModal(), '300')
      }
      if (
        !(getWinByIndex(board, winIndex, currentPlayer.getPlayers()) === 1) &&
        !board.includes('')
      ) {
        endModal.getResult().textContent = "Nobody won. It's a draw."
        setTimeout(() => endModal.getModalEnd().showModal(), '200')
      }
    }
  }

  markCell.forEach((cell) => {
    cell.addEventListener('click', markXorY)
  })

  function resetGame() {
    selector.resetData()
    markCell.forEach((cell) => {
      cell.textContent = ''
    })
    gameBoard.getBoardArr().fill('', 0)
    endModal.getModalEnd().close()
    selector.getPlayground().style.display = 'none'
    gameOpts.getModal().showModal()
  }

  endModal.getRestartBtn().addEventListener('click', resetGame)
})()
