var swiperSign;
var scrollSignup;

var dataCountries = {
    CountryType: [
    ]
};

var dataLanguages = {
    LanguageType: [
    ]
};

var profileImg;
var idxCountry = -1;
var idxLanguage = -1;

var chkEmail = false;
var chkPwd = false;
var chkPwdchk = false;
var chkProfile = false;
var chkLanguage = false;
var chkCountry = false;

//initialization of the SIGN page
function initializationSign(){
    /* INITIALIZATION OF THE SIGN VIEW */
    //loadLanguageOnLogin();
    swiperSign = new Swiper(".sign-swiper-container", {
        speed: 300
    });
    swiperSign.allowTouchMove = false;
    swiperSign.slideTo(0, 0, false);
    //swiperSign.slideTo(1, 300, false);

    //스크롤 초기화
    scrollSignup = new IScroll('#signup-scroll', { 
        bounceTime: 200,
        scrollbars: true,
        fadeScrollbars: true,
        mouseWheel: true,
        probeType: 1}
    );
}

//set SIGN controls events
function setSignControlEvents(){
    $('#page-sign').off("click");
    $('#page-sign').on('click', function(event){
        console.log('event.target ' + event.target.nodeName);
        var target = $( event.target );
        if(target.is("input") == false){
            $('#signup-input-email').blur();
            $('#signup-input-password').blur();
            $('#signup-input-password-chk').blur();
        }
        else{
            scrollSignup.refresh();
        }
    });

    /* START CONTROLS OF THE SIGN UP SLIDE */
    $("#signin-btn-signup").off("click");
    $("#signin-btn-signup").on('click', function(){
       swiperSign.slideTo(1, 300, false);
    });

    $("#signin-btn-signin").off("click");
    $("#signin-btn-signin").on('click', function(){
        var email = $("#signin-input-email").val();
        var password = $("#signin-input-password").val();

        if(email == null){
            alert($.lang[language]['msgErrInputEmail']);
        }
        if(password == null){
            alert($.lang[language]['msgErrInputPwd']);
        }

        reqSignin(email, password);
    });
    /* END CONTROLS OF THE SIGN UP SLIDE */

    /* START CONTROLS OF THE SIGN UP SLIDE */
    $("#signup-back").off("click");
    $('#signup-back').on('click', function(){
        swiperSign.slideTo(0, 0, false);
    });

    $("#signup-input-email").change(function() {
        var email = $("#signup-input-email").val();
        var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if(exptext.test(email)==false){
            $("#signup-guidance").text($.lang[language]['msgErrEmailCorrect']);
            chkEmail = false;
        }
        else{
            $("#signup-guidance").text($.lang[language]['msgErrEmailCheck']);
            chkEmail = true;
        }
    });

    $("#signup-input-password").change(function() {
        if($("#signup-input-password").val().length < 6){
            $("#signup-guidance").text($.lang[language]['msgErrPwdLength']);
            chkPwd = false;
        }
        else{
            $("#signup-guidance").text($.lang[language]['msgErrPwdCheck']);
            chkPwd = true;
        }
    });

    $("#signup-input-password-chk").change(function() {
        var ori = $("#signup-input-password").val();
        var chk = $("#signup-input-password-chk").val();
        if(ori != chk){
            $("#signup-guidance").text($.lang[language]['msgErrPwdCorrect']);
            chkPwdchk = false;
        }
        else{
            $("#signup-guidance").text($.lang[language]['msgErrPwdCheck']);
            chkPwdchk = true;
        }
    });

    $("#signup-country").off("click");
    $('#signup-country').on('click', function(){
        onCountrySelector();
    });
    
    $("#signup-language").off("click");
    $('#signup-language').on('click', function(){
        onLanguageSelector();
    });

    $('#signup-profile').off("click");
    $('#signup-profile').on('click', function(){
        pickAddProfilePicture();
    });
    
    $('#signup-btn-signup').off("click");
    $('#signup-btn-signup').on('click', function(){
        if(chkEmail == false){
            $("#signup-guidance").text($.lang[language]['msgErrEmailCorrect']);
            return;
        }
        if(chkPwd == false){
            $("#signup-guidance").text($.lang[language]['msgErrPwdLength']);
            return;
        }
        if(chkPwdchk == false){
            $("#signup-guidance").text($.lang[language]['msgErrPwdCorrect']);
            return;
        }
        if(profileImg == null){
            $("#signup-guidance").text($.lang[language]['msgErrProfileImg']);
            return;
        }
        if(idxCountry < 0){
            $("#signup-guidance").text($.lang[language]['msgErrCountry']);
            return;
        }
        if(idxLanguage < 0){
            $("#signup-guidance").text($.lang[language]['msgErrLanguage']);
            return;
        }

        $("#signup-guidance").text($.lang[language]['msgWaiting']);
        fileSubmit(
            $('#signup-input-email').val(),
            $('#signup-input-password').val(),
            dataCountries.CountryType[idxCountry].nat_no,
            dataLanguages.LanguageType[idxLanguage].lang_no,
            dataLanguages.LanguageType[idxLanguage].lang_name
        );
    });
    /* END CONTROLS OF THE SIGN UP SLIDE */
}

function onCountrySelector(){
    var configSimple = {
        title: $.lang[language]['country'],
        items: [
            [dataCountries.CountryType]
        ],
        theme: "light",
        positiveButtonText: "Ok",
        negativeButtonText: "Cancel",
    }

    window.SelectorCordovaPlugin.showSelector(configSimple, function(result) {
        console.log("result: " + JSON.stringify(result));
        $('#signup-country-val').text(result[0].description);
        console.log("nat_no : " + dataCountries.CountryType[result[0].index].nat_no);
        console.log("nat_name_ko : " + dataCountries.CountryType[result[0].index].nat_name_ko);
        console.log("index : " + result[0].index);
        idxCountry = result[0].index;
    });
}

function reqCountryList(){
    var sparam = {
    };

    var url = "http://bobo-tripin.com:8080/bla0601A.do";

    $.ajax({
        type: "GET",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, " + response);
            var data = $.parseJSON(response);
            console.log("countryList, " + data.countryList);
            console.log("countryList.length, " + data.countryList.length);

            dataCountries.CountryType = new Array();
            $.each(data.countryList, function(key,value) {
                console.log("key, " + key);
                console.log("nat_no, " + value.nat_no);
                console.log("nat_name_ko, " + value.nat_name_ko);
                dataCountries.CountryType.push({description : value.nat_name_ko, nat_no : value.nat_no, nat_name_ko : value.nat_name_ko, nat_name_en : value.nat_name_en});
            });

            //$.mobile.loading( "hide" );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            getAjaxErrMessage(jqXHR.status, jqXHR.statusText, jqXHR.statusText, jqXHR.responseText, textStatus, errorThrown);
            //$.mobile.loading( "hide" );
        }
    });
}

function onLanguageSelector(){
    var configSimple = {
        title: "언어(Language)",
        items: [
            [dataLanguages.LanguageType]
        ],
        theme: "light",
        positiveButtonText: "Ok",
        negativeButtonText: "Cancel",
    }

    window.SelectorCordovaPlugin.showSelector(configSimple, function(result) {
        console.log("result: " + JSON.stringify(result));
        $('#signup-language-val').text(result[0].description);
        console.log("lang_no : " + dataLanguages.LanguageType[result[0].index].lang_no);
        console.log("lang_name : " + dataLanguages.LanguageType[result[0].index].lang_name);
        console.log("index : " + result[0].index);
        idxLanguage = result[0].index;

        for(var i = 0; i < dataCountries.CountryType.length; i++){
            if(dataLanguages.LanguageType[result[0].index].lang_no == 4)
                dataCountries.CountryType[i].description = dataCountries.CountryType[i].nat_name_ko;
            else
                dataCountries.CountryType[i].description = dataCountries.CountryType[i].nat_name_en;
        }
        
    });
}

function reqLanguageList(){
    var sparam = {
    };

    var url = "http://bobo-tripin.com:8080/bla0201A.do";

    $.ajax({
        type: "GET",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, " + response);
            var data = $.parseJSON(response);
            console.log("languageList, " + data.languageList);
            console.log("languageList.length, " + data.languageList.length);

            dataLanguages.LanguageType = new Array();
            $.each(data.languageList, function(key,value) {
                console.log("key, " + key);
                console.log("lang_no, " + value.lang_no);
                console.log("lang_name, " + value.lang_name);
                dataLanguages.LanguageType.push({description : value.lang_name, lang_no : value.lang_no, lang_name : value.lang_name});
            });

            //$.mobile.loading( "hide" );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            getAjaxErrMessage(jqXHR.status, jqXHR.statusText, jqXHR.statusText, jqXHR.responseText, textStatus, errorThrown);
            //$.mobile.loading( "hide" );
        }
    });
}

function pickAddProfilePicture(){
    window.imagePicker.getPictures(
        function(results) {
            var idx = 0;
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                profileImg = results[i];
                imageBase64(results[i], function (base64Img) {
                    console.log('Image Data: ' + base64Img);
                    $('#signup-profile').css("background-image","url(data:image/jpeg;base64," + base64Img + ")");
                });
            }
            
            //uploadPics(results);
            //newpinImageUpload($('#newpin-nationals').val());
        }, function (error) {
            console.log('Error: ' + error);
        }, {
          quality: 50,
          width: 800,
          maximumImagesCount: 1
        }
    );
}

function fileSubmit(usr_email, usr_pwd, usr_national_no, usr_language_no, usr_language) {
    var url = "http://bobo-tripin.com:8080/bla0101A.do";
    
    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        
        var data = $.parseJSON(r.response);
        if(data.result == "ok"){
            alert($.lang[language]['msgConfSignupSuccess']);
            swiperSign.slideTo(0, 0, false);
        }
        else{
            console.log("Msg = " + data.msg);
            alert($.lang[language]['msgConfSignupFail']);
        }
    }
    
    function fail(error) {
        $.mobile.loading( "hide" );
        alert("fail error. (" + error.code + ")");
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
    
    var options = new FileUploadOptions();
    options.fileKey="usr_profile_img";
    options.fileName=profileImg.substr(profileImg.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";
    
    var params = {};
    params.usr_email = usr_email;
    params.usr_pwd = usr_pwd;
    params.usr_national_no = usr_national_no;
    params.usr_language_no = usr_language_no;
    params.usr_language = usr_language;

    options.params = params;

    var ft = new FileTransfer();
    // ft.onprogress = function(progressEvent) {
    //     if (progressEvent.lengthComputable) {
    //         loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
    //     } else {
    //         loadingStatus.increment();
    //     }
    // };

    ft.upload(profileImg, url, win, fail, options);
}

function reqSignin(usr_email, usr_pwd){
    $.mobile.loading( "show", {
        textVisible: false,
        textonly: false
    });

    var sparam = {
        usr_email:usr_email,
        usr_pwd:usr_pwd
    };

    var url = "http://bobo-tripin.com:8080/bla0102A.do";

    $.ajax({
        type: "POST",
        url: url,
        data: sparam,
        success: function(response) {
            console.log("success, " + response);
            var data = $.parseJSON(response);
            console.log("result, " + data.result);
            console.log("user, " + data.user);

            if(data.user != undefined){
                userDataset.initialization();
                userDataset.usr_email = usr_email;
                userDataset.usr_pwd = usr_pwd;
                userDataset.usr_no = data.user.usr_no;
                userDataset.usr_id = data.user.usr_id;
                userDataset.usr_profileImage = data.user.usr_profile_img;
                userDataset.usr_language = data.user.usr_language;
                userDataset.usr_language_no = data.user.usr_language_no;
                userDataset.usr_national_no = data.user.usr_national_no;
                userDataset.save();
                if(data.user.usr_language_no == 4){
                    language = LANG_KOR;
                }else{
                    language = LANG_ENG;
                }

                $.mobile.loading( "hide" );
                $.mobile.changePage ("main.html", 
                {
                    transition:"fade",
                    reverse:false
                });
            }
            else{
                alert($.lang[language]['msgConfSigninFail']);
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

//SIGN page show
$(document).on(events, '#page-sign', function (e) {
    console.log("page-sign: " + e.type);
    loadLanguageOnSign();
    initializationSign();
    setSignControlEvents();
    reqLanguageList();
    reqCountryList();
    userDataset.load();
});