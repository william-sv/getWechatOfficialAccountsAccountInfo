var weixinNickname = '';
var avatar_url = '';
var weixinAccount = '';
var weixinBiz = '';
var activeTabUrl = document.location.host;
var activeTabUrlPathname = document.location.pathname;

if (activeTabUrl == 'mp.weixin.qq.com') {
  getWeixinInfo();
}

// 获取微信公众号相关数据
function getWeixinInfo() {
  if (activeTabUrlPathname == '/profile') {
    weixinNickname = document.title || document.getElementsByClassName('profile_nickname').length > 0 ? document.title || document.getElementsByClassName('profile_nickname')[0]['outerText'] : '未获取到'; // 获取微信昵称
    avatar_url = document.getElementsByClassName('radius_avatar').length > 0 ? document.getElementsByClassName('radius_avatar')[0].children[0]['src'] : '未获取到'; //获取微信头像
    weixinAccount = document.getElementsByClassName('profile_account').length > 0 ? (document.getElementsByClassName('profile_account')[0]['outerText']).split(":")[1] : "未获取到";
  } else {
    weixinNickname = document.getElementsByClassName('profile_nickname').length > 0 ? document.getElementsByClassName('profile_nickname')[0]['outerText'] : '未获取到'; // 获取微信昵称
    weixinAccount = document.getElementsByClassName('profile_meta_value').length > 0 ? document.getElementsByClassName('profile_meta_value')[0]['outerText'] : '未获取到'; // 获取微信昵称
  }
}
// 接收来自inject_script的数据
function getWeixinBiz() {
  return new Promise(resolve => {
    injectCustomJs('js/inject_script.js');
    window.addEventListener('message', function (e) {
      resolve(e.data['weixinBiz'] || '未获取到');
    }, false);
  });
}
// 向 background_scrip 发送数据
getWeixinBiz().then(function (value) {
  // console.log(weixinNickname, avatar_url, weixinAccount, value);
  chrome.runtime.sendMessage({
    greeting: {
      "weixinNickname": weixinNickname,
      "weixinAccount": weixinAccount,
      "avatar_url": avatar_url,
      "weixinBiz": value
    }
  }, function (response) {
    console.log('sendMessage ' + response);
  });
  
})

//向页面注入inject_script
function injectCustomJs(jsPath) {
  jsPath = jsPath || 'js/inject_script.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
    this.parentNode.removeChild(this);
  };
  document.head.appendChild(temp);
}