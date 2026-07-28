// ==========================================
// TEHALKA MUSIC - COMPLETE SCRIPT
// ==========================================


// ==========================================
// SONG SEARCH SYSTEM
// ==========================================

function searchSong() {

  const input =
    document.getElementById("searchInput");


  // Search box नहीं मिला

  if (!input) {

    return;

  }


  // User का search text

  const searchText =
    input.value
      .trim()
      .toLowerCase();


  // Empty search

  if (
    searchText === ""
  ) {

    alert(
      "Please enter a song name."
    );

    return;

  }


  // ========================================
  // CHECK SONG DATABASE
  // ========================================

  if (
    typeof songsData === "undefined"
  ) {

    alert(
      "❌ Songs database could not be loaded."
    );

    return;

  }


  // ========================================
  // SEARCH ALL SONGS
  // ========================================

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


    // Song name या Artist name से search

    if (

      songName.includes(
        searchText
      )

      ||

      artistName.includes(
        searchText
      )

    ) {


      // Song page open

      window.location.href =
        song.page;


      return;

    }

  }


  // ========================================
  // SONG NOT FOUND
  // ========================================

  alert(
    "❌ Song not found.\n\nPlease try another song."
  );

}


// ==========================================
// ENTER KEY SEARCH
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


    // ======================================
    // ENTER KEY
    // ======================================

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


    // ======================================
    // SEARCH BUTTON
    // ======================================

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
