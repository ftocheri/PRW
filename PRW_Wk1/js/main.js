let articleList = [];
if (JSON.parse(localStorage.getItem('article')) != null) {
    articleList = JSON.parse(localStorage.getItem('article'));
}
window.onload = function () {
    let data = JSON.parse(this.localStorage.getItem('article'));
    $.each(data, function (i, item) {
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

$(document).ready(function () {
    // Check Radio-box
    $(".rating input:radio").attr("checked", false);

    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });
});
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

    let entry = {};
    entry.id = arrayLength;
    entry.name = $("#rName").val();
    entry.desc = $("#rDesc").val();
    entry.cat = $("#rCat").val();
    entry.rate = r;
    articleList.push(entry);
    console.log(entry);
    localStorage.setItem('article', JSON.stringify(articleList));
}
function formClear() {
    $("#rName").val("");
    $("#rDesc").val("");
    $("#rCat").val("");
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

function displayError(id) {
    document.getElementById(id).style.display = "block";
    document.getElementById(id).innerHTML = document.getElementById(id).getAttribute("name") + " can not be left blank.";
    return false;
}
function clearError() {
    document.getElementById('nMessage').style.display = "none";
    document.getElementById('dMessage').style.display = "none";
    document.getElementById('cMessage').style.display = "none";
    document.getElementById('rMessage').style.display = "none";
}

function deleteMe(entry) {
    $(entry).parents("article").remove();
    //console.log($(entry).parents('article').attr("id"));
    var removeID = $(entry).parents('article').attr("id");
    var removedItem = JSON.parse(localStorage.getItem('article'))[removeID-1];
    var list = JSON.parse(localStorage.getItem('article'));
    list.splice(removedItem, 1);
    localStorage.setItem('article', JSON.stringify(list));
}