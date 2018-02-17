var blessed = require('blessed')
var Node = blessed.Node
var Canvas = require('blessed-contrib/lib/widget/canvas')

function XYMap(options) {
    if (!(this instanceof Node)) return new XYMap(options)

    Canvas.call(this, options)

    this.options = options

    this.on('attach', () => this.draw())
}

XYMap.prototype.draw = function (target) {
    if (!this.ctx) return

    const c = this.ctx

    c.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)

    c.strokeStyle = 'white'

    const centerX = this.canvasSize.width / 2 + 1
    const centerY = this.canvasSize.height / 2 - 4

    c.beginPath()
    c.moveTo(centerX, centerY - 13)
    c.lineTo(centerX, centerY + 13)
    c.stroke()

    c.moveTo(centerX - 13, centerY)
    c.lineTo(centerX + 13, centerY)
    c.stroke()
    c.closePath()

    c.fillStyle = 'white'
    c.fillText(this.options.title || ' ', centerX - this.options.title.length + 1, centerY + 18)

    if (!target) return

    let [targetX, targetY] = target

    targetX = -targetX + centerX
    targetY = targetY + centerY

    c.beginPath()
    c.strokeStyle = 'red'
    c.moveTo(targetX + 1, targetY - 1)

    c.lineTo(targetX - 1, targetY + 1)
    c.stroke()
    c.moveTo(targetX - 1, targetY - 1)
    c.lineTo(targetX + 1, targetY + 1)
    c.stroke()
    c.closePath()
}

XYMap.prototype.calcSize = function () {
    this.canvasSize = { width: this.width * 2 - 8, height: this.height * 4 - 8 }
}

XYMap.prototype.__proto__ = Canvas.prototype

XYMap.prototype.type = 'xymap'

XYMap.prototype.setData = function (data) {
    this.draw(data)
}

module.exports = XYMap
