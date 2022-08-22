// get mosters
let shownMonsterStart = 0
document.addEventListener('DOMContentLoaded',getMonsters)
document.addEventListener('DOMContentLoaded',createForm)

function getMonsters(){
    fetch('http://localhost:3000/monsters')
        .then((resp) => resp.json())
        .then((monsters) => {
            for(let x = shownMonsterStart; x < shownMonsterStart + 50; x++){
            const monsterContainer = document.querySelector('#monster-container')
            const monsterCard = document.createElement('div')
            monsterCard.innerHTML = `
                <h3>${monsters[x].name}</h3>
                <h4>Age: ${monsters[x].age}</h4>
                <p>${monsters[x].description}</p>
            `
            monsterContainer.appendChild(monsterCard)
        
            }
        })
}

// create form

function createForm(){
    const createDiv = document.querySelector('#create-monster')
    const form = document.createElement('form')
    form.id = "monster-form"
    form.innerHTML = `
        <input id='name' placeholder= 'name'></input>
        <input id='age' placeholder= 'age'></input>
        <input id='desc' placeholder= 'desc'></input>
        <button type='submit'>Submit</button>
    `
    createDiv.appendChild(form)
    form.addEventListener('submit',handleSubmit)
}


function handleSubmit(e){
    e.preventDefault()
    let monster = {
        name: e.target[0].value,
        age: e.target[1].value,
        description: e.target[2].value
    }
    fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(monster)
    })
        .then(() => getMonsters())

    e.target[0].value = ''
    e.target[1].value = ''
    e.target[2].value = ''

}

// handle next 50 button
document.addEventListener('DOMContentLoaded',( () => {
    const forwardBtn = document.querySelector('#forward')
    forwardBtn.addEventListener('click', handleForward)
}
))

function handleForward(){
    shownMonsterStart += 50
    const monsterContainer = document.querySelector('#monster-container')
    monsterContainer.innerHTML = ''
    getMonsters()
}

// handle last 50
document.addEventListener('DOMContentLoaded',( () => {
    const backBtn = document.querySelector('#back')
    backBtn.addEventListener('click', handleBack)
}
))

function handleBack(){
    if(shownMonsterStart < 50){
        shownMonsterStart = 0
    }else{
        shownMonsterStart -= 50
    }
    const monsterContainer = document.querySelector('#monster-container')
    monsterContainer.innerHTML = ''
    getMonsters()
}


