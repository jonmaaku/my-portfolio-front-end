'use client';

import { Button, Card } from '@mui/material';
import { useState, useCallback, useRef, useEffect } from 'react';

type CellType = 'empty' | 'wall' | 'start' | 'end' | 'path' | 'explored';

interface Cell {
  row: number;
  col: number;
  type: CellType;
  g: number;
  h: number;
  f: number;
  parent: Cell | null;
}

const GRID_ROWS = 25;
const GRID_COLS = 45;

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [mode, setMode] = useState<'wall' | 'start' | 'end'>('wall');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ row: number; col: number } | null>(null);
  const [endPos, setEndPos] = useState<{ row: number; col: number } | null>(null);
  const [stats, setStats] = useState({ explored: 0, pathLength: 0, time: 0 });
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize grid
  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = useCallback(() => {
    const newGrid: Cell[][] = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow: Cell[] = [];
      for (let col = 0; col < GRID_COLS; col++) {
        currentRow.push({
          row,
          col,
          type: 'empty',
          g: Number.POSITIVE_INFINITY,
          h: Number.POSITIVE_INFINITY,
          f: Number.POSITIVE_INFINITY,
          parent: null,
        });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
    setStartPos(null);
    setEndPos(null);
    setStats({ explored: 0, pathLength: 0, time: 0 });
  }, []);

  const generateMaze = useCallback(() => {
    const newGrid = grid.map(row =>
      row.map(cell => ({
        ...cell,
        type: Math.random() < 0.3 ? 'wall' : ('empty' as CellType),
        g: Number.POSITIVE_INFINITY,
        h: Number.POSITIVE_INFINITY,
        f: Number.POSITIVE_INFINITY,
        parent: null,
      }))
    );

    // Ensure start and end are not walls
    if (startPos) {
      newGrid[startPos.row][startPos.col].type = 'start';
    }
    if (endPos) {
      newGrid[endPos.row][endPos.col].type = 'end';
    }

    setGrid(newGrid);
  }, [grid, startPos, endPos]);

  const clearPath = useCallback(() => {
    const newGrid = grid.map(row =>
      row.map(cell => ({
        ...cell,
        type: cell.type === 'path' || cell.type === 'explored' ? 'empty' : cell.type,
        g: Number.POSITIVE_INFINITY,
        h: Number.POSITIVE_INFINITY,
        f: Number.POSITIVE_INFINITY,
        parent: null,
      }))
    );
    setGrid(newGrid);
    setStats({ explored: 0, pathLength: 0, time: 0 });
  }, [grid]);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (isRunning) return;

      const newGrid = [...grid];
      const cell = newGrid[row][col];

      if (mode === 'start') {
        // Remove old start
        if (startPos) {
          newGrid[startPos.row][startPos.col].type = 'empty';
        }
        cell.type = 'start';
        setStartPos({ row, col });
      } else if (mode === 'end') {
        // Remove old end
        if (endPos) {
          newGrid[endPos.row][endPos.col].type = 'empty';
        }
        cell.type = 'end';
        setEndPos({ row, col });
      } else if (mode === 'wall') {
        if (cell.type === 'empty' || cell.type === 'wall') {
          cell.type = cell.type === 'wall' ? 'empty' : 'wall';
        }
      }

      setGrid(newGrid);
    },
    [grid, mode, isRunning, startPos, endPos]
  );

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (!isDrawing || isRunning || mode !== 'wall') return;

      const newGrid = [...grid];
      const cell = newGrid[row][col];

      if (cell.type === 'empty' || cell.type === 'wall') {
        cell.type = cell.type === 'wall' ? 'empty' : 'wall';
        setGrid(newGrid);
      }
    },
    [isDrawing, grid, mode, isRunning]
  );

  // A* Algorithm
  const runAStar = useCallback(async () => {
    if (!startPos || !endPos) {
      alert('Please set both start and end points!');
      return;
    }

    setIsRunning(true);
    setIsPaused(false);
    clearPath();

    const startTime = Date.now();
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    const openSet: Cell[] = [];
    const closedSet: Set<string> = new Set();

    const startCell = newGrid[startPos.row][startPos.col];
    startCell.g = 0;
    startCell.h = heuristic(startPos, endPos);
    startCell.f = startCell.h;
    openSet.push(startCell);

    let exploredCount = 0;

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    while (openSet.length > 0) {
      if (isPaused) {
        await delay(100);
        continue;
      }

      // Find cell with lowest f score
      let current = openSet[0];
      let currentIndex = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < current.f) {
          current = openSet[i];
          currentIndex = i;
        }
      }

      // Check if we reached the end
      if (current.row === endPos.row && current.col === endPos.col) {
        // Reconstruct path
        const path: Cell[] = [];
        let temp: Cell | null = current;
        while (temp) {
          path.unshift(temp);
          temp = temp.parent;
        }

        // Animate path
        for (const cell of path) {
          if (cell.type !== 'start' && cell.type !== 'end') {
            newGrid[cell.row][cell.col].type = 'path';
            setGrid([...newGrid]);
            await delay(101 - speed[0]);
          }
        }

        const endTime = Date.now();
        setStats({
          explored: exploredCount,
          pathLength: path.length,
          time: endTime - startTime,
        });
        setIsRunning(false);
        return;
      }

      // Remove current from open set
      openSet.splice(currentIndex, 1);
      closedSet.add(`${current.row},${current.col}`);

      // Mark as explored
      if (current.type !== 'start' && current.type !== 'end') {
        newGrid[current.row][current.col].type = 'explored';
        exploredCount++;
        setGrid([...newGrid]);
        await delay(101 - speed[0]);
      }

      // Check neighbors
      const neighbors = getNeighbors(current, newGrid);
      for (const neighbor of neighbors) {
        if (closedSet.has(`${neighbor.row},${neighbor.col}`) || neighbor.type === 'wall') {
          continue;
        }

        const tentativeG = current.g + 1;

        if (tentativeG < neighbor.g) {
          neighbor.parent = current;
          neighbor.g = tentativeG;
          neighbor.h = heuristic({ row: neighbor.row, col: neighbor.col }, endPos);
          neighbor.f = neighbor.g + neighbor.h;

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    // No path found
    const endTime = Date.now();
    setStats({
      explored: exploredCount,
      pathLength: 0,
      time: endTime - startTime,
    });
    setIsRunning(false);
    alert('No path found!');
  }, [grid, startPos, endPos, speed, isPaused, clearPath]);

  const heuristic = (a: { row: number; col: number }, b: { row: number; col: number }) => {
    // Manhattan distance
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  };

  const getNeighbors = (cell: Cell, grid: Cell[][]) => {
    const neighbors: Cell[] = [];
    const { row, col } = cell;

    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < GRID_ROWS - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < GRID_COLS - 1) neighbors.push(grid[row][col + 1]); // Right

    return neighbors;
  };

  const getCellColor = (type: CellType) => {
    switch (type) {
      case 'start':
        return 'bg-[var(--start-color)]';
      case 'end':
        return 'bg-[var(--end-color)]';
      case 'wall':
        return 'bg-[var(--wall-color)]';
      case 'path':
        return 'bg-[var(--path-color)]';
      case 'explored':
        return 'bg-[var(--explored-color)]';
      default:
        return 'bg-card hover:bg-muted/50';
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            A* Pathfinding Visualizer
          </h1>
          <p className="text-muted-foreground text-lg">
            Interactive algorithm visualization for finding the shortest path
          </p>
        </div>

        {/* Controls */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Mode Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Drawing Mode</label>
              <div className="flex gap-2">
                <Button
                  variant={mode === 'start' ? 'contained' : 'outlined'}
                  onClick={() => setMode('start')}
                  disabled={isRunning}
                  className="flex-1"
                >
                  Start
                </Button>
                <Button
                  variant={mode === 'end' ? 'contained' : 'outlined'}
                  onClick={() => setMode('end')}
                  disabled={isRunning}
                  className="flex-1"
                >
                  End
                </Button>
                <Button
                  variant={mode === 'wall' ? 'contained' : 'outlined'}
                  onClick={() => setMode('wall')}
                  disabled={isRunning}
                  className="flex-1"
                >
                  Wall
                </Button>
              </div>
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Speed: {speed[0]}%</label>
              {/* <input type="range" value={speed} onValukeChange={setSpeed} min={1} max={100} step={1} disabled={isRunning} /> */}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <div className="flex gap-2">
                <Button
                  onClick={runAStar}
                  disabled={isRunning || !startPos || !endPos}
                  className="flex-1"
                >
                  {/* <Play className="w-4 h-4 mr-1" /> */}
                  Start
                </Button>
                <Button
                  onClick={clearPath}
                  disabled={isRunning}
                  variant="outlined"
                  className="flex-1 bg-transparent"
                >
                  {/* <RotateCcw className="w-4 h-4 mr-1" /> */}
                  Clear
                </Button>
              </div>
            </div>

            {/* Utilities */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Utilities</label>
              <div className="flex gap-2">
                <Button
                  onClick={generateMaze}
                  disabled={isRunning}
                  className="flex-1 bg-transparent"
                >
                  {/* <Sparkles className="w-4 h-4 mr-1" /> */}
                  Maze
                </Button>
                <Button
                  onClick={initializeGrid}
                  disabled={isRunning}
                  variant="outlined"
                  className="flex-1 bg-transparent"
                >
                  {/* <Trash2 className="w-4 h-4 mr-1" /> */}
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono">{stats.explored}</div>
              <div className="text-sm text-muted-foreground">Nodes Explored</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-mono">{stats.pathLength}</div>
              <div className="text-sm text-muted-foreground">Path Length</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-mono">{stats.time}ms</div>
              <div className="text-sm text-muted-foreground">Time Elapsed</div>
            </div>
          </div>
        </Card>

        {/* Legend */}
        <Card className="p-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[var(--start-color)]" />
              <span>Start Point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[var(--end-color)]" />
              <span>End Point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[var(--wall-color)]" />
              <span>Wall</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[var(--explored-color)]" />
              <span>Explored</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[var(--path-color)]" />
              <span>Shortest Path</span>
            </div>
          </div>
        </Card>

        {/* Grid */}
        <Card className="p-4 overflow-x-auto">
          <div
            className="inline-grid gap-[1px] bg-border p-[1px] rounded-lg"
            style={{
              gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
            }}
            onMouseLeave={() => setIsDrawing(false)}
          >
            {grid.map((row, rowIdx) =>
              row.map((cell, colIdx) => (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  // className={cn(
                  //   "w-5 h-5 md:w-6 md:h-6 rounded-sm transition-colors cursor-pointer",
                  //   getCellColor(cell.type),
                  // )}
                  onClick={() => handleCellClick(rowIdx, colIdx)}
                  onMouseDown={() => setIsDrawing(true)}
                  onMouseUp={() => setIsDrawing(false)}
                  onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                />
              ))
            )}
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">How to Use</h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Select "Start" mode and click on the grid to place the starting point</li>
            <li>Select "End" mode and click to place the destination point</li>
            <li>Select "Wall" mode and click or drag to draw obstacles</li>
            <li>Adjust the speed slider to control animation speed</li>
            <li>Click "Start" to watch the A* algorithm find the shortest path</li>
            <li>Use "Maze" to generate random obstacles or "Reset" to clear everything</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}
