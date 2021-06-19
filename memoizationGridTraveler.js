const Helper = require('./Helper')

const helper = new Helper

/*
 * Grid Traveler
 */

// classic recursion
const _gridTraveler = (m, n) => {
    if (m === 1 || n === 1) return 1
    return _gridTraveler(m - 1, n) + _gridTraveler(m, n - 1)
} // O(2^(m+n)) time, O(m+n) space


// dynamic memoization
const _gridTravelerDynamic = (m, n, memo={}) => {
    if (m === 1 || n === 1) return 1

    const key = `${m},${n}`
    if (key in memo) return memo[key]

    memo[key] = _gridTravelerDynamic(m-1, n, memo) + _gridTravelerDynamic(m, n-1, memo)
    return memo[key]
} // O(m*n) time, O(m+n) space

const gridTraveler = (m, n, mode) => {
    if (Number.isInteger(n) && Number.isInteger(m) && m > 0 && n > 0) {
        if (mode === 'classic') return _gridTraveler(m, n)
        if (mode === 'dynamic') return _gridTravelerDynamic(m, n)
    } else {
        console.log('not a valid input')
    }
}


const testGridTraveler = (testList, mode = 'classic') => {
    console.log(`${mode} mode`)
    for (const m_n of testList) {
        console.log(`calculating ${m_n[0]} * ${m_n[1]} grid...`)
        const res = helper.timeAndSpaceUsage(gridTraveler, [...m_n, mode])
        console.log(`result: ${res}`)
    }
}

const testList = [[10, 10], [20, 20], [30, 30], [40, 40], [50, 50]]
// testGridTraveler(testList, mode='classic')
testGridTraveler(testList, mode='dynamic')



