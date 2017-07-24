onClickBurnDown()

function onClickBurnDown() {
  const port = chrome.extension.connect({name: "burndown"})
  port.postMessage("getPoint")
  port.onMessage.addListener(function(response) {
     showPlot(response)
  })
}

function showPlot(points) {
  const x = ["sun", "mon", "tue", "wed", "thu", "fri"]
  let idealY = []
  let realY = []
  let additionalY = [undefined, undefined, undefined, undefined, undefined, undefined]

  for (let i = 0; i <= 5; i++) {
    idealY.push(points.total - (points.total/5)*i)
  }

  let doneTotal = 0
  for (let i = 0; i <= 5; i++) {
    const week = x[i]
    if (points.done[week] === undefined) {
      console.log(additionalY[i-1])
      additionalY[i-1] = points.total - doneTotal
      additionalY[i]   = points.total - doneTotal - points.doing
      break
    }
    doneTotal += points.done[week]
    realY.push(points.total - doneTotal)
  }

  const ideal = {
    name: "ideal",
    x: x,
    y: idealY,
    type: 'scatter'
  }

  const real = {
    name: "real",
    x: x,
    y: realY,
    type: 'scatter'
  }

  const additional = {
    name: "in_progress",
    x: x,
    y: additionalY,
    type: 'scatter'
  }

  Plotly.newPlot('plot-area', [ideal, real, additional])
}
