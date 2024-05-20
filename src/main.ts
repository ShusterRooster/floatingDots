import {DotManager} from "./DotManager";
import {Dot} from "./Dots";

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;

window.onload = function () {
    canvas = document.getElementById('dotsCanvas') as HTMLCanvasElement
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D

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