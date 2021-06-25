const Helper = require('./Helper')

const helper = new Helper()

/*
 * Grid Traveler
 */

// classic recursion
const _gridTraveler = (m, n) => {
    if (m === 1 || n === 1) return 1
    return _gridTraveler(m - 1, n) + _gridTraveler(m, n - 1)
} // O(2^(m+n)) time, O(m+n) space


// memoization
const _gridTravelerMemo = (m, n, memo={}) => {
    if (m === 1 || n === 1) return 1

    const key = `${m},${n}`
    if (key in memo) return memo[key]

    memo[key] = _gridTravelerMemo(m-1, n, memo) + _gridTravelerMemo(m, n-1, memo)
    return memo[key]
} // O(m*n) time, O(m+n) space


// tabulation
const _gridTravelerTabu = (m, n) => {
    const table = Array(m + 1).fill().map(x => Array(n + 1).fill(0))
    for (let i = 1; i <= m; i++) table[i][1] = 1
    for (let j = 1; j <= n; j++) table[1][j] = 1

    for(let i = 2; i <= m; i++) {
        for(let j = 2; j <= n; j++) {
            table[i][j] = table[i-1][j] + table[i][j-1]
        }
    }

    return table[m][n]
}


/*
 * Test
 */

const gridTraveler = (m, n, mode) => {
    if (Number.isInteger(n) && Number.isInteger(m) && m > 0 && n > 0) {
        if (mode === 'classic') return _gridTraveler(m, n)
        if (mode === 'memo') return _gridTravelerMemo(m, n)
        if (mode === 'tabu') return _gridTravelerTabu(m, n)
    } else {
        console.log('not a valid input')
    }
}


const testGridTraveler = (testList, mode = 'classic') => {
    console.log(`=== ${mode} mode ===`)
    for (const m_n of testList) {
        console.log(`calculating ${m_n[0]} * ${m_n[1]} grid...`)
        const res = helper.timeAndSpaceUsage(gridTraveler, [...m_n, mode])
        console.log(`result:`, res)
    }
}

const testList = [
    [10, 10], 
    [20, 20], 
    [30, 30], 
    [40, 40], 
    [50, 50]
]

testGridTraveler(testList, mode='tabu')
testGridTraveler(testList, mode='memo')
testGridTraveler(testList, mode='classic')



