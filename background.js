chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ annotations: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveAnnotation') {
    chrome.storage.sync.get('annotations', (data) => {
      const annotations = data.annotations || [];
      annotations.push(request.annotation);
      chrome.storage.sync.set({ annotations }, () => {
        sendResponse({ status: 'success' });
      });
    });
    return true; // Keeps the message channel open for async response
  }

  if (request.action === 'deleteAnnotation') {
    chrome.storage.sync.get('annotations', (data) => {
      let annotations = data.annotations || [];
      annotations = annotations.filter(annotation => annotation.id !== request.id);
      chrome.storage.sync.set({ annotations }, () => {
        sendResponse({ status: 'deleted' });
      });
    });
    return true; // Keeps the message channel open for async response
  }

  if (request.action === 'setMode') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'setMode', mode: request.mode, color: request.color });
    });
    sendResponse({ status: 'mode set' });
  }
});
