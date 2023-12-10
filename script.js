let theResults =  document.getElementById("movie-results");
let theForm = document.getElementById("search-form");
let searchTerm = document.getElementById("search-text");
let  baseUrl = "https://api.themoviedb.org/3/search/movie?query=";
var movies = [];




function showMovie(movie){
console.log(movie);
let newMovie = document.createElement("div");
newMovie.classList.add("movie");
}


function getMovies(query){
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        movies = JSON.parse(this.responseText);
        if(movies!= null){
            for(i = movies.length - 1; i > 0; i--){
                showMovie(todos[i]);
            }
        }
    }
};
xhttp.open("GET", baseUrl + query + "&api_key=6d4ebf2688d963156a0d6cb9e7d1e729", true);
xhttp.setRequestHeader("Authorization",'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDRlYmYyNjg4ZDk2MzE1NmEwZDZjYjllN2QxZTcyOSIsInN1YiI6IjY1MmQ1NzU3MzU4ZGE3NWI2MWY4Y2UyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tanpWxjfmzJ89w9gcgEeSx8BGu9OjDCNQs1tRuhj8Zg');
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();
console.log("entered");
}


theForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    let movieName = searchTerm.value;
    if(movieName != null){
        getMovies(movieName);
        searchTerm.value = "";
    }
}
) 