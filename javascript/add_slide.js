$(window).load(function(){
    $('#add-slide').change(function(){
        var slide_id = $(this).val();
        var key_id = $(this).data('keyId');
        $.get('carousel/admin/', {
            command: 'addSlideToPage',
            key_id : key_id,
            slide_id : slide_id
        }, function(data){
        }, 'json').always(function(){
            window.location.reload();
        });
    });
    $('#add-slide').click(function(e){
        e.stopPropagation();
    });

    $('#remove-slide').click(function(){
        var key_id = $(this).data('keyId');
        $.get('carousel/admin/', {
            command: 'removeSlideFromPage',
            key_id : key_id
        }, function(data){
        }, 'json').always(function(){
            window.location.reload();
        });

    });
});