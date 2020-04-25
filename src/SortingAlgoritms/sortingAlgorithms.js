export function getMergeSortAnimations(array){
    const animations = []
    if (array.length <= 1)
        return array

    const auxilaryArray = array.slice()
    mergeSortHelper(array, 0, array.length -1 , auxilaryArray, animations)
    return animations
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxilaryArr, animations) {
    if (startIdx === endIdx) return;

    const middleIndex = Math.floor(( startIdx + endIdx ) / 2)
    mergeSortHelper(auxilaryArr, startIdx, middleIndex, mainArray, animations) // call recursive function to sort first half of the array
    mergeSortHelper(auxilaryArr, middleIndex+1, endIdx, mainArray, animations) // rcursive function to sort second half of the array
    doMerge(mainArray, startIdx, middleIndex, endIdx, auxilaryArr, animations) // merge both halfs with their animations
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxilaryArr, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    //These are the values we are currently comparing
    while(i <= middleIdx && j <= endIdx){
        //use the animation to change their color
        animations.push([ i, j ])
        // we push them a second time but revert their color this time
        animations.push([ i, j ])
        if (auxilaryArr[i] <= auxilaryArr[j]){
            // we override the value at index k in the original array with the value at index j in the auxilary arr
            animations.push([ k, auxilaryArr[i] ])
            mainArray[k++] = auxilaryArr[i++]
        } else {
            // we override the value at index k in the original array with the value at index j in the auxilary array
            animations.push([ k, auxilaryArr[j] ])
            mainArray[k++] = auxilaryArr[j++]
        }
    }

    // these are the values used to compare and change colors
    while (i <= middleIdx){
        animations.push([ i, i ])
        // push a second time to revert their colors
        animations.push([ i, i ])
        // override the value at index k in the original array with the value at index j in the auxilary array
        animations.push([ k, auxilaryArr[i] ])
        mainArray[k++] = auxilaryArr[i++]
    }

    while(j <= endIdx){
        animations.push([ j, j ])

        animations.push([ j, j ])

        animations.push([ k, auxilaryArr[j] ])
        mainArray[k++] = auxilaryArr[j++]
    }

}