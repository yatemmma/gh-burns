function getPointFromDOM() {

  function getPoint(labels) {
    for (var i in labels) {
      if (!isNaN(labels[i])) {
        return Number(labels[i])
      }
    }
  }

  const columns = document.querySelectorAll(".project-column")
  let allPoint = 0
  const results = {}
  Array.prototype.slice.call(columns).map((column, i)=>{

      var header = column.querySelectorAll(".js-project-column-name")[0].innerHTML
      var cards = column.querySelectorAll(".issue-card")
      var sum = 0
      var b = Array.prototype.slice.call(cards).map((card)=>{

      	var title = JSON.parse(card.getAttribute("data-card-title"))
      	title.pop()
      	var issueNum = title.pop()
      	var item = {
      	  title:     title.join(" "),
      	  issueNum: issueNum,
      	  point:     getPoint(JSON.parse(card.getAttribute("data-card-label")))
      	}
      	sum += item.point
      	return item
      })
      allPoint += sum
      results[header] = {
        items: b,
        point: sum
      }
  })

  console.log(results)

  const points = {
    total: allPoint - (results["Others"] || {point:0}).point,
    done: {
      sun: 0,
      mon: (results["Done(mon)"] || {}).point,
      tue: (results["Done(tue)"] || {}).point,
      wed: (results["Done(wed)"] || {}).point,
      thu: (results["Done(thu)"] || {}).point,
      fri: (results["Done(fri)"] || {}).point,
    },
    doing: (results["InProgress"] || {point:0}).point + (results["InReview"] || {point:0}).point
  }
  return points
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(2, request)
    if (request.method == "point") {
      const points = getPointFromDOM()
      console.log(3, points)
      sendResponse(points)
    }
  }
)
