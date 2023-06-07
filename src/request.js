const API_KEY = "201f38d2a01bbee05cd5aec0b429b77a";
// const API_KEY = "a3862ca74514590e3971df18caf10d15";
// const requests = {
//     fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
//     fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
//     fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
//     fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with-genres=28`,
//     fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with-genres=35`,
//     fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with-genres=27`,
//     fetchRomanticMovies: `/discover/movie?api_key=${API_KEY}&with-genres=10749`,
//     fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with-genres=99`,
// }

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=201f38d2a01bbee05cd5aec0b429b77a&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    
}
export default requests;