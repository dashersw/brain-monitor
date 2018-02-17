const contrib = require('blessed-contrib')

module.exports = function (grid) {
    const battery = grid.set(0, 10, 3, 1, contrib.donut, {
        radius: 14,
        arcWidth: 4,
        yPadding: 8,
        remainColor: 'black',
        data: [
            { percent: 0, label: 'Battery', color: 'red' }
        ]
    })

    function update(val) {
        let color = 'red'

        if (val > 49) color = 'green'
        else if (val > 19) color = 'yellow'

        battery.setData([{ percent: val, label: 'Battery', color }])
    }

    return {
        widget: battery,
        update
    }
}
