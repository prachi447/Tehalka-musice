function searchSong() {
  let song = document.getElementById("searchInput").value;

  if (song.trim() === "") {
    alert("Please enter a song name.");
  } else {
    alert("Searching for: " + song);
  }
}
