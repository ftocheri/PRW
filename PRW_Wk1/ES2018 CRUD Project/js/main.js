//create the array to hold for local storage
let articleList = [];
//check if the local storage have values already
if (JSON.parse(localStorage.getItem('article')) != null) {
    //if it does, save the variable to the storage values
    articleList = JSON.parse(localStorage.getItem('article'));
}
//function to run on the window load
window.onload = function () {
    //save the localstorage data to a new variable
    let data = JSON.parse(this.localStorage.getItem('article'));
    //for each item within my storage
    $.each(data, function (i, item) {
        //create the element that will show the saved recipe
        let myList = $('#myList')
        imgNum = Math.floor(Math.random() * 9)
        img = '<img src="images/' + imgNum + '.jpg" alt="Recipe Image">'

        $("#myList").append("<article id=" + item.id + "><h4>" + img
            + item.name +
            "</h4><p>"
            + item.desc +
            "</p><p>Category: "
            + item.cat +
            "</p><p>Star Rating: "
            + item.rate +
            "</p><p class='remove' onclick='deleteMe(this);'>" +
            "<span class='fa fa-trash'></span>" +
            "</p></article>"
        )
    });
}

//fetch function for the data stored in my JSON file
fetch('https://api.myjson.com/bins/gg3eh')
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return Promise.reject('something went wrong!')
        }
    })
    .then(data => {
        let myList = $('#myList')
        imgNum = Math.floor(Math.random() * 9)
        img = '<img src="images/' + imgNum + '.jpg" alt="Recipe Image">'

        $.each(data.recipes, function () {
            $("#myList").append("<article><h4>" + img
                + this.title +
                "</h4><p>"
                + this.description +
                "</p><p>Category: "
                + this.category +
                "</p><p>Star Rating: "
                + this.starRating +
                "</p><p class='remove' onclick='deleteMe(this);'>" +
                "<span class='fa fa-trash'></span>" +
                "</p></article>"
            )
        });

        console.log('data is', data)
    })
    .catch(error => console.log('error is', error))

//function for the changing of my star rating system
$(document).ready(function () {
    // Check Radio-box
    $(".rating input:radio").attr("checked", false);

    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });
});
//function to save data from my form
//this will save the item to my localstorage
//& create a new article element with the formatted data
function myList() {
    let r;
    let radios = document.getElementsByName('rating');
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            r = radios[i].value;
            break;
        }
    }
    var arrayFromStorage = JSON.parse(localStorage.getItem('article'));
    var arrayLength;
    if (arrayFromStorage == null) {
        arrayLength = 1;
    }
    else {
        arrayLength = arrayFromStorage.length + 1;
    }
    console.log(arrayLength);
    $("#myList").append("<article id=" + arrayLength + "><h4>" + img
        + $("#rName").val() +
        "</h4><p>"
        + $("#rDesc").val() +
        "</p><p>Category: "
        + $("#rCat").val() +
        "</p><p>Star Rating: "
        + r +
        "</p><p class='remove' onclick='deleteMe(this);'>" +
        "<span class='fa fa-trash'></span>" +
        "</p></article>"
    );


    //section that will change my localstorage
    let entry = {};
    entry.id = arrayLength;
    entry.name = $("#rName").val();
    entry.desc = $("#rDesc").val();
    entry.cat = $("#rCat").val();
    entry.rate = r;
    //add the new item to my array
    articleList.push(entry);
    //console.log(entry);
    //add that array list to the localstorage
    localStorage.setItem('article', JSON.stringify(articleList));
}
//function to clear the form
function formClear() {
    $("#rName").val("");
    $("#rDesc").val("");
    $("#rCat").val("");
    //seperate area to control my radio buttons
    let radios = document.getElementsByName('rating');
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            radios[i].checked = false;
        }
    }
    // -------- Not working? Not sure of the issue ----------
    //$('input[name=rating]').attr("checked", false);
}

//------------- Form Validation Functions -------------
function assignUpdate() {
    clearError();
    if ($("#rName").val() == null || $("#rName").val() == '') {
        displayError('nMessage');
    }
    else if ($("#rDesc").val() == null || $("#rDesc").val() == '') {
        displayError('dMessage');
    }
    else if ($("#rCat").val() == null || $("#rCat").val() == '') {
        displayError('cMessage');
    }
    else if ($('input[name=rating]:checked').length == 0) {
        displayError('rMessage')
    }
    else {
        clearError();
        myList();
        formClear();
        $("#rName").focus();
    }
}
//function for displaying the custom error message
function displayError(id) {
    document.getElementById(id).style.display = "block";
    document.getElementById(id).innerHTML = document.getElementById(id).getAttribute("name") + " can not be left blank.";
    return false;
}
//function to clear the errormessage when it needs to be cleared
function clearError() {
    document.getElementById('nMessage').style.display = "none";
    document.getElementById('dMessage').style.display = "none";
    document.getElementById('cMessage').style.display = "none";
    document.getElementById('rMessage').style.display = "none";
}

//function to delete the item from the page
//also deletes custom items from the local storage
function deleteMe(entry) {
    $(entry).parents("article").remove();
    //console.log($(entry).parents('article').attr("id"));
    var removeID = $(entry).parents('article').attr("id");
    var removedItem = JSON.parse(localStorage.getItem('article'))[removeID-1];
    var list = JSON.parse(localStorage.getItem('article'));
    list.splice(removedItem, 1);
    localStorage.setItem('article', JSON.stringify(list));
}