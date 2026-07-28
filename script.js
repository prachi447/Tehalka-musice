// ==========================================
// TEHALKA MUSIC - COMPLETE SCRIPT
// ==========================================


// ==========================================
// SONG SEARCH SYSTEM
// ==========================================

function searchSong() {

  const input = document.getElementById("searchInput");

  if (!input) {
    return;
  }

  const searchText =
    input.value.trim().toLowerCase();

  if (searchText === "") {

    alert("Please enter a song name.");

    return;

  }


  // ========================================
  // SEARCH FROM SONGS DATABASE
  // ========================================

  if (
    typeof songsData !== "undefined" &&
    Array.isArray(songsData)
  ) {

    for (
      let i = 0;
      i < songsData.length;
      i++
    ) {

      const song =
        songsData[i];

      const songName =
        song.name
          .toLowerCase();

      const artistName =
        song.artist
          .toLowerCase();


      if (
        songName.includes(searchText) ||
        searchText.includes(songName) ||
        artistName.includes(searchText)
      ) {

        window.location.href =
          song.page;

        return;

      }

    }

  }


  // ========================================
  // SONG NOT FOUND
  // ========================================

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
// SEARCH BUTTON + ENTER KEY
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    const searchInput =
      document.getElementById(
        "searchInput"
      );

    const searchButton =
      document.querySelector(
        ".search-box button"
      );


    // ENTER KEY

    if (searchInput) {

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


    // SEARCH BUTTON

    if (searchButton) {

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
