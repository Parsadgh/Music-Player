let audioPlaying

// songs
const songs = [
    {
        tittle: 'Burden',
        artist: 'opeth',
        cover: './img/burden.jpg',
        src: './music/burden.mp3',
        duration: 461
    },

    {
        tittle: 'Flying Whales',
        artist: 'gojira',
        cover: './img/Gojira-Flying-Whales.jpg',
        src: './music/flyingWhales.mp3',
        duration: 464
    },

    {
        tittle: "Sweet Child O'Mine",
        artist: "Guns N' Roses",
        cover: './img/sweetChild.jpg',
        src: './music/sweet_child_o_mine.mp3',
        duration: 356
    },

    {
        tittle: 'Nightmare',
        artist: 'Avenged Sevenfold',
        cover: './img/Nightmare.jpeg',
        src: './music/nightmare.mp3',
        duration: 375
    },

    {
        tittle: 'Born in Winter',
        artist: 'Gojira',
        cover: './img/born.jpeg',
        src: './music/bornInWinter.mp3',
        duration: 230
    },

    {
        tittle: 'Flying',
        artist: 'Anathema',
        cover: './img/flying.jpeg',
        src: './music/flying.mp3',
        duration: 490
    },

    {
        tittle: 'As I Am',
        artist: 'Dream Theater',
        cover: './img/dream.jpeg',
        src: './music/asIAm.mp3',
        duration: 299
    },

    {
        tittle: 'Afterlife',
        artist: 'Avenged Sevenfold',
        cover: './img/a7x.png',
        src: './music/afterlife.mp3',
        duration: 352
    },

    {
        tittle: 'Tornado Of Souls',
        artist: 'Megadeth',
        cover: './img/tor.jpeg',
        src: './music/tornado.mp3',
        duration: 319
    },

    {
        tittle: 'Forty Six & 2',
        artist: 'TOOL',
        cover: './img/tool.jpeg',
        src: './music/tool.mp3',
        duration: 364
    },

    {
        tittle: 'Kill The Pain',
        artist: 'Accept',
        cover: './img/kill.jpeg',
        src: './music/kill.mp3',
        duration: 347
    },

    {
        tittle: 'one',
        artist: 'Metallica',
        cover: './img/one.jpeg',
        src: './music/one.mp3',
        duration: 447
    },
]

let songPlayingNum = 0
let songPlaying = songs[0]


// add songs to html
const grid = document.getElementById('tredndingSongs')
songs.map((val, i) => {
    let Div = document.createElement('div')
    Div.classList.add('songs')
    Div.innerHTML = `
        <!-- cover -->
            <div class="aspect-square bg-[url('${val.cover}')] bg-cover bg-center"></div>
            <!-- text -->
            <div class="p-1">
                <div class="font-medium truncate">${val.tittle}</div>
                <div class="text-xs text-white/60">${val.artist}</div>
            </div>
        `
    grid.appendChild(Div)
    Div.dataset.index = i

})



// player
const audio = new Audio()
audio.preload = 'metadata'

audio.src = songPlaying.src

const _cover = document.getElementById('footer-cover');
const _title = document.getElementById('footer-title');
const _artist = document.getElementById('footer-artist');

const _timeNow = document.getElementById('time-now');
const _timeDur = document.getElementById('time-dur');
const _progress = document.getElementById('progress');
const _progressFill = document.getElementById('progress-fill');

function convertTime(sec) {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60).toString().padStart(2, '0')
    return `${m}:${s}`
}

function loadAndPlay(songPlaying) {

    audio.src = songPlaying.src
    audio.currentTime = 0;

    // footer
    _cover.src = songPlaying.cover
    _title.textContent = songPlaying.tittle
    _artist.textContent = songPlaying.artist

    _timeDur.textContent = convertTime(songPlaying.duration)

    flag2 = 1
    setIconPlay()

    ifPlay()
}


// click and play
const tracks = document.querySelectorAll('.songs')

tracks.forEach((val, i) => {
    val.addEventListener('click', (e) => {
        const card = e.target
        if (!card) return;
        songPlaying = songs[i]
        songPlayingNum = i
        _progressFill.style.width = 0
        loadAndPlay(songPlaying)

        ifPlay()
    })
})


// update time
audio.addEventListener('timeupdate', () => {
    const p = (audio.currentTime / audio.duration) * 100
    _progressFill.style.width = p + '%'
    _timeNow.textContent = convertTime(audio.currentTime)

    // ahang tamom shod boro badi
    if (_timeNow.innerText == _timeDur.innerText){
        if (repeat){
            console.log('lksjdflsjkldf');
            songPlaying = songs[songPlayingNum]
            loadAndPlay(songPlaying)
        }else{
            nextSong()
        }
    }

    ifPlay()
});

_progress.addEventListener('click', (e) => {
    const rect = _progress.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = audio.duration * ratio

    ifPlay()
})

// change volume and mute
volC = document.getElementById('volumeChanger')
vol = document.getElementById('volume')

volC.addEventListener('input', () => {
    x = volC.value

    audio.volume = x / 100
    vol.style.opacity = x + '%'

    ifPlay()
})


flag = 1
vol.addEventListener('click', () => {
    if (flag % 2) {
        audio.volume = 0
        y = volC.value
        volC.value = 0

    } else {
        audio.volume = y / 100
        volC.value = y
    }
    flag++

    ifPlay()
})

// pause and play
const _play = document.getElementById('play')

_play.addEventListener('click', (e) => {

    setIconPlay()

    ifPlay()
})


function playBut() {
    _play.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4ZM18 15C17.4477 15 17 15.4477 17 16V32C17 32.5523 17.4477 33 18 33H21C21.5523 33 22 32.5523 22 32V16C22 15.4477 21.5523 15 21 15H18ZM27 15C26.4477 15 26 15.4477 26 16V32C26 32.5523 26.4477 33 27 33H30C30.5523 33 31 32.5523 31 32V16C31 15.4477 30.5523 15 30 15H27Z" fill="white"/>
            </svg>
            `
}

function pauseBut() {
    _play.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4ZM18.5 15.126C17.8334 14.7676 17.0002 15.2157 17 15.9326V32.0674C17.0002 32.7843 17.8334 33.2324 18.5 32.874L33.5 24.8066C34.1666 24.4481 34.1666 23.5519 33.5 23.1934L18.5 15.126Z" fill="white" />
            </svg>
            `
}

function setIconPlay() {
    if (songPlaying == true) {
        pauseBut()
        audio.pause()
        songPlaying = false
    } else {
        playBut()
        audio.play()
        songPlaying = true
    }

}

// next track va ghabli
const forBtn = document.getElementById('forward')
const backBtn = document.getElementById('backward')

function nextSong() {
    
    if (shufleFlag % 2) {
        j = songPlayingNum

        songPlayingNum = Math.floor(Math.random() * 12);
        if (songPlayingNum == j) {
            songPlayingNum = j
            nextSong()
        }

        songPlaying = songs[songPlayingNum]
        loadAndPlay(songPlaying)
    } else {
        if (songPlayingNum == 11) {
            songPlayingNum = 0
            songPlaying = songs[songPlayingNum]
            loadAndPlay(songPlaying)

        } else {
            songPlayingNum++
            songPlaying = songs[songPlayingNum]
            loadAndPlay(songPlaying)
        }
    }
}

function backSong() {
    if (shufleFlag % 2) {
        j = songPlayingNum

        songPlayingNum = Math.floor(Math.random() * 12);
        if (songPlayingNum == j) {
            songPlayingNum = j
            backSong()
        }


        songPlaying = songs[songPlayingNum]
        loadAndPlay(songPlaying)
    } else {
        if (songPlayingNum == 0) {
            songPlayingNum = 11
            songPlaying = songs[songPlayingNum]
            loadAndPlay(songPlaying)

        } else {
            songPlayingNum--
            songPlaying = songs[songPlayingNum]
            loadAndPlay(songPlaying)
        }
    }
}


forBtn.addEventListener('click', () => {
    nextSong()

    ifPlay()
})

backBtn.addEventListener('click', () => {
    backSong()

    ifPlay()
})

// shufle
const shufleBtn = document.getElementById('shufle')

let shufleFlag = 0
shufleBtn.addEventListener('click', () => {

    if (shufleFlag % 2 != 1) {
        shufleBtn.innerHTML = `
    <svg id="shufle" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
    d="M21.4708 7.31952C21.0448 7.74555 21.0448 8.43627 21.4708 8.8623L22.1566 9.54813H19.8151C18.3733 9.54813 17.0016 10.215 16.0522 11.3776L7.94266 21.3076C7.37299 22.0052 6.55001 22.4053 5.68493 22.4053H5V24.5481H5.68493C7.12674 24.5481 8.49837 23.8813 9.44781 22.7187L17.5573 12.7887C18.127 12.0911 18.95 11.691 19.8151 11.691H22.4991L21.4708 12.7192C21.0448 13.1453 21.0448 13.836 21.4708 14.262C21.8968 14.688 22.5876 14.688 23.0136 14.262L26.1313 11.1443C26.3265 10.9491 26.3265 10.6325 26.1313 10.4372L23.0136 7.31952C22.5876 6.89349 21.8968 6.89349 21.4708 7.31952ZM6.36879 8.54813C7.76049 8.54813 9.08446 9.19407 10.0009 10.3202L12.4531 13.1728L11 14.5481L8.54806 11.687C7.9982 11.0113 7.20381 10.6238 6.36879 10.6238H5.00043V8.54813H6.36879ZM16.3284 20.7761C17.2449 21.9022 18.5688 22.5481 19.9605 22.5481H22.6419L21.4708 23.7192C21.0448 24.1453 21.0448 24.836 21.4708 25.262C21.8968 25.688 22.5876 25.688 23.0136 25.262L26.1313 22.1443C26.3265 21.9491 26.3265 21.6325 26.1313 21.4372L23.0136 18.3195C22.5876 17.8935 21.8968 17.8935 21.4708 18.3195C21.0448 18.7455 21.0448 19.4363 21.4708 19.8623L22.081 20.4725H19.9605C19.1255 20.4725 18.3311 20.0849 17.7813 19.4093L16 17.0481L14.5 18.5481L16.3284 20.7761Z"
    fill="#1DB954"/>
    </svg>
    `
    } else {
        shufleBtn.innerHTML = `
        <svg id="shufle" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
            d="M21.4708 7.31952C21.0448 7.74555 21.0448 8.43627 21.4708 8.8623L22.1566 9.54813H19.8151C18.3733 9.54813 17.0016 10.215 16.0522 11.3776L7.94266 21.3076C7.37299 22.0052 6.55001 22.4053 5.68493 22.4053H5V24.5481H5.68493C7.12674 24.5481 8.49837 23.8813 9.44781 22.7187L17.5573 12.7887C18.127 12.0911 18.95 11.691 19.8151 11.691H22.4991L21.4708 12.7192C21.0448 13.1453 21.0448 13.836 21.4708 14.262C21.8968 14.688 22.5876 14.688 23.0136 14.262L26.1313 11.1443C26.3265 10.9491 26.3265 10.6325 26.1313 10.4372L23.0136 7.31952C22.5876 6.89349 21.8968 6.89349 21.4708 7.31952ZM6.36879 8.54813C7.76049 8.54813 9.08446 9.19407 10.0009 10.3202L12.4531 13.1728L11 14.5481L8.54806 11.687C7.9982 11.0113 7.20381 10.6238 6.36879 10.6238H5.00043V8.54813H6.36879ZM16.3284 20.7761C17.2449 21.9022 18.5688 22.5481 19.9605 22.5481H22.6419L21.4708 23.7192C21.0448 24.1453 21.0448 24.836 21.4708 25.262C21.8968 25.688 22.5876 25.688 23.0136 25.262L26.1313 22.1443C26.3265 21.9491 26.3265 21.6325 26.1313 21.4372L23.0136 18.3195C22.5876 17.8935 21.8968 17.8935 21.4708 18.3195C21.0448 18.7455 21.0448 19.4363 21.4708 19.8623L22.081 20.4725H19.9605C19.1255 20.4725 18.3311 20.0849 17.7813 19.4093L16 17.0481L14.5 18.5481L16.3284 20.7761Z"
            fill="#BABABA" />
        </svg>
        `
    }
    shufleFlag++

    ifPlay()
})

// know if audio in playing or not
function ifPlay() {
    if (!audio.paused) {
        audioPlaying = true
    } else {
        audioPlaying = false
    }
    console.log(audioPlaying);
}

// repeat
repeatBtn = document.getElementById('repeat')

let repeat = false
let repeatFlag = 0

repeatBtn.addEventListener('click', () => {

    if (shufleFlag % 2 != 1) {
        repeatBtn.innerHTML = `
    <svg id="repeat" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M22 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20H12V22H10C7.79086 22 6 20.2091 6 18V10C6 7.79086 7.79086 6 10 6H22C24.2091 6 26 7.79086 26 10V18C26 20.2091 24.2091 22 22 22H18.843L20.0141 23.1711C20.4401 23.5971 20.4401 24.2879 20.0141 24.7139C19.588 25.1399 18.8973 25.1399 18.4713 24.7139L15.3536 21.5962C15.1583 21.4009 15.1583 21.0843 15.3536 20.8891L18.4713 17.7714C18.8973 17.3454 19.588 17.3454 20.0141 17.7714C20.4401 18.1974 20.4401 18.8881 20.0141 19.3142L19.3282 20H22C23.1046 20 24 19.1046 24 18V10C24 8.89543 23.1046 8 22 8Z"
                            fill="#1DB954" />
                    </svg>
    `
    repeat = true

    } else {
        repeatBtn.innerHTML = `
        <svg id="repeat" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M22 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20H12V22H10C7.79086 22 6 20.2091 6 18V10C6 7.79086 7.79086 6 10 6H22C24.2091 6 26 7.79086 26 10V18C26 20.2091 24.2091 22 22 22H18.843L20.0141 23.1711C20.4401 23.5971 20.4401 24.2879 20.0141 24.7139C19.588 25.1399 18.8973 25.1399 18.4713 24.7139L15.3536 21.5962C15.1583 21.4009 15.1583 21.0843 15.3536 20.8891L18.4713 17.7714C18.8973 17.3454 19.588 17.3454 20.0141 17.7714C20.4401 18.1974 20.4401 18.8881 20.0141 19.3142L19.3282 20H22C23.1046 20 24 19.1046 24 18V10C24 8.89543 23.1046 8 22 8Z"
                            fill="#BABABA" />
                    </svg>
        `
        repeat = false
    }

    shufleFlag++

})
