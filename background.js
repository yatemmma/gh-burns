chrome.extension.onConnect.addListener((port)=>{
   port.onMessage.addListener((msg)=>{
      chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id, {method: "point"}, (response)=>{
          port.postMessage(response)
        })
      })
   })
})
