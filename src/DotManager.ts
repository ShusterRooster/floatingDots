import {Dot} from "./Dots";
import {canvas, ctx} from "./main";

export class DotManager {
    dots = new Set<Dot>()
    numWanted: number

    constructor(numWanted: number) {
        this.numWanted = numWanted
        this.initDots()
    }

    initDots() {
        for (let i = 0; i < this.numWanted; i++) {
            const dot = new Dot(this)
            this.dots.add(dot)
        }
    }

    restart() {
        this.dots.clear()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.initDots()
    }

    deleteDot(dot: Dot) {
        this.dots.delete(dot)
        const newDot = new Dot(this)
        this.dots.add(newDot)
    }

    run() {
        for (const dot of this.dots) {
            dot.run()
        }
    }
}