const contrib = require('blessed-contrib')

function calcGyro(val, stroke) {
    if (val > 5) val = 5
    if (val < -5) val = -5

    return [
        { percent: val >= 0 ? 50 : 50 + val * 10, stroke: 'black' },
        { percent: Math.abs(val) * 10, stroke },
        { percent: val <= 0 ? 50 : 50 - val * 10, stroke: 'black' }
    ]
}

module.exports = function (grid) {
    const gyros = grid.set(4, 10, 1, 2, contrib.gaugeList, {
        gaugeSpacing: 0,
        gaugeHeight: 1,
        gauges: [
            { label: 'gX', showLabel: false, stack: calcGyro(3, 'cyan') },
            { label: 'gY', showLabel: false, stack: calcGyro(-2, 'magenta') }
        ]
    })

    setInterval(() => {
        gyros.setGauges([
            { label: 'gX', showLabel: false, stack: calcGyro(Math.random() * 2, 'cyan') },
            { label: 'gY', showLabel: false, stack: calcGyro(-Math.random() * 1, 'magenta') }
        ])
    }, 500)

    return gyros
}
