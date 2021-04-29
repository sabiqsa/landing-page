// get the element to animate
var isShowContent = document.getElementById("content-news");
var isShowNotificationPanel = document.getElementById("notification");
var isFooter = document.getElementById("footer");
var elementHeight = isShowContent.clientHeight;

function handleNotification() {
  isShowNotificationPanel.classList.add("hideNotif");
  setTimeout((isShowNotificationPanel.style.position = "absolute"), 5000);
}

function handleNotification2() {
  isShowNotificationPanel.style.display = "none";
}

function handleCloseNotification() {
  handleNotification();
  setTimeout(handleNotification2, 1500);
}

function isScroll() {
  var windowHeight = window.innerHeight;
  var scrollY = window.pageYOffset;
  var scrollPosition = scrollY;
  // console.log(scrollPosition, "position");

  var isOffsetScroll = isFooter.offsetTop - 1000;
  // console.log(isOffsetScroll, "offset");

  if (scrollPosition >= isOffsetScroll) {
    return true;
  }
  return false;
}

var getExpired = getExpiredItem("isPanel");

function isShowClassContent() {
  isShowContent.classList.add("show");
}

function isShowContentNews() {
  if (isScroll() && !getExpired) {
    isShowClassContent();
  }
}

document.addEventListener("scroll", isShowContentNews);

function handleHideContent() {
  isShowContent.classList.add("hide");
}

function onCloseContent() {
  //note 1000ms = 1s
  //1 minutes = 60000ms so 10 minutes = 600000ms
  handleHideContent();
  setExpiredItem("isPanel", true, 600000);
}

function setExpiredItem(key, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getExpiredItem(key) {
  const isItem = localStorage.getItem(key);
  if (!isItem) {
    return null;
  }
  const item = JSON.parse(isItem);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

document.getElementById("isBtnRedirect").onclick = function () {
  window.location.replace("https://www.linkedin.com/in/sabiqsa/");
};
