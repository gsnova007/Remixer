import RNFetchBlob from "react-native-blob-util";

export function downloadFile(url,fileName,setProgress,setExist,setDownloading) {
    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    setDownloading(true)
    return config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache : true,
    //   addAndroidDownloads : {
    //     useDownloadManager : false,
    //     notification : false,
        path:  downloads + '/' + fileName + '.mp3',
    //   }
    })
    .fetch('GET', 'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3',{
        'Cache-Control' : 'no-store'
    })
    .progress({ interval: 250 },(received,total)=>{
        console.log('progress',Math.abs(received/total));
        setProgress(received/total*100)
    }).then(
        (res)=>{
            setTimeout(()=>{
                setProgress(100)
                setExist(true)
                setDownloading(false)
            },1500)
            console.log(`sound file`, res.path())
            // try {
            //     // play the file tone.mp3
            //     // SoundPlayer.playSoundFile('tone', 'mp3')
            //     // or play from url
            //     SoundPlayer.playUrl('https://freesound.org/people/NoiseCollector/sounds/75440/download/75440__noisecollector__washington-castlebirds.mp3')
            // } catch (e) {
            //     console.log(`cannot play the sound file`, e)
            // }
        }
    );
}

export function fileExist(fileName,setExist){
    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    RNFetchBlob.fs.exists(downloads + '/' + fileName + '.mp3',)
    .then((exists) => {
        setExist(exists)
        console.log("file exist", exists)
   })
}