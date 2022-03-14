import './App.css'
import React, { useEffect, useState, useRef } from 'react'

const Table = () => {
  return (
    <div className="Hover">
      <h3>Table</h3>
    </div>
  )
}

const Cell = () => {
  const [isBlue, setBlue] = useState(false)
  return (
    <div
      className={!isBlue ? 'cell' : 'blueCell'}
      onMouseOver={(e) => {
        console.log(e)
        isBlue ? setBlue(false) : setBlue(true)
      }}
    ></div>
  )
}

const Board = ({ difficulty }) => {
  const cellArray = []
  for (let i = 0; i < Math.pow(difficulty, 2); i++) {
    cellArray.push(<Cell />)
  }
  const renderCells = cellArray.map((elem) => {
    return elem
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
      <>
        <option value={elem.field}>{elem.name}</option>
      </>
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
        />
      ) : null}
      <Table />
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
      ) : null}
    </div>
  )
}

export default App
