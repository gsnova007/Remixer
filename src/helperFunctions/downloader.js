import { PermissionsAndroid } from "react-native";
import RNFetchBlob from "react-native-blob-util";

export const requestToPermissions = async (fileName,setProgress,setExist,setDownloading) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Music',
          message:
            'App needs access to your Files... ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile(fileName, setProgress, setExist, setDownloading)
      }
    } catch (err) {
    //   console.log(err);
    }
  };

export function downloadFile(fileName,setProgress,setExist,setDownloading) {
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