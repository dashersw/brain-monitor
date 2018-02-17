const contrib = require('blessed-contrib')
const xymap = require('../lib/xymap')

module.exports = function (grid) {
    const gyroxx = grid.set(0, 11, 3, 1, xymap)

    function update(val) {
        val = val.map(v => Math.min(Math.max(-7, v), 7) * 1.5);
        gyroxx.setData(val)
    }

    return {
        widget: gyroxx,
        update
    }
}
