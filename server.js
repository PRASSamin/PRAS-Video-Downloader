import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import session from 'express-session';
import axios from 'axios';
import fetch from 'node-fetch';
import requestIp from 'request-ip';
import ipinfo from 'ipinfo';
import createMemoryStore from 'memorystore';
import bodyParser from 'body-parser';



const MemoryStore = createMemoryStore(session);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore(),
  cookie: { maxAge: 86400000 } 
}));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


/* temporary disable */


// const debounce = (func, delay) => {
//   let timeoutId;
//   return (...args) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func(...args), delay);
//   };
// };

// const debouncedWriteToJson = debounce(writeToJson, 1000);

// app.use(async (req, _, next) => {
//   const clientIp = req.clientIp;

//   try {
//     const ipInfo = await ipinfo(clientIp);

//     const combinedInfo = {
//       IP: ipInfo.ip,
//       Geolocation: ipInfo.city + ', ' + ipInfo.region + ', ' + ipInfo.country,
//       ISP: ipInfo.org,
//       TimeZone: ipInfo.timezone,
//       MainTimestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),    
//       UserTimestamp: new Date().toLocaleString('en-US', { timeZone: ipInfo.timezone }),    
//     };

//     console.log('Combined Info:', combinedInfo);

//     debouncedWriteToJson(combinedInfo);
//   } catch (error) {
//     console.error('Error capturing IP and geolocation:', error);
//   }

//   next();
// });


// function writeToJson(data) {
//   const jsonFilePath = path.join(__dirname, 'logs/logs.json');

//   try {
//     const existingData = fs.existsSync(jsonFilePath)
//       ? JSON.parse(fs.readFileSync(jsonFilePath))
//       : [];

//     existingData.push(data);

//     fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));

//     console.log('JSON record written successfully.');
//   } catch (error) {
//     if (error instanceof SyntaxError) {

//       console.error('Error parsing or reading JSON data:', error);
//       console.log('Initializing with new data...');

//       fs.writeFileSync(jsonFilePath, JSON.stringify([data], null, 2));

//       console.log('JSON record written successfully.');
//     } else {
//       console.error('Error writing JSON record:', error);
//     }
//   }
// }










const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const debouncedWriteToJson = debounce(writeToJson, 1000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/submit", async (req, res, next) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is missing." });
    }

    // Capture user IP and geolocation when submitting a link
    // const clientIp = req.clientIp;

    try {
      console.log('IP tracker is paused')
    //   const ipInfo = await ipinfo(clientIp, { token: 'YOUR_TOKEN' });

    //   const newRequestInsta = {
    //     IP: ipInfo.ip,
    //     Geolocation: ipInfo.city + ', ' + ipInfo.region + ', ' + ipInfo.country,
    //     ISP: ipInfo.org,
    //     TimeZone: ipInfo.timezone,
    //     MainTimestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
    //     UserTimestamp: new Date().toLocaleString('en-US', { timeZone: ipInfo.timezone }),
    //     RequestedURL: url,
    //   };

    //   console.log('New Request For Instagram:', newRequestInsta);

    //   req.capturedInfo = newRequestInsta;

    //   debouncedWriteToJson(newRequestInsta);
    } catch (error) {
      console.error('Error capturing IP and geolocation:', error);
    }

    next();
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


function writeToJson(data) {
  const jsonFilePath = path.join(__dirname, 'logs/Instagram-logs.json');

  try {
    const existingData = fs.existsSync(jsonFilePath)
      ? JSON.parse(fs.readFileSync(jsonFilePath))
      : [];

    existingData.push(data);

    fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));

    console.log('JSON record for Instagram video written successfully.');
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Error parsing or reading JSON data:', error);
      console.log('Initializing Instagram logs with new data...');

      fs.writeFileSync(jsonFilePath, JSON.stringify([data], null, 2));

      console.log('JSON record for Instagram video written successfully.');
    } else {
      console.error('Error writing JSON record for Instagram video:', error);
    }
  }
}












// const captureRequestInfo = async (req) => {
//   const clientIp = req.clientIp;

//   try {
//     const ipInfo = await ipinfo(clientIp, { token: 'YOUR_TOKEN' });

//     return {
//       IP: ipInfo.ip,
//       Geolocation: ipInfo.city + ', ' + ipInfo.region + ', ' + ipInfo.country,
//       ISP: ipInfo.org,
//       TimeZone: ipInfo.timezone,
//       MainTimestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
//       UserTimestamp: new Date().toLocaleString('en-US', { timeZone: ipInfo.timezone }),
//       RequestedURL: req.query.url,
//     };
//   } catch (error) {
//     console.error('Error capturing IP and geolocation:', error);
//     return {};
//   }
// };

const handleYouTubeRequest = async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send('Video URL is required.');
  }

    try {

      // const youtubeRequestInfo = await captureRequestInfo(req);

      const info = await ytdl.getInfo(videoUrl);

      console.log ('New Request For YouTube:', videoUrl);

      const videoInfo = {
        title: info.videoDetails.title,
        thumbnail_url: info.videoDetails.thumbnails[0].url,
        formats: info.formats.map(format => ({
          url: format.url,
          resolution: format.qualityLabel,
          ext: format.audioQuality === 'AUDIO_QUALITY_LOW' ? 'weba' : format.audioQuality === 'AUDIO_QUALITY_MEDIUM' ? 'm4a' : format.container,
          audioBitrate: format.audioBitrate,
          isMute: format.audioBitrate === null
        }))
      };

      const newREquestYT = { /*...youtubeRequestInfo,*/ ...videoInfo};

      debouncedWriteYTToJson(newREquestYT);

      req.session.videoInfo = videoInfo;



      
      res.json(newREquestYT);
      
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the video information.');
    }
};

app.get('/video-info', handleYouTubeRequest);


const debounceYT = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const debouncedWriteYTToJson = debounceYT(writeToJsonYT, 1000);

function writeToJsonYT(data) {
  const jsonFilePath = path.join(__dirname, 'logs/YouTube-logs.json');

  try {
    const existingData = fs.existsSync(jsonFilePath)
      ? JSON.parse(fs.readFileSync(jsonFilePath))
      : [];

    existingData.push(data);

    fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));

    console.log('JSON record for YouTube video written successfully.');
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Error parsing or reading JSON data:', error);
      console.log('Initializing YouTube logs with new data...');

      fs.writeFileSync(jsonFilePath, JSON.stringify([data], null, 2));

      console.log('JSON record for YouTube video written successfully.');
    } else {
      console.error('Error writing JSON record for YouTube video:', error);
    }
  }
}





app.post("/submit", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is missing." });
    }

    const response = await fetch(`http://localhost:3000/api/video?url=${encodeURIComponent(url)}`);

    const data = await response.json();

    const instaVideoInfo = {
      filename: data.data.filename,
      width: data.data.width,
      height: data.data.height,
      videoUrl: data.data.videoUrl,
      displayUrl: data.data.displayUrl,
      userName: data.data.userName,
      id: data.data.id,
    };

    // Save instaVideoInfo in session
    req.session.instaVideoInfo = instaVideoInfo;


    res.json(instaVideoInfo);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})





app.get('/downloadinsta', async (req, res) => {
  try {
    const instaVideoInfo = req.session.instaVideoInfo;

    if (!instaVideoInfo || !instaVideoInfo.videoUrl) {
      console.error('Video information is missing or invalid:', instaVideoInfo);
      return res.status(400).json({ error: "Video information is missing." });
    }

    const videoUrl = instaVideoInfo.videoUrl;

    // Set headers for the download
    const filename = 'PRASDownloader-' + instaVideoInfo.filename;
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Fetch the video file size
    const responseHead = await axios.head(videoUrl);
    const fileSize = responseHead.headers['content-length'];
    res.setHeader('Content-Length', fileSize);

    // Stream the video directly to the client
    const response = await axios.get(videoUrl, { responseType: 'stream' });
    response.data.pipe(res);

  } catch (error) {
    console.error('Error during download:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});







app.get('/proxy', async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    res.status(400).send('Image URL is missing.');
    return;
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      // Handle non-successful response (e.g., 404, 500, etc.)
      res.status(response.status).send(`Failed to fetch image: ${response.statusText}`);
      return;
    }

    const imageArrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(imageArrayBuffer);

    res.set('Content-Type', response.headers.get('Content-Type'));
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});





// Handle POST request to /download
app.post('/download', async (req, res) => {
  const videoUrl = req.body['video-url'];

  if (!videoUrl) {
    return res.status(400).send('Video URL is required.');
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    const videoStream = ytdl(videoUrl, { quality: videoFormat.quality });
    const audioStream = ytdl(videoUrl, { quality: 'highestaudio' });

    const videoFile = path.join(__dirname, 'temp', 'video.mp4');
    const audioFile = path.join(__dirname, 'temp', 'audio.mp3');
    const videoFileWriter = videoStream.pipe(fs.createWriteStream(videoFile));
    const audioFileWriter = audioStream.pipe(fs.createWriteStream(audioFile));

    await Promise.all([
      new Promise(resolve => videoFileWriter.on('finish', resolve)),
      new Promise(resolve => audioFileWriter.on('finish', resolve))
    ]);

    const mergedFilePath = path.join(__dirname, 'temp', 'merged.mp4');
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(videoFile)
        .input(audioFile)
        .on('end', resolve)
        .on('error', reject)
        .output(mergedFilePath)
        .run();
    });

    res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);

    res.sendFile(mergedFilePath);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while downloading the video.');
  }
});





const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/js')));
app.use(express.static(path.join(__dirname, 'public/img')));
app.use(express.static(path.join(__dirname, 'public/video')));

// Handle requests to the root URL
app.get('/', (req, res) => {
  res.redirect('/home');
});


app.get('/toolbox', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'toolbox.html'));
});

app.get('/tools', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'toolbox.html'));
});

app.get('/tool', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'toolbox.html'));
});


app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});
app.get('/developer', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'developer.html'));
});





app.get('/tool/youtube-downloader', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'youtube-downloader.html'));
});
app.get('/tool/youtube', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'youtube-downloader.html'));
});
app.get('/tool/ytd', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'youtube-downloader.html'));
});
app.get('/toolbox/yt-downloader', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'youtube-downloader.html'));
});
app.get('/tool/yt', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'youtube-downloader.html'));
});
app.get('/youtube-downloader', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'youtube-downloader.html'));
});
app.get('/youtube', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'youtube-downloader.html'));
});
app.get('/ytd', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'youtube-downloader.html'));
});
app.get('/yt-downloader', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'youtube-downloader.html'));
});
app.get('/yt', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'youtube-downloader.html'));
});




app.get('/tool/instagram-downloader', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'instagram-downloader.html'));
});
app.get('/tool/instagram', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'instagram-downloader.html'));
});
app.get('/tool/instad', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'instagram-downloader.html'));
});
app.get('/tool/insta', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'instagram-downloader.html'));
});
app.get('/tool/insta-downloader', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'instagram-downloader.html'));
});
app.get('/instagram-downloader', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'instagram-downloader.html'));
});
app.get('/instagram', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'instagram-downloader.html'));
});
app.get('/instad', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'instagram-downloader.html'));
});
app.get('/insta', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'instagram-downloader.html'));
});
app.get('/insta-downloader', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'instagram-downloader.html'));
});


app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});
