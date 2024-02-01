const videoForm = document.getElementById('video-form');
const videoUrlInput = document.getElementById('video-url');
const videoPreviewDiv = document.getElementById('video-preview');
const loadingElement = document.getElementById('spinner');
const imgSkeleton = document.getElementById('imgskeleton');
const titleSkeleton = document.getElementById('titleskeleton');

videoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const videoUrl = videoUrlInput.value;

  if (videoUrl) {
    document.getElementById('download-section').style.display = 'none';
    document.getElementById('video-preview').style.display = 'none';
    loadingElement.style.display = 'block';
    imgSkeleton.style.display = 'block';
    titleSkeleton.style.display = 'block';
    imgSkeleton.style.background = 'linear-gradient(45deg, #2C303A 25%, #1E2127 50%, #2C303A 75%)';
    imgSkeleton.style.backgroundSize = '200% 100%';
    imgSkeleton.style.animation = 'loadingSkeleton 1.5s ease-in-out infinite';
    titleSkeleton.style.background = 'linear-gradient(45deg, #2C303A 25%, #1E2127 50%, #2C303A 75%)';
    titleSkeleton.style.backgroundSize = '200% 100%';
    titleSkeleton.style.animation = 'loadingSkeleton 1.5s ease-in-out infinite';

    try {
      const response = await fetch(`/video-info?url=${encodeURIComponent(videoUrl)}`);
      const data = await response.json();

      const thumbnailUrl = data.thumbnail_url;
      const videoTitle = data.title;
      const availableFormats = data.formats;

      const thumbnailImg = document.createElement('img');
      thumbnailImg.id = 'autoheightgen';
      thumbnailImg.src = thumbnailUrl;
      thumbnailImg.alt = 'Video Thumbnail';

      const videoTitleElement = document.createElement('h2');
      videoTitleElement.textContent = videoTitle;
      videoTitleElement.style.overflow = 'hidden';
      videoTitleElement.style.textOverflow = 'ellipsis';
      videoTitleElement.style.whiteSpace = 'nowrap';
      videoTitleElement.style.maxWidth = '100%'; 

      videoPreviewDiv.innerHTML = '';
      videoPreviewDiv.appendChild(thumbnailImg);
      videoPreviewDiv.appendChild(videoTitleElement);

      const downloadSection = document.getElementById('download-section');
      downloadSection.innerHTML = ''; // Clear previous buttons

      availableFormats.forEach((format, index) => {
        const downloadButton = document.createElement('button');
        downloadButton.classList.add('btn', 'col-4', 'download-button');

        downloadButton.setAttribute('id', 'download-button');

        if (format.audioBitrate && format.resolution) {
          downloadButton.textContent = `${format.audioBitrate + 'bit'}/${format.resolution}`;
        } else if (format.audioBitrate) {
          downloadButton.textContent = format.audioBitrate + 'bit/s' || formatNames[format.name] || 'Unknown Audio Format';
        } else {
          downloadButton.textContent = format.resolution || formatNames[format.name] || 'Unknown Video Format';
        }



        if (window.innerWidth <= 5000) {
          function openModal(videoUrl) {
            const modal = document.getElementById('videoModal');
            const videoFrame = document.getElementById('videoFrame');
            const popupTitle = document.getElementById('popupTitle');
            const downbtn = document.getElementById('downbtn');
            const videoRes = document.getElementById('video-resolutions');
            const videoBit = document.getElementById('video-bitrate');



            if (format.resolution === null || format.resolution === undefined) {
              videoRes.textContent = 'Resolution: ' + 'Video Not Available';
            }
            else {
              videoRes.textContent = 'Resolution: ' + format.resolution;
            }
            if (format.audioBitrate === null || format.audioBitrate === undefined) {
              videoBit.textContent = 'Bitrate: ' + 'Audio Not Available';
            }
            else {
              videoBit.textContent = 'Bitrate: ' + format.audioBitrate + 'bit/s';
            }
            popupTitle.textContent = data.title;
            videoFrame.src = format.url;
            



            modal.style.display = 'block';
          }

          // Function to close the modal
          function closeModal() {
            const modal = document.getElementById('videoModal');
            modal.style.display = 'none';
          }


          if (downloadButton) {
            downloadButton.addEventListener('click', function () {
              const videoUrl = format.url;
              openModal(videoUrl);
            });
          }


          // close button
          const closeButton = document.getElementById('closeModalBtn');
          if (closeButton) {
            closeButton.addEventListener('click', function () {
              closeModal();
              const videoFrame = document.getElementById('videoFrame');
              videoFrame.src = "";
            });
          }
        }

        function isDesktopScreen() {
          return window.innerWidth > 1024;
        }

        if (isDesktopScreen()) {

          const minimixeButton = document.getElementById('minimizePopup');
          if (minimixeButton) {
            minimixeButton.addEventListener('click', function () {
              const popupscreenmin = document.getElementById('videoModal');
              popupscreenmin.classList.add('minpopmob', 'minpopdesk');
              popupscreenmin.classList.remove('modal');
              document.getElementById('maximizePopup').style.display = 'flex';
              const minscreenfil = document.createElement('img');
              minscreenfil.src = data.thumbnail_url;
              minscreenfil.id = 'minscreenfil';
              const allButtons = document.getElementById('download-section').querySelectorAll('button:nth-child(n)');
              allButtons.forEach((button, index) => {
                allButtons[index].disabled = true;
              });

              popupscreenmin.appendChild(minscreenfil);

              document.getElementById('modal-content').style.opacity = '0';
            })
          }
        }

        function isMobileScreen() {
          return window.innerWidth <= 1024;
        }

        if (isMobileScreen()) {

          const minimixeButton = document.getElementById('minimizePopup')
          if (minimixeButton) {
            minimixeButton.addEventListener('click', function () {
              const popupscreenmin = document.getElementById('videoModal')
              popupscreenmin.classList.add('minpopmob', 'minpopdesk');
              popupscreenmin.classList.remove('modal');
              document.getElementById('maximizePopup').style.display = 'flex';
              const minscreenfil = document.createElement('img');
              minscreenfil.src = data.thumbnail_url;
              minscreenfil.id = 'minscreenfil';
              const allButtons = document.getElementById('download-section').querySelectorAll('button:nth-child(n)');
              allButtons.forEach((button, index) => {
                allButtons[index].disabled = true;
              });

              popupscreenmin.appendChild(minscreenfil);

              document.getElementById('modal-content').style.opacity = '0';
            })
          }
        }


        downloadButton.title = format.ext === 'weba' ? 'WEBM Audio' : format.ext === 'm4a' ? 'M4A Audio' : `${format.ext}` || 'Unknown Format';



        videoPreviewDiv.appendChild(downloadButton);


        const link = document.createElement('a');
        link.href = format.url;
        link.download = `PRASDownloader||${data.title}||${format.resolution}${format.ext}`;

        // Append the button to the download section
        downloadButton.appendChild(link);
        downloadSection.appendChild(downloadButton);
      });


      // Display the download section
      downloadSection.style.display = 'block';
      document.getElementById('video-preview').style.display = 'flex';
      document.getElementById('imgskeleton').style.display = 'none';
      document.getElementById('titleskeleton').style.display = 'none';

    } catch (error) {
      console.error('error');
      videoPreviewDiv.innerHTML = '';
      document.getElementById('download-section').style.display = 'none';
      document.getElementById('video-preview').style.display = 'none';
      document.getElementById('imgskeleton').style.display = 'block';
      document.getElementById('titleskeleton').style.display = 'block';
      imgSkeleton.style.removeProperty('background');
      imgSkeleton.style.removeProperty('backgroundSize');
      imgSkeleton.style.removeProperty('animation');
      titleSkeleton.style.removeProperty('background');
      titleSkeleton.style.removeProperty('backgroundSize');
      titleSkeleton.style.removeProperty('animation');
      showToast();

      function showToast() {
        const toastContainer = document.getElementById('toastContainer');
        toastContainer.style.display = 'flex';

        setTimeout(() => {
          toastContainer.classList.add('closing')
        }, 2000);
        toastContainer.classList.remove('closing')
      }
    } finally {
      loadingElement.style.display = 'none';
    }
  }
});


//reset button
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



function validateYouTubeLink() {
  const ytLinkInput = document.getElementById('video-url');
  const clearif = document.getElementById('fa-xmark');
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(c\/|channel\/|user\/)?[\w-]+|youtu\.be\/[\w-]+|youtube\.com\/shorts\/[\w-]+)(\?[^&\n]*)?$/;

  ytLinkInput.addEventListener('input', function () {

    ytLinkInput.style.border = '';
    document.getElementById('imgskeleton').classList.remove('invalid');
    document.getElementById('titleskeleton').classList.remove('invalid');
    clearif.style.color = '';
    ytLinkInput.placeholder = 'Enter a youtube link';
    ytLinkInput.removeAttribute('autocomplete');
  });

  if (youtubeRegex.test(ytLinkInput.value)) {
    // Valid link
    ytLinkInput.style.border = '2px solid #7b4bbd';
    document.getElementById('imgskeleton').classList.remove('invalid');
    document.getElementById('titleskeleton').classList.remove('invalid');
    clearif.style.color = '';
    ytLinkInput.placeholder = 'Enter a youtube link';
  } else {
    // Invalid link
    ytLinkInput.style.border = '2px solid red';
    document.getElementById('imgskeleton').classList.add('invalid');
    document.getElementById('titleskeleton').classList.add('invalid');
    clearif.style.color = 'red';
    ytLinkInput.value = '';
    ytLinkInput.placeholder = 'Enter a valid youtube link';
    ytLinkInput.setAttribute('autocomplete', 'off');
  }
}


function isMobileScreen() {
  return window.innerWidth <= 1024;
}

if (isMobileScreen()) {
  function handleMaximizeClick() {
    const maximizeButton = document.getElementById('maximizePopup');
    if (maximizeButton) {
      const popupscreenmin = document.getElementById('videoModal');
      popupscreenmin.classList.add('modal');
      popupscreenmin.classList.remove('minpopmob', 'minpopdesk');
      const allButtons = document.getElementById('download-section').querySelectorAll('button:nth-child(n)');
      allButtons.forEach((button, index) => {
        allButtons[index].disabled = false;
      });
      document.getElementById('maximizePopup').style.display = 'none';
      document.getElementById('modal-content').style.opacity = '1';
    }
  }
}

function isDesktopScreen() {
  return window.innerWidth > 1024;
}

if (isDesktopScreen()) {
  function handleMaximizeClick() {
    const maximizeButton = document.getElementById('maximizePopup');
    if (maximizeButton) {
      const popupscreenmin = document.getElementById('videoModal');
      popupscreenmin.classList.add('modal');
      popupscreenmin.classList.remove('minpopmob', 'minpopdesk');
      const allButtons = document.getElementById('download-section').querySelectorAll('button:nth-child(n)');
      allButtons.forEach((button, index) => {
        allButtons[index].disabled = false;
      });
      document.getElementById('maximizePopup').style.display = 'none';
      document.getElementById('modal-content').style.opacity = '1';
    }
  }

}