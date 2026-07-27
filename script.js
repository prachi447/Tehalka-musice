// ==========================================
// TEHALKA MUSIC - COMPLETE SCRIPT
// ==========================================


// ==========================================
// SONG SEARCH SYSTEM
// ==========================================

function searchSong() {

  const input = document.getElementById("searchInput");

  // Agar search box nahi mila
  if (!input) {
    return;
  }

  // User ka search text
  const searchText = input.value.trim().toLowerCase();

  // Empty search
  if (searchText === "") {
    alert("Please enter a song name.");
    return;
  }


  // ========================================
  // SONG LIST
  // ========================================

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


  // ========================================
  // SEARCH SONG
  // ========================================

  for (let i = 0; i < songs.length; i++) {

    const song = songs[i];

    for (let j = 0; j < song.names.length; j++) {

      const name = song.names[j];

      // Exact ya partial match
      if (
        name === searchText ||
        name.includes(searchText) ||
        searchText.includes(name)
      ) {

        // Song page open
        window.location.href = song.page;

        return;
      }

    }

  }


  // ========================================
  // SONG NOT FOUND
  // ========================================

  alert(
    "❌ Song not found.\n\nPlease try:\nKamar Kamar\nParindey\nSukoon\nChundadi\nPatli Kamar"
  );

}


// ==========================================
// ENTER KEY SEARCH
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    const searchInput =
      document.getElementById("searchInput");

    const searchButton =
      document.querySelector(
        '.search-box button'
      );


    // Enter key
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


    // Search button
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
