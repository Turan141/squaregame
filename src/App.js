import './App.css'
import React, { useEffect, useState } from 'react'

const Table = ({ coords }) => {
  return (
    <div className="Hover">
      <h1>Changed:</h1>
      <h2>
        Cell Row is: {coords.row}
        <br /> Cell Column is: {coords.col}
      </h2>
    </div>
  )
}

const Cell = ({ curRow, curColumn, setCoords }) => {
  const [isBlue, setBlue] = useState(false)
  return (
    <div
      className={!isBlue ? 'cell' : 'blueCell'}
      onMouseOver={() => {
        isBlue ? setBlue(false) : setBlue(true)
        setCoords({ row: curRow, col: curColumn })
      }}
    ></div>
  )
}

const Board = ({ difficulty, setCoords }) => {
  let curRow = 1
  let curColumn = 1
  const cellArray = []
  const cellsQty = Math.pow(difficulty, 2)
  for (let i = 0; i < cellsQty; i++) {
    cellArray.push(
      <Cell key={i} curRow={curRow} curColumn={curColumn} setCoords={setCoords} />
    )
    curColumn++
    if (curColumn > difficulty) {
      curRow++
      curColumn = 1
    }
  }

  const renderCells = cellArray.map((elem) => {
    return (
      elem
      )
  })
  return (
    <div
      className="Board"
      style={{ gridTemplateColumns: `repeat(${difficulty}, 1fr)` }}
    >
      {renderCells}
    </div>
  )
}

const SetUpMenu = ({ difficultyFetch, setDifficulty, difficulty }) => {
  const showCellsChooser = difficultyFetch.map((elem) => {
    return (
        <option key={elem.name} value={elem.field}>{elem.name}</option>
    )
  })
  return (
    <div className="SetUpMenu">
      <p>SetUpMenu</p>
      <select id="cellCount" onChange={(e) => setDifficulty(e.target.value)}>
        <option defaultValue="5" disabled>
          Pick Mode:
        </option>
        {showCellsChooser}
      </select>
      <button
        onClick={() => {
          if (!difficulty) return setDifficulty(5)
        }}
      >
        Start
      </button>
    </div>
  )
}

const Container = ({ difficultyFetch, setDifficultyFetch }) => {
  const [difficulty, setDifficulty] = useState(null)
  const [coords, setCoords] = useState('')

  return (
    <div className="Container">
      <SetUpMenu
        difficultyFetch={difficultyFetch}
        setDifficulty={setDifficulty}
        difficulty={difficulty}
      />
      {difficulty ? (
        <Board
          difficulty={difficulty}
          setDifficultyFetch={setDifficultyFetch}
          setCoords={setCoords}
        />
      ) : null}
      <Table coords={coords} />
    </div>
  )
}

function App() {
  const [difficultyFetch, setDifficultyFetch] = useState(null)
  useEffect(() => {
    const url = 'http://demo7919674.mockable.io'
    ;(async function getDataFn() {
      try {
        fetch(url)
          .then((data) => data.json())
          .then((data2) => setDifficultyFetch(data2))
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  return (
    <div className="App">
      {difficultyFetch ? (
        <Container
          difficultyFetch={difficultyFetch}
          setDifficultyFetch={setDifficultyFetch}
        />
      ) : (
        <h1
          style={{
            display: `flex`,
            justifyContent: 'center',
            margin: '0px auto',
          }}
        >
          Загрузка данных...
        </h1>
      )}
    </div>
  )
}

export default App
