import * as React from 'react';
import {CellGridMap} from "../../utils/cell-grid-map";
import {CELL_COLOR_MAP} from "../../constants/canvas-color-map";

export class CanvasCellGrid extends React.Component {
    canvas;
    loopHandler;

    canvasSize;
    gridSize;
    cellMap;


    constructor(props) {
        super(props);
        this.state = {
            canvasSize: [0, 0],
            gridSize: {width: 0, height: 0},
            activeCellCount: 0,
        };

        this.canvas = React.createRef();
        this.canvasSize = [0, 0];
        this.gridSize = {width: 0, height: 0};
        this.cellMap = null;
    }


    componentDidMount() {
        this.updateSizes();
        this.restartLoop();
        window.addEventListener('resize', this.resize)
    }


    updateSizes = () => {
        const canvasSize = [
            window.innerHeight || 0,
            window.innerHeight || 0,
        ];

        this.gridSize = {
            width: Math.floor(canvasSize[0] / this.props.resolution),
            height: Math.floor(canvasSize[1] / this.props.resolution),
        };

        this.setState({ canvasSize })
    };


    resize = () => {
        this.updateSizes();
        this.restartLoop();
    };


    componentWillUnmount() {
        this.clearLoop();
        window.removeEventListener('resize', this.resize);
    }


    startLoop() {
        this.loopHandler = setInterval(() => {
            if (this.cellMap) {
                const nextGenerationCellMap = this.computeNextGeneration(this.cellMap);
                this.renderCellGrid(nextGenerationCellMap);
                this.cellMap = nextGenerationCellMap;

                if (this.state.activeCellCount <= 25 && this.state.activeCellCount !== 0) {
                    this.restartLoop();
                }
            } else {
                throw new Error('Attempted to start loop without cell map');
            }
        }, 1000);
        this.setState({activeCellCount: 0})
    }


    clearLoop() {
        if (this.loopHandler) {
            clearInterval(this.loopHandler);
            this.loopHandler = null;
        }
    }


    restartLoop = () => {
        this.clearLoop();

        this.cellMap = CellGridMap.constructCellMapV2(this.gridSize.width, this.gridSize.height);
        this.startLoop();
    };


    computeNextGeneration(currentCellMap) {
        let nextGenerationCellMap = new Array(currentCellMap.length).fill(null).map(el => new Array(currentCellMap.length));
        let activeCellCount = 0;

        currentCellMap.forEach((cellRow, colIndex) => {
            cellRow.forEach((cellValue, rowIndex) => {
                nextGenerationCellMap[colIndex][rowIndex] = CellGridMap.computeCellStateByNeighbors(currentCellMap, colIndex, rowIndex);
                if (nextGenerationCellMap[colIndex][rowIndex])
                    activeCellCount+=1;
            });
        });

        this.setState({activeCellCount: activeCellCount});
        return nextGenerationCellMap;
    }


    renderCellGrid(cellMap) {
        const xWidth = this.props.resolution;
        const yWidth = this.props.resolution;
        const rect = this.canvas.current?.parentElement?.getBoundingClientRect();

        if (this.canvas.current) {
            const ctx = this.canvas.current.getContext('2d');
            if (ctx) {
                // clear area
                ctx.fillStyle = 'transparent';
                ctx.clearRect(0, 0, rect.width, rect.height);
                ctx.fillRect(0, 0, this.state.canvasSize[0], this.state.canvasSize[1]);

                // draw cells
                cellMap.forEach((cellRow, rowIndex) => {
                    cellRow.forEach((cellValue, colIndex) => {
                        const isAlive = !!cellValue;
                        ctx.fillStyle = isAlive ? CanvasCellGrid.getRandomColor() : 'transparent';
                        ctx.fillRect(xWidth * colIndex, yWidth * rowIndex, xWidth, yWidth);
                    })

                });
            } else {
                throw new Error('Failed to obtain 2D canvas context.');
            }
        } else {
            throw new Error('Canvas element not found.');
        }
    }


    static getRandomColor() {
        const colorIndex = Math.floor(Math.random() * CELL_COLOR_MAP.length);
        return CELL_COLOR_MAP[colorIndex];
    }


    render() {
        const width = this.state.canvasSize[0];
        const height = this.state.canvasSize[1];

        return (
            <div className='absolute right-0 top-1/2 z-0 transform -translate-y-1/2'>
                <canvas ref={this.canvas} width={width} height={height}/>
            </div>
        )
    }
}
