function isMobileScreen() {
  return window.innerWidth <= 1024;
}

if (isMobileScreen()) {
  document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
      item.addEventListener('click', function () {
        navItems.forEach(navItem => navItem.classList.remove('active'));

        item.classList.add('active');
      });
    });
  });

  //auto gen height

  window.addEventListener('load', function () {
    const thumbnail = document.getElementById('autoheightgen');
    setHeightBasedOnWidth(thumbnail);
  });

  function setHeightBasedOnWidth(element) {
    const width = element.clientWidth;
    const aspectRatio = 9 / 16; // 16:9 aspect ratio
    const height = width * aspectRatio;
    element.style.height = height + 'px';
  }

  window.addEventListener('resize', function () {
    const thumbnail = document.getElementById('autoheightgen');
    setHeightBasedOnWidth(thumbnail);
  });
}


const toolURLs = [
  '/tool/youtube-downloader',
  '/tool/youtube',
  '/tool/ytd',
  '/tool/yt-downloader',
  '/tool/yt',
  '/tool/instagram-downloader',
  '/tool/instagram',
  '/tool/instad',
  '/tool/insta',
  '/tool/insta-downloader'
];


document.addEventListener('DOMContentLoaded', function() {
  var currentURL = window.location.pathname;

  if (currentURL === '/home') {

    document.querySelector('.nav-item.home').classList.add('active');
  }

});

document.addEventListener('DOMContentLoaded', function() {
  var currentURL = window.location.pathname;

  if (
    currentURL === '/tool/youtube-downloader' ||
    currentURL === '/tool/youtube' ||
    currentURL === '/tool/ytd' ||
    currentURL === '/tool/yt-downloader' ||
    currentURL === '/tool/yt' ||
    currentURL === '/youtube-downloader' ||
    currentURL === '/youtube' ||
    currentURL === '/ytd' ||
    currentURL === '/yt-downloader' ||
    currentURL === '/yt' ||
    currentURL === '/tool/instagram-downloader' ||
    currentURL === '/tool/instagram' ||
    currentURL === '/tool/insta' ||
    currentURL === '/tool/instad' ||
    currentURL === '/tool/insta-downloader' ||
    currentURL === '/instagram-downloader' ||
    currentURL === '/instagram' ||
    currentURL === '/insta' ||
    currentURL === '/instad' ||
    currentURL === '/insta-downloader'
    ) {
    var toolNavItem = document.querySelector('.nav-item.tool');
    
    toolNavItem.classList.add('active');

  }
});


function isMobileScreen() {
  return window.innerWidth <= 1024;
}

if (isMobileScreen()) {
  const toolboxshortcut = document.getElementById('toolboxshortcut');
  if (toolboxshortcut) {
    toolboxshortcut.href = "/toolbox";
  }

  const toolbox = document.getElementById('toolboxmobile');
  if (toolbox) {
    toolbox.href = "/toolbox";
  }


  
  const sideNav = document.getElementById("nav-links");
  const devcredit = document.createElement("li");
  devcredit.classList.add("nav-item", "developer");
  devcredit.innerHTML = '<a href="/developer"><i class="fa-solid fa-code"></i><span>developer</span></a>';

  sideNav.appendChild(devcredit);
  
}


