var recommandMap;
var scrollRecommandFirst;
var scrollRecommandSecond;
var swiperRecommand;

var imagesRecommand;
var idxPlaceAddImage;

//initialization of the RECOMMAND page
function initializationRecommand(){
    /* INITIALIZATION OF THE RECOMMAND VIEW */
    loadLanguageOnRecommand();
    loadRecommandScript();

    recommandDataSet.initialization();

    swiperRecommand = new Swiper(".recommand-swiper-container", {
        speed: 300
    });
    swiperRecommand.allowTouchMove = false;
    swiperRecommand.slideTo(0, 0, false);

    //스크롤 초기화
    scrollRecommandFirst = new IScroll('#recommand-first-scroll', { 
        bounceTime: 200,
        scrollbars: true,
        fadeScrollbars: true,
        mouseWheel: true,
        probeType: 1}
    );

    scrollRecommandSecond = new IScroll('#recommand-second-scroll', { 
        bounceTime: 200,
        scrollbars: true,
        fadeScrollbars: true,
        mouseWheel: true,
        probeType: 1}
    );
    
    $("#recommand-price").ionRangeSlider({
        min: 0,
        max: 1000,
        type: 'double',
        from:0,
        to:1000,
        prefix: "$",
        onStart: function (data) {
            console.log("onStart: ", data);
            console.log("from: " + data.from);
            console.log("to: " + data.to);
        },
        // onChange: function (data) {
        //     console.log("onChange: " + data);
        // },
        onFinish: function (data) {
            console.log("onFinish: " + data);
            console.log("from: " + data.from);
            console.log("to: " + data.to);
            recommandDataSet.priceFrom = data.from;
            recommandDataSet.priceTo = data.to;
            if(data.from == data.to)
                recommandDataSet.priceType = "s";
            else
                recommandDataSet.priceType = "d";
        },
        // onUpdate: function (data) {
        //     console.log("onUpdate: " + data);
        // }
    });

    $('#recommand-date').daterangepicker({
        "autoApply": true,
        "linkedCalendars": false,
    }, function(start, end, label) {
        recommandDataSet.DateFrom = start.format("YYYY/MM/DD");
        recommandDataSet.DateTo = end.format("YYYY/MM/DD");
        if(start.format("YYYY/MM/DD") == end.format("YYYY/MM/DD"))
            recommandDataSet.DateType = "s";
        else
            recommandDataSet.DateType = "d";
    });
    $('#recommand-date').val("");
}

//set RECOMMAND controls events
function setRecommandControlEvents(){
    $('#page-recommand').off("click");
    $('#page-recommand').on('click', function(event){
        console.log('event.target ' + event.target.nodeName);
        var target = $( event.target );
        if(target.is("INPUT") == false && target.is("TEXTAREA") == false){
            $('#recommand-input-location').blur();
            $('#recommand-note-text').blur();
        }
        else{
            scrollRecommandFirst.refresh();
        }
    });

    $('#r-next').off("click");
    $('#r-next').on('click', function(){
        switch(swiperRecommand.activeIndex)
        {
            case 0:
                recommandDataSet.setRecommendText($("#recommand-note-text").val());
                if(recommandDataSet.images.length < 1 || recommandDataSet.images == null){
                    alert($.lang[language]['msgSelectImage']);
                    return;
                }
                if(recommandDataSet.getRecommendText() == ""){
                    alert($.lang[language]['msgWriteRecommend']);
                    return;
                }
                if(recommandDataSet.getPlaceAddr() == ""){
                    alert($.lang[language]['msgSelectPlace']);
                    return;
                }

                swiperRecommand.slideTo(1, 200, false);
                break;
            case 1:
                recommandDataSet.showDatas();
                reqPlaceAdd();
                break;
        }
    });

    $('#r-back').off("click");
    $('#r-back').on('click', function(){
        switch(swiperRecommand.activeIndex)
        {
            case 0:
                history.back();
                break;
            case 1:
                swiperRecommand.slideTo(0, 200, false);
                break;
        }
    });

    $("#recommand-input-location").off("keyup");
    $("#recommand-input-location").on("keyup", function(e) {
        scrollRecommandFirst.refresh();
    });

    $("#recommand-note-picture").off("click");
    $("#recommand-note-picture").on("click", function(e) {
        pickRecommandPictures();
    });
    
    $("#recommand-language-selector").off("click");
    $("#recommand-language-selector").on("click", function(e) {
        onRecommandLanguageSelector();
    });

    $("#recommand-rating-local").off("click");
    $("#recommand-rating-local").on("click", "li", function(event){
        var local_idx = $("#recommand-rating-local>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > local_idx)
                $("#recommand-rating-local>li:eq("+i+")>div").removeClass("ico-rating-fill-l").addClass("ico-rating-empty-l");
            else
                $("#recommand-rating-local>li:eq("+i+")>div").removeClass("ico-rating-empty-l").addClass("ico-rating-fill-l");
        }

        recommandDataSet.ratingLocal = local_idx + 1;
    });

    $("#recommand-rating-popular").off("click");
    $("#recommand-rating-popular").on("click", "li", function(event){
        var pop_idx = $("#recommand-rating-popular>li").index(this);

        for(var i = 0; i < 5; i++){
            if(i > pop_idx)
                $("#recommand-rating-popular>li:eq("+i+")>div").removeClass("ico-rating-fill-l").addClass("ico-rating-empty-l");
            else
                $("#recommand-rating-popular>li:eq("+i+")>div").removeClass("ico-rating-empty-l").addClass("ico-rating-fill-l");
        }

        recommandDataSet.ratingPopular = pop_idx + 1;
    });

    $("#recommand-language-list").off("click");
    $("#recommand-language-list").on("click", "li", function(event){
        console.log("recommand-language-list li click");
        var pop_idx = $("#recommand-language-list>li").index(this);
        $("#recommand-language-list>li:eq("+pop_idx+")").remove();
        recommandDataSet.removeLanguage(pop_idx);
    });
    
    /* START CONTROLS OF THE RECOMMAND SLIDE */
    /* END CONTROLS OF THE RECOMMAND SLIDE */
}

function initRecommandMap() {
    var pinLocation = new google.maps.LatLng(37.566535,126.977969199999);
    recommandMap = new google.maps.Map(document.getElementById('recommand-map'), {
        center: pinLocation,
        zoom: 15,
        disableDefaultUI: true
    });

    var input = /** @type {!HTMLInputElement} */(document.getElementById('recommand-input-location'));
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', recommandMap);
    
    var marker = new google.maps.Marker({    // Create a new marker
        position: pinLocation,                      // Set its position
        map: recommandMap,                              // Specify the map
        icon: "img/go.png"                        // Path to image from HTML
    });

    autocomplete.addListener('place_changed', function() {
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }
  
        // If the place has a geometry, then present it on a map.
        // if (place.geometry.viewport) {
        //     recommandMap.fitBounds(place.geometry.viewport);
        //     recommandMap.setZoom(17);  // Why 17? Because it looks good.
        // } else {
            recommandMap.setCenter(place.geometry.location);            
            recommandMap.setZoom(17);  // Why 17? Because it looks good.
        // }
        marker.setIcon(/** @type {google.maps.Icon} */({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);        
        
        recommandDataSet.lat = place.geometry.location.lat();
        recommandDataSet.lot = place.geometry.location.lng();
        recommandDataSet.setPlaceAddr(place.formatted_address);
        var address = '';
        var country = '';
        if (place.address_components) {
            for(var i = 0; i < place.address_components.length; i++){
                if(place.address_components[i].types[0] == 'country')
                  country = place.address_components[i].short_name;
            }
            address = place.formatted_address;
  
          // address = [
          //   (place.address_components[0] && place.address_components[0].short_name || ''),
          //   (place.address_components[1] && place.address_components[1].short_name || ''),
          //   (place.address_components[2] && place.address_components[2].short_name || '')
          // ].join(' ');
        }
        reqExitPlace(recommandDataSet.lat, recommandDataSet.lot);
        console.log('place - ' + JSON.stringify(place.geometry.location));
        console.log('address - ' + address);
        console.log('country - ' + country);
    });

    recommandMap.addListener('click', function(e) {
       
    });
}

function loadRecommandScript() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBnfpKEC8KMxtBs6-I9YfDegpnKgfa_ylI&libraries=places&callback=initRecommandMap';
    document.body.appendChild(script);
}

function reqExitPlace(lat, lng){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        place_lat : lat,
        place_lon : lng
    };

    var url = "http://bobo-tripin.com:8080/bla0506A.do";

    $.ajax({
        type: "GET",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, " + response);
            var data = $.parseJSON(response);
            console.log("result, " + data.result);

            if(data.result == "ok"){
                if(data.count > 0){
                    alert($.lang[language]['msgHasPlace']);
                    recommandDataSet.lat = "";
                    recommandDataSet.lot = "";
                    recommandDataSet.setPlaceAddr("");
                    $("#recommand-input-location").val("");
                }
            }
            else{

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

function pickRecommandPictures(){
    window.imagePicker.getPictures(
        function(results) {
            var idx = 0;
            recommandDataSet.images = new Array();
            if(results.length > 0)
                $('#recommand-note-picture-descript-val').text("selected " + results.length + " images");
            for (var i = 0; i < results.length; i++) {
                recommandDataSet.images[i] = results[i];
                console.log('Image URI: ' + results[i]);
                imageBase64(results[i], function (base64Img) {
                    console.log('Image Data: ' + base64Img);
                    //var img = document.createElement('img'); // 이미지 객체 생성
                    //img.src = "data:image/jpeg;base64," + base64Img;
                    
                    $('#recommand-note-picture-view').css("background-image","url(data:image/jpeg;base64," + base64Img + ")");
                    //'background-image: url(data:image/jpeg;base64,' + base64Img + ');"></div>'
                });
            }
            //uploadPics(results);
            //newpinImageUpload($('#newpin-nationals').val());
        }, function (error) {
            console.log('Error: ' + error);
        }, {
          quality: 100,
          width: 800,
          maximumImagesCount: 10
        }
    );
}

function onRecommandLanguageSelector(){
    var configSimple = {
        title: "언어",
        items: [
            [dataLanguages.LanguageType]
        ],
        theme: "light",
        positiveButtonText: "Ok",
        negativeButtonText: "Cancel",
    }

    window.SelectorCordovaPlugin.showSelector(configSimple, function(result) {
        console.log("result: " + JSON.stringify(result));
        // $('#signup-language-val').text(result[0].description);
        var languages = $('<li><span class="lang-id" style="display: none;">'
        + dataLanguages.LanguageType[result[0].index].lang_no + '</span><div>'
        + dataLanguages.LanguageType[result[0].index].lang_name + '<div class="ico-close"></div></div></li>');
        $('#recommand-language-list').append(languages);
        console.log("lang_no : " + dataLanguages.LanguageType[result[0].index].lang_no);
        console.log("lang_name : " + dataLanguages.LanguageType[result[0].index].lang_name);
        console.log("index : " + result[0].index);
        recommandDataSet.addLanguage(dataLanguages.LanguageType[result[0].index].lang_no, dataLanguages.LanguageType[result[0].index].lang_name);
        // idxLanguage = result[0].index;
    });
}

function reqPlaceAdd() {
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var url = "http://bobo-tripin.com:8080/bla0501A.do";
    
    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        
        var data = $.parseJSON(r.response);
        if(data.result == "ok"){
            idxPlaceAddImage = 0;
            reqPlaceImageAdd(data.place_no);
        }
        else{
            $.mobile.loading( "hide" );
            console.log("Msg = " + data.msg);
            alert($.lang[language]['msgUploadFail']);
        }
    }
    
    function fail(error) {
        $.mobile.loading( "hide" );
        alert("fail error. (" + error.code + ")");
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
    
    var options = new FileUploadOptions();
    options.fileKey="place_img";
    options.fileName=recommandDataSet.images[0].substr(recommandDataSet.images[0].lastIndexOf('/')+1);
    options.mimeType="image/jpeg";
    
    var params = {};
    params.place_usr_no = userDataset.usr_no;
    params.place_title = "";
    params.place_type = CD_RECOMMEND_PLACE;
    params.place_price_type = recommandDataSet.priceType;
    params.place_price = recommandDataSet.priceTo;
    params.place_price_usr_no = userDataset.usr_no;
    params.place_time_type = "";
    params.place_time = "";
    params.place_time_usr_no = userDataset.usr_no;
    params.place_date_type = recommandDataSet.DateType;
    params.place_date = recommandDataSet.DateTo;
    params.place_date_usr_no = userDataset.usr_no;
    params.place_day = "";
    params.place_hour = "";
    params.place_min = "";
    params.place_start_price = recommandDataSet.priceFrom;
    params.place_end_price = recommandDataSet.priceTo;
    params.place_start_date = recommandDataSet.DateFrom;
    params.place_end_date = recommandDataSet.DateTo;
    params.place_start_time = "";
    params.place_end_time = "";
    params.place_img_cnt = recommandDataSet.getImagesLen();
    params.place_text = recommandDataSet.getRecommendTextUrl();
    params.place_text_usr_no = userDataset.usr_no;
    params.place_lat = recommandDataSet.lat;
    params.place_lon = recommandDataSet.lot;
    params.place_addr = recommandDataSet.getPlaceAddrUrl();
    params.place_rating_local = recommandDataSet.ratingLocal;
    params.place_rating_popular = recommandDataSet.ratingPopular;
    params.place_rating_totally = "0.0";
    params.place_rating_price = "0.0";
    params.place_rating_location = "0.0";
    params.place_rating_cleanliness = "0.0";
    params.place_rating_communication = "0.0";
    params.place_set = "Y";
    params.place_languages = recommandDataSet.Languages;
    

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(recommandDataSet.images[0], url, win, fail, options);
}

function reqPlaceImageAdd(placeNo) {
    var url = "http://bobo-tripin.com:8080/bla0501B.do";
    
    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        
        var data = $.parseJSON(r.response);
        if(data.result == "ok"){
            idxPlaceAddImage++;
            if(recommandDataSet.getImagesLen() > idxPlaceAddImage)
                reqPlaceImageAdd(placeNo);
            else{
                $.mobile.loading( "hide" );
                alert($.lang[language]['msgUploaded']);
                history.back();
            }
        }
        else{
            $.mobile.loading( "hide" );
            console.log("Msg = " + data.msg);
            alert($.lang[language]['msgUploadFail']);
        }
    }
    
    function fail(error) {
        $.mobile.loading( "hide" );
        alert("fail error. (" + error.code + ")");
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
    
    var options = new FileUploadOptions();
    options.fileKey="place_img";
    options.fileName=recommandDataSet.images[idxPlaceAddImage].substr(recommandDataSet.images[idxPlaceAddImage].lastIndexOf('/')+1);
    options.mimeType="image/jpeg";
    
    var params = {};
    params.place_no = placeNo;
    options.params = params;

    var ft = new FileTransfer();
    ft.upload(recommandDataSet.images[idxPlaceAddImage], url, win, fail, options);
}

//RECOMMAND page show
$(document).on(events, '#page-recommand', function (e) {
    console.log("page-recommand: " + e.type);
    initializationRecommand();
    setRecommandControlEvents();
});