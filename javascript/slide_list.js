var carousel = new carousel;
$(window).load(function () {
    Pagers.options({
        callback: loadCarousel,
        onRefresh: loadCarousel
    });
    loadCarousel()
});

function loadCarousel()
{
    carousel.init();
}

function carousel() {
    var _ = this;

    this.init = function ()
    {
        $('[data-toggle="tooltip"]').tooltip({
            'placement': 'right'
        });
        this.initCreateButton();
        this.initEditClick();
        this.initSort();
        this.initFormUpdate();
        this.initHTMLCheck();
    };

    this.initFormUpdate = function ()
    {
        $('#filepath').change(function () {
            var filepath = $(this).val();
            var title = $('#title').val();
            if (title.length == 0) {
                var new_title = filepath.replace(/^.*[\\\/]/, '');
                new_title = new_title.replace(/\.(png|jpg|jpeg|gif)$/i, '');
                new_title = new_title.replace(/_/, ' ');
                new_title = new_title.charAt(0).toUpperCase() + new_title.slice(1);
                $('#title').val(new_title);
            }
        });
    };
    
    this.initHTMLCheck = function()
    {
        $('#allowHtml').change(function(e){
            if (e.target.checked) {
                CKEDITOR.replace('caption');   
            } else {
                var data = CKEDITOR.instances['caption'].getData();
                CKEDITOR.instances['caption'].destroy(true);
                $('#caption').val(data);
            }
        });
    };

    this.initSort = function ()
    {
        $('#sortable').sortable({
            placeholder: 'ui-state-highlight',
            update: function (event, ui) {
                var moved_row = ui.item;
                var next_row = ui.item.next('tr.pager-row');
                var moved_row_id = moved_row.data('rowId');
                var next_row_id = next_row.data('rowId');
                $.get('carousel/admin/', {
                    command: 'move_slide',
                    move_id: moved_row_id,
                    next_id: next_row_id
                }, 'json').always(function () {
                    Pagers.loadPagers();
                    _.init();
                });
            }
        });
    };

    this.initCreateButton = function ()
    {
        $('#delete-slide').hide();
        $('#new-slide').click(function () {
            $('#filepath').val('');
            $('#title').val('');
            $('#caption').val('');
            $('#url').val('');
            $('#resource-id').val(0);
            $('#slide-update').modal('show');
            $('#slide-update .modal-title').html('Create new slide');
        });
        $('#slide-update .save-slide').click(function () {
            $('#slide-form').submit();
        });
    };

    this.initEditClick = function ()
    {
        $('.pager-row').click(function (e) {
            if (!$(e.target).is('input.active-checkbox')) {
                _.initDeleteClick();
                $('#delete-slide').show();
                var row_id = $(this).data('rowId');
                $('#resource-id').val(row_id);
                $('#slide-update').modal('show');
                $('#slide-update .modal-title').html('Update slide');
                $.get('carousel/admin/', {
                    command: 'edit_slide',
                    slide_id: row_id
                }, function (data) {
                    $('#title').val(data.title);
                    $('#caption').val(data.caption);
                    $('#url').val(data.url);
                    $('#caption-zone-2').val(data.caption_zone);
                    if (data.show_title == 1) {
                        $('#show_title').prop('checked', true);
                    } else {
                        $('#show_title').prop('checked', false);
                    }
                }, 'json');
            }
        });
        $('.active-checkbox').click(function () {
            if ($(this).is(':checked')) {
                $.get('carousel/admin/', {
                    command: 'activate',
                    slide_id: $(this).data('slideId')
                });
            } else {
                $.get('carousel/admin/', {
                    command: 'deactivate',
                    slide_id: $(this).data('slideId')
                });
            }
        });
    };

    this.initDeleteClick = function () {
        $('#delete-button').unbind();
        $('#delete-button .confirm').html('Delete slide');

        $('#delete-button').click(function () {
            $('.confirm', this).html('Click again to confirm deletion');
            $(document).click(function (event) {
                if ($(event.target).closest('#delete-button').length == 0) {
                    $this.initDeleteClick();
                }
            });
            $('#delete-button').click(function () {
                $.get('carousel/admin/', {
                    'command': 'delete_slide',
                    'slide_id': $('#resource-id').val()
                }, function (data) {
                    window.location.reload();
                });
            });
        });
    };
}

