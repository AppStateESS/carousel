'use strict'
/* global $, keyId */

$('#carousel-pin-list').click((e)=>{
  e.stopPropagation()
})

$('#carousel-pin-button').click(()=>{
  const carouselId = $('#carousel-pin-list').val()
  if (carouselId === '0') {
    return
  }
  $.ajax({
    url: `./carousel/Admin/Carousel/${carouselId}/pin`,
    data: {keyId},
    dataType: 'json',
    type: 'put',
    success: ()=>{
      location.reload()
    },
    error: ()=>{}
  })
})

$('#carousel-unpin-button').click((e)=>{
  const carouselId = $(e.target).data('id')
  $.ajax({
    url: `./carousel/Admin/Carousel/${carouselId}/unpin`,
    data: {keyId},
    dataType: 'json',
    type: 'put',
    success: ()=>{
      location.reload()
    },
    error: ()=>{}
  })
})
