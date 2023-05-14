// start by creating data so we don't have to type it in each time
let movieArray = [];

// define a constructor to create movie objects
let MovieObject = function (pID, pTitle, pYear, pGenre, pMan, pWoman, pURL) {
    this.ID = pID;
    this.Title = pTitle;
    this.Year = pYear;
    this.ID = movieArray.length + 1;
    this.Genre = pGenre;  // action  comedy  drama  horrow scifi  musical  western
    this.Man = pMan;
    this.Woman = pWoman;
    this.URL = pURL;
}


movieArray.push(new MovieObject(1,"Moonstruck", 1981, "Drama", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
movieArray.push(new MovieObject(2, "Wild At Heart", 1982, "Drama", "Nicholas Cage", "Laura VanDern", "https://www.youtube.com/watch?v=7uRJartX79Q"));
movieArray.push(new MovieObject(3, "Raising Arizona", 1983, "Comedy", "Nicholas Cage", "Holly Hunter", "https://www.youtube.com/watch?v=NoXJKArYi1g"));
movieArray.push(new MovieObject(4, "USS Indianapolis: Men of Courage", 2016, "Drama", "Nicholas Cage", "Emily Tennant", "https://youtu.be/ZDPE-NronKk"));



let selectedGenre = "not selected";

document.addEventListener("DOMContentLoaded", function () {

    createList();

// add button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
        movieArray.push(new MovieObject(document.getElementById("title").value, 
        document.getElementById("year").value,
        selectedGenre,
        document.getElementById("man").value,
        document.getElementById("woman").value,
        movieArray.length,  // set ID
        document.getElementById("URL").value));
        document.location.href = "index.html#ListAll";
        // also add the URL value
    });
    
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("title").value = "";
        document.getElementById("year").value = "";
        document.getElementById("man").value = "";
        document.getElementById("woman").value = "";
        document.getElementById("URL").value = "";
    });

    $(document).bind("change", "#select-genre", function (event, ui) {
        selectedGenre = $('#select-genre').val();
    });


    document.getElementById("buttonSortTitle").addEventListener("click", function () {
        movieArray.sort(dynamicSort("Title"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("buttonSortGenre").addEventListener("click", function () {
        movieArray.sort(dynamicSort("Genre"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    // button on details page to view the youtube video
    document.getElementById("trailer").addEventListener("click", function () {
        window.open(document.getElementById("oneURL").innerHTML);
    });
// end of add button events ************************************************************************

  
  
// page before show code *************************************************************************
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
        createList();
    });


    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   
    let localID = localStorage.getItem('parm');  // get the unique key back from the dictionairy
  
    
    // next step to avoid bug in jQuery Mobile,  force the movie array to be current
    movieArray = JSON.parse(localStorage.getItem('movieArray'));  

    console.log(movieArray[localID - 1]);
   
    document.getElementById("oneTitle").innerHTML = "The title is: " + movieArray[localID - 1].Title;
    document.getElementById("oneYear").innerHTML = "Year released: " + movieArray[localID - 1].Year;
    document.getElementById("oneGenre").innerHTML = "Genre: " + movieArray[localID - 1].Genre;
    document.getElementById("oneWoman").innerHTML = "Leading Woman: " + movieArray[localID - 1].Woman;
    document.getElementById("oneMan").innerHTML = "Leading Man: " + movieArray[localID - 1].Man;
    document.getElementById("oneURL").innerHTML = movieArray[localID - 1].URL;
    });
 
// end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************

function createList() {
    // clear prior data
   let myUL =document.getElementById("MovieListul");
   myUL.innerHTML = "";
   

    movieArray.forEach(function (oneMovie,) {   // use handy array forEach method
        var myLi = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        myLi.classList.add('oneMovie'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        myLi.setAttribute("data-parm", oneMovie.ID);
        myLi.innerHTML = oneMovie.ID + ":  " + oneMovie.Title + "  " + oneMovie.Genre;
        myUL.appendChild(myLi);
    });
   

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liList = document.getElementsByClassName("oneMovie");
    let newMoviewArray = Array.from(liList);
    newMoviewArray.forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        var parm = this.getAttribute("data-parm");  // passing in the record.Id
        // get our hidden <p> and save THIS ID value in the localStorage "dictionairy"
        localStorage.setItem('parm', parm);
       
       
       
        // but also, to get around a "bug" in jQuery Mobile, take a snapshot of the
        // current movie array and save it to localStorage as well.
        let stringMovieArray = JSON.stringify(movieArray); // convert array to "string"
        localStorage.setItem('movieArray', stringMovieArray);
        
        
        // now jump to our page that will use that one item
        document.location.href = "index.html#details";
        });
    });

};
  

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}
