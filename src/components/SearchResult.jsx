import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { playerContext } from '../context/PlayerContext.jsx';
import axios from 'axios';
import music_sybol from '../assets/music_symbole.svg';
import { you_tube_history } from '../utils/history.js';

function SearchResult(arr) {


    let cosntext = useContext(playerContext)


    let [resultArray, setResultArray] = useState([])
    let [clickedMusic, setClickedMusic] = useState(null)

    let [err, setErr] = useState("hi there")




    async function getSong(e, f) {
        you_tube_history()
        // console.log(e,f);
        cosntext.setPlayingSong({
            channelTitle: ".......",
            songTitle: "....................",
            thumbnail: music_sybol,
            songUrl: "audioBase64Url",
            loading: true,
        })

        try {


            const url = `https://www.youtube.com/watch?v=${e.target.id}`;

            const res = await axios.get(`/music?url=${url}`);
            setErr(res.data.url)



            const audioRes = await axios.get(res.data.url, {
                responseType: 'arraybuffer' // Important for binary data
            });

            setErr(audioRes.statusText)
            console.log(audioRes.statusText)


            // Convert buffer to base64
            const base64Audio = btoa(
                new Uint8Array(audioRes.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

            // Optional: add MIME type

            const audioBase64Url = `data:audio/mpeg;base64,${base64Audio}`;
            // console.log(audioBase64Url);
            setErr(f.snippet.thumbnails.high.url, " <=> ", f.snippet.title)
            console.log(f.snippet.thumbnails.high.url, " <=> ", f.snippet.title);


            cosntext.setPlayingSong({
                channelTitle: f.snippet.channelTitle,
                songTitle: f.snippet.title,
                thumbnail: f.snippet.thumbnails.high.url,
                songUrl: audioBase64Url,
                loading: false,
                status: true,
            })
            // cosntext.setPlayingSong(prev => ({...prev,songUrl:audioBase64Url}))

        } catch (err) {
            console.log("mt Error", err);

        }
    }

    useEffect(() => {
        setResultArray(cosntext.resultArray)

    }, [cosntext])
    return (
        <div className=' h-135 w-full border-2 border-white/0 overflow-scroll pb-2 flex-col'>
            {/* <div className="h-20 w-full flex justify-center items-center  ">
        <h1 className='text-wrap text-xs'>{err}</h1>
        <img src={err} alt="not found" />
        <audio className='z-20 w-full h-20 bg-red-500 border-2 border-amber-500' src=""></audio>
        </div> */}

            {resultArray.map((e) => {

                return (
                    <div onClick={(f) => {
                        getSong(f, e)

                    }} className={`flex-row flex  bg-white/10  rounded-r-2xl rounded-l-xl pt-1 pb-1 mt-1 overflow-hidden`} id={e.id.videoId} key={e.id.videoId}>
                        <img id={e.id.videoId} className='h-20 pointer-events-none' src={e.snippet.thumbnails.high.url} alt="not reach" />
                        <h4 className='flex justify-center items-center pointer-events-none'>
                            {e.snippet.title}
                        </h4>
                    </div>)

            })}
        </div>
    )
}

export default SearchResult