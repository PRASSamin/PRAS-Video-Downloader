const submitForm = document.getElementById('video-form');
const videoUrlInput = document.getElementById('video-url');
const videoPreviewDiv = document.getElementById('video-preview-xy786900001');
const loadingElement = document.getElementById('spinner');
const instaSkeleton = document.getElementById('instaskeleton');



submitForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const urlInput = document.getElementById('video-url');
  const url = urlInput.value;

  if (url) {
    document.getElementById('download-section').style.display = 'none';
    document.getElementById('video-preview-xy786900001').style.display = 'none';
    loadingElement.style.display = 'block';
    instaSkeleton.style.display = 'block';
    instaSkeleton.style.background = 'linear-gradient(45deg, #2C303A 25%, #1E2127 50%, #2C303A 75%)';
    instaSkeleton.style.backgroundSize = '200% 100%';
    instaSkeleton.style.animation = 'loadingSkeleton 1.5s ease-in-out infinite';

  }
  else {
    console.error('URL is empty');
    return;
  }

  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid response format');
      return;
    }


    const instaVideoInfo = await response.json();

    const instathumbnail = document.getElementById('instathumbnail');
    instathumbnail.style.background = `url('/proxy?url=${encodeURIComponent(instaVideoInfo.displayUrl)}') center no-repeat`;


    const instausername = document.getElementById('instausername');
    const instausernamespan = document.createElement('span');
    const instauserurl = document.createElement('a');
    instauserurl.setAttribute('target', '_blank');
    instausername.textContent = 'Video Owner:  \xa0';
    instausernamespan.textContent = '@' + instaVideoInfo.userName;
    instauserurl.href = 'https://www.instagram.com/' + instaVideoInfo.userName;
    instausername.appendChild(instauserurl);
    instauserurl.appendChild(instausernamespan);


    const instavdownload = document.getElementById('download-button');
    const instavdownloadanc = document.getElementById('download-buttonanc');
    instavdownload.classList.add('btn', 'col-4', 'download-button', 'instadown');
    instavdownload.textContent = instaVideoInfo.width + ' X ' + instaVideoInfo.height;
    instavdownloadanc.href = '/downloadinsta';


    if (response.ok) {

    loadingElement.style.display = 'none';
    document.getElementById('video-preview-xy786900001').style.display = 'block';
    instaSkeleton.style.display = 'none';


    } else {

      loadingElement.style.display = 'none';
      document.getElementById('video-preview-xy786900001').style.display = 'none';
      instaSkeleton.style.display = 'block';
      instaSkeleton.style.removeProperty('animation');
      instaSkeleton.style.removeProperty('backgroundSize');
      instaSkeleton.style.removeProperty('background');

    }
  } catch (error) {
    console.error('Error during fetch:', error);

  }
});







$(document).ready(function () {
  const myInput = $('#video-url');
  const resetButton = $('#clearif');

  resetButton.css('display', 'none');

  myInput.on('input', function () {
    if ($(this).val().trim() !== '') {
      resetButton.css('display', 'block');
    } else {
      resetButton.css('display', 'none');
    }
  });

  resetButton.on('click', function () {
    myInput.val('');
    resetButton.css('display', 'none');
  });
});



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
});

const toolboxbtn = document.getElementById('toolbox-btn');

toolboxbtn.addEventListener('click', function () {
  const updownBtn = document.getElementById('updown'); 
  updownBtn.classList.toggle('fa-caret-up');
  updownBtn.classList.toggle('fa-caret-down');
});



function validateInstagramLink() {
  if (instagramPostLink()) {
    return;
  }

  instagramReelLink();
}



function instagramPostLink() {
  const LinkInput = document.getElementById('video-url');
  const clearif = document.getElementById('fa-xmark');
  const postRegex = /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;;


  LinkInput.addEventListener('input', function () {

    LinkInput.style.border = '';
    clearif.style.color = '';
    LinkInput.placeholder = 'Enter a YouTube link';
    LinkInput.removeAttribute('autocomplete');
  });

  if (postRegex.test(LinkInput.value)) {
    showToast();
    LinkInput.value = '';
    document.getElementById('clearif').style.display = 'none';

    return true;
  }
}



function showToast() {
  const toastContainer = document.getElementById('toastContainer');
  toastContainer.style.display = 'flex';

  setTimeout(() => {
    toastContainer.classList.add('closing')
  }, 2000);
  toastContainer.classList.remove('closing')
}


function instagramReelLink() {
  const LinkInput = document.getElementById('video-url');
  const clearif = document.getElementById('fa-xmark');
  const reelRegex = /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;


  LinkInput.addEventListener('input', function () {

    LinkInput.style.border = '';
    document.getElementById('instaskeleton').classList.remove('invalid');
    clearif.style.color = '';
    LinkInput.placeholder = 'Enter an instagram link';
    LinkInput.removeAttribute('autocomplete');
  });

  if (reelRegex.test(LinkInput.value)) {
    // Valid link
    LinkInput.style.border = '2px solid #7b4bbd';
    document.getElementById('instaskeleton').classList.remove('invalid');
    clearif.style.color = '';
    LinkInput.placeholder = 'Enter an instagram link';
  } else {
    // Invalid link
    LinkInput.style.border = '2px solid red';
    document.getElementById('clearif').style.color = 'red';
    document.getElementById('instaskeleton').classList.add('invalid');
    clearif.style.color = 'red';
    LinkInput.value = '';
    LinkInput.placeholder = 'Enter an valid instagram link';
    LinkInput.setAttribute('autocomplete', 'off');
  }
}



function handleMaximizeClick() {
  const maximizeButton = document.getElementById('maximizePopup');
  if (maximizeButton) {
    const popupscreenmin = document.getElementById('videoModal')
    popupscreenmin.style.width = '100%';
    popupscreenmin.style.height = '100%';
    popupscreenmin.style.borderRadius = '0';
    popupscreenmin.style.animation = '';
    popupscreenmin.style.top = '';
    popupscreenmin.style.left = '';
    const allButtons = document.getElementById('download-section').querySelectorAll('button:nth-child(n)');
    allButtons.forEach((button, index) => {
      allButtons[index].disabled = false;
    });
    document.getElementById('maximizePopup').style.display = 'none';
    document.getElementById('modal-content').style.opacity = '1';
  }
}



document.addEventListener('DOMContentLoaded', function() {
  var currentURL = window.location.pathname;

  if (currentURL === '/home') {

    document.querySelector('.nav-item.home').classList.add('active');
  }

  document.querySelector('.nav-item.home').addEventListener('mouseover', function() {
      this.classList.add('active');
  });

  document.querySelector('.nav-item.home').addEventListener('mouseout', function() {
      this.classList.remove('active');
  });
});

