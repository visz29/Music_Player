

function searchLocalSongs(songList,songs,value) {
    let tempSong;
    if (value != '') {

            tempSong = songs.filter((a) => {
                // console.log(a.blob.name);
                let lowerCaseValue = value.toLowerCase()
                let songName = a.blob.name
                songName = songName.toLowerCase()
                // console.log(songName);
                
                // console.log(songName.includes(value));
                if(songName.includes(lowerCaseValue) == true){
                    return a
                }
            })
            
        
    } else {
        tempSong = songList
    }

    // console.log(tempSong);
    return tempSong
  
}

export default searchLocalSongs