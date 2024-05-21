import {DotManager} from "./DotManager";
import {constrain} from "./Helpers";

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;
export let scale: number;

function calcScale() {
    const width = window.innerWidth
    const maxRes = 2000
    return constrain(width / maxRes, 0.1, 1)
}

window.onload = function () {
    canvas = document.getElementById('dotsCanvas') as HTMLCanvasElement
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    scale = calcScale()

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let numWanted = 200
    const dotManager = new DotManager(numWanted)
    console.log(dotManager.dots)

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        dotManager.run()
        requestAnimationFrame(draw)
    }

    draw()
}