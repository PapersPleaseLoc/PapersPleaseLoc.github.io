chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    if (request.name == 'screenshot') {
        chrome.tabs.captureVisibleTab(null, { "format": "png" }, function(dataUrl) {
            sendResponse({ screenshotUrl: dataUrl });
        });
    }
    return true;
});
