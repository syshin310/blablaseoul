var mainMap;
var scrollMainList;
var onMainListSliding = false;
var mainListShowing = false;
var next_recommend_list_no;

var scrollMainListPoint = 0;
var scrollMainListEnd = false;
var scrollMainListTop = false;

var startIdx = 1;
var endIdx = 1000;
var lastPage = false;

//initialization of the MAIN page
function initializationMain(){
    loadLanguageOnMain();

    /* INITIALIZATION OF THE MAIN VIEW */
    startIdx = 1;
    endIdx = 1000;
    lastPage = false;
    if(markerCluster)
        markerCluster.clearMarkers();
    markers = [];

    $(".main-list-container").hide();
    //스크롤 초기화
    scrollMainList = new IScroll('#main-l-scroll', { 
        bounceTime: 200,
        scrollbars: true,
        fadeScrollbars: true,
        mouseWheel: true,
        probeType: 3}
    );

    if(userDataset.usr_language_no == 4){
        $("#main-fab").show();
    }else{
        $("#main-fab").hide();
    }
}

//set MAIN controls events
function setMainControlEvents(){
    /* START CONTROLS OF THE MAIN SLIDE */
    $('#main-btn-recommend').off("click");
    $('#main-btn-recommend').on('click', function(){
        $(".main-list-container").slideUp(350);

        if(markerCluster)
            markerCluster.clearMarkers();
        markers = [];
        mainMode = MAIN_MODE_RECOMMEND;
        mainButtonSelect();
        initMap();
    });

    $('#main-btn-public-toilet').off("click");
    $('#main-btn-public-toilet').on('click', function(){
        $(".main-list-container").slideUp(350);
        startIdx = 1;
        endIdx = 1000;
        lastPage = false;
        if(markerCluster)
            markerCluster.clearMarkers();
        markers = [];
        mainMode = MAIN_MODE_PUBTOILET;
        mainButtonSelect();
        initMap();
    });

    $('#main-btn-free-wifi').off("click");
    $('#main-btn-free-wifi').on('click', function(){
        $(".main-list-container").slideUp(350);
        startIdx = 1;
        endIdx = 1000;
        lastPage = false;
        if(markerCluster)
            markerCluster.clearMarkers();
        markers = [];
        mainMode = MAIN_MODE_FREEWIFI;
        mainButtonSelect();
        initMap();
    });

    $('#main-btn-tradi-market').off("click");
    $('#main-btn-tradi-market').on('click', function(){
        $(".main-list-container").slideUp(350);
        startIdx = 1;
        endIdx = 1000;
        lastPage = false;
        if(markerCluster)
            markerCluster.clearMarkers();
        markers = [];
        mainMode = MAIN_MODE_TRADIMARKET;
        mainButtonSelect();
        initMap();
    });
    
    /* END CONTROLS OF THE MAIN SLIDE */

    //스크롤 이벤트
    scrollMainList.on('scroll', function(){
        console.log("this.directionY : " + this.directionY);
        console.log("this.y : " + this.y);
        if(onMainListSliding == false){
            onMainListSliding = true;
            if(this.directionY > -1){
            }
            else{
                if(this.y > 30){
                }
            }
            onMainListSliding = false;
        }
    });

    scrollMainList.on('scrollEnd', function(){
        if(this.y <= this.maxScrollY){
            scrollMainListTop = false;
            if(scrollMainListEnd == true){
                if(next_recommend_list_no > -1)
                    reqRecommendPlaceList();
                scrollMainListEnd = false;
            }
            else
                scrollMainListEnd = true;
        }
        else if(this.y == 0){
            scrollMainListEnd = false;
            if(scrollMainListTop == true){
                next_recommend_list_no = 0;
                $('#main-l-ul').empty();
                reqRecommendPlaceList();
                scrollMainListTop = false;
            }
            else
                scrollMainListTop = true;
        }
    });
    
    $('#main-l-more').off("click");
    $('#main-l-more').on('click', function(){
        if(mainListShowing == false){
           mainListShowing = true;
            $(".main-list-container").css("transform","none");
            $(".main-list-container").slideDown(350);
            $("#main-l-more").text("닫기");
            scrollMainList.refresh();
            next_recommend_list_no = 0;
            $('#main-l-ul').empty();
            reqRecommendPlaceList();
        }
        else{
            mainListShowing = false;
            $(".main-list-container").slideUp(0);
            $("#main-l-more").text("더보기");
        }
    });

    $('#main-fab').off("click");
    $('#main-fab').on('click', function(){
        $.mobile.changePage ("recommand.html", 
        {
            transition:"slide",
            reverse:false
        });
    });

    $("#main-l-ul").on("click", "li", function(event){
        var place_no = $(this).children().children('.list-data').children('.list-no').text();

        switch(mainMode){
            case MAIN_MODE_RECOMMEND:
            break;
            case MAIN_MODE_PUBTOILET:
                place_no = CD_PUBLIC_TOILET + "-" + place_no;
            break;
            case MAIN_MODE_FREEWIFI:
                place_no = CD_FREE_WIFI + "-" + place_no;
            break;
            case MAIN_MODE_TRADIMARKET:
                place_no = CD_TRADITIONAL_MARKET + "-" + place_no;
            break;
        }

        console.log("place_no : " + place_no);

        $.mobile.changePage ("content.html",
        {
            data : {place_no: encodeURIComponent(place_no)},
            transition:"pop",
            reverse:false
        });
    });
}

function mainButtonSelect(){
    $("#main-btn-recommend").addClass("main-btn-unselect");
    $("#main-btn-public-toilet").addClass("main-btn-unselect");
    $("#main-btn-free-wifi").addClass("main-btn-unselect");
    $("#main-btn-tradi-market").addClass("main-btn-unselect");

    switch(mainMode){
        case MAIN_MODE_RECOMMEND:
            $("#main-btn-recommend").removeClass("main-btn-unselect");
        break;
        case MAIN_MODE_PUBTOILET:
            $("#main-btn-public-toilet").removeClass("main-btn-unselect");
        break;
        case MAIN_MODE_FREEWIFI:
            $("#main-btn-free-wifi").removeClass("main-btn-unselect");
        break;
        case MAIN_MODE_TRADIMARKET:
            $("#main-btn-tradi-market").removeClass("main-btn-unselect");
        break;
    }
}

//클릭 이벤트 발생 시 그 좌표를 주소로 변환하는 함수입니다.
var geocoder;

var markers = [];
var markerCluster;

function initMap() {
    geocoder = new google.maps.Geocoder();
    var pinLocation = new google.maps.LatLng(37.566535,126.977969199999);
    mainMap = new google.maps.Map(document.getElementById('main-map'), {
        center: pinLocation,
        zoom: 11,
        disableDefaultUI: true
    });

    mainMap.addListener('click', function(e) {
        $(".main-list-container").slideUp(350);
    });

    switch(mainMode){
        case MAIN_MODE_RECOMMEND:
            $("#main-l-title").text($.lang[language]['recommend']);
            $("#main-l-more").show();
            reqMapRecommendPlaceList();
        break;
        case MAIN_MODE_PUBTOILET:
            $("#main-l-title").text($.lang[language]['publicToilet']);
            $("#main-l-more").hide();
            reqPublicToiletList();
        break;
        case MAIN_MODE_FREEWIFI:
            $("#main-l-title").text($.lang[language]['freeWifi']);
            $("#main-l-more").hide();
            reqFreeWifiList();
        break;
        case MAIN_MODE_TRADIMARKET:
            $("#main-l-title").text($.lang[language]['tradiMarket']);
            $("#main-l-more").hide();
            reqMarketList();
        break;
    }
}

function loadScript() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBnfpKEC8KMxtBs6-I9YfDegpnKgfa_ylI&callback=initMap';
    document.body.appendChild(script);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function addRecommandMarkers(placeList){

    for (var i = 0; i < placeList.length; i++) {
        var latLng = new google.maps.LatLng(placeList[i].place_lat,
            placeList[i].place_lon);

        var marker = new google.maps.Marker({
            title: ""+placeList[i].place_no,
            position: latLng,
            icon: "img/go.png"
        });
     
        var fn = markerClickFunction(placeList[i].place_no, latLng);
        google.maps.event.addListener(marker, 'click', fn);
        // google.maps.event.addListener(marker, 'click', function(e) {
        //     console.log("click marker, " + marker.getTitle());
            
        //     reqMapRecommendPlaceInfo(marker.getTitle());
        //     $(".main-list-container").css("transform","translateY(-40%)");
        //     $(".main-list-container").slideDown(350);
        //     scrollMainList.refresh();
        // });
        markers.push(marker);
    }

    markerCluster = new MarkerClusterer(mainMap, markers, {
        gridSize: 80,
        styles: mapStyles
    });
}

markerClickFunction = function(placeNo, latlng) {
    return function(e) {
        console.log("click marker, " + placeNo);
            
        reqMapRecommendPlaceInfo(placeNo);
        $(".main-list-container").css("transform","translateY(-40%)");
        $(".main-list-container").slideDown(350);
        scrollMainList.refresh();
    };
};

function reqMapRecommendPlaceList(){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        next_list_no : 0
    };

    var url = "http://bobo-tripin.com:8080/bla0505B.do";

    $.ajax({
        type: "GET",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, " + response);
            var data = $.parseJSON(response);
            console.log("result, " + data.result);
            console.log("placeList, " + data.placeList);

            if(data.result == "ok"){
                addRecommandMarkers(data.placeList);
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

function reqMapRecommendPlaceInfo(placeNo){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        place_no : placeNo
    };

    var url = "http://bobo-tripin.com:8080/bla0504B.do";
    //var url = "http://localhost:8080/controller/bla0504B.do";

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
                loadPlaceInfo(data.place);
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

function loadPlaceInfo(place){
    $('#main-l-ul').empty();
    var images = place.place_img_path.split(',');
    
    var recommendList = $(
    '<li>'+
        '<div class="list-grp">'+
            '<div class="div-horizontal-33">'+
                '<div class="list-image background-color-lightpurple" style="width:100%; height:100%; background-repeat: no-repeat; background-position: center; background-size: cover; object-fit: cover; background-image: url(http://bobo-tripin.com:8080/' + images[0] + ');"></div>'+
            '</div>'+
            '<div class="list-data div-horizontal-66">'+
                '<div class="list-no" style="display: none;">' + place.place_no + '</div>'+
                '<div class="list-data div-vertical-66">'+
                    '<div class="div-vertical-66">'+
                        '<div class="list-text appcolor-darkpurple appfont-secondarybody" >' + Base64.decode(place.place_text) + '</div>'+
                    '</div>'+
                    '<div class="div-vertical-33">'+
                        '<div class="list-addr appcolor-darkpurple appfont-secondarybody-b" >' + Base64.decode(place.place_addr) + '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="div-vertical-33">'+
                    '<div class="rating-grp">'+
                        mainRatingResult(place.place_rating_totally)+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</li>');
        
    $('#main-l-ul').append(recommendList);
}

function reqRecommendPlaceList(){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        next_list_no : next_recommend_list_no
    };

    var url = "http://bobo-tripin.com:8080/bla0505A.do";

    $.ajax({
        type: "GET",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, " + response);
            var data = $.parseJSON(response);
            console.log("result, " + data.result);
            //console.log("placeList, " + data.placeList);

            if(data.result == "ok"){
                next_recommend_list_no = data.next_list_no;
                $.each(data.placeList, function(key,value) {
                    addOnListPlaceInfo(value);
                });
                scrollMainList.refresh();
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

function addOnListPlaceInfo(place){
    var images = place.place_img_path.split(',');

    var recommendList = $(
    '<li>'+
        '<div class="list-grp">'+
            '<div class="div-horizontal-33">'+
                '<div class="list-image background-color-lightpurple" style="width:100%; height:100%; background-repeat: no-repeat; background-position: center; background-size: cover; object-fit: cover; background-image: url(http://bobo-tripin.com:8080/' + images[0] + ');"></div>'+
            '</div>'+
            '<div class="list-data div-horizontal-66">'+
                '<div class="list-no" style="display: none;">' + place.place_no + '</div>'+
                '<div class="div-vertical-66">'+
                    '<div class="div-vertical-66">'+
                        '<div class="list-text appcolor-darkpurple appfont-secondarybody" >' + Base64.decode(place.place_text) + '</div>'+
                    '</div>'+
                    '<div class="div-vertical-33">'+
                        '<div class="list-addr appcolor-darkpurple appfont-secondarybody-b" >' + Base64.decode(place.place_addr) + '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="div-vertical-33">'+
                    '<div class="rating-grp">'+
                        mainRatingResult(place.place_rating_totally)+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</li>');
        
    $('#main-l-ul').append(recommendList);
}

function mainRatingResult(val){
    var rating = "";
    for(var i = 0; i < 5; i++){
        if(i < val)
            rating += '<div class="ico-rating-fill align-rating" ></div>';
        else
            rating += '<div class="ico-rating-empty align-rating" ></div>';
            
    }
    return rating;
}

function reqPublicToiletList(){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
    };

    var url = "http://openAPI.seoul.go.kr:8088/" 
                + OPENAPI_SEOUL_KEY + "/"
                + "json" + "/"
                + OPENAPI_SEOUL_SERVICE_PUBLICTOILET + "/"
                + startIdx + "/"
                + endIdx;

    $.ajax({
        type: "GET",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, ", response);
            var data = response;
            console.log("GeoInfoPublicToiletWGS, " + data.GeoInfoPublicToiletWGS);
            console.log("list_total_count, " + data.GeoInfoPublicToiletWGS.list_total_count);
            if(data.GeoInfoPublicToiletWGS.RESULT.CODE == "INFO-000") {
                
                addToiletMarkers(data.GeoInfoPublicToiletWGS.row);
                
                if(lastPage == false){
                    startIdx = endIdx + 1;
                    endIdx = endIdx + 1000;
                    if(endIdx > data.GeoInfoPublicToiletWGS.list_total_count){
                        endIdx = data.GeoInfoPublicToiletWGS.list_total_count;
                        lastPage = true;
                    }

                    if(startIdx < data.GeoInfoPublicToiletWGS.list_total_count)
                        reqPublicToiletList();
                    else
                        $.mobile.loading( "hide" );
                }
                else{
                    $.mobile.loading( "hide" );
                }
            }
            else{
                $.mobile.loading( "hide" );
            }
            
            //$.mobile.loading( "hide" );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            getAjaxErrMessage(jqXHR.status, jqXHR.statusText, jqXHR.statusText, jqXHR.responseText, textStatus, errorThrown);
            $.mobile.loading( "hide" );
        }
    });
}

function addToiletMarkers(toilet){
    for (var i = 0; i < toilet.length; i++) {
        var latLng = new google.maps.LatLng(toilet[i].LAT, toilet[i].LNG);

        var marker = new google.maps.Marker({
            title: ""+toilet[i].OBJECTID,
            position: latLng,
            icon: "img/go.png"
        });
     
        var fn = toiletMarkerClickFunction(toilet[i].OBJECTID, latLng);
        google.maps.event.addListener(marker, 'click', fn);
        // google.maps.event.addListener(marker, 'click', function(e) {
        //     console.log("click marker, " + marker.getTitle());
            
        //     reqMapRecommendPlaceInfo(marker.getTitle());
        //     $(".main-list-container").css("transform","translateY(-40%)");
        //     $(".main-list-container").slideDown(350);
        //     scrollMainList.refresh();
        // });
        markers.push(marker);
    }

    markerCluster = new MarkerClusterer(mainMap, markers, {
        gridSize: 80,
        styles: mapStyles
    });
}

toiletMarkerClickFunction = function(toiletId, latlng) {
    return function(e) {
        console.log("click marker, " + toiletId);
        reqMapToiletInfo(toiletId, latlng);
    };
};

function reqMapToiletInfo(type, latlng){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        place_type : CD_PUBLIC_TOILET + "-" + type
    };

    var url = "http://bobo-tripin.com:8080/bla0504C.do";
    
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
                if(data.place != null)
                    toiletInfo(type, latlng, data.place.place_rating_totally);
                else
                    toiletInfo(type, latlng, 0);
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

function toiletInfo(toiletId, latLng, rating) {
    //이벤트 발생 시 그 좌표에 마커를 생성합니다.
    // 좌표를 받아 reverse geocoding(좌표를 주소로 바꾸기)를 실행합니다.
    geocoder.geocode({'latLng' : latLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)  {
            if (results[1]){
                console.log("address : " + results[1].formatted_address);
                loadToiletInfo(toiletId, results[1].formatted_address, rating);

                recommandDataSet.setRecommendText($.lang[language]['publicToilet']);
                recommandDataSet.setPlaceAddr(results[1].formatted_address);
                recommandDataSet.lat = latLng.lat();
                recommandDataSet.lot = latLng.lng();
            }
        }
    });
}

function loadToiletInfo(id, addr, rating){
    $('#main-l-ul').empty();
    var toiletList = $(
    '<li>'+
        '<div class="list-grp">'+
            '<div class="div-horizontal-33">'+
                '<div class="list-image img-public-toilet" style="width:100% !important; height:100%; background-repeat: no-repeat; background-position: center; background-size: auto; object-fit: cover;"></div>'+
            '</div>'+
            '<div class="list-data div-horizontal-66">'+
                '<div class="list-no" style="display: none;">' + id + '</div>'+
                '<div class="div-vertical-66">'+
                    '<div class="div-vertical-66">'+
                        '<div class="list-text appcolor-darkpurple appfont-secondarybody" >' + $.lang[language]['publicToilet'] + '</div>'+
                    '</div>'+
                    '<div class="div-vertical-33">'+
                        '<div class="list-addr appcolor-darkpurple appfont-secondarybody-b" >' + addr + '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="div-vertical-33">'+
                    '<div class="rating-grp">'+
                        mainRatingResult(rating)+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</li>');
        
    $('#main-l-ul').append(toiletList);
    $(".main-list-container").css("transform","translateY(-40%)");
    $(".main-list-container").slideDown(350);
    scrollMainList.refresh();
}

function reqFreeWifiList(){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
    };

    var url = "http://openAPI.seoul.go.kr:8088/" 
                + OPENAPI_SEOUL_KEY + "/"
                + "json" + "/"
                + OPENAPI_SEOUL_SERVICE_FREEWIFI + "/"
                + startIdx + "/"
                + endIdx;

    $.ajax({
        type: "GET",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, ", response);
            var data = response;
            console.log("MgisWifi, " + data.MgisWifi);
            console.log("list_total_count, " + data.MgisWifi.list_total_count);
            if(data.MgisWifi.RESULT.CODE == "INFO-000") {
                
                addWifiMarkers(data.MgisWifi.row);
                
                if(lastPage == false){
                    startIdx = endIdx + 1;
                    endIdx = endIdx + 1000;
                    if(endIdx > data.MgisWifi.list_total_count){
                        endIdx = data.MgisWifi.list_total_count;
                        lastPage = true;
                    }

                    if(startIdx < data.MgisWifi.list_total_count)
                        reqFreeWifiList();
                    else
                        $.mobile.loading( "hide" );
                }
                else{
                    $.mobile.loading( "hide" );
                }
            }
            else{
                $.mobile.loading( "hide" );
            }

            
            //$.mobile.loading( "hide" );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            getAjaxErrMessage(jqXHR.status, jqXHR.statusText, jqXHR.statusText, jqXHR.responseText, textStatus, errorThrown);
            $.mobile.loading( "hide" );
        }
    });
}

function addWifiMarkers(wifi){
    for (var i = 0; i < wifi.length; i++) {
        var latLng = new google.maps.LatLng(wifi[i].COT_COORD_Y,
            wifi[i].COT_COORD_X);

        var marker = new google.maps.Marker({
            title: ""+wifi[i].COT_CONTS_ID,
            position: latLng,
            icon: "img/go.png"
        });
     
        var fn = wifiMarkerClickFunction(wifi[i].COT_CONTS_ID, latLng, wifi[i].COT_ADDR_FULL_NEW, wifi[i].COT_CONTS_NAME);
        google.maps.event.addListener(marker, 'click', fn);
        // google.maps.event.addListener(marker, 'click', function(e) {
        //     console.log("click marker, " + marker.getTitle());
            
        //     reqMapRecommendPlaceInfo(marker.getTitle());
        //     $(".main-list-container").css("transform","translateY(-40%)");
        //     $(".main-list-container").slideDown(350);
        //     scrollMainList.refresh();
        // });
        markers.push(marker);
    }

    markerCluster = new MarkerClusterer(mainMap, markers, {
        gridSize: 80,
        styles: mapStyles
    });
}

wifiMarkerClickFunction = function(wifiId, latlng, addr, name) {
    return function(e) {
        console.log("click marker, " + wifiId);
        reqMapWifiInfo(wifiId, addr, name);
        recommandDataSet.setRecommendText(name);
        recommandDataSet.setPlaceAddr(addr);
        recommandDataSet.lat = latlng.lat();
        recommandDataSet.lot = latlng.lng();
    };
};

function reqMapWifiInfo(type, addr, name){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        place_type : CD_FREE_WIFI + "-" + type
    };

    var url = "http://bobo-tripin.com:8080/bla0504C.do";
    
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
                if(data.place != null)
                    loadWifiInfo(type, addr, name, data.place.place_rating_totally);
                else
                    loadWifiInfo(type, addr, name, 0);
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

function loadWifiInfo(id, addr, name, rating){
    $('#main-l-ul').empty();
    var wifiList = $(
    '<li>'+
        '<div class="list-grp">'+
            '<div class="div-horizontal-33">'+
                '<div class="list-image img-free-wifi" style="width:100% !important; height:100%; background-repeat: no-repeat; background-position: center; background-size: auto; object-fit: cover;"></div>'+
            '</div>'+
            '<div class="list-data div-horizontal-66">'+
                '<div class="list-no" style="display: none;">' + id + '</div>'+
                '<div class="div-vertical-66">'+
                    '<div class="div-vertical-66">'+
                        '<div class="list-text appcolor-darkpurple appfont-secondarybody" >' + name + '</div>'+
                    '</div>'+
                    '<div class="div-vertical-33">'+
                        '<div class="list-addr appcolor-darkpurple appfont-secondarybody-b" >' + addr + '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="div-vertical-33">'+
                    '<div class="rating-grp">'+
                        mainRatingResult(rating)+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</li>');
        
    $('#main-l-ul').append(wifiList);
    $(".main-list-container").css("transform","translateY(-40%)");
    $(".main-list-container").slideDown(350);
    scrollMainList.refresh();
}

function reqMarketList(){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
    };

    var url = "http://openAPI.seoul.go.kr:8088/" 
                + OPENAPI_SEOUL_KEY + "/"
                + "json" + "/"
                + OPENAPI_SEOUL_SERVICE_TRADIMARKET + "/"
                + startIdx + "/"
                + endIdx;

    $.ajax({
        type: "GET",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, ", response);
            var data = response;
            console.log("MgisTraShop, " + data.MgisTraShop);
            console.log("list_total_count, " + data.MgisTraShop.list_total_count);
            if(data.MgisTraShop.RESULT.CODE == "INFO-000") {
                
                addMarketMarkers(data.MgisTraShop.row);
                
                if(lastPage == false){
                    startIdx = endIdx + 1;
                    endIdx = endIdx + 1000;
                    if(endIdx > data.MgisTraShop.list_total_count){
                        endIdx = data.MgisTraShop.list_total_count;
                        lastPage = true;
                    }

                    if(startIdx < data.MgisTraShop.list_total_count)
                        reqMarketList();
                    else
                        $.mobile.loading( "hide" );
                }
                else{
                    $.mobile.loading( "hide" );
                }
            }
            else{
                $.mobile.loading( "hide" );
            }

            
            //$.mobile.loading( "hide" );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            getAjaxErrMessage(jqXHR.status, jqXHR.statusText, jqXHR.statusText, jqXHR.responseText, textStatus, errorThrown);
            $.mobile.loading( "hide" );
        }
    });
}

function addMarketMarkers(market){
    for (var i = 0; i < market.length; i++) {
        var latLng = new google.maps.LatLng(market[i].COT_COORD_Y,
            market[i].COT_COORD_X);

        var marker = new google.maps.Marker({
            title: ""+market[i].COT_CONTS_ID,
            position: latLng,
            icon: "img/go.png"
        });
     
        var fn = marketMarkerClickFunction(market[i].COT_CONTS_ID, latLng, market[i].COT_ADDR_FULL_NEW, market[i].COT_CONTS_NAME);
        google.maps.event.addListener(marker, 'click', fn);
        // google.maps.event.addListener(marker, 'click', function(e) {
        //     console.log("click marker, " + marker.getTitle());
            
        //     reqMapRecommendPlaceInfo(marker.getTitle());
        //     $(".main-list-container").css("transform","translateY(-40%)");
        //     $(".main-list-container").slideDown(350);
        //     scrollMainList.refresh();
        // });
        markers.push(marker);
    }

    markerCluster = new MarkerClusterer(mainMap, markers, {
        gridSize: 80,
        styles: mapStyles
    });
}

marketMarkerClickFunction = function(marketId, latlng, addr, name) {
    return function(e) {
        console.log("click marker, " + marketId);
        reqMapMarketInfo(marketId, addr, name);
        recommandDataSet.setRecommendText(name);
        recommandDataSet.setPlaceAddr(addr);
        recommandDataSet.lat = latlng.lat();
        recommandDataSet.lot = latlng.lng();
    };
};

function reqMapMarketInfo(type, addr, name){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        place_type : CD_FREE_WIFI + "-" + type
    };

    var url = "http://bobo-tripin.com:8080/bla0504C.do";
    
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
                if(data.place != null)
                    loadMarketInfo(type, addr, name, data.place.place_rating_totally);
                else
                    loadMarketInfo(type, addr, name, 0);
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

function loadMarketInfo(id, addr, name, rating){
    $('#main-l-ul').empty();
    var marketList = $(
    '<li>'+
        '<div class="list-grp">'+
            '<div class="div-horizontal-33">'+
                '<div class="list-image img-tradi-market" style="width:100% !important; height:100%; background-repeat: no-repeat; background-position: center; background-size: auto; object-fit: cover;"></div>'+
            '</div>'+
            '<div class="list-data div-horizontal-66">'+
                '<div class="list-no" style="display: none;">' + id + '</div>'+
                '<div class="div-vertical-66">'+
                    '<div class="div-vertical-66">'+
                        '<div class="list-text appcolor-darkpurple appfont-secondarybody" >' + name + '</div>'+
                    '</div>'+
                    '<div class="div-vertical-33">'+
                        '<div class="list-addr appcolor-darkpurple appfont-secondarybody-b" >' + addr + '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="div-vertical-33">'+
                    '<div class="rating-grp">'+
                        mainRatingResult(rating)+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</li>');
        
    $('#main-l-ul').append(marketList);
    $(".main-list-container").css("transform","translateY(-40%)");
    $(".main-list-container").slideDown(350);
    scrollMainList.refresh();
}

//MAIN page show
$(document).on(events, '#page-main', function (e) {
    console.log("page-main: " + e.type);
    initializationMain();
    setMainControlEvents();
    loadScript();
    mainButtonSelect();
});