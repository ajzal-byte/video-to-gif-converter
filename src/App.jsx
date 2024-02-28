import { useEffect, useState } from 'react'
import './App.css'
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import { saveAs } from 'file-saver';

import { Button, Dbutton, Header, Inputfile, Inputvideo, Resultimg } from './components';

const ffmpeg = createFFmpeg({log: true});

function App() {
  
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();

  const load = async () =>{
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, []);


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
