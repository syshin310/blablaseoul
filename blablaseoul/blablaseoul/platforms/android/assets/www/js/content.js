var scrollContent;
var place_no;
var Type_no;

var bRating;

//initialization of the CONTENT page
function initializationContent(){
    /* INITIALIZATION OF THE CONTENT VIEW */
    loadLanguageOnContent();

    //스크롤 초기화
    scrollContent = new IScroll('#content-scroll', { 
        bounceTime: 200,
        scrollbars: true,
        fadeScrollbars: true,
        mouseWheel: true,
        probeType: 1}
    );
    
}

//set CONTENT controls events
function setContentControlEvents(){
    /* START CONTROLS OF THE CONTENT SLIDE */
    $('#page-content').off("click");
    $('#page-content').on('click', function(event){
        console.log('event.target ' + event.target.nodeName);
        var target = $( event.target );
        if(target.is("INPUT") == false && target.is("TEXTAREA") == false){
        }
        else{
            scrollContent.refresh();
        }
    });

    $('#c-set').off("click");
    $('#c-set').on('click', function(){
        swiperRecommand.slideTo(1, 200, false);
    });

    $('#c-back').off("click");
    $('#c-back').on('click', function(){
        history.back();
    });

    $('#content-rating-more').off("click");
    $('#content-rating-more').on('click', function(){
        if($('#content-rating-more').hasClass('btn-more')){
            $('#content-rating-more').removeClass('btn-more');
            $('#content-note-rating-total-sub').show();
            $('#content-rating-more').text("close");
            
            if(bRating == false){
                $('#content-myrating-title').show();
                $('#content-note-rating-my').show();
                $('#content-note-rating-my-sub').show();
                $('#content-note-comment').show();
            }
            scrollContent.refresh();
        }
        else{
            $('#content-rating-more').addClass('btn-more');
            $('#content-note-rating-total-sub').hide();
            $('#content-myrating-title').hide();
            $('#content-note-rating-my').hide();
            $('#content-note-rating-my-sub').hide();
            $('#content-note-comment').hide();
            $('#content-rating-more').text("more..");
            scrollContent.refresh();
        }
    });

    $('#content-comment-more').off("click");
    $('#content-comment-more').on('click', function(){        
        $.mobile.changePage ("rating.html",
        {
            data : {place_no: encodeURIComponent(place_no), addr : encodeURIComponent($('#content-location').text())},
            transition:"slide",
            reverse:false
        });
    });

    $("#content-rating-my").off("click");
    $("#content-rating-my").on("click", "li", function(event){
        var pop_idx = $("#content-rating-my>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > pop_idx)
                $("#content-rating-my>li:eq("+i+")>div").removeClass("ico-rating-fill-l").addClass("ico-rating-empty-l");
            else
                $("#content-rating-my>li:eq("+i+")>div").removeClass("ico-rating-empty-l").addClass("ico-rating-fill-l");
        }

        ratingDataSet.total = pop_idx + 1;
    });

    $("#content-rating-my-price").off("click");
    $("#content-rating-my-price").on("click", "li", function(event){
        var pop_idx = $("#content-rating-my-price>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > pop_idx)
                $("#content-rating-my-price>li:eq("+i+")>div").removeClass("ico-rating-fill").addClass("ico-rating-empty");
            else
                $("#content-rating-my-price>li:eq("+i+")>div").removeClass("ico-rating-empty").addClass("ico-rating-fill");
        }
        ratingDataSet.price = pop_idx + 1;
    });

    $("#content-rating-my-location").off("click");
    $("#content-rating-my-location").on("click", "li", function(event){
        var pop_idx = $("#content-rating-my-location>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > pop_idx)
                $("#content-rating-my-location>li:eq("+i+")>div").removeClass("ico-rating-fill").addClass("ico-rating-empty");
            else
                $("#content-rating-my-location>li:eq("+i+")>div").removeClass("ico-rating-empty").addClass("ico-rating-fill");
        }
        ratingDataSet.location = pop_idx + 1;
    });

    $("#content-rating-my-cleanliness").off("click");
    $("#content-rating-my-cleanliness").on("click", "li", function(event){
        var pop_idx = $("#content-rating-my-cleanliness>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > pop_idx)
                $("#content-rating-my-cleanliness>li:eq("+i+")>div").removeClass("ico-rating-fill").addClass("ico-rating-empty");
            else
                $("#content-rating-my-cleanliness>li:eq("+i+")>div").removeClass("ico-rating-empty").addClass("ico-rating-fill");
        }
        ratingDataSet.cleanliness = pop_idx + 1;
    });

    $("#content-rating-my-communication").off("click");
    $("#content-rating-my-communication").on("click", "li", function(event){
        var pop_idx = $("#content-rating-my-communication>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > pop_idx)
                $("#content-rating-my-communication>li:eq("+i+")>div").removeClass("ico-rating-fill").addClass("ico-rating-empty");
            else
                $("#content-rating-my-communication>li:eq("+i+")>div").removeClass("ico-rating-empty").addClass("ico-rating-fill");
        }
        ratingDataSet.communication = pop_idx + 1;
    });
    
    $('#send-rating').off("click");
    $('#send-rating').on('click', function(){
        ratingDataSet.ratingText = $('#content-input-comment').val();

        switch(mainMode){
            case MAIN_MODE_RECOMMEND:
                reqRatingSend(ratingDataSet);
            break;
            case MAIN_MODE_PUBTOILET:
            case MAIN_MODE_FREEWIFI:
            case MAIN_MODE_TRADIMARKET:
                if(Type_no == place_no){
                    reqTypeRatingSend(ratingDataSet, Type_no);
                }
                else{
                    reqRatingSend(ratingDataSet);
                }
            break;
        }
    });
    /* END CONTROLS OF THE CONTENT SLIDE */
}

function reqRatingSend(rating){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        place_type : "",
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
                reqRecommendPlaceInfo(place_no);
                $("#content-note-rating-my").hide();
                $("#content-note-rating-my-sub").hide();
                $("#content-note-comment").hide();
                bRating = true;
                scrollContent.refresh();
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

function reqTypeRatingSend(rating, type){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        rating_usr_no : userDataset.usr_no,
        rating_place_no : type,
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
        place_type : type,
        place_text : recommandDataSet.recommandText,
        place_lat : recommandDataSet.lat,
        place_lon : recommandDataSet.lot,
        place_addr : recommandDataSet.place,
        place_rating_local : 0.0,
        place_rating_popular : 0.0,
        place_rating_price : 0.0,
        place_rating_location : 0.0,
        place_rating_cleanliness : 0.0,
        place_rating_communication : 0.0,
        place_rating_ids : "",
        place_languages : "",
        place_set : "N"
    };

    var url = "http://bobo-tripin.com:8080/bla0401B.do";

    $.ajax({
        type: "POST",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, " + response);
            var data = $.parseJSON(response);
            console.log("result, " + data.result);

            if(data.result == "ok"){
                if(place_no > 0)
                    place_no = data.place_no;

                alert("rating complated");
                $("#content-myrating-title").hide();
                $("#content-note-rating-my").hide();
                $("#content-note-rating-my-sub").hide();
                $("#content-note-comment").hide();
                reqTypePlaceInfo(type);
                bRating = true;
                scrollContent.refresh();
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

function reqRecommendPlaceInfo(place_no){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        place_no : place_no
    };

    var url = "http://bobo-tripin.com:8080/bla0504A.do";

    $.ajax({
        type: "GET",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, " + response);
            var data = $.parseJSON(response);
            console.log("result, " + data.result);
            console.log("place, " + data.place);

            if(data.result == "ok"){
                setContentData(data.place);

                $('#content-comment-list').empty();
                if(data.ratingList.length == 0){
                    $('.content-comment').hide();
                }
                else{
                    $('.content-comment').show();
                }

                $.each(data.ratingList, function(key,value) {
                    if(value.rating_usr_no == userDataset.usr_no){
                        bRating = true;
                    }
                    loadContentRatingList(value);
                });
            }
            else{

            }

            scrollContent.refresh();
            $.mobile.loading( "hide" );
            //$.mobile.loading( "hide" );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            getAjaxErrMessage(jqXHR.status, jqXHR.statusText, jqXHR.statusText, jqXHR.responseText, textStatus, errorThrown);
            $.mobile.loading( "hide" );
        }
    });
}

function setContentData(place){
    var images = place.place_img_path.split(',');
    $('#content-main-image').css("background-image","url(http://bobo-tripin.com:8080/" + images[0] + ")");
    $('#content-rating-local').empty();
    $('#content-rating-local').append(contentRatingResult(place.place_rating_local));
    $('#content-rating-popular').empty();
    $('#content-rating-popular').append(contentRatingResult(place.place_rating_popular));
    $('#content-rating-totally').empty();
    $('#content-rating-totally').append(contentRatingResult(place.place_rating_totally));
    $('#content-rating-total-price').empty();
    $('#content-rating-total-price').append(contentSubRatingResult(place.place_rating_price));
    $('#content-rating-total-location').empty();
    $('#content-rating-total-location').append(contentSubRatingResult(place.place_rating_location));
    $('#content-rating-total-cleanliness').empty();
    $('#content-rating-total-cleanliness').append(contentSubRatingResult(place.place_rating_cleanliness));
    $('#content-rating-total-communication').empty();
    $('#content-rating-total-communication').append(contentSubRatingResult(place.place_rating_communication));

    $('#content-location').text(Base64.decode(place.place_addr));
    $('#content-text').text(Base64.decode(place.place_text));
    
}

function contentRatingResult(val){
    var rating = "";
    for(var i = 0; i < 5; i++){
        if(i < val)
            rating += '<li><div class="vertical-centered ico-rating-fill-l"></div></li>';
        else
            rating += '<li><div class="vertical-centered ico-rating-empty-l"></div></li>';
            
    }
    return rating;
}

function contentSubRatingResult(val){
    var rating = "";
    for(var i = 0; i < 5; i++){
        if(i < val)
            rating += '<li><div class="vertical-centered ico-rating-fill"></div></li>';
        else
            rating += '<li><div class="vertical-centered ico-rating-empty"></div></li>';
            
    }
    return rating;
}

function loadContentRatingList(rating){
    
    var recommendList = $(
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
        
    $('#content-comment-list').append(recommendList);
}

function reqTypePlaceInfo(no){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        place_type : no
    };

    var url = "http://bobo-tripin.com:8080/bla0403B.do";

    $.ajax({
        type: "GET",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, " + response);
            var data = $.parseJSON(response);
            console.log("result, " + data.result);
            console.log("place_no, " + data.place_no);
            console.log("ratingList, " + data.ratingList);
            
            if(data.result == "ok"){
                if(data.place_no > 0){
                    place_no = data.place_no;

                    $('#content-rating-totally').empty();
                    $('#content-rating-totally').append(contentRatingResult(data.place.place_rating_totally));
                    $('#content-rating-total-price').empty();
                    $('#content-rating-total-price').append(contentSubRatingResult(data.place.place_rating_price));
                    $('#content-rating-total-location').empty();
                    $('#content-rating-total-location').append(contentSubRatingResult(data.place.place_rating_location));
                    $('#content-rating-total-cleanliness').empty();
                    $('#content-rating-total-cleanliness').append(contentSubRatingResult(data.place.place_rating_cleanliness));
                    $('#content-rating-total-communication').empty();
                    $('#content-rating-total-communication').append(contentSubRatingResult(data.place.place_rating_communication));
                }
                
                $('#content-comment-list').empty();
                if(data.ratingList.length == 0){
                    $('.content-comment').hide();
                }
                else{
                    $('.content-comment').show();
                }

                $.each(data.ratingList, function(key,value) {
                    if(value.rating_usr_no == userDataset.usr_no){
                        bRating = true;
                    }
                    loadContentRatingList(value);
                });
            }
            else{
            }

            scrollContent.refresh();
            $.mobile.loading( "hide" );
            //$.mobile.loading( "hide" );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            getAjaxErrMessage(jqXHR.status, jqXHR.statusText, jqXHR.statusText, jqXHR.responseText, textStatus, errorThrown);
            $.mobile.loading( "hide" );
        }
    });
}

//CONTENT page show
$(document).on(events, '#page-content', function (e) {
    console.log("page-content: " + e.type);
    var url = $.url(document.location);
    place_no = decodeURIComponent(url.param("place_no"));
    initializationContent();
    setContentControlEvents();

    switch(mainMode){
        case MAIN_MODE_RECOMMEND:
            reqRecommendPlaceInfo(place_no);
        break;
        case MAIN_MODE_PUBTOILET:
        case MAIN_MODE_FREEWIFI:
        case MAIN_MODE_TRADIMARKET:
            Type_no = place_no;
            reqTypePlaceInfo(Type_no);
            $('#content-main-image').hide();
            $('#content-note-rating-local').hide();
            $('#content-note-rating-popular').hide();
            $('#content-location').text(Base64.decode(recommandDataSet.place));
            $('#content-text').text(Base64.decode(recommandDataSet.recommandText));
        break;
    }
});