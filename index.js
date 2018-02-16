const blessed = require('blessed')
const contrib = require('blessed-contrib')
const mind = require('wits')
const channels = require('./lib/channels')

require('./lib/override-blessed-contrib')

const screen = blessed.screen()

const grid = new contrib.grid({
    rows: 12,
    cols: 12,
    screen: screen,
    hideBorder: true,
    dashboardMargin: 0,
    color: 'black'
})

const widgets = {};

['monitor', 'gyro', 'battery', 'log', 'channels'].forEach(w => widgets[w] = require(`./widgets/${w}`)(grid))

screen.key(['escape', 'q', 'C-c'], (ch, key) => {
    return process.exit(0)
})

screen.on('resize', function () {
    widgets.forEach(w => w.emit('attach'))
})

screen.render()

setInterval(() => screen.render(), 500)

mind.setLogger(widgets.log.update)

setTimeout(() => {
    mind.open()
    mind.read(data => {
        widgets.battery.update(data.battery)
        widgets.channels.update(data.cq)
        widgets.gyro.update([data.gyro.x, data.gyro.y])
        widgets.monitor.update(data.levels)
    })
}, 100)
