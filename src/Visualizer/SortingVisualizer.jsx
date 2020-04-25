import React from "react"
import {getMergeSortAnimations} from "../SortingAlgoritms/sortingAlgorithms"
import './SortingVisualizer.css'

const ANIMATION_SPEED = 7 // The animation speed constant for the visualizer

const NUMBER_OF_ARRAY_BARS = 200 // the number of random generated array bars

const DEFAULT_COLOR = "green" // this is the color of the bars when they are generated and are sorted

const SORTING_COLOR = "red" // the animation color that shows when values are being compared

class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            array: [],
        }

    }

    componentDidMount() {
        this.resetArray()
    }

    resetArray = () => {
        const array = [] // new empty array created
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 650))
        }
        this.setState({array})
    }

    mergeSort = () => {
        console.log("merge sort clicked")
        const animations = getMergeSortAnimations(this.state.array)
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar")
            const isColorChange = i % 3 !== 2
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i] // destructure both bars from the mergesort animations array
                const barOneStyle = arrayBars[barOneIdx].style // get the reference to first dom element for comparison
                const barTwoStyle = arrayBars[barTwoIdx].style // get refernece to second dom element for comparison
                const color = i % 3 === 0 ? SORTING_COLOR : DEFAULT_COLOR

                // use settimeout method in order to visualize sorting and animation
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * ANIMATION_SPEED)
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i]
                    const barOneStyle = arrayBars[barOneIdx].style
                    barOneStyle.height = `${newHeight}px` // set the height of the overriden value to the pexel value
                }, i * ANIMATION_SPEED)
            }
        }
    }

    render() {
        const {array} = this.state
        return (
            <div className="array-container">
                {array.map((value, index) => (
                    <div
                        className="array-bar"
                        key={index}
                        style={{backgroundColor: DEFAULT_COLOR, height: `${value}px`}}
                    />))
                }
                <div className="btn-container">
                    <button onClick={this.resetArray}>Generate New Array bars</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                </div>
            </div>
        )
    }
}

// function for generating random array int values from a given range specified
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default SortingVisualizer