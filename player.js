// ==========================================
// TEHALKA MUSIC - PERSISTENT MUSIC PLAYER
// ==========================================

(function () {

  let playerAudio = null;
  let currentSongIndex = -1;
  let songs = [];


  // ==========================================
  // CREATE PERSISTENT PLAYER
  // ==========================================

  function createPlayer() {

    // अगर player पहले से मौजूद है तो दोबारा create न करें
    if (
      document.getElementById("musicPlayer")
    ) {
      return;
    }


    const player =
      document.createElement("div");


    player.id =
      "musicPlayer";


    player.innerHTML = `

      <!-- PROGRESS BAR -->

      <div class="music-player-progress">

        <div id="playerProgress"></div>

      </div>


      <!-- PLAYER INNER -->

      <div class="music-player-inner">


        <!-- SONG INFO -->

        <div class="music-player-info">

          <div id="playerSongName">
            Tehalka Music
          </div>

          <div id="playerArtistName">
            Select a song
          </div>

        </div>


        <!-- PLAYER CONTROLS -->

        <div class="music-player-controls">


          <!-- PREVIOUS -->

          <button
            id="playerPrevious"
            type="button"
            aria-label="Previous Song"
            title="Previous Song"
          >
            ⏮
          </button>


          <!-- PLAY / PAUSE -->

          <button
            id="playerPlayPause"
            type="button"
            aria-label="Play or Pause"
            title="Play or Pause"
          >
            ▶️
          </button>


          <!-- NEXT -->

          <button
            id="playerNext"
            type="button"
            aria-label="Next Song"
            title="Next Song"
          >
            ⏭
          </button>


        </div>


      </div>


      <!-- HIDDEN AUDIO -->

      <audio
        id="playerAudio"
        preload="metadata"
      ></audio>

    `;


    document.body.appendChild(
      player
    );


    // GET AUDIO ELEMENT

    playerAudio =
      document.getElementById(
        "playerAudio"
      );


    setupPlayerEvents();

  }



  // ==========================================
  // FIND ALL SONGS
  // ==========================================

  function findSongs() {

    songs = [];


    const audioPlayers =
      document.querySelectorAll(
        "audio"
      );


    audioPlayers.forEach(
      function (audio) {


        // Persistent player को ignore करें

        if (
          audio.id ===
          "playerAudio"
        ) {

          return;

        }


        // Source खोजें

        const source =
          audio.querySelector(
            "source"
          );


        if (
          !source
        ) {

          return;

        }


        // Song card खोजें

        const card =
          audio.closest(
            ".song-card, .album-song, .artist-song"
          );


        let songName =
          "Unknown Song";


        let artistName =
          "Tehalka Music";


        // ======================================
        // GET SONG NAME
        // ======================================

        if (
          card
        ) {


          const heading =
            card.querySelector(
              "h1, h2, h3"
            );


          if (
            heading
          ) {

            songName =
              heading.textContent
                .trim()
                .replace(
                  /^🎵\s*/,
                  ""
                );

          }


          // ====================================
          // GET ARTIST
          // ====================================

          const artist =
            card.querySelector(
              "p strong"
            );


          if (
            artist
          ) {

            artistName =
              artist.textContent
                .trim();

          }

        }


        // ======================================
        // ADD SONG
        // ======================================

        songs.push({

          url:
            source.src ||
            source.getAttribute(
              "src"
            ),

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



  // ==========================================
  // PLAY SONG
  // ==========================================

  function playSong(
    index
  ) {


    if (
      !songs[index]
    ) {

      return;

    }


    currentSongIndex =
      index;


    const song =
      songs[index];


    // ======================================
    // SET AUDIO SOURCE
    // ======================================

    playerAudio.src =
      song.url;


    playerAudio.load();


    // ======================================
    // UPDATE SONG NAME
    // ======================================

    const songName =
      document.getElementById(
        "playerSongName"
      );


    const artistName =
      document.getElementById(
        "playerArtistName"
      );


    if (
      songName
    ) {

      songName.textContent =
        song.name;

    }


    if (
      artistName
    ) {

      artistName.textContent =
        song.artist;

    }


    // ======================================
    // PLAY SONG
    // ======================================

    playerAudio
      .play()
      .then(
        function () {

          updatePlayPauseButton(
            true
          );

        }
      )
      .catch(
        function () {

          updatePlayPauseButton(
            false
          );

        }
      );


  }



  // ==========================================
  // UPDATE PLAY / PAUSE BUTTON
  // ==========================================

  function updatePlayPauseButton(
    isPlaying
  ) {


    const button =
      document.getElementById(
        "playerPlayPause"
      );


    if (
      !button
    ) {

      return;

    }


    if (
      isPlaying
    ) {

      button.textContent =
        "⏸️";

    }

    else {

      button.textContent =
        "▶️";

    }


  }



  // ==========================================
  // SETUP PLAYER EVENTS
  // ==========================================

  function setupPlayerEvents() {


    const playPause =
      document.getElementById(
        "playerPlayPause"
      );


    const previous =
      document.getElementById(
        "playerPrevious"
      );


    const next =
      document.getElementById(
        "playerNext"
      );


    const progress =
      document.getElementById(
        "playerProgress"
      );


    // ======================================
    // PLAY / PAUSE
    // ======================================

    if (
      playPause
    ) {


      playPause.addEventListener(
        "click",
        function () {


          // अगर कोई song select नहीं है

          if (
            !playerAudio.src
          ) {


            if (
              songs.length > 0
            ) {

              playSong(
                0
              );

            }


            return;

          }


          // अगर song paused है

          if (
            playerAudio.paused
          ) {


            playerAudio
              .play()
              .catch(
                function () {}
              );


          }

          // अगर song चल रहा है

          else {


            playerAudio.pause();

          }


        }
      );


    }



    // ======================================
    // PREVIOUS SONG
    // ======================================

    if (
      previous
    ) {


      previous.addEventListener(
        "click",
        function () {


          if (
            songs.length === 0
          ) {

            return;

          }


          let index;


          // अगर कोई current song नहीं है

          if (
            currentSongIndex === -1
          ) {

            index =
              0;

          }

          else {

            index =
              currentSongIndex - 1;

          }


          // पहले song से पीछे जाने पर last song

          if (
            index < 0
          ) {

            index =
              songs.length - 1;

          }


          playSong(
            index
          );


        }
      );


    }



    // ======================================
    // NEXT SONG
    // ======================================

    if (
      next
    ) {


      next.addEventListener(
        "click",
        function () {


          if (
            songs.length === 0
          ) {

            return;

          }


          let index;


          // अगर कोई song select नहीं है

          if (
            currentSongIndex === -1
          ) {

            index =
              0;

          }

          else {

            index =
              currentSongIndex + 1;

          }


          // Last song के बाद पहला song

          if (
            index >=
            songs.length
          ) {

            index =
              0;

          }


          playSong(
            index
          );


        }
      );


    }



    // ======================================
    // AUDIO TIME UPDATE
    // ======================================

    playerAudio.addEventListener(
      "timeupdate",
      function () {


        if (
          !playerAudio.duration ||
          isNaN(
            playerAudio.duration
          )
        ) {

          return;

        }


        const percent =

          (
            playerAudio.currentTime /
            playerAudio.duration
          ) *
          100;


        if (
          progress
        ) {

          progress.style.width =
            percent +
            "%";

        }


      }
    );



    // ======================================
    // AUDIO PLAY
    // ======================================

    playerAudio.addEventListener(
      "play",
      function () {

        updatePlayPauseButton(
          true
        );

      }
    );



    // ======================================
    // AUDIO PAUSE
    // ======================================

    playerAudio.addEventListener(
      "pause",
      function () {

        updatePlayPauseButton(
          false
        );

      }
    );



    // ======================================
    // AUDIO ENDED
    // ======================================

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


        // Last song के बाद फिर पहला song

        if (
          index >=
          songs.length
        ) {

          index =
            0;

        }


        playSong(
          index
        );


      }
    );


  }



  // ==========================================
  // CONNECT SONG CARD AUDIO
  // ==========================================

  function connectSongCards() {


    const audioPlayers =
      document.querySelectorAll(
        "audio"
      );


    audioPlayers.forEach(
      function (audio) {


        // Persistent audio को ignore करें

        if (
          audio.id ===
          "playerAudio"
        ) {

          return;

        }


        audio.addEventListener(
          "play",
          function () {


            const index =
              songs.findIndex(
                function (song) {

                  return (
                    song.originalAudio ===
                    audio
                  );

                }
              );


            if (
              index === -1
            ) {

              return;

            }


            // Persistent player में वही song चलाएँ

            if (
              playerAudio.src !==
              songs[index].url
            ) {

              currentSongIndex =
                index;


              playerAudio.src =
                songs[index].url;


              playerAudio.load();


              document.getElementById(
                "playerSongName"
              ).textContent =
                songs[index].name;


              document.getElementById(
                "playerArtistName"
              ).textContent =
                songs[index].artist;

            }


            // Persistent player को play करें

            playerAudio
              .play()
              .catch(
                function () {}
              );


          }
        );


      }
    );


  }



  // ==========================================
  // START PLAYER
  // ==========================================

  document.addEventListener(
    "DOMContentLoaded",
    function () {


      // Player बनाएँ

      createPlayer();


      // Songs खोजें

      findSongs();


      // Song cards को connect करें

      connectSongCards();


    }
  );


})();
