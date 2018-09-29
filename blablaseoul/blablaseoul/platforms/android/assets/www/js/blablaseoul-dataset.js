const LS_NM_SIGNIN_USR_NO = "signin_user_no";
const LS_NM_SIGNIN_USR_EMAIL = "signin_user_email";
const LS_NM_SIGNIN_USR_ID = "signin_user_id";
const LS_NM_SIGNIN_USR_PWD = "signin_user_pwd";
const LS_NM_SIGNIN_USR_PROFILEIMG = "signin_user_profileimg";
const LS_NM_SIGNIN_USR_LANGUAGE = "signin_user_language";
const LS_NM_SIGNIN_USR_LANGUAGE_NO = "signin_user_language_no";
const LS_NM_SIGNIN_USR_NATIONAL_NO = "signin_user_national_no";
const LS_NM_SIGNIN_AUTO = "signin_auto";

const CD_RECOMMEND_PLACE = "RP";
const CD_PUBLIC_TOILET = "PT";
const CD_FREE_WIFI = "FW";
const CD_TRADITIONAL_MARKET = "TM";

const OPENAPI_SEOUL_KEY = "425677636b73797337354350684869";
const OPENAPI_SEOUL_SERVICE_PUBLICTOILET= "GeoInfoPublicToiletWGS";
const OPENAPI_SEOUL_SERVICE_FREEWIFI= "MgisWifi";
const OPENAPI_SEOUL_SERVICE_TRADIMARKET= "MgisTraShop";

const MAIN_MODE_RECOMMEND = 1;
const MAIN_MODE_PUBTOILET = 2;
const MAIN_MODE_FREEWIFI = 3;
const MAIN_MODE_TRADIMARKET = 4;

var mainMode = MAIN_MODE_RECOMMEND;

var testMode = true;
var localTest = false;

function testset(){
}

var localAddress = "127.0.0.1:8080/controller";

var userDataset = {
    usr_no : "",
    usr_id : "",
    usr_email : "",
    usr_pwd : "",
    usr_profileImage : "",
    usr_language : "",
    usr_language_no : "",
    usr_national_no : "",
    signin : false,

    initialization : function () {
        this.usr_email = null;
        this.usr_pwd = null;
        this.usr_no = null;
        this.usr_id = null;
        this.usr_profileImage = null;
        this.usr_language = null;
        this.usr_language_no = null;
        this.usr_national_no = null;
        window.localStorage.clear();
    },save : function () {
        window.localStorage.setItem(LS_NM_SIGNIN_USR_EMAIL, this.usr_email);
        window.localStorage.setItem(LS_NM_SIGNIN_USR_PWD, this.usr_pwd);
        window.localStorage.setItem(LS_NM_SIGNIN_USR_NO, this.usr_no);
        window.localStorage.setItem(LS_NM_SIGNIN_USR_ID, this.usr_id);
        window.localStorage.setItem(LS_NM_SIGNIN_USR_PROFILEIMG, this.usr_profileImage);
        window.localStorage.setItem(LS_NM_SIGNIN_USR_LANGUAGE, this.usr_language);
        window.localStorage.setItem(LS_NM_SIGNIN_USR_LANGUAGE_NO, this.usr_language_no);
        window.localStorage.setItem(LS_NM_SIGNIN_USR_NATIONAL_NO, this.usr_national_no);
    },load : function () {
        this.usr_email = window.localStorage.getItem(LS_NM_SIGNIN_USR_EMAIL);
        this.usr_pwd = window.localStorage.getItem(LS_NM_SIGNIN_USR_PWD);
        this.usr_no = window.localStorage.getItem(LS_NM_SIGNIN_USR_NO);
        this.usr_id = window.localStorage.getItem(LS_NM_SIGNIN_USR_ID);
        this.usr_profileImage = window.localStorage.getItem(LS_NM_SIGNIN_USR_PROFILEIMG);
        this.usr_language = window.localStorage.getItem(LS_NM_SIGNIN_USR_LANGUAGE);
        this.usr_language_no = window.localStorage.getItem(LS_NM_SIGNIN_USR_LANGUAGE_NO);
        this.usr_national_no = window.localStorage.getItem(LS_NM_SIGNIN_USR_NATIONAL_NO);

        if(testMode){
            console.log("usr_email : " + this.usr_email);
            console.log("usr_pwd : " + this.usr_pwd);
            console.log("usr_no : " + this.usr_no);
            console.log("usr_id : " + this.usr_id);
            console.log("usr_profileImage : " + this.usr_profileImage);
            console.log("usr_language : " + this.usr_language);
            console.log("usr_language_no : " + this.usr_language_no);
            console.log("usr_national_no : " + this.usr_national_no);
        }
    },setAutoSignin : function(auto){
        window.localStorage.setItem(LS_NM_SIGNIN_AUTO, auto);
    },getAutoSignin : function(){
        return window.localStorage.getItem(LS_NM_SIGNIN_AUTO);
    },isSignin : function(){
        this.signin = true;
    },signout : function(){
        this.signin = false;
        this.usr_pwd = null;
        this.usr_no = null;
        this.usr_id = null;
        this.usr_profileImage = null;
        this.usr_language = null;
        this.usr_language_no = null;
        this.usr_national_no = null;
        this.save();
    },isSignin : function () {
        return this.signin;
    },showDatas : function() {
        console.log("signin : " + this.signin);
        console.log("usr_pwd : " + this.usr_pwd);
        console.log("usr_no : " + this.usr_no);
        console.log("usr_id : " + this.usr_id);
        console.log("usr_profileImage : " + this.usr_profileImage);
        console.log("usr_language : " + this.usr_language);
        console.log("usr_language_no : " + this.usr_language_no);
        console.log("usr_national_no : " + this.usr_national_no);
    }
};

var recommandDataSet = {
    images: [],
    recommandText: "",
    place: "",
    lat: "",
    lot: "",
    ratingLocal: "",
    ratingPopular: "",
    priceType: "",
    priceFrom: "",
    priceTo: "",
    DateType: "",
    DateFrom: "",
    DateTo: "",
    Languages : [],

    initialization : function () {
        this.images = [];
        this.recommandText = "";
        this.place = "";
        this.lat = "";
        this.lot = "";
        this.ratingLocal = "";
        this.ratingPopular = "";
        this.priceType = "";
        this.priceFrom = "";
        this.priceTo = "";
        this.DateType = "";
        this.DateFrom = "";
        this.DateTo = "";
        this.Languages = [];
    },getImagesLen : function () {
        return this.images.length;
    },getLanguagesLen : function () {
        return this.Languages.length;
    },addLanguage : function (lang_no, lang_name) {
        this.Languages.push({lang_no : lang_no, lang_name : lang_name});
    },removeLanguage : function (idx) {
        this.Languages.splice(idx, 1);
    },setRecommendText : function (text) {
        this.recommandText = Base64.encode(text);
    },getRecommendText : function () {
        return Base64.decode(this.recommandText);
    },getRecommendTextUrl : function () {
        return this.recommandText;
    },setPlaceAddr : function (addr) {
        this.place = Base64.encode(addr);
    },getPlaceAddr : function () {
        return Base64.decode(this.place);
    },getPlaceAddrUrl : function () {
        return this.place
    },showDatas : function() {
        console.log("images : " + this.images);
        console.log("images length : " + this.images.length);
        console.log("recommandText : " + this.recommandText);
        console.log("place : " + this.place);
        console.log("lat : " + this.lat);
        console.log("lot : " + this.lot);
        console.log("ratingLocal : " + this.ratingLocal);
        console.log("ratingPopular : " + this.ratingPopular);
        console.log("priceType : " + this.priceType);
        console.log("priceFrom : " + this.priceFrom);
        console.log("priceTo : " + this.priceTo);
        console.log("DateType : " + this.DateType);
        console.log("DateFrom : " + this.DateFrom);
        console.log("DateTo : " + this.DateTo);
        console.log("Languages : " + this.Languages);
        console.log("Languages length : " + this.Languages.length);
    }
};

var ratingDataSet = {
    ratingText: "",
    total: 0.0,
    price: 0.0,
    location: 0.0,
    cleanliness: 0.0,
    communication: 0.0,
    initialization : function () {
        this.ratingText = "";
        this.total = 0.0;
        this.price = 0.0;
        this.location = 0.0;
        this.cleanliness = 0.0;
        this.communication = 0.0;
    },showDatas : function() {
        console.log("ratingText : " + this.ratingText);
        console.log("total : " + this.total);
        console.log("price : " + this.price);
        console.log("location : " + this.location);
        console.log("cleanliness : " + this.cleanliness);
        console.log("communication : " + this.communication);
    }
};