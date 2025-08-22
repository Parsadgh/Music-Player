let flag2 = 1

// songs
const songs = [
    {
        tittle: 'burden',
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
        tittle: 'In the Name of God',
        artist: 'Dream Theater',
        cover: './img/dream.jpeg',
        src: './music/inTheNameOfGod.mp3',
        duration: 854
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
    // Div.dataset.index = i

})



// player
const audio = new Audio()
audio.preload = 'metadata'

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

function loadAndPlay(track) {

    audio.src = track.src
    audio.currentTime = 0;

    // footer
    _cover.src = track.cover
    _title.textContent = track.tittle
    _artist.textContent = track.artist

    _timeDur.textContent = convertTime(track.duration)

    flag2 = 1
    setIconPlay()
}


// click and play
const tracks = document.querySelectorAll('.songs')

tracks.forEach((val, i) => {
    val.addEventListener('click', (e) => {
        const card = e.target
        if (!card) return;
        const track = songs[i]
        loadAndPlay(track)
    })
})

// icon

// update time
audio.addEventListener('timeupdate', () => {
    const p = (audio.currentTime / audio.duration) * 100
    _progressFill.style.width = p + '%'
    _timeNow.textContent = convertTime(audio.currentTime)
});

_progress.addEventListener('click', (e) => {
    const rect = _progress.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = audio.duration * ratio
})

// change volume and mute
volC = document.getElementById('volumeChanger')
vol = document.getElementById('volume')

volC.addEventListener('input', () => {
    x = volC.value

    audio.volume = x / 100
    vol.style.opacity = x + '%'
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
})

// pause 
const _play = document.getElementById('play')
_play.addEventListener('click', (e) => {
    flag++
    setIconPlay()
})

function setIconPlay() {
    // _play.innerHTML = ''
    if (flag % 2 == 0) {
        _play.innerHTML = `
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4ZM18.5 15.126C17.8334 14.7676 17.0002 15.2157 17 15.9326V32.0674C17.0002 32.7843 17.8334 33.2324 18.5 32.874L33.5 24.8066C34.1666 24.4481 34.1666 23.5519 33.5 23.1934L18.5 15.126Z"
                            fill="white" />
                    </svg>

            `
        audio.pause()
        console.log('1');

    } else {
        _play.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4ZM18 15C17.4477 15 17 15.4477 17 16V32C17 32.5523 17.4477 33 18 33H21C21.5523 33 22 32.5523 22 32V16C22 15.4477 21.5523 15 21 15H18ZM27 15C26.4477 15 26 15.4477 26 16V32C26 32.5523 26.4477 33 27 33H30C30.5523 33 31 32.5523 31 32V16C31 15.4477 30.5523 15 30 15H27Z" fill="white"/>
            </svg>
`
        audio.play()

    }
}


