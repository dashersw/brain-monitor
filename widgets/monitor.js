
const contrib = require('blessed-contrib')
const channels = require('../lib/channels')

function randomColor() {
    return [Math.random() * 255, Math.random() * 255, Math.random() * 255]
}

const channelLines = channels.map(c => ({
    title: c,
    style: { line: randomColor() },
    x: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', '01:50', '02:00', '02:10', '02:20', '02:30', '02:40', '02:50', '03:00', '03:10', '03:20', '03:30', '03:40', '03:50', '04:00', '04:10', '04:20', '04:30'],
    y: [0, 20, 40, 45, 45, 50, 55, 70, 65, 58, 50, 55, 60, 65, 70, 80, 70, 50, 40, 50, 60, 70, 82, 88, 89, 89, 89, 80, 72, 70]
}))

channelLines.forEach((l, i) => l.y = l.y.map(v => v + (i - 1) * 50))

module.exports = function(grid) {
    const monitor = grid.set(0, 0, 12, 9, contrib.line, {
        maxY: 400,
        showLegend: true,
        style: { top: 30 },
        legend: { width: 10 }
    })
        
    setLineData(channelLines, monitor)
    
    setInterval(() => {
        setLineData(channelLines, monitor)
    }, 500)
    
    function setLineData(mockData, line) {
        for (let i = 0; i < mockData.length; i++) {
            const last = mockData[i].y[mockData[i].y.length - 1]
            mockData[i].y.shift()
            const num = Math.max(last + Math.round(Math.random() * 10) - 5, 10)
            mockData[i].y.push(num)
        }
    
        line.setData(mockData)
    }

    return monitor
}
