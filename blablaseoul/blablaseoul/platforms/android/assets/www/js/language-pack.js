const LANG_KOR = "kor";
const LANG_ENG = "eng";
const LANG_EPN = "epn";

var language = LANG_ENG;

function loadLanguageOnSign(){
    var data;
    data = $('[data-langPhEmail]');
    data.attr("placeholder", $.lang[language][data.data('langphemail')]);
    data = $('[data-langPhPw]');
    data.attr("placeholder", $.lang[language][data.data('langphpw')]);

    data = $('[data-langSignin]');
    data.text($.lang[language][data.data('langsignin')]);
    data = $('[data-langSignup]');
    data.text($.lang[language][data.data('langsignup')]);

    data = $('[data-langPhSignupCheck]');
    data.attr("placeholder", $.lang[language][data.data('langphsignupcheck')]);
    data = $('[data-langSelect]');
    data.text($.lang[language][data.data('langselect')]);
    data = $('[data-langLanguage]');
    data.text($.lang[language][data.data('langlanguage')]);
    data = $('[data-langCountry]');
    data.text($.lang[language][data.data('langcountry')]);
}

function loadLanguageOnRecommand(){
    var data;
    data = $('[data-langNext]');
    data.text($.lang[language][data.data('langnext')]);
    data = $('[data-langAddPicture]');
    data.text($.lang[language][data.data('langaddpicture')]);

    data = $('[data-langPhRecommand]');
    data.attr("placeholder", $.lang[language][data.data('langphrecommand')]);
    data = $('[data-langPhPlace]');
    data.attr("placeholder", $.lang[language][data.data('langphplace')]);

    data = $('[data-langRating]');
    data.text($.lang[language][data.data('langrating')]);
    data = $('[data-langLocal]');
    data.text($.lang[language][data.data('langlocal')]);
    data = $('[data-langPopular]');
    data.text($.lang[language][data.data('langpopular')]);
    data = $('[data-langPrice]');
    data.text($.lang[language][data.data('langprice')]);
    data = $('[data-langDate]');
    data.text($.lang[language][data.data('langdate')]);
    data = $('[data-langDates]');
    data.text($.lang[language][data.data('langdates')]);
    data = $('[data-langLanguage]');
    data.text($.lang[language][data.data('langlanguage')]);
}

function loadLanguageOnMain(){
    var data;
    data = $('[data-langRecommend]');
    data.text($.lang[language][data.data('langrecommend')]);
    data = $('[data-langPublicToilet]');
    data.text($.lang[language][data.data('langpublictoilet')]);
    data = $('[data-langFreeWifi]');
    data.text($.lang[language][data.data('langfreewifi')]);
    data = $('[data-langTradiMarket]');
    data.text($.lang[language][data.data('langtradimarket')]);
}

function loadLanguageOnContent(){
    var data;
    data = $('[data-langLocal]');
    data.text($.lang[language][data.data('langlocal')]);
    data = $('[data-langPopular]');
    data.text($.lang[language][data.data('langpopular')]);
    data = $('[data-langTotal]');
    data.text($.lang[language][data.data('langtotal')]);
    data = $('[data-langPrice]');
    data.text($.lang[language][data.data('langprice')]);
    data = $('[data-langLocation]');
    data.text($.lang[language][data.data('langlocation')]);
    data = $('[data-langCleanliness]');
    data.text($.lang[language][data.data('langcleanliness')]);
    data = $('[data-langCommunication]');
    data.text($.lang[language][data.data('langcommunication')]);
    data = $('[data-langMyRating]');
    data.text($.lang[language][data.data('langmyrating')]);
    data = $('[data-langComments]');
    data.text($.lang[language][data.data('langcomments')]);

    data = $('[data-langPhComment]');
    data.attr("placeholder", $.lang[language][data.data('langphcomment')]);
}

function loadLanguageOnRating(){
    var data;
    data = $('[data-langLocal]');
    data.text($.lang[language][data.data('langlocal')]);
    data = $('[data-langPopular]');
    data.text($.lang[language][data.data('langpopular')]);
    data = $('[data-langTotal]');
    data.text($.lang[language][data.data('langtotal')]);
    data = $('[data-langPrice]');
    data.text($.lang[language][data.data('langprice')]);
    data = $('[data-langLocation]');
    data.text($.lang[language][data.data('langlocation')]);
    data = $('[data-langCleanliness]');
    data.text($.lang[language][data.data('langcleanliness')]);
    data = $('[data-langCommunication]');
    data.text($.lang[language][data.data('langcommunication')]);
    data = $('[data-langMyRating]');
    data.text($.lang[language][data.data('langmyrating')]);
    data = $('[data-langComments]');
    data.text($.lang[language][data.data('langcomments')]);

    data = $('[data-langPhComment]');
    data.attr("placeholder", $.lang[language][data.data('langphcomment')]);
}

$.lang = {};

$.lang.kor = {
    //sign.html
    phEmail: '이메일을 입력해주세요',
    phPw: '패스워드를 입력해주세요',
    
    phsignupcheck: '패스워드를 다시 입력해주세요',
    select: '선택',
    language: '언어',
    country : '국가',

    signin: '로그인',
    signup: '회원가입',
    autosignin: '자동로그인',

    //messages
    msgErrInputEmail : '이메일을 입력해주세요',
    msgErrInputPwd : '패스워드를 입력해주세요',
    msgErrEmailCorrect : '이메일 형식이 맞지 않습니다',
    msgErrEmailCheck : '이메일 확인',
    msgErrPwdLength : '패스워드 길이는 6자 이상의 영문이나 숫자로 입력 해주세요',
    msgErrPwdCheck : '패스워드 확인',
    msgErrPwdCorrect : '패스워드가 맞지 않습니다',
    msgErrProfileImg : '프로필 사진을 선택해 주세요',
    msgErrCountry : '국가를 선택해 주세요',
    msgErrLanguage : '언어를 선택해 주세요',

    msgConfSignupSuccess : '가입완료',
    msgConfSignupFail : '가입실패',
    msgConfSigninFail : '해당 정보의 사용자가 존재하지 않습니다',
    msgWaiting : '잠시만 기다려 주세요',
    msgHasPlace : '이미 등록된 장소입니다',
    msgUploaded : '업로드 성공',
    msgUploadFail : '업로드 실패',

    msgSelectImage : '이미지를 선택 해 주세요',
    msgWriteRecommend : '추천 글을 입력 해 주세요',
    msgSelectPlace : '추천 장소를 선택 해 주세요',

    //recommnad.html
    next : "다음",
    addPicture: "이미지를 선택해 주세요",
    phRecommand: "추천 내용을 입력해 주세요",
    phPlace: "장소를 검색해 주세요",
    rating: "평가",
    local: "현지화 등급",
    popular: "유명 등급",
    price: "가격",
    date: "날짜",
    dates: "날짜",
    
    //main.html
    recommend : "추천",
    publicToilet : "공중화장실",
    freeWifi : "무료WIFI",
    tradiMarket : "전통시장",

    //content.html
    local : "로컬",
    popular : "인기도",
    total : "전체",
    price : "가격",
    location : "위치",
    cleanliness : "청결도",
    communication : "의사소통",
    myRating : "내 점수",
    comments : "코멘트",
    phComment : "코멘트를 남겨주세요..",
};

$.lang.eng = {
    //sign.html
    phEmail: 'input your email',
    phPw: 'input your password',

    phsignupcheck: 'input your password again',
    select: 'SELECT',
    language: 'LANGUAGE',
    country : 'COUNTRY',

    signin: 'SIGN IN',
    signup: 'SIGN UP',
    autosignin: 'AUTO SIGN IN',

    //messages
    msgErrInputEmail : 'Input your email',
    msgErrInputPwd : 'Input your password',
    msgErrEmailCorrect : 'email is not correctly',
    msgErrEmailCheck : 'checked email',
    msgErrPwdLength : 'password length must be longer than 6',
    msgErrPwdCheck : 'checked password',
    msgErrPwdCorrect : 'password is not correctly',
    msgErrProfileImg : 'select your profile image',
    msgErrCountry : 'select your country',
    msgErrLanguage : 'select your language',

    msgConfSignupSuccess : 'complated sign up',
    msgConfSignupFail : 'failed sign up',
    msgConfSigninFail : 'no has the user',
    msgWaiting : 'please wait a moment',
    msgHasPlace : 'already registrated',
    msgUploaded : 'Upload complated',
    msgUploadFail : 'Upload failed',

    msgSelectImage : 'Please select image',
    msgWriteRecommend : 'Please write recommend',
    msgSelectPlace : 'Please select place',

    //recommnad.html
    next : "next",
    addPicture: "select images..",
    phRecommand: "your recommand here..",
    phPlace: "select place",
    rating: "Rating",
    local: "Local",
    popular: "Popular",
    price: "Price",
    date: "Date",
    dates: "Dates",

    //main.html
    recommend : "Recommend",
    publicToilet : "Public Toilet",
    freeWifi : "Free Wifi",
    tradiMarket : "Traditional Market",

    //content.html
    local : "LOCAL",
    popular : "POPULAR",
    total : "TOTALLY",
    price : "PRICE",
    location : "LOCATION",
    cleanliness : "CLEANLINESS",
    communication : "COMMUNICATION",
    myRating : "My Rating",
    comments : "COMMENTS",
    phComment : "your comment...",
};

$.lang.esp = {
    //sign.html
    phEmail: 'input your email',
    phPw: 'input your password',

    phsignupcheck: 'input your password again',
    select: 'SELECT',
    language: 'LANGUAGE',
    country : 'COUNTRY',

    signin: 'SIGN IN',
    signup: 'SIGN UP',
    autosignin: 'AUTO SIGN IN',

    //messages
    msgErrInputEmail : 'Input your email',
    msgErrInputPwd : 'Input your password',
    msgErrEmailCorrect : 'email is not correctly',
    msgErrEmailCheck : 'checked email',
    msgErrPwdLength : 'password length must be longer than 6',
    msgErrPwdCheck : 'checked password',
    msgErrPwdCorrect : 'password is not correctly',
    msgErrProfileImg : 'select your profile image',
    msgErrCountry : 'select your country',
    msgErrLanguage : 'select your language',

    msgConfSignupSuccess : 'complated sign up',
    msgConfSignupFail : 'failed sign up',
    msgConfSigninFail : 'no has the user',
    msgWaiting : 'please wait a moment',
    msgHasPlace : 'already registrated',
    msgUploaded : 'Upload complated',
    msgUploadFail : 'Upload failed',

    msgSelectImage : 'Please select image',
    msgWriteRecommend : 'Please write recommend',
    msgSelectPlace : 'Please select place',

    //recommnad.html
    next : "next",
    addPicture: "select images..",
    phRecommand: "your recommand here..",
    phPlace: "select place",
    rating: "Rating",
    local: "Local",
    popular: "Popular",
    price: "Price",
    date: "Date",
    dates: "Dates",

    //main.html
    recommend : "Recommend",
    publicToilet : "Public Toilet",
    freeWifi : "Free Wifi",
    tradiMarket : "Traditional Market",

    //content.html
    local : "LOCAL",
    popular : "POPULAR",
    total : "TOTALLY",
    price : "PRICE",
    location : "LOCATION",
    cleanliness : "CLEANLINESS",
    communication : "COMMUNICATION",
    myRating : "My Rating",
    comments : "COMMENTS",
    phComment : "your comment...",
};