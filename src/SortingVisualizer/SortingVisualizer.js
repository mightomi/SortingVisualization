import React from 'react';
import './SortingVisualizer.css';


const NUMBER_OF_ARRAY_BARS = 30;
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
            // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(20, 600));
        }
        this.setState({array});
        // console.log(array);
    }


    // swaps on the main div array i.e arrayBars.
    swapDiv(divIdx1, divIdx2) {
        // basically just swap the height style
        var arrayBars = document.getElementsByClassName('array-bar');

        let tempHeight = arrayBars[divIdx2].style.height;
        // // console.log(temp);
        arrayBars[divIdx2].style.height = arrayBars[divIdx1].style.height;
        arrayBars[divIdx1].style.height = tempHeight;
    }

    bubbleSort() {

        var arrayBars = document.getElementsByClassName('array-bar');
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

        console.log(arrayBars);
        console.log(animations);

        let lastIdx1 = null, lastIdx2=null;

        for(let i=0; i<animations.length; i++) {

            setTimeout(() => {
                let divIdx1 = animations[i][0];
                let divIdx2 = animations[i][1];
                // console.log(divIdx1, divIdx2);

                if(lastIdx1 !== null) {
                    arrayBars[lastIdx1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[lastIdx2].style.backgroundColor = PRIMARY_COLOR;
                }
                lastIdx1 = divIdx1;
                lastIdx2 = divIdx2; 

                arrayBars[divIdx1].style.backgroundColor = SWAP_COLOR;
                arrayBars[divIdx2].style.backgroundColor = SWAP_COLOR;

                this.swapDiv(divIdx1, divIdx2);
              }, i * 80);
        }
        
        // console.log(arrayBars);
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
            </div>
            </>
        )
    }
}