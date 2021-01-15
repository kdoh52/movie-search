import axios from "axios";

export default {
    getMovies: function() {
        return axios.get("/api/movies");
    },
    saveMovie: function(movieData) {
        console.log("THIS IS MOVIE DATA", movieData)
        return axios.post("/api/movies", movieData);
    },
    deleteMovie: function(id) {
        return axios.delete("/api/movies/" + id);
    }
};