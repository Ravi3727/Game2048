import React, { useState, useEffect, useCallback } from "react";
import Tile from "./components/Tile";
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Github,
} from "lucide-react";

const App = () => {
  const [grid, setGrid] = useState<number[][]>(
    Array.from({ length: 4 }, () => Array(4).fill(0))
  );

  const randomGenerateBlock = useCallback(() => {
    const emptyTiles: { row: number; col: number }[] = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === 0) {
          emptyTiles.push({ row, col });
        }
      }
    }

    if (emptyTiles.length > 0) {
      const randomTile =
        emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[randomTile.row][randomTile.col] = Math.random() < 0.9 ? 2 : 4;
        return newGrid;
      });
    }
  }, [grid]);

  const slideAndMergeRow = (row: number[]) => {
    let newRow = row.filter((value) => value !== 0);

    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        newRow[i + 1] = 0;
      }
    }

    return [
      ...newRow.filter((value) => value !== 0),
      ...Array(4 - newRow.filter((value) => value !== 0).length).fill(0),
    ];
  };

  const moveLeft = () => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => slideAndMergeRow(row));
      return newGrid;
    });
    randomGenerateBlock();
  };

  const moveRight = () => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) =>
        slideAndMergeRow([...row].reverse()).reverse()
      );
      return newGrid;
    });
    randomGenerateBlock();
  };

  const moveUp = () => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      for (let col = 0; col < 4; col++) {
        let column = newGrid.map((row) => row[col]);
        column = slideAndMergeRow(column);
        for (let row = 0; row < 4; row++) {
          newGrid[row][col] = column[row];
        }
      }
      return newGrid;
    });
    randomGenerateBlock();
  };

  const moveDown = () => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      for (let col = 0; col < 4; col++) {
        let column = newGrid.map((row) => row[col]).reverse();
        column = slideAndMergeRow(column).reverse();
        for (let row = 0; row < 4; row++) {
          newGrid[row][col] = column[row];
        }
      }
      return newGrid;
    });
    randomGenerateBlock();
  };

  const isGameOver = () => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === 0) return false;
        if (col < 3 && grid[row][col] === grid[row][col + 1]) return false;
        if (row < 3 && grid[row][col] === grid[row + 1][col]) return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === "ArrowLeft") moveLeft();
      if (key === "ArrowRight") moveRight();
      if (key === "ArrowUp") moveUp();
      if (key === "ArrowDown") moveDown();

      if (isGameOver()) {
        alert("Game Over!");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [grid]);

  useEffect(() => {
    randomGenerateBlock();
    randomGenerateBlock();
  }, []);

  const resetGame = () => {
    setGrid(Array.from({ length: 4 }, () => Array(4).fill(0)));
    randomGenerateBlock();
    randomGenerateBlock();
  };

  return (
    <div className="flex font-serif flex-col items-center justify-center min-h-screen bg-myCustomColor">
      <h1 className="text-4xl font-bold mb-8 text-white mx-auto text-center">
        Welcome to 2048
      </h1>
      <div className="grid grid-cols-4 gap-1 border-2 bg-myCustomGridColor rounded-md p-2 shadow-md">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <div
              className="w-20 h-20 border border-gray-300 rounded-sm flex items-center justify-center"
              key={`${rowIndex}-${colIndex}`}
            >
              <Tile value={value} />
            </div>
          ))
        )}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <button
          onClick={moveLeft}
          className="col-start-1 bg-myCustomGridColor rounded-md p-4 shadow-md text-white hover:bg-opacity-80 transition-colors"
        >
          <ArrowLeft className="mx-auto" />
        </button>
        <button
          onClick={moveUp}
          className="col-start-2 bg-myCustomGridColor rounded-md p-4 shadow-md text-white hover:bg-opacity-80 transition-colors"
        >
          <ArrowUp className="mx-auto" />
        </button>
        <button
          onClick={moveRight}
          className="col-start-3 bg-myCustomGridColor rounded-md p-4 shadow-md text-white hover:bg-opacity-80 transition-colors"
        >
          <ArrowRight className="mx-auto" />
        </button>
        <button
          onClick={moveDown}
          className="col-start-2 bg-myCustomGridColor rounded-md p-4 shadow-md text-white hover:bg-opacity-80 transition-colors"
        >
          <ArrowDown className="mx-auto" />
        </button>
      </div>

      <button
        onClick={resetGame}
        className="mt-8 bg-myCustomGridColor rounded-md p-4 shadow-md text-white hover:bg-opacity-80 transition-colors flex items-center"
      >
        <RotateCcw className="mr-2" /> Reset Game
      </button>

      <div className="text-lg font-sans font-semibold leading-6 flex flex-row w-6/12 lg:w-[200px] justify-evenly text-white mb-8 mt-8">
        <div>Connect with me </div>
        <div className="text-orange-500 ">
          <a href="https://github.com/Ravi3727" target="_blank" >
            <Github />
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
