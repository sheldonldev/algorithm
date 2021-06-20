const Helper = require('./Helper')

const helper = new Helper()

/*
 * How Sum
 */

// classic recursion
const _howSum = (targetSum, numbers) => {
    if (targetSum === 0) return []
    if (targetSum < 0) return null

    for (const num of numbers) {
        const res = _howSum(targetSum - num, numbers) 
        if (res !== null) {
            return [...res, num]
        }
    }
    return null
} // O(n^m * m) time, O(m) space, m is targetSum, n is length of numbers


// dynamic memoization
const _howSumDynamic = (targetSum, numbers, memo={}) => {
    if (targetSum === 0) return []
    if (targetSum < 0) return null

    if (targetSum in memo) return memo[targetSum]

    for (const num of numbers) {
        const res = _howSumDynamic(targetSum - num, numbers, memo)
        if ( res !== null) {
            memo[targetSum] = [...res, num]
            return memo[targetSum]
        }
    }
    memo[targetSum] = null
    return null
} // O(n * m^2) time, O(m^2) space, m is targetSum, n is length of numbers


const howSum = (targetSum, numbers, mode) => {
    if (mode === 'classic') res = _howSum(targetSum, numbers)
    if (mode === 'dynamic') res = _howSumDynamic(targetSum, numbers)
    return res
}


const testHowSum = (testList, mode = 'classic') => {
    console.log(`${mode} mode`)
    for (const test of testList) {
        console.log(`target: ${test[0]}, numbers: ${test[1]}`)
        const res = helper.timeAndSpaceUsage(howSum, [...test, mode])
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
testHowSum(testList, mode='classic')
testHowSum(testList, mode='dynamic')



