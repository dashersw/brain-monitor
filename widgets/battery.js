const contrib = require('blessed-contrib')

module.exports = function (grid) {
    const battery = grid.set(0, 10, 4, 2, contrib.donut, {
        radius: 16,
        arcWidth: 4,
        remainColor: 'black',
        data: [
            { percent: 10, label: 'Battery', color: 'red' }
        ]
    })


    let val = 100

    setInterval(() => {
        val = --val % 100
        let color = 'red'

        if (val > 70) color = 'green'
        else if (val > 30) color = 'yellow'

        battery.setData([{ percent: val, label: 'Battery', color }])
    }, 500)

    return battery
}
