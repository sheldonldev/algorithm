class Snake {
    constructor() {
        this.snakeBody = [
            [4, 1],
            [4, 2],
            [4, 3],
            [4, 4],
        ]
    }

    move(direction) {
        const delta = {
            u: [-1, 0],
            d: [1, 0],
            l: [0, -1],
            r: [0, 1],
        }

        const currHead = this.snakeBody[this.snakeBody.length - 1]
        const [currRow, currCol] = currHead
        const [changeRow, changeCol] = delta[direction]
        const newHead = [currRow + changeRow, currCol + changeCol]

        console.log(this.snakeBody)
        console.log(newHead)
        console.log(!this.snakeBody.includes(newHead))
        if (!this.snakeBody.some(
            ele => ele[0]  === newHead[0] && ele[1] === newHead[1]
        )) {
            this.snakeBody.push(newHead)
            this.snakeBody.shift()
        }

    }

    draw() {
        const grid = []
        // 10 * 10
        for (let i = 0; i < 10; i++) {
            const row = []
            for (let j = 0; j < 10; j++) {
                row.push(' ')
            }
            grid.push(row)
        }

        this.snakeBody.forEach(pos => {
            const [row, col] = pos
            grid[row][col] = '*'
        })
        console.clear()
        grid.forEach(row => console.log(row.join('|')))
    }

    play() {
        const stdin = process.stdin
        stdin.setRawMode(true)
        stdin.resume()
        stdin.setEncoding("utf-8")
        stdin.on("data", (keypress) => {
            if (keypress === 'w') this.move('u')
            if (keypress === 's') this.move('d')
            if (keypress === 'a') this.move('l')
            if (keypress === 'd') this.move('r')
            if (keypress === '\u0003') process.exit()

            this.draw()
        })
    }
}

const game = new Snake()
game.play()
