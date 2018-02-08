const contrib = require('blessed-contrib')
const channels = require('../lib/channels')

module.exports = function (grid) {
    const _channels = grid.set(0, 9, 5, 1, contrib.table, {
        keys: true,
        fg: 'white',
        interactive: false,
        columnSpacing: 1,
        columnWidth: [8, 10]
    })

    function update(val = {}) {
        const data = []

        for (let i = 0; i < channels.length; i++) {
            const row = []
            const cq = Math.floor(val[channels[i]] / 8192 * 100)
            row.push(channels[i], `${cq}%`)

            data.push(row)
        }

        _channels.setData({ headers: ['Channel', 'Quality'], data: data })
    }

    return {
        widget: channels,
        update
    }
}
