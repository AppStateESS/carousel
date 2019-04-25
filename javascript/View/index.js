'use strict'
/* global $, iterations, intervalTime */
$(document).ready(function () {
  $('.carousel-slide-image').click(function () {
    const url = $(this).data('url')
    if (url.length > 1) {
      window.open(url)
    }
  })
})

if (iterations > 0) {
  let slideCount = 1
  $('#carousel-slides').on('slid.bs.carousel', () => {
    slideCount++
    if (slideCount >= iterations) {
      $('.carousel').carousel('pause')
    }
  })
}
$('.carousel').carousel({interval: parseInt(intervalTime)})
