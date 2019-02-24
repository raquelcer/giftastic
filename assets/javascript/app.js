$(document).ready(function(){
var topic=["Mean Girls", "Pride and Prejudice", "Clueles", "Spiderman", "Pitch Perfect", "Batman", "The Wedding Bride", "The Hunger Games", "Divergent", "Harry Potter", "The Lord of the Rings"]

function displayMovieButtons(){

    

    $("#gifs").on("click", ".gif", function(event){
        var movieButton = $(this).attr("data-name");
    console.log(movieButton);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1EDlLCliv28onPTcB0gpw5yXjCO7TEiX&q=" 
    + movieButton + "&limit=10&offset=0&rating=PG-13&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        var results = response.data;
        $("#movies").empty();
        for (var i=0; i<results.length; i++){
            var movieDiv = $("<div class='mov'>");
            var rating = response.data[i].rating;
            var pRate = $("<p>").text("Rating: " + rating);
            console.log(pRate);
            movieDiv.append(pRate);
            var gifStill = response.data[i].images.downsized_still.url;
            var gifMotion = response.data[i].images.downsized.url;
            var image = $("<img>").attr("src", gifStill);
            console.log(image);
            image.attr("data-still", gifStill);
            image.attr("data-animate", gifMotion);
            image.attr("data-state", "still");
            image.attr("id", "img" + i);
            image.addClass("gifImages");
            movieDiv.prepend(image);
            $("#movies").prepend(movieDiv);
        }

    })
 })
   

    function createButtons(){
        $("#gifs").empty();
        for(var i=0; i<topic.length; i++){
            var btn = $("<button>");
            btn.addClass("gif");
            btn.attr("data-name", topic[i]);
            btn.text(topic[i]);
            $("#gifs").append(btn);
        }
    }
    $("#submit").on("click", function(event){
        event.preventDefault();
        console.log("submit");
        // sets inputted value to newTopic 
        newTopic = $("#movie-input").val();
        // new topic is added to the topics array 
        topic.push(newTopic);
        console.log(topic);
        // call the function that creates the new button
        createButtons();
    });
    
    


    createButtons();
}

$(document).on("click", ".gifImages", flipAnimate);

function flipAnimate() {
	var item = $(this).attr("id");
	item = "#"+item;
	// console.log(item);
	var state = $(item).attr("data-state");
	// console.log(state);
	if (state === "still") {
        $(item).attr("src", $(item).attr("data-animate"));
        $(item).attr("data-state", "animate");
        // console.log(this);
      } else {
        $(item).attr("src", $(item).attr("data-still"));
        $(item).attr("data-state", "still");
        // console.log(this);
      };
};



displayMovieButtons();

})