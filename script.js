// ==========================================
// TEHALKA MUSIC - COMPLETE SCRIPT
// SEARCH + SHARE + MUSIC PLAYER
// ==========================================


// ==========================================
// SONG SEARCH SYSTEM
// ==========================================

function searchSong() {

  const input =
    document.getElementById("searchInput");

  if (!input) {
    return;
  }

  const searchText =
    input.value.trim().toLowerCase();

  if (searchText === "") {

    alert(
      "Please enter a song name."
    );

    return;
  }


  const songs = [

    {
      names: [
        "kamar kamar",
        "kamar"
      ],
      page: "kamar-kamar.html"
    },

    {
      names: [
        "parindey",
        "parindey song"
      ],
      page: "parindey.html"
    },

    {
      names: [
        "sukoon",
        "sukoon song"
      ],
      page: "sukoon.html"
    },

    {
      names: [
        "chundadi",
        "chundadi song"
      ],
      page: "Chundadi.html"
    },

    {
      names: [
        "patli kamar",
        "patali kamar",
        "patli",
        "patali"
      ],
      page: "patli-kamar.html"
    }

  ];


  for (
    let i = 0;
    i < songs.length;
    i++
  ) {

    const song =
      songs[i];


    for (
      let j = 0;
      j < song.names.length;
      j++
    ) {

      const name =
        song.names[j];


      if (
        name === searchText ||
        name.includes(searchText) ||
        searchText.includes(name)
      ) {

        window.location.href =
          song.page;

        return;

      }

    }

  }


  alert(
    "❌ Song not found.\n\n" +
    "Please try:\n" +
    "Kamar Kamar\n" +
    "Parindey\n" +
    "Sukoon\n" +
    "Chundadi\n" +
    "Patli Kamar"
  );

}


// ==========================================
// WEBSITE SHARE DETAILS
// ==========================================

const websiteUrl =
  "https://tehalkamusic.website/";

const websiteText =
  "🎵 Tehalka Music - Listen and Download Latest Songs";


// ==========================================
// WHATSAPP SHARE
// ==========================================

function shareWhatsApp() {

  const whatsappUrl =
    "https://wa.me/?text=" +
    encodeURIComponent(
      websiteText +
      "\n\n" +
      websiteUrl
    );

  window.open(
    whatsappUrl,
    "_blank"
  );

}


// ==========================================
// INSTAGRAM
// ==========================================

function openInstagram() {

  window.open(
    "https://www.instagram.com/",
    "_blank"
  );

}


// ==========================================
// YOUTUBE
// ==========================================

function openYouTube() {

  window.open(
    "https://www.youtube.com/",
    "_blank"
  );

}


// ==========================================
// MORE SHARE
// ==========================================

function shareWebsite() {

  if (
    navigator.share
  ) {

    navigator.share({

      title:
        "Tehalka Music",

      text:
        websiteText,

      url:
        websiteUrl

    })
    .catch(
      function(error) {

        console.log(
          "Share cancelled:",
          error
        );

      }
    );

  }

  else {

    copyWebsiteLink();

  }

}


// ==========================================
// COPY WEBSITE LINK
// ==========================================

function copyWebsiteLink() {

  if (
    navigator.clipboard
  ) {

    navigator.clipboard
      .writeText(
        websiteUrl
      )
      .then(
        function() {

          alert(
            "✅ Tehalka Music website link copied!"
          );

        }
      )
      .catch(
        function() {

          alert(
            "Please copy this link manually:\n" +
            websiteUrl
          );

        }
      );

  }

  else {

    alert(
      "Please copy this link manually:\n" +
      websiteUrl
    );

  }

}


// ==========================================
// PROFESSIONAL MUSIC PLAYER
// ==========================================

let musicPlayerSongs = [];

let currentSongIndex = -1;

let playerAudio = null;

let playerSongName = null;

let playerArtistName = null;

let playerPlayPause = null;

let playerProgress = null;


// ==========================================
// CREATE MUSIC PLAYER
// ==========================================

function createMusicPlayer() {

  if (
    document.getElementById(
      "musicPlayer"
    )
  ) {

    return;

  }


  const player =
    document.createElement(
      "div"
    );


  player.id =
    "musicPlayer";


  player.innerHTML = `

    <div
      class="music-player-progress"
    >

      <div
        id="playerProgress"
      ></div>

    </div>


    <div
      class="music-player-inner"
    >

      <div
        class="music-player-info"
      >

        <div
          id="playerSongName"
        >
          Select a song
        </div>


        <div
          id="playerArtistName"
        >
          Tehalka Music
        </div>

      </div>


      <div
        class="music-player-controls"
      >

        <button
          type="button"
          id="playerPrevious"
          aria-label="Previous song"
        >
          ⏮
        </button>


        <button
          type="button"
          id="playerPlayPause"
          aria-label="Play or pause"
        >
          ▶️
        </button>


        <button
          type="button"
          id="playerNext"
          aria-label="Next song"
        >
          ⏭
        </button>

      </div>

    </div>


    <audio
      id="playerAudio"
      preload="metadata"
    ></audio>

  `;


  document.body.appendChild(
    player
  );


  playerAudio =
    document.getElementById(
      "playerAudio"
    );


  playerSongName =
    document.getElementById(
      "playerSongName"
    );


  playerArtistName =
    document.getElementById(
      "playerArtistName"
    );


  playerPlayPause =
    document.getElementById(
      "playerPlayPause"
    );


  playerProgress =
    document.getElementById(
      "playerProgress"
    );


  setupMusicPlayerEvents();

}


// ==========================================
// FIND SONGS ON CURRENT PAGE
// ==========================================

function setupMusicPlayerSongs() {

  musicPlayerSongs = [];


  const audioElements =
    document.querySelectorAll(
      ".song-card audio, .album-song audio, .artist-song audio"
    );


  audioElements.forEach(
    function(audio) {


      const card =
        audio.closest(
          ".song-card, .album-song, .artist-song"
        );


      if (!card) {
        return;
      }


      const source =
        audio.querySelector(
          "source"
        );


      if (!source) {
        return;
      }


      const songNameElement =
        card.querySelector(
          "h2, h3, strong"
        );


      const artistElement =
        card.querySelector(
          "p strong"
        );


      musicPlayerSongs.push({

        audio:
          audio,

        mp3:
          source.src,

        name:
          songNameElement
            ? songNameElement.textContent.trim()
            : "Unknown Song",

        artist:
          artistElement
            ? artistElement.textContent.trim()
            : "Tehalka Music"

      });


      audio.addEventListener(
        "play",
        function() {

          playSongInPlayer(
            musicPlayerSongs.length - 1
          );

        }
      );


    }
  );

}


// ==========================================
// PLAY SONG IN PLAYER
// ==========================================

function playSongInPlayer(
  index
) {

  if (
    !musicPlayerSongs[index]
  ) {

    return;

  }


  currentSongIndex =
    index;


  const song =
    musicPlayerSongs[index];


  playerAudio.src =
    song.mp3;


  playerSongName.textContent =
    song.name;


  playerArtistName.textContent =
    song.artist;


  playerAudio.play()
    .then(
      function() {

        playerPlayPause.textContent =
          "⏸️";

      }
    )
    .catch(
      function() {

        playerPlayPause.textContent =
          "▶️";

      }
    );

}


// ==========================================
// PLAYER EVENTS
// ==========================================

function setupMusicPlayerEvents() {


  playerPlayPause.addEventListener(
    "click",
    function() {


      if (
        !playerAudio.src
      ) {

        if (
          musicPlayerSongs.length > 0
        ) {

          playSongInPlayer(0);

        }

        return;

      }


      if (
        playerAudio.paused
      ) {

        playerAudio.play();

        playerPlayPause.textContent =
          "⏸️";

      }

      else {

        playerAudio.pause();

        playerPlayPause.textContent =
          "▶️";

      }

    }
  );


  document
    .getElementById(
      "playerPrevious"
    )
    .addEventListener(
      "click",
      function() {


        if (
          musicPlayerSongs.length === 0
        ) {

          return;

        }


        let previousIndex =
          currentSongIndex - 1;


        if (
          previousIndex < 0
        ) {

          previousIndex =
            musicPlayerSongs.length - 1;

        }


        playSongInPlayer(
          previousIndex
        );

      }
    );


  document
    .getElementById(
      "playerNext"
    )
    .addEventListener(
      "click",
      function() {


        if (
          musicPlayerSongs.length === 0
        ) {

          return;

        }


        let nextIndex =
          currentSongIndex + 1;


        if (
          nextIndex >=
          musicPlayerSongs.length
        ) {

          nextIndex = 0;

        }


        playSongInPlayer(
          nextIndex
        );

      }
    );


  playerAudio.addEventListener(
    "timeupdate",
    function() {


      if (
        !playerAudio.duration
      ) {

        return;

      }


      const percentage =

        (
          playerAudio.currentTime /
          playerAudio.duration
        ) * 100;


      playerProgress.style.width =
        percentage + "%";

    }
  );


  playerAudio.addEventListener(
    "play",
    function() {

      playerPlayPause.textContent =
        "⏸️";

    }
  );


  playerAudio.addEventListener(
    "pause",
    function() {

      playerPlayPause.textContent =
        "▶️";

    }
  );


  playerAudio.addEventListener(
    "ended",
    function() {


      let nextIndex =
        currentSongIndex + 1;


      if (
        nextIndex >=
        musicPlayerSongs.length
      ) {

        nextIndex = 0;

      }


      playSongInPlayer(
        nextIndex
      );

    }
  );

}


// ==========================================
// ENTER KEY SEARCH
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {


    createMusicPlayer();


    setupMusicPlayerSongs();


    const searchInput =
      document.getElementById(
        "searchInput"
      );


    const searchButton =
      document.querySelector(
        ".search-box button"
      );


    if (
      searchInput
    ) {

      searchInput.addEventListener(
        "keydown",
        function(event) {


          if (
            event.key === "Enter"
          ) {

            event.preventDefault();

            searchSong();

          }

        }
      );

    }


    if (
      searchButton
    ) {

      searchButton.addEventListener(
        "click",
        function(event) {


          event.preventDefault();

          searchSong();

        }
      );

    }

  }
);
