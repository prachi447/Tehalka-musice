// ==========================================
// TEHALKA MUSIC - PERSISTENT MUSIC PLAYER
// ==========================================

(function () {

  let playerAudio;
  let currentSongIndex = -1;
  let songs = [];

  // ========================================
  // CREATE PLAYER
  // ========================================

  function createPlayer() {

    if (document.getElementById("persistentMusicPlayer")) {
      return;
    }

    const player = document.createElement("div");

    player.id = "persistentMusicPlayer";

    player.innerHTML = `

      <div class="persistent-player-progress">
        <div id="persistentProgress"></div>
      </div>

      <div class="persistent-player-inner">

        <div class="persistent-player-info">

          <div id="persistentSongName">
            Tehalka Music
          </div>

          <div id="persistentArtistName">
            Select a song
          </div>

        </div>

        <div class="persistent-player-controls">

          <button
            id="persistentPrevious"
            type="button"
          >
            ⏮
          </button>

          <button
            id="persistentPlayPause"
            type="button"
          >
            ▶️
          </button>

          <button
            id="persistentNext"
            type="button"
          >
            ⏭
          </button>

        </div>

      </div>

      <audio
        id="persistentAudio"
        preload="metadata"
      ></audio>

    `;

    document.body.appendChild(player);

    playerAudio =
      document.getElementById(
        "persistentAudio"
      );

    setupEvents();

  }


  // ========================================
  // FIND SONGS
  // ========================================

  function findSongs() {

    songs = [];

    const audioPlayers =
      document.querySelectorAll(
        "audio"
      );

    audioPlayers.forEach(
      function (audio) {

        if (
          audio.id ===
          "persistentAudio"
        ) {
          return;
        }

        const source =
          audio.querySelector(
            "source"
          );

        if (!source) {
          return;
        }

        const card =
          audio.closest(
            ".song-card, .album-song, .artist-song"
          );

        let songName =
          "Unknown Song";

        let artistName =
          "Tehalka Music";

        if (card) {

          const heading =
            card.querySelector(
              "h2, h3, strong"
            );

          const artist =
            card.querySelector(
              "p strong"
            );

          if (heading) {
            songName =
              heading.textContent.trim();
          }

          if (artist) {
            artistName =
              artist.textContent.trim();
          }

        }

        songs.push({

          url:
            source.src,

          name:
            songName,

          artist:
            artistName,

          originalAudio:
            audio

        });

      }
    );

  }


  // ========================================
  // PLAY SONG
  // ========================================

  function playSong(index) {

    if (!songs[index]) {
      return;
    }

    currentSongIndex =
      index;

    const song =
      songs[index];

    playerAudio.src =
      song.url;

    document.getElementById(
      "persistentSongName"
    ).textContent =
      song.name;

    document.getElementById(
      "persistentArtistName"
    ).textContent =
      song.artist;

    playerAudio.play()
      .then(
        function () {

          document.getElementById(
            "persistentPlayPause"
          ).textContent =
            "⏸️";

        }
      )
      .catch(
        function () {

          document.getElementById(
            "persistentPlayPause"
          ).textContent =
            "▶️";

        }
      );

  }


  // ========================================
  // PLAYER EVENTS
  // ========================================

  function setupEvents() {

    const playPause =
      document.getElementById(
        "persistentPlayPause"
      );

    const previous =
      document.getElementById(
        "persistentPrevious"
      );

    const next =
      document.getElementById(
        "persistentNext"
      );

    const progress =
      document.getElementById(
        "persistentProgress"
      );


    // PLAY / PAUSE

    playPause.addEventListener(
      "click",
      function () {

        if (
          !playerAudio.src
        ) {

          if (
            songs.length > 0
          ) {

            playSong(0);

          }

          return;

        }


        if (
          playerAudio.paused
        ) {

          playerAudio.play();

        }

        else {

          playerAudio.pause();

        }

      }
    );


    // PREVIOUS

    previous.addEventListener(
      "click",
      function () {

        if (
          songs.length === 0
        ) {
          return;
        }

        let index =
          currentSongIndex - 1;

        if (
          index < 0
        ) {

          index =
            songs.length - 1;

        }

        playSong(index);

      }
    );


    // NEXT

    next.addEventListener(
      "click",
      function () {

        if (
          songs.length === 0
        ) {
          return;
        }

        let index =
          currentSongIndex + 1;

        if (
          index >=
          songs.length
        ) {

          index = 0;

        }

        playSong(index);

      }
    );


    // PROGRESS

    playerAudio.addEventListener(
      "timeupdate",
      function () {

        if (
          !playerAudio.duration
        ) {
          return;
        }

        const percent =
          (
            playerAudio.currentTime /
            playerAudio.duration
          ) * 100;

        progress.style.width =
          percent + "%";

      }
    );


    // PLAY

    playerAudio.addEventListener(
      "play",
      function () {

        playPause.textContent =
          "⏸️";

      }
    );


    // PAUSE

    playerAudio.addEventListener(
      "pause",
      function () {

        playPause.textContent =
          "▶️";

      }
    );


    // NEXT SONG AFTER END

    playerAudio.addEventListener(
      "ended",
      function () {

        if (
          songs.length === 0
        ) {
          return;
        }

        let index =
          currentSongIndex + 1;

        if (
          index >=
          songs.length
        ) {

          index = 0;

        }

        playSong(index);

      }
    );

  }


  // ========================================
  // START
  // ========================================

  document.addEventListener(
    "DOMContentLoaded",
    function () {

      createPlayer();

      findSongs();

    }
  );

})();
