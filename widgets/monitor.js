
const contrib = require('blessed-contrib')
const Fili = require('fili')
const channels = require('../lib/channels')

const rainbow = [
    [ 255, 0, 0 ],
    [ 255, 102, 0 ],
    [ 255, 204, 0 ],
    [ 204, 255, 0 ],
    [ 102, 255, 0 ],
    [ 0, 255, 0 ],
    [ 0, 255, 102 ],
    [ 0, 255, 204 ],
    [ 0, 204, 255 ],
    [ 0, 102, 255 ],
    [ 0, 0, 255 ],
    [ 102, 0, 255 ],
    [ 204, 0, 255 ],
    [ 255, 0, 204 ],
]

const channelLines = channels.map((c, i) => ({
    title: c,
    style: { line: rainbow[i] },
    x: Array(600).fill(0),
    y: Array(600).fill(0)
}))

const iirCalculator = new Fili.CalcCascades();

const highpassFilters = channels.map(c => new Fili.IirFilter(iirCalculator.highpass({
    order: 1,
    characteristic: 'butterworth',
    Fs: 128,
    Fc: 1,
})));


const lowpassFilters = channels.map(c => new Fili.IirFilter(iirCalculator.lowpass({
    order: 1,
    characteristic: 'butterworth',
    Fs: 128,
    Fc: 64,
})));

const filter = (filterIndex, data) => highpassFilters[filterIndex].multiStep(lowpassFilters[filterIndex].multiStep(data));

channelLines.forEach((l, i) => l.y = l.y.map(v => v + (i - 1) * 50))

module.exports = function(grid) {
    const monitor = grid.set(0, 0, 12, 9, contrib.line, {
        maxY: 7600,
        minY: 0,
        showLegend: true,
        style: { top: 30, text: 'white' },
        legend: { width: 6 },
        numYLabels: 15,
        yLabels: [' ', ...channels.slice().reverse()],
        xPadding: 6,
        xLabelPadding: 6
    })

    function update(data) {
        for (let i = 0; i < channelLines.length; i++) {
            channelLines[i].y.shift()
            const num = filter(i, [data[channels[i]]]).map(v => v + (channelLines.length - 1 - i) * 500 + 500)
            channelLines[i].y.push(num[0])
        }
    }

    setInterval(() => {
        monitor.setData(channelLines)
    }, 100)

    return {
        widget: monitor,
        update
    }
}
