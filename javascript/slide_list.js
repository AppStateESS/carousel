$(window).load(function() {
    $('[data-toggle="tooltip"]').tooltip({
        'placement': 'right'
    });
    initDialog();
    initCreateButton();
});

function initDialog()
{

    $('#slide-update').dialog({
        autoOpen: false,
        modal: true
    });

}

function initCreateButton()
{
    $('#delete-slide').hide();
    $('#new-slide').click(function() {
        $('#slide-update').dialog({title: 'Create new slide'});
        $('#slide-update').dialog('open');
    });
}