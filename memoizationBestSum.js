const Helper = require('./Helper')

const helper = new Helper()

/*
 * How Sum
 */

// classic recursion
const _bestSum = (targetSum, numbers) => {
    if (targetSum === 0) return []
    if (targetSum < 0) return null

    let shortestCombination = null

    for (const num of numbers) {
        const res = _bestSum(targetSum - num, numbers) 
        if (res !== null) {
            const combination = [...res, num]
            if (shortestCombination === null || combination.length < shortestCombination.length) {
                shortestCombination = combination
            }
            return shortestCombination
        }
    }
    return null
} // O(n^m * m) time, O(m^2) space, m is targetSum, n is length of numbers


// dynamic memoization
const _bestSumDynamic = (targetSum, numbers, memo={}) => {
    if (targetSum === 0) return []
    if (targetSum < 0) return null

    if (targetSum in memo) return memo[targetSum]

    for (const num of numbers) {
        const res = _bestSumDynamic(targetSum - num, numbers, memo)
        if ( res !== null) {
            memo[targetSum] = [...res, num]
            return memo[targetSum]
        }
    }
    memo[targetSum] = null
    return null
} // O(n * m^2) time, O(m^2) space, m is targetSum, n is length of numbers


const bestSum = (targetSum, numbers, mode) => {

    // sorted before recursion
    numbers.sort((a, b) => a - b).reverse()

    if (mode === 'classic') res = _bestSum(targetSum, numbers)
    if (mode === 'dynamic') res = _bestSumDynamic(targetSum, numbers)
    return res
}


const testBestSum = (testList, mode = 'classic') => {
    console.log(`${mode} mode`)
    for (const test of testList) {
        console.log(`target: ${test[0]}, numbers: ${test[1]}`)
        const res = helper.timeAndSpaceUsage(bestSum, [...test, mode])
        console.log(`result: ${res}`)
    }
}

const testList = [
    [10, [2, 3, 5, 7]],             // true
    [20, [3, 7, 9, 15, 1]],         // true
    [30, [2, 8, 10, 25, 6, 4]],     // true 
    [40, [19, 18, 3, 9, 2]],        // true
    [50, [16, 21, 14, 28]],         // false
    [300, [7, 14]],                 // false, slow
]
testBestSum(testList, mode='classic')
testBestSum(testList, mode='dynamic')



