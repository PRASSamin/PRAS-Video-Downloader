document.addEventListener('DOMContentLoaded', function () {
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
  
  document.getElementById("footer").style.display = "none";

}

