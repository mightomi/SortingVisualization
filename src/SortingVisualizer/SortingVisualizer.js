import React from 'react';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arr: [1,2,3,4,5],
        };
    }
    
    render() {

        const { arr } = this.state;

        return (
            <>
                <h1>{arr}</h1>
            </>
        )
    }
}