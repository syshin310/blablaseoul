var scrollRating;
var next_rating_list_no;

//initialization of the RATING page
function initializationRating(){
    /* INITIALIZATION OF THE RATING VIEW */
    loadLanguageOnRating();
    scrollRating = new IScroll('#rating-scroll', { 
        bounceTime: 200,
        scrollbars: true,
        fadeScrollbars: true,
        mouseWheel: true,
        probeType: 1}
    );
}

//set RATING controls events
function setRatingControlEvents(){
    /* START CONTROLS OF THE RATING SLIDE */
    $('#rt-back').off("click");
    $('#rt-back').on('click', function(){
        history.back();
    });

    $("#rating-rating-my").off("click");
    $("#rating-rating-my").on("click", "li", function(event){
        var pop_idx = $("#rating-rating-my>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > pop_idx)
                $("#rating-rating-my>li:eq("+i+")>div").removeClass("ico-rating-fill-l").addClass("ico-rating-empty-l");
            else
                $("#rating-rating-my>li:eq("+i+")>div").removeClass("ico-rating-empty-l").addClass("ico-rating-fill-l");
        }

        ratingDataSet.total = pop_idx + 1;
    });

    $("#rating-rating-my-price").off("click");
    $("#rating-rating-my-price").on("click", "li", function(event){
        var pop_idx = $("#rating-rating-my-price>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > pop_idx)
                $("#rating-rating-my-price>li:eq("+i+")>div").removeClass("ico-rating-fill").addClass("ico-rating-empty");
            else
                $("#rating-rating-my-price>li:eq("+i+")>div").removeClass("ico-rating-empty").addClass("ico-rating-fill");
        }
        ratingDataSet.price = pop_idx + 1;
    });

    $("#rating-rating-my-location").off("click");
    $("#rating-rating-my-location").on("click", "li", function(event){
        var pop_idx = $("#rating-rating-my-location>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > pop_idx)
                $("#rating-rating-my-location>li:eq("+i+")>div").removeClass("ico-rating-fill").addClass("ico-rating-empty");
            else
                $("#rating-rating-my-location>li:eq("+i+")>div").removeClass("ico-rating-empty").addClass("ico-rating-fill");
        }
        ratingDataSet.location = pop_idx + 1;
    });

    $("#rating-rating-my-cleanliness").off("click");
    $("#rating-rating-my-cleanliness").on("click", "li", function(event){
        var pop_idx = $("#rating-rating-my-cleanliness>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > pop_idx)
                $("#rating-rating-my-cleanliness>li:eq("+i+")>div").removeClass("ico-rating-fill").addClass("ico-rating-empty");
            else
                $("#rating-rating-my-cleanliness>li:eq("+i+")>div").removeClass("ico-rating-empty").addClass("ico-rating-fill");
        }
        ratingDataSet.cleanliness = pop_idx + 1;
    });

    $("#rating-rating-my-communication").off("click");
    $("#rating-rating-my-communication").on("click", "li", function(event){
        var pop_idx = $("#rating-rating-my-communication>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > pop_idx)
                $("#rating-rating-my-communication>li:eq("+i+")>div").removeClass("ico-rating-fill").addClass("ico-rating-empty");
            else
                $("#rating-rating-my-communication>li:eq("+i+")>div").removeClass("ico-rating-empty").addClass("ico-rating-fill");
        }
        ratingDataSet.communication = pop_idx + 1;
    });
    
    $('#rating-rating-send').off("click");
    $('#rating-rating-send').on('click', function(){
        ratingDataSet.ratingText = $('#rating-input-comment').val();
        reqRatingRatingSend(ratingDataSet);
    });
    /* END CONTROLS OF THE RATING SLIDE */
}

function reqRatingRatingSend(rating){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        rating_usr_no : userDataset.usr_no,
        rating_place_no : place_no,
        rating_type : "M1",
        rating_text : Base64.encode(rating.ratingText),
        rating_local : 0.0,
        rating_popular : 0.0,
        rating_totally : rating.total,
        rating_price : rating.price,
        rating_location : rating.location,
        rating_cleanliness : rating.cleanliness,
        rating_communication : rating.communication,
        rating_ids : "",
        rating_points : "",
    };

    var url = "http://bobo-tripin.com:8080/bla0401A.do";

    $.ajax({
        type: "POST",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, " + response);
            var data = $.parseJSON(response);
            console.log("result, " + data.result);

            if(data.result == "ok"){
                alert("rating complated");
                $("#rating-myrating-title").hide();
                $("#rating-note-rating-my").hide();
                $("#rating-note-rating-my-sub").hide();
                $("#rating-note-comment").hide();
                bRating = true;
                scrollRating.refresh();
            }
            else{
                alert("rating failed");
            }

            $.mobile.loading( "hide" );
            //$.mobile.loading( "hide" );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            getAjaxErrMessage(jqXHR.status, jqXHR.statusText, jqXHR.statusText, jqXHR.responseText, textStatus, errorThrown);
            $.mobile.loading( "hide" );
        }
    });
}

function reqPlaceRatingInfo(place_no){
    var sparam = {
        rating_place_no : place_no,
        next_list_no : next_rating_list_no
    };

    var url = "http://bobo-tripin.com:8080/bla0403A.do";

    $.ajax({
        type: "GET",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, " + response);
            var data = $.parseJSON(response);
            console.log("result, " + data.result);
            

            if(data.result == "ok"){
                $.each(data.ratingList, function(key,value) {
                    if(value.rating_usr_no == userDataset.usr_no){
                        bRating = true;
                    }
                    loadRatingList(value);
                });

                if(bRating == true){
                    $("#rating-myrating-title").hide();
                    $("#rating-note-rating-my").hide();
                    $("#rating-note-rating-my-sub").hide();
                    $("#rating-note-comment").hide();
                }else{
                    $("#rating-myrating-title").show();
                    $("#rating-note-rating-my").show();
                    $("#rating-note-rating-my-sub").show();
                    $("#rating-note-comment").show();
                }
            }
            else{

            }

            scrollRating.refresh();
            $.mobile.loading( "hide" );
            //$.mobile.loading( "hide" );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            getAjaxErrMessage(jqXHR.status, jqXHR.statusText, jqXHR.statusText, jqXHR.responseText, textStatus, errorThrown);
            $.mobile.loading( "hide" );
        }
    });
}

function loadRatingList(rating){
    
    var ratingList = $(
    '<li>'+
        '<div class="comment-lbox">'+
            '<div class="comment-profile-img" style="background-image: url(http://bobo-tripin.com:8080/' + rating.rating_usr_img_path + ');"></div>'+
        '</div>'+
        '<div class="comment-cbox">'+
            '<div class="div-vertical-26">'+
                '<div class="div-horizontal-50">'+
                    '<div class="comment-name appcolor-darkpurple appfont-largebutton-b">'+ rating.rating_usr_id + '</div>'+
                '</div>'+
                '<div class="div-horizontal-50">'+
                    '<div class="comment-rating">'+
                        '<div class="rating-grp comment-rating-content">'+
                            '<ul class="content-rating">'+
                                contentSubRatingResult(rating.rating_totally)+
                            '</ul>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="div-vertical-74">'+
                '<div class="comment-text appcolor-darkpurple appfont-largebutton">'+
                    Base64.decode(rating.rating_text) +
                '</div>'+
            '</div>'+
        '</div>'+
    '</li>');
        
    $('#rating-comment-list').append(ratingList);
}

//RATING page show
$(document).on(events, '#page-rating', function (e) {
    console.log("page-rating: " + e.type);
    var url = $.url(document.location);
    place_no = decodeURIComponent(url.param("place_no"));
    addr = decodeURIComponent(url.param("addr"));
    $("#rt-title").text(addr);
    next_rating_list_no = 0;
    $('#rating-comment-list').empty();
    initializationRating();
    setRatingControlEvents();
    reqPlaceRatingInfo(place_no);
});