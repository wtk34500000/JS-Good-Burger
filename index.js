document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  const burgerMenu = document.querySelector('#burger-menu')
  const customBurgerForm = document.querySelector('#custom-burger')

  fetch('http://localhost:3000/burgers')
  .then(resp => resp.json())
  .then(burgers =>{
    burgers.forEach(burger =>{
      burgerMenu.append(burgerDiv(burger))
    } )
  } )

  customBurgerForm.addEventListener("submit", (e)=>{
    createNewBurger(e)
  })

  burgerMenu.addEventListener("click", (e)=>{
    
      if(e.target.className === "button" ){
        const name = e.target.parentElement.querySelector('h3').innerText
        addOrderNameToList(name)
      }
  })


  const addOrderNameToList = (name) => {
      const ul = document.querySelector('#order-list')
      const li =document.createElement('li')
      li.innerText = name
      ul.append(li)
  }


   const burgerDiv = (burger) => {
     const div = document.createElement('div')
     const h3 = document.createElement('h3')
     const img = document.createElement('img')
     const p = document.createElement('p')
     const button = document.createElement('button')

     div.classList.add('burger')
     h3.classList.add('burger_title')
     h3.innerText = burger.name
     img.src = burger.image
     p.classList.add("burger_description")
     p.innerText = burger.description
     button.classList.add('button')
     button.innerText = "Add to Order"
     button.dataset.id = burger.id


     div.append(h3, img, p, button)
     return div
   }

   const createNewBurger = (e) => {
      e.preventDefault()
      const inputName = document.querySelector("input[name='name']").value
      const inputDes = document.querySelector("input[name='description']").value
      const inputurl = document.querySelector("input[name='url']").value
      

      const burgerData={
        name: inputName,
        description: inputDes,
        image: inputurl
      }
      console.log(burgerData)
      fetch("http://localhost:3000/burgers", {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(burgerData)
      }).then(resp => resp.json())
        .then(burger => {
           burgerMenu.append(burgerDiv(burger))
        })

   }

})
