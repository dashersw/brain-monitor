const contrib = require('blessed-contrib')
const channels = require('../lib/channels')

module.exports = function(grid) {
    const log = grid.set(5, 9, 7, 3, contrib.log, {
        fg: 'green',
        selectedFg: 'green'
    })
    
    setInterval(() => {
        const rnd = Math.round(Math.random() * 2)
        if (rnd == 0) log.log('starting process ' + channels[Math.round(Math.random() * (channels.length - 1))])
        else if (rnd == 1) log.log('terminating server ' + channels[Math.round(Math.random() * (channels.length - 1))])
        else if (rnd == 2) log.log('avg. wait time ' + Math.random().toFixed(2))
    }, 500)    

    return log
}
