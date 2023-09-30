let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.querySelector('.wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.querySelector('.audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img: 'https://pbs.twimg.com/media/F5_1kDvW0AAqwdZ.jpg',
        name: 'La-pio-pio',
        artist: 'Mohbad',
        music: 'music/mohbad_lapio.mp3'
    },
    {
        img: 'https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages112/v4/60/0b/9a/600b9aa9-4bba-7e0b-2936-a6f854a7e4e3/044a40d1-2e70-401f-b64a-e8d2ddf59e94_file_cropped.png/375x375bb.jpg',
        name: 'Beast&Peace',
        artist: 'Mohbad',
        music: 'music/Mohbad_beast.mp3'
    },
    {
        img: 'https://www.the-sun.com/wp-content/uploads/sites/6/2023/09/EP_MOHBAD_BLOG_COMP-1.jpg?strip=all&quality=100&w=1500&h=1000&crop=1',
        name: 'Ask about me',
        artist: 'Mohbad',
        music: 'music/mohbad_ask.mp3'
    },
    {
        img: 'https://metro.co.uk/wp-content/uploads/2023/09/SEI_171387344-a86f-e1694591499540.jpg?quality=90&strip=all&zoom=1&resize=480%2C331',
        name: 'Peace',
        artist: 'Mohbad',
        music: 'music/mohbad_p.mp3'
    },
    {
        img: 'https://metro.co.uk/wp-content/uploads/2023/09/SEI_171387344-a86f-e1694591499540.jpg?quality=90&strip=all&zoom=1&resize=480%2C331',
        name: 'Weekend vibes',
        artist: 'Mohbad',
        music: 'music/mohbad_weekend.mp3'
    },
    {
        img: 'https://f5p3e9e4.stackpathcdn.com/wp-content/uploads/2023/09/Mohbad-4.jpg',
        name: 'Komajesun',
        artist: 'Mohbad ft Naira Marley',
        music: 'music/mobanaira_koma.mp3'
    },
    {
        img: 'https://i0.wp.com/www.six9ja.com/wp-content/uploads/2022/06/Mohbad.webp?fit=644%2C338&ssl=1',
        name: 'Pariwo',
        artist: 'Mohbad ft Bella Shmurda',
        music: 'music/mobadbella.mp3'
    },
    {
        img: 'https://i.ytimg.com/vi/-b6pKbo9Olk/mqdefault.jpg',
        name: 'Ronaldo',
        artist: 'Mohbad',
        music: 'music/mohbad_ronaldo.mp3'
    },
    {
        img:'https://i.ytimg.com/vi/-u4wDuQ-efs/maxresdefault.jpg',
        name: 'kopor_ker',
        artist: 'Mohbad ft Rexxie',
        music: 'music/mohbad_kpk.mp3'
    },
    {
        img:'https://i.ytimg.com/vi/VdY5Gzd54FY/maxresdefault.jpg',
        name: 'Feel good',
        artist: 'Mohbad',
        music: 'music/mohbad_feel.mp3'
    },
    {
        img:'https://tonpeak.com/wp-content/uploads/2023/04/Mohbad-Light-EP-600x470-1.jpg',
        name: 'Sorry',
        artist: 'Mohbad',
        music: 'music/mohbad_sorry.mp3'
    }


    
];
loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a = '#'; // Initialize with '#'

    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate(a);
    let Color2 = populate(a);
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ',' + Color2 + ")";
    document.body.style.background = gradient;
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

// function playpauseTrack() {
//     isPlaying ? pauseTrack() : playTrack();
// }
function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack(); // Add parentheses after playTrack
}


function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fas fa-pause-circle fa-5x"></i>';

    // playpause_btn.innerHTML = '<i class="fa-solid fa-circle-pause fa-5x"></i>';
    console.log("Playing track");
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fas fa-play-circle fa-5x"></i>';

    // playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    console.log("Pausing track");
}

function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        let random_index = Math.floor(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setUpdate() {
    if (!isNaN(curr_track.duration)) {
        let seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = '0' + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = '0' + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = '0' + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = '0' + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    
    
    }
    updateVolume();

}
function updateVolume() {
    let volume = curr_track.volume;
    volume_slider.value = volume * 100;
}

volume_slider.addEventListener('input', function() {
    setVolume();
});

function setVolume() {
    let volume = volume_slider.value / 100;
    curr_track.volume = volume;
}
