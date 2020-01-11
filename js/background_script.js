//接收来自 content_scrip 的数据
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  weixinInfo = request;
  sendResponse('ok');
});