let detailsrow = document.querySelector('.details .container .row')



function displaycate(obj) {
    row.innerHTML=''
    for (let i = 0; i < obj.categories.length; i++) {
      row.innerHTML+= `
        <div class="col " data-id=${obj.categories[i].strCategory}>
        <div class="item position-relative  rounded-2 overflow-hidden">
        <img src="${obj.categories[i].strCategoryThumb}" alt="" class="w-100 ">
        <div class="over h-100 position-absolute text-black"><h3>${obj.categories[i].strCategory}</h3></div>
        </div>
        </div>
      `
  }
  }
async function getapicate() {
    let url =  await fetch(`http://www.themealdb.com/api/json/v1/1/categories.php`)
    let res = await url.json()
    console.log(res);
    return res
  }
  
  async function startcate() {
    let x= await getapicate()
    await displaycate(x)
    $('.col').click(async function () {
      let y=await apifiltercate($(this).attr('data-id'))
      await display(y)
      $('.col').click( async function () { 
        await startdetail($(this).attr('data-id'))
        $('.details').removeClass('d-none')
        $('.contentmain').addClass('d-none')
        $('.contact').addClass('d-none')
        close()
      })

    })
  }

  $('li [data-sort="categories"]').click(function () {
      startcate()
  })
// **************Area***************//

    function displayarea(obj) {
    row.innerHTML=''
    for (let i = 0; i < obj.meals.length; i++) {
      row.innerHTML+= `
        <div class="col " data-id=${obj.meals[i].strArea}>
        <div class="item position-relative  rounded-2 overflow-hidden">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${obj.meals[i].strArea}</h3>
        </div>
        </div>
      `
  }
  }

    async function getapiarea() {
    let url =  await fetch(`http://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let res = await url.json()
    console.log(res);
    return res
  }
  async function startarea() {
    let x= await getapiarea()
    await displayarea(x)
    $('.col').click(async function () {
      let y=await apifilterarea($(this).attr('data-id'))
      await display(y)
      $('.col').click( async function () { 
        await startdetail($(this).attr('data-id'))
        $('.details').removeClass('d-none')
        $('.contentmain').addClass('d-none')
        $('.contact').addClass('d-none')
        close()
      })

    })
  }
  $('li [data-sort="area"]').click(function () {
    startarea()
})
// **************ingredients***************//

function displaying(obj) {
    row.innerHTML=''
    for (let i = 0; i < 20; i++) {
      row.innerHTML+= `
        <div class="col " data-id=${obj.meals[i].strIngredient}>
        <div class="item position-relative  rounded-2 overflow-hidden">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i> 
        <h3>${obj.meals[i].strIngredient}</h3>
        <p>${(obj.meals[i].strDescription).split(' ').slice(0,8).join(' ')}</p>
        </div>
        </div>
      `
  }
  }

    async function getaping() {
    let url =  await fetch(`http://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let res = await url.json()
    console.log(res);
    return res
  }
  async function startingred() {
    let x= await getaping()
    await displaying(x)
    $('.col').click(async function () {
      let y=await apifiltering($(this).attr('data-id'))
      await display(y)
      $('.col').click( async function () { 
        await startdetail($(this).attr('data-id'))
        $('.details').removeClass('d-none')
        $('.contentmain').addClass('d-none')
        $('.contact').addClass('d-none')
        close()
      })

    })
  }
  $('li [data-sort="ingredients"]').click(function () {
    startingred()
})

// **************detail***************//

function displaydetail(obj) {
  let x= obj.meals[0].strTags
  let z=""
  if (obj.meals[0].strTags) {
    z=x
    if ( obj.meals[0].strTags.includes(',')) {
      x = obj.meals[0].strTags.split(',')
      for (let i = 0; i < x.length; i++) {
        z=""
        z+=`<li class="alert alert-danger m-2">${x[i]}</li>`
      }
   } 
  }
  detailsrow.innerHTML= `
  <div class="col-md-4">
  <img src="${obj.meals[0].strMealThumb}" alt="">
  <h2 class="my-2">${obj.meals[0].strMeal}</h2>
</div>
<div class="col-md-8">
  <h2>Instructions</h2>
  <p class="small">${obj.meals[0].strInstructions.split(" ").slice(0,100).join(' ')}</p>
  <h3>Area : ${obj.meals[0].strArea}</h3>
  <h3>Category : ${obj.meals[0].strCategory}</h3>
  <h3>Recipes :</h3>
  <div>
  <ul class="list-unstyled d-flex  flex-wrap gap-2">
    <li class="alert alert-info "> ${obj.meals[0].strMeasure1}</li>
    <li class="alert alert-info "> ${obj.meals[0].strMeasure2}</li>
    <li class="alert alert-info "> ${obj.meals[0].strMeasure3}</li>
    <li class="alert alert-info "> ${obj.meals[0].strMeasure4}</li>
    <li class="alert alert-info "> ${obj.meals[0].strMeasure5}</li>
    <li class="alert alert-info "> ${obj.meals[0].strMeasure6}</li>
    <li class="alert alert-info "> ${obj.meals[0].strMeasure7}</li> 
    <li class="alert alert-info "> ${obj.meals[0].strMeasure8}</li> 
  </ul>
  </div>
  <h3>Tags :</h3>
  <ul class="list-unstyled d-flex  flex-wrap"> ${z}</ul>
  <a href="#" class="btn btn-success">Source</a>
  <a href="${obj.meals[0].strYoutube}" class="btn btn-danger m-3" target=_blank >Youtube</a>
  <i class=" close fa-solid fa-xmark fa-xl text-white position-absolute top-0 end-0 m-5"></i>
</div>

      `
    }
async function startdetail(id) {
    let x= await getapidetail(id)
    displaydetail(x)
  }
async function getapidetail(id) {
  let url =  await fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  let res = await url.json()
  console.log(res);
  return res
}

function close() {
  $('.close').click(function () {
      $('.details').addClass('d-none')
      $('.contentmain').removeClass('d-none')
  })
}
// ***************starting*************

async function mainfun() {
  await startsearch("co")
  $('.col').click( async function () { 
   await startdetail($(this).attr('data-id'))
   $('.details').removeClass('d-none')
   $('.contentmain').addClass('d-none')
   $('.contact').addClass('d-none')
   close()
 })
 $('.main_side li [data-sort="contact-us"]').click(function () {
        $('.details').addClass('d-none')
        $('.contentmain').addClass('d-none')
        $('.contact').removeClass('d-none')
})
 }
 
 async function apifiltercate(id) {
  let url =  await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
  let res = await url.json()
  console.log(res);
  return res
}
 async function apifilterarea(id) {
  let url =  await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`)
  let res = await url.json()
  console.log(res);
  return res
}
 async function apifiltering(id) {
  let url =  await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`)
  let res = await url.json()
  console.log(res);
  return res
}

function submit() {
  $('.contact form .input__box .last').keyup(function () {
    if ($('.contact form .input__box input').val()) {
      console.log('hesham');
      $('.contact form .button .butn').removeClass('disable')
    }
  })
}
submit()
mainfun()
