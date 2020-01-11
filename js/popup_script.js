var itemIdDataEle = document.getElementById('item-id_data');
var itemNicknameDataEle = document.getElementById('item-nickname_data');
var itemAvatarUrlData = document.getElementById('item-avatar_url_data');
var itemBizData = document.getElementById('item-biz_data');

chrome.tabs.query({
  currentWindow: true,
  active: true
}, function (tabs) {
  var activeUrl = tabs[0].url.toLowerCase().indexOf('mp.weixin.qq.com');
    if (activeUrl > -1) {
    // 获取 background_script 的数据
    var bg = chrome.extension.getBackgroundPage();
    weixinInfo = bg.weixinInfo;
    // 写入 popup.html页面
    if (Object.keys(weixinInfo).length > 0) {
      var nickname = weixinInfo["greeting"]["weixinNickname"];
      var avatar_url = weixinInfo["greeting"]["avatar_url"];
      var account = weixinInfo["greeting"]["weixinAccount"];
      var biz = weixinInfo["greeting"]["weixinBiz"];
      itemIdDataEle.innerText = account;
      itemNicknameDataEle.innerText = nickname;
      itemAvatarUrlData.innerText = avatar_url;
      itemBizData.innerText = biz;
    }
  }
});