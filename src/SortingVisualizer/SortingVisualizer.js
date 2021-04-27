import React from 'react';
import './SortingVisualizer.css';


const NUMBER_OF_ARRAY_BARS = 30;
const PRIMARY_COLOR = 'pink';


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
    
    render() {

        const { array } = this.state;

        return (
            <>
            <div className="array-container">
                {array.map((value, idx) => (
                <div
                    className="array-bar"
                    key={idx}
                    style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`,
                    }}>{value}</div>
                ))}
                
            </div>

            </>
        )
    }
}