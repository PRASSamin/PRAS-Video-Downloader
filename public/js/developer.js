document.addEventListener('DOMContentLoaded', function () {
    // Simulate a delay (you can replace this with actual loading logic)
    setTimeout(function () {
      hideLoadingScreen();
    }, 1500);
  });

  function hideLoadingScreen() {
    var loadingScreen = document.getElementById('loadingScreen');
    var content = document.getElementById('content');
  
    loadingScreen.style.display = 'none';
  
    content.style.display = 'block';
  }


  $(document).ready(function () {
    $('#toolbox-btn').click(function () {
      $('.toolbox-dropdown').slideToggle('fast');
    });
    $('#toolboxshortcut').click(function () {
      $('.toolbox-dropdown').slideToggle('fast');
    });
  });
  
  const toolboxbtn = document.getElementById('toolbox-btn');
  
  toolboxbtn.addEventListener('click', function () {
    const updownBtn = document.getElementById('updown'); 
    updownBtn.classList.toggle('fa-caret-up');
    updownBtn.classList.toggle('fa-caret-down');
  });
  
 
  function scrollT(elementId) {
    let e = document.getElementById(elementId);
    e.scrollIntoView({
      behavior: 'smooth',
    });
  };


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

  if (currentURL === '/toolbox') {

    document.querySelector('.nav-item.tool').classList.add('active');
  }
});

  document.addEventListener('DOMContentLoaded', function() {
  var currentURL = window.location.pathname;

  if (currentURL === '/developer') {

    document.querySelector('.nav-item.developer').classList.add('active');
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
  
}


const sideNav = document.getElementById("nav-links");
const devcredit = document.createElement("li");
devcredit.classList.add("nav-item", "developer");
devcredit.innerHTML = '<a href="/developer"><i class="fa-solid fa-code"></i><span>developer</span></a>';

sideNav.appendChild(devcredit);


document.addEventListener('DOMContentLoaded', function() {
  var socialContainers = document.querySelectorAll('.scontainer');
  var toastContainer = document.getElementById('toast');

  socialContainers.forEach(function(container) {
    container.addEventListener('contextmenu', function(event) {
      event.preventDefault();

      var usernameElement = container.querySelector('p');
      var username = usernameElement.textContent || usernameElement.innerText;

      var textarea = document.createElement('textarea');
      textarea.value = username;

      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 99999);

      document.execCommand('copy');

      document.body.removeChild(textarea);

      showToast(' <i class="fa-regular fa-clipboard"></i>Copied to clipboard');
    });
  });


  // toast
  function showToast(message) {
    toastContainer.innerHTML = message;
    toastContainer.style.animation = 'toast 2s ease-in-out';

    setTimeout(function() {
      toastContainer.style.animation = '';
    }, 2000);
  }
});
