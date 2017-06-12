chrome.extension.onConnect.addListener(function(port) {
   port.onMessage.addListener(function(msg){
     console.log(1, msg)
      chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id, {method: "point"}, (response)=>{
          port.postMessage(response)
        })
      })
   })
})
