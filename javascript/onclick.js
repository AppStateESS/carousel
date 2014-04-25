$(window).load(function() {
    $('.carousel-slide-image').click(function() {
        var url = $(this).data('url');
        if (url.length > 1) {
            $(this).css('cursor', 'pointer');
            window.location.href = url;
        } else {
            $(this).css('cursor', '');
        }
    });

    var slide_count = 0;
    if (typeof iteration !== 'undefined') {
        $('#carousel-slides').on('slid.bs.carousel', function() {
            slide_count++;
            if (slide_count >= iteration) {
                console.log('pause');
                $('.carousel').carousel('pause');
            }
        });
    }
});