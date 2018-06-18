/* global $, iteration, slide_interval */
$(document).ready(function () {
  $('.carousel-slide-image').click(function () {
    const url = $(this).data('url')
    if (url.length > 1) {
      window.open(url)
    }
  })
  
  $('.carousel-slide-image').mouseover(function () {
    const url = $(this).data('url')
    if (url.length > 1) {
      $(this).css('cursor', 'pointer')
    }
  })
  var slide_count = 1
  if (typeof iteration !== 'undefined') {
    $('#carousel-slides').on('slid.bs.carousel', function () {
      slide_count++
      if (slide_count >= iteration) {
        $('.carousel').carousel('pause')
      }
    })
  }
  $('.carousel').carousel({interval: slide_interval})

  // handles the carousel thumbnails
  $('.tn-select').click(function () {
    var id = $(this).data('cid')
    id = parseInt(id)
    $('.carousel').carousel(id)
    $('[id^=carousel-selector-]').removeClass('selected')
    $(this).addClass('selected')
  })

  $('#carousel-slides').on('slid.bs.carousel', function () {
    var id = $('.item.active').data('slide-number')
    id = parseInt(id)
    $('#slider-thumbs .list-inline li a.tn-select').each(function () {
      if ($(this).data('cid') == id) {
        $(this).addClass('selected')
      } else {
        $(this).removeClass('selected')
      }
    })
  })
})
