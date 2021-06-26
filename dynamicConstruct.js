const Helper = require('./Helper')

const helper = new Helper()

/*
 * Can Construct
 */

// classic recursion
const _canConstruct = (target, wordBank) => {
    if (target === "") return true

    for (const word of wordBank) {
        if (target.startsWith(word)) {
            return _canConstruct(target.substr(word.length), wordBank)
        }
    }

    return false
} // O(n^m) time, O(m) space, m is target, n is length of wordBank


// memoization
const _canConstructMemo = (target, wordBank, memo={}) => {
    if (target === "") return true
    if (target in memo) return memo[target]

    for (const word of wordBank) {
        if (target.startsWith(word)) {
            memo[target] = _canConstructMemo(target.substr(word.length), wordBank, memo)
            return memo[target]
        }
    }

    return false
} // O(n*m) time, O(m) space, m is target, n is length of wordBank


// tabulation
const _canConstructTabu = (target, wordBank) => {
    const table = Array(target.length + 1).fill(false)
    table[0] = true

    for (let i = 0; i < target.length; i++) {
        for (const word of wordBank) {
            if (table[i] && target.indexOf(word, i) === i) {
                table[i + word.length] = true
            }
        }
    }
    return table[target.length]
}


/*
 * Count Construct
 */

// classic recursion
const _countConstruct = (target, wordBank) => {
    if (target === "") return 1

    let counter = 0
    for (const word of wordBank) {
        if (target.startsWith(word)) {
            res = _countConstruct(target.substr(word.length), wordBank)
            counter += res
        }
    }

    return counter
} // O(n^m) time, O(m) space, m is target, n is length of wordBank


// memoization
const _countConstructMemo = (target, wordBank, memo={}) => {
    if (target === "") return 1
    if (target in memo) return memo[target]

    let counter = 0
    for (const word of wordBank) {
        if (target.startsWith(word)) {
            const res = _countConstructMemo(target.substr(word.length), wordBank, memo)
            counter += res
        }
    }
    memo[target] = counter
    return counter
} // O(n*m) time, O(m) space, m is target, n is length of wordBank


// tabulation
const _countConstructTabu = (target, wordBank) => {
    const table = Array(target.length + 1).fill(0)
    table[0] = 1

    for (let i = 0; i < target.length; i++) {
        for (const word of wordBank) {
            if (table[i] > 0 && target.indexOf(word, i) === i) {
                table[i + word.length] += table[i]
            }
        }
    }
    return table[target.length]
}

/*
 * All Construct
 */

// classic recursion
const _allConstruct = (target, wordBank) => {
    if (target === "") return [[]]

    const res = []
    for (const word of wordBank) {
        if (target.startsWith(word)) {
            const suffix = target.substr(word.length)
            const suffixWays = _allConstruct(suffix, wordBank)
            const targetWays = suffixWays.map(way => [word, ...way])
            res.push(...targetWays)
        }
    }
    return res
} // O(n^m) time, O(m) space, m is target, n is length of wordBank


// memoization
const _allConstructMemo = (target, wordBank, memo={}) => {
    if (target === "") return [[]]
    if (target in memo) return memo[target]

    const res = []
    for (const word of wordBank) {
        if (target.startsWith(word)) {
            const suffix = target.substr(word.length)
            const suffixWays = _allConstructMemo(suffix, wordBank, memo)
            const targetWays = suffixWays.map(way => [word, ...way])
            res.push(...targetWays)
        }
    }
    memo[target] = res
    return res
} // O(n*m) time, O(m) space, m is target, n is length of wordBank


// tabulation
const _allConstructTabu = (target, wordBank) => {
    const table = Array(target.length + 1).fill().map(x => [])
    table[0] = [[]]

    for (let i = 0; i < target.length; i++) {
        for (const word of wordBank) {
            if (table[i] !== [] && target.indexOf(word, i) === i) {
                for (const arr of table[i]) {
                    table[i + word.length].push([...arr, word]) 
                }
            }
        }
    }
    return table[target.length]
}

/*
 * Test
 */

const canConstruct = (target, wordBank, mode) => {
    if (mode === 'classic') return _canConstruct(target, wordBank)
    if (mode === 'memo') return _canConstructMemo(target, wordBank)
    if (mode === 'tabu') return _canConstructTabu(target, wordBank)
}

const countConstruct = (target, wordBank, mode) => {
    if (mode === 'classic') return _countConstruct(target, wordBank)
    if (mode === 'memo') return _countConstructMemo(target, wordBank)
    if (mode === 'tabu') return _countConstructTabu(target, wordBank)
}

const allConstruct = (target, wordBank, mode) => {
    if (mode === 'classic') return _allConstruct(target, wordBank)
    if (mode === 'memo') return _allConstructMemo(target, wordBank)
    if (mode === 'tabu') return _allConstructTabu(target, wordBank)
}

const testList = [
    ['abcdef', ['abc', 'bc', 'def', 'cd']],             // true, 1
    ['purple', ['purp', 'p', 'ur', 'le', 'purpl']],     // true, 2
    ['stakeholder', ['st', 'hol', 'lder', 'take']],     // false
    // ['eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefff', 
    //     ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee', 'eeeeeee', 'eeeeeeee', 'eeeeeeeee', 'eeeeeeeeee']
    // ],             // false
]

helper.testFunc(canConstruct, [testList, mode='tabu'])
helper.testFunc(canConstruct, [testList, mode='memo'])
helper.testFunc(canConstruct, [testList, mode='classic'])

helper.testFunc(countConstruct, [testList, mode='tabu'])
helper.testFunc(countConstruct, [testList, mode='memo'])
helper.testFunc(countConstruct, [testList, mode='classic'])

helper.testFunc(allConstruct, [testList, mode='tabu'])
helper.testFunc(allConstruct, [testList, mode='memo'])
helper.testFunc(allConstruct, [testList, mode='classic'])

