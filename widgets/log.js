const contrib = require('blessed-contrib')
const channels = require('../lib/channels')

module.exports = function(grid) {
    const log = grid.set(5, 9, 7, 3, contrib.log, {
        fg: 'green',
        selectedFg: 'green'
    })

    function update (val) {
        log.log(val)
    }

    return {
        widget: log,
        update
    }
}
