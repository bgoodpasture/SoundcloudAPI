
var playButton = document.querySelector("#play")
var pauseButton = document.querySelector("#pause")


SC.initialize({
  client_id: "fd4e76fc67798bfa742089ed619084a6"
});

SC.get("/tracks/311732223").then(function(response){
  console.log(response)
})

function Jukebox() {
  this.mysoundcloudaudio = SC.stream("/tracks/311732223");
}

Jukebox.prototype.play = function() {
  this.mysoundcloudaudio.then(function(player){
  player.play();
  })
  SC.get("/tracks/311732223").then(function(response) {
  document.getElementById("artwork").src = response.artwork_url;
  document.getElementById("artist").innerHTML= response.user.username
  document.querySelector("#artist").setAttribute("href",response.permalink_url)
  document.getElementById("title").innerHTML= response.title
  document.querySelector("#title").setAttribute("href",response.user.permalink_url)
  document.getElementById("genre").innerHTML= response.genre
  document.getElementById("release date").innerHTML= response.release_month + '/' + response.release_day + '/'+ response.release_year;
  document.getElementById("description").innerHTML= response.description.slice(0, 30)
  })
}
Jukebox.prototype.pause = function() {
  this.mysoundcloudaudio.then(function(player){
    player.pause();
  })
}
var jukebox = new Jukebox()

playButton.addEventListener("click", function(event){
  event.preventDefault()
  jukebox.play(this.mysoundcloudaudio)
  playButton.style.display= "block"
  playButton.style.display= "none"
  pauseButton.style.display= "block"
})
pauseButton.addEventListener("click", function(event){
  event.preventDefault()
  jukebox.pause(this.mysoundcloudaudio)
  pauseButton.style.display= "block"
  pauseButton.style.display= "none"
  playButton.style.display= "block"
})

// currentSong.addEventListener("change", function(event){
//   event.preventDefault
//   jukebox.mysoundcloudaudio.pause()
//   jukebox.mysoundcloudaudio = SC.stream("/tracks/311732223")
//   jukebox.mysoundcloudaudio.play()
//
// })
