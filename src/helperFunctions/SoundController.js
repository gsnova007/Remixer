import RNFetchBlob from 'react-native-blob-util';

export function playSound(fileName) {
    const {config, fs} = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;

    var Sound = require('react-native-sound');

    Sound.setCategory('Playback');

    var audio = new Sound(downloads + '/' + fileName + '.mp3', null, error => {
        if (error) {
        console.log('failed to load the sound', error);
        return;
        }
        // if loaded successfully
        audio.play();
        console.log(
        'duration in seconds: ' +
            audio.getDuration() +
            'number of channels: ' +
            audio.getNumberOfChannels(),
        );
    });
    return audio
}
