import {maxFadeSpeed, maxRadius, maxSpeed, minFadeSpeed, minGray, minRadius, minSpeed} from "../Settings";
import {constrain, map, random} from "./Helpers";
import {DotManager} from "./DotManager";
import {canvas, ctx, scale} from "./main";

export class Dot {
    manager: DotManager;
    x: number
    y: number
    radius: number
    color: string
    speed: number

    alpha = 0
    fadeSpeed = random(minFadeSpeed, maxFadeSpeed)
    fadeDirection = 1
    fading = true

    constructor(manager: DotManager,
                x?: number,
                y?: number,
                radius?: number,
                color?: string) {

        this.manager = manager
        this.x = x || random(0, canvas.width)
        this.y = y || random(0, canvas.height)
        this.radius = radius || random(minRadius, maxRadius)
        this.color = color || this.generateGray()
        this.speed = this.calcSpeed()

        this.radius *= scale
        this.speed *= scale
    }

    calcSpeed() {
        return map(this.radius, minRadius, maxRadius, maxSpeed, minSpeed)
    }

    generateGray(gray = random(minGray, 255)) {
        return `rgb(${gray}, ${gray}, ${gray})`
    }

    draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fillStyle = this.color;
        ctx!.globalAlpha = constrain(this.alpha, 0, 1)
        ctx!.fill();
    }

    delete() {
        this.fadeDirection = -1

        if(this.alpha <= 0) {
            this.manager.deleteDot(this)
        }
    }

    run() {
        if(this.fading) {
            this.alpha += (this.fadeSpeed * this.fadeDirection)

            if(this.alpha <= -0.5 || this.alpha >= 1.5)
                this.fadeDirection *= -1
        }

        if(this.x < 0 || this.y > canvas.height)
            this.delete()

        this.x -= this.speed
        this.y += this.speed
        this.draw()
    }
}