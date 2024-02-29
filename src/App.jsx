import { useEffect, useState } from 'react'
import './App.css'
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import { saveAs } from 'file-saver';

import { Button, Dbutton, Header, Inputfile, Inputvideo, Resultimg } from './components';

// Create the FFmpeg instance and load it. log set as 'true' to  enables logging for the FFmpeg library
const ffmpeg = createFFmpeg({log: true});

function App() {
  
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();

  const load = async () =>{
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, []);

  const convertToGif = async () =>{
    // Write the .mp4 to the FFmpeg file system
    ffmpeg.FS("writeFile", "video.mp4", await fetchFile(video));

    // Run the FFmpeg command-line tool, converting the .mp4 to .gif file
    await ffmpeg.run(
      "-i",
      "video.mp4",
      "-t",
      "2.5s",
      "-ss",
      "2.0",
      "-f",
      "gif",
      "output.gif"
    );

    // Read the .gif file back from FFmpeg file system
    const data = ffmpeg.FS("readFile", "output.gif");
    const url = URL.createObjectURL(
      new Blob([data.buffer], {type: "image/gif"})
    );
    setGif(url);
  }

  const download = (e) =>{
    try {
      console.log(e.target.href);
      // Remove the file extension from the video name
      const videoNameWithoutExtension = video.name.split('.').slice(0, -1).join('.');
      saveAs(e.target.href, videoNameWithoutExtension + ".gif");
    } catch (error) {
      console.error(error);
    }
  }


  return {ready} ? (
    <div className='App'>
      <Header />
      {video && <Inputvideo video={video} />}
      <Inputfile setVideo={setVideo} />
      <Button convertToGif={convertToGif} />
      <h1>Result</h1>
      {gif && <Resultimg gif={gif} />}
      {gif && <Dbutton gif={gif} download={download} />}
    </div>
  )
  : <p>Loading...</p>
} 

export default App
