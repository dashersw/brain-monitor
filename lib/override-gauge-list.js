
const contrib = require('blessed-contrib')

contrib.gaugeList.prototype.setSingleGauge = function (gauge, offset) {
    var colors = ['green', 'magenta', 'cyan', 'red', 'blue']
    var stack = gauge.stack

    var c = this.ctx
    var leftStart = 3
    var textLeft = 5

    c.strokeStyle = 'normal'
    c.fillStyle = 'white'
    c.fillText(gauge.label || offset.toString(), 0, offset * (this.options.gaugeHeight + this.options.gaugeSpacing))

    for (var i = 0; i < stack.length; i++) {
        var currentStack = stack[i]

        if (typeof (currentStack) == typeof ({}))
            var percent = currentStack.percent
        else
            var percent = currentStack

        c.strokeStyle = currentStack.stroke || colors[(i % colors.length)] // use specified or choose from the array of colors
        c.fillStyle = this.options.fill//'white'

        textLeft = 5

        var width = percent / 100 * (this.canvasSize.width - 5)

        c.fillRect(leftStart, offset * (this.options.gaugeHeight + this.options.gaugeSpacing), width, this.options.gaugeHeight - 1)

        textLeft = (width / 2) - 1
        var textX = leftStart + textLeft

        if ((leftStart + width) < textX) {
            c.strokeStyle = 'normal'
        }
        if (gauge.showLabel) c.fillText(percent + "%", textX, 3)

        leftStart += width
    }
}
