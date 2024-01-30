let search = document.querySelector('.main_side li[data-sort=search]')
let row=document.querySelector('.show')

 function searchappearance() {
  if (search.classList.contains('active')) {
      $('.search').removeClass('d-none')
      row.innerHTML=''
  }
  else{
      $('.search').addClass('d-none')
  }
}
  async function getapisearch(val) {
  let url =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
  let res = await url.json()
  console.log(res);
  return res
}

 async function startsearch(val) {
  let x= await getapisearch(val)
  await display(x)
  $('.col').click( async function () { 
    await startdetail($(this).attr('data-id'))
    $('.details').removeClass('d-none')
    $('.contentmain').addClass('d-none')
    $('.contact').addClass('d-none')
    close()
  })
 
}

 function display(obj) {
  row.innerHTML=''
  for (let i = 0; i < obj.meals.length; i++) {
    row.innerHTML+= `
      <div class="col " data-id=${obj.meals[i].idMeal}>
      <div class="item position-relative  rounded-2 overflow-hidden">
      <img src="${obj.meals[i].strMealThumb}" alt="" class="w-100 ">
      <div class="over h-100 position-absolute text-black"><h3>${obj.meals[i].strMeal}</h3></div>
      </div>
      </div>
    `
}
}



async function getapiletter(val) {
  let url =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`)
  let res = await url.json()
  console.log(res);
  return res
}

async function startletter(val) {
  let x= await getapiletter(val)
  await display(x)
  $('.col').click( async function () { 
    await startdetail($(this).attr('data-id'))
    $('.details').removeClass('d-none')
    $('.contentmain').addClass('d-none')
    $('.contact').addClass('d-none')
    close()
  })
 
}


searchappearance()
$('.main_side li').click(function () {
    searchappearance()
})



