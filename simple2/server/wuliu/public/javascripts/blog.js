var navObj = {
    '/': 1,
    '/login': 2,
    '/reg': 3,
    "/userManager": 4,
}

$(document).ready(function() {
    //根据url，设置高亮
    var pathname = window.location.pathname;
    $(".nav-collapse .nav li").eq(navObj[pathname]).addClass("active");
})