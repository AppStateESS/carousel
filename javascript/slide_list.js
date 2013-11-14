var carousel = new carousel;
$(window).load(function() {
    carousel.init();
});


function carousel() {

    this.init = function()
    {
        $('[data-toggle="tooltip"]').tooltip({
            'placement': 'right'
        });
        this.initDialog();
        this.initCreateButton();
        this.initEditClick();
    };

    this.initDialog = function()
    {
        $('#slide-update').dialog({
            autoOpen: false,
            modal: true
        });
    };

    this.initCreateButton = function()
    {
        $('#delete-slide').hide();
        $('#new-slide').click(function() {
            $('#title').val('');
            $('#caption').val('');
            $('#slide-update').dialog({title: 'Create new slide'});
            $('#slide-update').dialog('open');
        });
    };

    this.initEditClick = function()
    {
        _ = this;
        $('.pager-row').click(function() {
            _.initDeleteClick();
            $('#delete-slide').show();
            var row_id = $(this).data('rowId');
            $('#resource-id').val(row_id);
            $('#slide-update').dialog({title: 'Update slide'});
            $('#slide-update').dialog('open');
            $.get('carousel/admin/', {
                command: 'edit_slide',
                slide_id: row_id
            }, function(data) {
                $('#title').val(data.title);
                $('#caption').val(data.caption);
            }, 'json');
        });
    };

    this.initDeleteClick = function() {
        $('#delete-button').unbind();
        $('#delete-button .confirm').html('Delete slide');

        $('#delete-button').click(function() {
            $('.confirm', this).html('Click again to confirm deletion');
            $(document).click(function(event) {
                if ($(event.target).closest('#delete-button').length == 0) {
                    $this.initDeleteClick();
                }
            });
            $('#delete-button').click(function() {
                $.get('carousel/admin/', {
                    'command': 'delete_slide',
                    'slide_id': $('#resource-id').val()
                }, function(data) {
                    //console.log(data);
                    window.location.reload();
                });
            });
        });
    };
}

