let alphabetIndex = 0;
let alphabets = [];
let puzzleIndexList = ['1', '2', '3', '4', '5', '6'];
let characterIndexList = ['1', '2', '3', '4', '5', '6', '7'];
let imgsState = [];
let currentAlpha = "Z";

var audioBack = new Audio('assets/sound/back1.mp3');


$("#puzzle_body  img").click(onCardClick);


function onCardClick() {
    console.log($(this).attr("id").split('-')[1]);

    let cardImgIndex = $(this).attr("id").split('-')[1] - 1;
    if (imgsState[cardImgIndex] == 0) { // first time click . Currently showing characters ing

        imgsState[cardImgIndex] =1;
        // change src to puzzle
        let url = `assets/images/${currentAlpha}/${currentAlpha}` + puzzleIndexList[cardImgIndex] + ".png"
        $(this).attr("src", url);

        // Play sound
        audioBack.play();
        audioBack.volume = 0.7;
    }
    else {
        //only play sound 
        console.log("volume Control");
        audioBack.volume = 0.1;
        var audioItem = new Audio(`assets/sound/${currentAlpha}/${currentAlpha}` + puzzleIndexList[cardImgIndex] + '.mp3');
        audioItem.play();
        audioItem.onended = function(){
            audioBack.volume = 0.7;
            
        }
    }

}


// $(".puzzImg").click(function (e) {
//     console.log(e);
// });

//-------------------------------------------------------------------
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//-------------------------------------------------------------------  

function generateAlphabetsList() {
    let start = 'A'.charCodeAt(0);
    let last = 'Z'.charCodeAt(0);
    for (var i = start; i <= last; ++i) {
        alphabets.push(String.fromCharCode(i));
    }
    // console.log(alphabets);

}

//--------------------------------------------------

function setcharacterImages(alphaChar) {
    console.log("Alphs = " + alphaChar);
    let target = $("#puzzle_body .grid_item_outer .grid_item_inner").children();

    for (let item = 0; item < target.length; item++) {

        $(target[item]).attr("src", `assets/images/char/` + characterIndexList[item] + ".png");

    }
}


//----------------------------------------------------
function nextAlphabetPuzzle() {
    if (alphabetIndex < 25) {
        alphabetIndex++;
    }
    shuffle(puzzleIndexList);
    shuffle(characterIndexList);
    // console.log(alphabets);
    // console.log(alphabetIndex);
    currentAlpha = alphabets[alphabetIndex];
    setcharacterImages(currentAlpha);
}

//----------------------------------------------------

function setImgState() {
    let count = $("#puzzle_body .grid_item_outer .grid_item_inner").children().length;

    for (let index = 0; index < count; index++) {
        imgsState.push(0);

    }

    console.log("IMG State" + imgsState);

}

//-----------------------------------------------------

function init() {
    console.log("Init Start");
    alphabetIndex = -1;
    setImgState();
    generateAlphabetsList();
    nextAlphabetPuzzle();
}

//-----------------------------------------------------


init();






