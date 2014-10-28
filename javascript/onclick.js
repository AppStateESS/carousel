$(window).load(function () {
    $('.carousel-slide-image').click(function () {
        var url = $(this).data('url');
        if (url.length > 1) {
            $(this).css('cursor', 'pointer');
            window.location.href = url;
        } else {
            $(this).css('cursor', '');
        }
    });
});