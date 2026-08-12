// ==========================================
// TEHALKA MUSIC - COMPLETE SCRIPT
// SEARCH + SHARE + WHATSAPP + COPY + MUSIC PLAYER
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

    alert("Please enter a song name.");

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
    },

    {
      names: [
        "ghadi"
      ],
      page: "ghadi.html"
    },

    {
      names: [
        "main teri nachai nachun",
        "main teri nachai nachun su"
      ],
      page: "main-teri-nachai-nachun.html"
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
    "Patli Kamar\n" +
    "Ghadi"
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
// GET CURRENT PAGE URL
// ==========================================

function getShareUrl() {

  return window.location.href;

}


// ==========================================
// DIRECT WEBSITE SHARE
// ==========================================

async function shareWebsite() {

  const shareUrl =
    getShareUrl();

  const shareData = {

    title:
      "Tehalka Music",

    text:
      websiteText,

    url:
      shareUrl

  };


  // --------------------------------------
  // NATIVE ANDROID SHARE
  // --------------------------------------

  if (
    navigator.share
  ) {

    try {

      await navigator.share(
        shareData
      );

      return;

    }

    catch (error) {

      console.log(
        "Native share cancelled:",
        error
      );

    }

  }


  // --------------------------------------
  // FALLBACK - COPY LINK
  // --------------------------------------

  copyWebsiteLink();

}


// ==========================================
// WHATSAPP SHARE
// ==========================================

function shareWhatsApp() {

  const shareUrl =
    getShareUrl();


  const message =
    websiteText +
    "\n\n" +
    shareUrl;


  const whatsappUrl =
    "https://wa.me/?text=" +
    encodeURIComponent(
      message
    );


  window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );

}


// ==========================================
// FACEBOOK SHARE
// ==========================================

function shareFacebook() {

  const shareUrl =
    getShareUrl();


  const facebookUrl =
    "https://www.facebook.com/sharer/sharer.php?u=" +
    encodeURIComponent(
      shareUrl
    );


  window.open(
    facebookUrl,
    "_blank",
    "noopener,noreferrer"
  );

}


// ==========================================
// TELEGRAM SHARE
// ==========================================

function shareTelegram() {

  const shareUrl =
    getShareUrl();


  const telegramUrl =
    "https://t.me/share/url?url=" +
    encodeURIComponent(
      shareUrl
    ) +
    "&text=" +
    encodeURIComponent(
      websiteText
    );


  window.open(
    telegramUrl,
    "_blank",
    "noopener,noreferrer"
  );

}


// ==========================================
// INSTAGRAM
// ==========================================

function openInstagram() {

  window.open(
    "https://www.instagram.com/",
    "_blank",
    "noopener,noreferrer"
  );

}


// ==========================================
// YOUTUBE
// ==========================================

function openYouTube() {

  window.open(
    "https://www.youtube.com/",
    "_blank",
    "noopener,noreferrer"
  );

}


// ==========================================
// COPY WEBSITE LINK
// ==========================================

async function copyWebsiteLink() {

  const shareUrl =
    getShareUrl();


  // --------------------------------------
  // MODERN CLIPBOARD
  // --------------------------------------

  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {

    try {

      await navigator.clipboard.writeText(
        shareUrl
      );


      alert(
        "✅ Tehalka Music link copied!\n\n" +
        shareUrl
      );


      return;

    }

    catch (error) {

      console.log(
        "Clipboard API failed:",
        error
      );

    }

  }


  // --------------------------------------
  // OLD BROWSER FALLBACK
  // --------------------------------------

  try {

    const textarea =
      document.createElement(
        "textarea"
      );


    textarea.value =
      shareUrl;


    textarea.style.position =
      "fixed";

    textarea.style.left =
      "-9999px";


    document.body.appendChild(
      textarea
    );


    textarea.focus();

    textarea.select();


    const copied =
      document.execCommand(
        "copy"
      );


    document.body.removeChild(
      textarea
    );


    if (copied) {

      alert(
        "✅ Tehalka Music link copied!"
      );

    }

    else {

      alert(
        "Please copy this link:\n\n" +
        shareUrl
      );

    }

  }

  catch (error) {

    alert(
      "Please copy this link:\n\n" +
      shareUrl
    );

  }

}


// ==========================================
// QUICK SHARE MENU
// ==========================================

function showShareOptions() {

  const shareUrl =
    getShareUrl();


  const choice =
    prompt(
      "Share Tehalka Music\n\n" +
      "1 = Direct Share\n" +
      "2 = WhatsApp\n" +
      "3 = Facebook\n" +
      "4 = Telegram\n" +
      "5 = Copy Link"
    );


  switch (choice) {

    case "1":
      shareWebsite();
      break;

    case "2":
      shareWhatsApp();
      break;

    case "3":
      shareFacebook();
      break;

    case "4":
      shareTelegram();
      break;

    case "5":
      copyWebsiteLink();
      break;

    default:
      break;

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


      const songIndex =
        musicPlayerSongs.length;


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
            songIndex
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

      else {

        playerAudio.pause();

        playerPlayPause.textContent =
          "▶️";

      }

    }
  );


  const previousButton =
    document.getElementById(
      "playerPrevious"
    );


  if (previousButton) {

    previousButton.addEventListener(
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

  }


  const nextButton =
    document.getElementById(
      "playerNext"
    );


  if (nextButton) {

    nextButton.addEventListener(
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

  }


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


      if (playerProgress) {

        playerProgress.style.width =
          percentage + "%";

      }

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

}


// ==========================================
// ENTER KEY SEARCH + INITIALIZATION
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    // Create player
    createMusicPlayer();

    // Find songs
    setupMusicPlayerSongs();


    // --------------------------------------
    // SEARCH INPUT
    // --------------------------------------

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
