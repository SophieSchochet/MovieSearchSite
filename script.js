let theResults = document.getElementById("movie-results");
let popUpContainer = document.getElementById("popup-container");
let bigImg = document.getElementById("clicked-img");
let expandedOverview = document.getElementById("overview");
let expandedRating = document.getElementById("rating");
let releaseDate = document.getElementById("released");
let bigTitle = document.getElementById("expanded-title");
let alert = document.getElementById("result-alert")
let theForm = document.getElementById("search-form");
let searchTerm = document.getElementById("search-text");

let baseUrl = "https://api.themoviedb.org/3/search/movie?query=";
let posterUrl = "https://image.tmdb.org/t/p/original/";
let defaultUrl = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
var movies = [];

loadPage();


document.getElementById("close-expansion").addEventListener("click",() => {
    popUpContainer.classList.add("hidden");
    theResults.classList.remove("blurred");
    alert.classList.remove("hidden");
});

theForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    let movieName = searchTerm.value;
    if(movieName != null){
        theResults.innerHTML = "";
        getMovies(movieName);
        alert.innerText = "Results for: " + movieName;
        searchTerm.value = "";
    }
}
)

function loadPage(){
    var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const movieResults = JSON.parse(this.responseText);
        if(movieResults!= null){
            movies = movieResults.results;
            showMovies();
            }
        }
     else if (this.readyState == 4) {
        console.log(this.responseText);
    }

};
xhttp.open("GET", defaultUrl +"&api_key=6d4ebf2688d963156a0d6cb9e7d1e729", true);
xhttp.setRequestHeader("Authorization",'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDRlYmYyNjg4ZDk2MzE1NmEwZDZjYjllN2QxZTcyOSIsInN1YiI6IjY1MmQ1NzU3MzU4ZGE3NWI2MWY4Y2UyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tanpWxjfmzJ89w9gcgEeSx8BGu9OjDCNQs1tRuhj8Zg');
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();
}




function showMovies(){
    for(let i = 0; i < movies.length; i++){
    let posterPath = movies[i].poster_path;
    let movieTitle = movies[i].title;
    let movieRating = "Rating: " + movies[i].vote_average +"/10";
    let movieDate = movies[i].release_date;
    console.log(movieTitle);
    let newMovie = document.createElement("div");
    newMovie.classList.add("movie");
   let poster = document.createElement("img");
    poster.classList.add("poster");
    poster.onerror = () => {
        poster.src= "assets/not-found.png";
    }
    poster.src = posterUrl + posterPath;
    poster.alt = movieTitle;
    poster.width = 150;
    poster.height = 200;
    newMovie.appendChild(poster);
    let title = document.createElement("p");
    title.classList.add("movie-title");
    title.innerText = movieTitle;
    newMovie.appendChild(title);
    newMovie.addEventListener("click",() => {
        bigImg.src = poster.src;
        popUpContainer.classList.remove("hidden");
        theResults.classList.add("blurred");
        alert.classList.add("hidden");
        expandedOverview.innerText = movies[i].overview;
        releaseDate.innerText = "Released: " + movieDate;
        expandedRating.innerText = movieRating;
        bigTitle.innerText = movieTitle;
    });
    theResults.appendChild(newMovie);
    }
}
  


function getMovies(query){
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const movieResults = JSON.parse(this.responseText);
        if(movieResults!= null){
            movies = movieResults.results;
            showMovies();
            }
        }

};
xhttp.open("GET", baseUrl + query + "&api_key=6d4ebf2688d963156a0d6cb9e7d1e729", true);
xhttp.setRequestHeader("Authorization",'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDRlYmYyNjg4ZDk2MzE1NmEwZDZjYjllN2QxZTcyOSIsInN1YiI6IjY1MmQ1NzU3MzU4ZGE3NWI2MWY4Y2UyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tanpWxjfmzJ89w9gcgEeSx8BGu9OjDCNQs1tRuhj8Zg');
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();
console.log("entered");
}

