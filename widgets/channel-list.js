const contrib = require('blessed-contrib')
const channels = require('../lib/channels')

module.exports = function (grid) {
    const channelList = grid.set(0, 9, 5, 1, contrib.table, {
        keys: true,
        fg: 'white',
        interactive: false,
        columnSpacing: 1,
        columnWidth: [8, 10]
    })

    function generateTable() {
        const data = []

        for (let i = 0; i < 14; i++) {
            var row = []
            row.push(channels[i], 3)

            data.push(row)
        }

        channelList.setData({ headers: ['Channel', 'Quality'], data: data })
    }

    generateTable()
    setInterval(generateTable, 3000)

    return channelList
}
