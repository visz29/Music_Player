import React from 'react'

function sortSongs(type, reverse, songs) {
    console.log("sort Songs");
    // console.log(type, reverse, songs);
    let returnValue = "";

    if (type == 'Title') {

        if (reverse == false) {

            songs.sort((a, b) => {
                let titleA = a.blob.name.toUpperCase()
                let titleB = b.blob.name.toUpperCase()
                // console.log(a.blob.name);

                if (titleA < titleB) {
                    return -1
                }

                if (titleA > titleB) {
                    return 1
                }

                return 0
            })
        } else {
            songs.sort((a, b) => {
                let titleA = a.blob.name.toUpperCase()
                let titleB = b.blob.name.toUpperCase()
                // console.log(a);

                if (titleA < titleB) {
                    return 1
                }

                if (titleA > titleB) {
                    return -1
                }

                return 0
            })
        }

    } else if (type == 'Year') {

        if (reverse == false) {

            // arr.sort((a,b) =>  a.year - b.year)
            songs.sort((a, b) => {
                
                 return a.year - b.year; // Descending order
                
            })
            
        } else {
            songs.sort((a, b) => {
                 return  b.year - a.year;  // Descending order
                
            })
        }
    } else if (type == 'Size') {

        if (reverse == false) {

            // arr.sort((a,b) =>  a.year - b.year)
            songs.sort((a, b) => {
                 return a.blob.size - b.blob.size; // Descending order
                
            })
            
        } else {
            songs.sort((a, b) => {
                
                 return b.blob.size - a.blob.size; // Descending order
                
            })
        }
    } else if (type == 'Date Added') {

        if (reverse == false) {
            songs.sort((a, b) => {
                
                 return a.blob.lastModified - b.blob.lastModified; // Descending order
                
            })
        } else {
            songs.sort((a, b) => {
                
                 return b.blob.lastModified - a.blob.lastModified; // Descending order
                
            })
        }
    } else if (type == 'Folder') {

        if (reverse == false) {
            songs.sort((a, b) => {
                // console.log((a.name).slice(0,(a.name).indexOf('/')));
                let titleA = (a.name).slice(0,(a.name).indexOf('/')).toUpperCase()
                let titleB = (b.name).slice(0,(b.name).indexOf('/')).toUpperCase()
                // console.log(a);

                if (titleA < titleB) {
                    return 1
                }

                if (titleA > titleB) {
                    return -1
                }

                return 0
                
            })
        } else {
            songs.sort((a, b) => {
                let titleA = (a.name).slice(0,(a.name).indexOf('/')).toUpperCase()
                let titleB = (b.name).slice(0,(b.name).indexOf('/')).toUpperCase()
                // console.log(a);

                if (titleB < titleA) {
                    return 1
                }

                if (titleB > titleA) {
                    return -1
                }

                return 0
                
            })
        }
    } else if (type == 'Album') {

        if (reverse == false) {
            songs.sort((a, b) => {
                console.log(a.album);
                let titleA = a.album
                let titleB = b.album
                // // console.log(a);

                if (titleB < titleA) {
                    return 1
                }

                if (titleB > titleA) {
                    return -1
                }

                return 0
                
            })
        } else {
            songs.sort((a, b) => {
                let titleA = a.album
                let titleB = b.album
                // // console.log(a);

                if (titleA < titleB) {
                    return 1
                }

                if (titleA > titleB) {
                    return -1
                }

                return 0
                
            })
        }
    } else if (type == 'Artist') {

        if (reverse == false) {
            songs.sort((a, b) => {
                console.log(a.artist);
                let titleA = a.artist
                let titleB = b.artist
                // // console.log(a);

                if (titleB < titleA) {
                    return 1
                }

                if (titleB > titleA) {
                    return -1
                }

                return 0
                
            })
        } else {
            songs.sort((a, b) => {
                let titleA = a.artist
                let titleB = b.artist
                // // console.log(a);

                if (titleA < titleB) {
                    return 1
                }

                if (titleA > titleB) {
                    return -1
                }

                return 0
                
            })
        }
    } else if (type == 'Genre') {

        if (reverse == false) {
            songs.sort((a, b) => {
                // console.log(a.artist);
                let titleA = a.genre
                let titleB = b.genre
                // console.log(a.genre);

                if (titleB < titleA) {
                    return 1
                }

                if (titleB > titleA) {
                    return -1
                }

                return 0
                
            })
        } else {
            songs.sort((a, b) => {
                let titleA = a.genre
                let titleB = b.genre
                // console.log(a.genre);

                if (titleA < titleB) {
                    return 1
                }

                if (titleA > titleB) {
                    return -1
                }

                return 0
                
            })
        }
    }
    // console.log(songs);



return songs

}

export default sortSongs