// 获取 biz 数据
var weixinBiz = biz ? biz : "未获取到";
window.postMessage({
  "weixinBiz": weixinBiz
},'*');