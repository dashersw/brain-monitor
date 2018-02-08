const contrib = require('blessed-contrib')

function calcGyro(val, stroke) {
    if (val > 5) val = 5
    if (val < -5) val = -5

    return [
        { percent: val >= 0 ? 50 : 50 + val * 7, stroke: 'black' },
        { percent: Math.abs(val) * 7, stroke },
        { percent: val <= 0 ? 50 : 50 - val * 7, stroke: 'black' }
    ]
}

module.exports = function (grid) {
    const gyros = grid.set(4, 10, 1, 2, contrib.gaugeList, {
        gaugeSpacing: 0,
        gaugeHeight: 1,
        gauges: [
            { label: 'gX', showLabel: false, stack: calcGyro(0, 'cyan') },
            { label: 'gY', showLabel: false, stack: calcGyro(0, 'magenta') }
        ]
    })

    function update([x, y]) {
        gyros.setGauges([
            { label: 'gX', showLabel: false, stack: calcGyro(-x, 'cyan') },
            { label: 'gY', showLabel: false, stack: calcGyro(y, 'magenta') }
        ])
    }

    return {
        widget: gyros,
        update
    }
}
