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
  let choice = document.getElementsByName('choice')
  const button = document.querySelector('.submit-btn')
  let inputOne = document.querySelector('#player-one')
  let inputTwo = document.querySelector('#player-two')
  let inputRadio = document.querySelector('#x')
  let pg = document.querySelector('.playground')
  const form = document.querySelector('.player-data')

  function checkValidity() {
    if (
      inputOne.reportValidity() === true &&
      inputTwo.reportValidity() === true &&
      inputRadio.reportValidity() === true
    )
      return true
    else return false
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
  let modalEnd = document.querySelector('.modal-end')
  let showResult = document.querySelector('.show-result')
  let restartGame = document.querySelector('.restart-btn')

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
    let winIndex = checkWin().getwinCombo()
    if (tg.textContent === '') {
      let index = tg.getAttribute('index')
      tg.textContent = currentPlayer.getPlayers().choice
      board[index] = tg.textContent
      currentPlayer.getBoxesMarked(tg.textContent)
      selector.swapPlayers()
      if (getWinByIndex(board, winIndex, currentPlayer.getPlayers()) === 1) {
        endModal.getResult().textContent = `${currentPlayer.getPlayers().name} wins`
        setTimeout(() => {
          endModal.getModalEnd().showModal()
        }, '300')
      }
      if (
        !(getWinByIndex(board, winIndex, currentPlayer.getPlayers()) === 1) &&
        !board.includes('')
      ) {
        endModal.getResult().textContent = "Nobody won. It's a draw."
        setTimeout(() => {
          endModal.getModalEnd().showModal()
        }, '300')
      }
    }
  }

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
