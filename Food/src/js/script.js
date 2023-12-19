const fitnes = document.querySelector('#fitnes'),
    prim = document.querySelector('#prim'),
    fool = document.querySelector('#fool'),
    notSold = document.querySelector('#notSold'),
    imgFood = document.querySelector('#imgFood'),
    opisFood = document.querySelector('#opisFood')


const imgList = ['img/tabs/vegy.jpg', 'img/tabs/elite.jpg', 'img/tabs/hamburger.jpg', 'img/tabs/post.jpg']
const opisList = ['Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Для людей, которые интересуются спортом; активных и здоровых. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 'Меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 'Наше специальное “Постное меню” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения. Полная гармония с собой и природой в каждом элементе! Все будет Ом!', 'Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.']

let blekShrift = fitnes



function izmen(blaaa) {
    imgFood.src = imgList[blaaa]
    opisFood.innerHTML = ''
    opisFood.innerHTML = opisList[blaaa]
}

function menSrif(b) {
    b.classList.toggle('tabheader__item_active')
}



fitnes.addEventListener('click', () => {
    izmen(0)
    menSrif(blekShrift)
    blekShrift = fitnes
    menSrif(blekShrift)
})

prim.addEventListener('click', () => {
    izmen(1)
    menSrif(blekShrift)
    blekShrift = prim
    menSrif(blekShrift)
})

fool.addEventListener('click', () => {
    izmen(2)
    menSrif(blekShrift)
    blekShrift = fool
    menSrif(blekShrift)
})
notSold.addEventListener('click', () => {
    izmen(3)
    menSrif(blekShrift)
    blekShrift = notSold
    menSrif(blekShrift)
})