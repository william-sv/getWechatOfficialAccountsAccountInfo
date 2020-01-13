// 获取 biz 数据
var weixinBiz = typeof biz !== "undefined" ? biz : "未获取到";
window.postMessage({
  "weixinBiz": weixinBiz
},'*');