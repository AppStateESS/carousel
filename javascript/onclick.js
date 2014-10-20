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

    var slide_count = 0;
    if (typeof iteration !== 'undefined') {
        $('#carousel-slides').on('slid.bs.carousel', function () {
            slide_count++;
            if (slide_count >= iteration) {
                $('.carousel').carousel('pause');
            }
        });
    }
    $('.carousel').carousel(
            {interval: slide_interval}
    );

    // handles the carousel thumbnails
    $('.tn-select').click(function () {
        var id = $(this).data('cid');
        id = parseInt(id);
        $('.carousel').carousel(id);
        $('[id^=carousel-selector-]').removeClass('selected');
        $(this).addClass('selected');
    });


    $('#carousel-slides').on('slid.bs.carousel', function () {
        var id = $('.item.active').data('slide-number');
        id = parseInt(id);
        console.log(id);
        $('#slider-thumbs .list-inline li a.tn-select').each(function(index){
            if ($(this).data('cid') == id) {
                $(this).addClass('selected');
            } else {
                $(this).removeClass('selected');
            }
        });
    });

// when the carousel slides, auto update

});