import React from 'react';
import './SortingVisualizer.css';

const SPEED_OF_ANIMATION = 80;
const NUMBER_OF_ARRAY_BARS = 80;
const PRIMARY_COLOR = 'pink';
const COMPARE_COLOR = 'yellow';
const SWAP_COLOR = 'red';




export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }
    
    resetArray() {
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(20, 600));
        }
        this.setState({array});
        // console.log(array);
    }



    // swaps the bars on the main div array i.e arrayBars.
    swapDiv(divIdx1, divIdx2) {
        // basically just swap the height style
        var arrayBars = document.getElementsByClassName('array-bar');

        let tempHeight = arrayBars[divIdx2].style.height;
        arrayBars[divIdx2].style.height = arrayBars[divIdx1].style.height;
        arrayBars[divIdx1].style.height = tempHeight;
    }

    async animateSwaps(animations) {

        var arrayBars = document.getElementsByClassName('array-bar');
        let lastIdx1 = 0, lastIdx2=0;

        for(let i=0; i<animations.length; i++) {

            let divIdx1 = animations[i][0];
            let divIdx2 = animations[i][1];
            // console.log(divIdx1, divIdx2);

            // change back the color to primary_color for the swapped last elements
            arrayBars[lastIdx1].style.backgroundColor = PRIMARY_COLOR;
            arrayBars[lastIdx2].style.backgroundColor = PRIMARY_COLOR;
            // update the last index
            lastIdx1 = divIdx1;
            lastIdx2 = divIdx2;

            // change the color of the element getting swapped to swap_color
            arrayBars[divIdx1].style.backgroundColor = SWAP_COLOR;
            arrayBars[divIdx2].style.backgroundColor = SWAP_COLOR;

            this.swapDiv(divIdx1, divIdx2);

            await new Promise(resolve => setTimeout(resolve, SPEED_OF_ANIMATION));
        }
    }


    bubbleSort() {
        let arrayTemp = this.state.array;
        let animations = [];
        
        // sorting arrTemp to get the element ids to swap
        for(let i=0; i<NUMBER_OF_ARRAY_BARS; i++) {
            for(let j=0; j<NUMBER_OF_ARRAY_BARS-1; j++) {
                if(arrayTemp[j] > arrayTemp[j+1]) {
                    [arrayTemp[j], arrayTemp[j+1]] = [arrayTemp[j+1], arrayTemp[j]];
                    animations.push([j,j+1]);
                }
            }
        }

        // console.log(animations);
        this.animateSwaps(animations);
    }

    quickSort() {
        let arrayTemp = this.state.array; // used as a global variable in quickSortHelper and  quickSortPartition
        let animations = [];

        function quickSortPartition(start, end) {

            let originalStart = start, originalEnd = end;;

            // console.log(typeof(start), typeof(end));
            
            // let chk = 0;
            if(start<0 || end>=arrayTemp.length || start >= end) {
                return -1;
            }
            console.log(start, end);

            // if(chk == 1)    return;

            console.log('array', arrayTemp);

            let pivotIdx = end;
            let pivot = arrayTemp[end];
            end--;

            while(true) {
                while(arrayTemp[start] < pivot && start<end)    start++;
                while(arrayTemp[end] >= pivot && start<end)       end--;

                if(start == end)
                    break;
                else {
                    [arrayTemp[start], arrayTemp[end]] = [arrayTemp[end], arrayTemp[start]];
                    animations.push([start, end]);
                    // start++;
                    // end--;
                }
            }

            // swap the pivot with the current end //end+1 == pivotIdx && 
            if(!(arrayTemp[pivotIdx]>arrayTemp[end] )) {
                [arrayTemp[end], arrayTemp[pivotIdx]] = [arrayTemp[pivotIdx], arrayTemp[end]];
                animations.push([end, pivotIdx]);
            }

            // after swaping the element at end is the pivot
            let newPivotIdx = end;
            // console.log('pivot ', newPivotIdx);

            // console.log('partiton at', pivot)
            // console.log('new array', arrayTemp);
            // console.log('1. ', originalStart, newPivotIdx-1);
            // console.log('2. ', newPivotIdx+1, originalEnd);
            // console.log("\n\n\n");

            quickSortPartition(originalStart, newPivotIdx-1);
            quickSortPartition(newPivotIdx+1, originalEnd);
        }
        function quickSortHelper() {
            // console.log('before', arrayTemp);
            quickSortPartition(0, arrayTemp.length-1);
            // console.log('after', arrayTemp);
        }

        quickSortHelper();
        this.animateSwaps(animations);
    }
    


    render() {

        const { array } = this.state;

        return (
            <>
            <div className="array-container">
                {array.map((value, idx) => (
                <div
                    className="array-bar"
                    style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`,
                    }}></div>
                ))}
            </div>

            <div>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
            </div>
            </>
        )
    }
}