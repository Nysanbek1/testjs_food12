window.addEventListener('DOMContentLoaded', () => {
    //переключение слайдов
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsCintent = document.querySelectorAll('.tabcontent'),
        tabsArent = document.querySelector('.tabheader__items')

    console.log(tabs)
    console.log(tabsCintent)
    console.log(tabsArent)

    function hideTabsCont() {
        tabsCintent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')

        })

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active')
        })
    }

    function showTabCon(i = 0) {
        tabsCintent[i].classList.add('show', 'fade')
        tabsCintent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')

    }

    hideTabsCont()
    showTabCon()

    tabsArent.addEventListener('click', (e) => {
            const target = e.target;

            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabsCont()
                        showTabCon(i)
                    }
                })
            }
        })
        //закончилось переключение слайдов

    //начало таймера

    const days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds'),
        timerSection = document.querySelector('.promotion'),
        schocgikTim = document.querySelector('.promotion__timer'),
        timerBlock = document.querySelectorAll('.timer__block'),
        timer = document.querySelector('.timer')

    let newElement = document.createElement('div');

    newElement.classList.add('zero_timer')
    newElement.innerHTML = `
            <h2>время кончилось</h2>
        `;


    /*function time() {
        const now = new Date();
        days.innerHTML = now.getDate();
        hours.innerHTML = now.getHours();
        minutes.innerHTML = now.getMinutes();
        seconds.innerHTML = now.getSeconds();
    };
    time()
    setInterval(time, 1000)*/

    const dedline = '2024-12-8';

    function provChif(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }


    }

    function vichDate(e) {
        let daysRez, hoursRez, minutesRez, secondsRez
        const t = Date.parse(e) - Date.parse(new Date());
        if (t <= 0) {
            /*daysRez = 0
            hoursRez = 0
            minutesRez = 0
            secondsRez = 0
            timerSection.remove()
            timerBlock.forEach(function(e) {
                e.remove()
            })
            timer.appendChild(newElement)*/
        } else {
            daysRez = Math.floor(t / (1000 * 60 * 60 * 24))
            hoursRez = Math.floor((t / (1000 * 60 * 60)) % 24)
            minutesRez = Math.floor((t / 1000 / 60) % (60))
            secondsRez = Math.floor((t / (1000)) % (60))
        }

        days.innerHTML = provChif(daysRez)
        hours.innerHTML = provChif(hoursRez)
        minutes.innerHTML = provChif(minutesRez)
        seconds.innerHTML = provChif(secondsRez)
            /*if (t <= 0) {
                clearInterval(timeIntet)
            }*/
    }

    vichDate(dedline)

    let timeIntet = setInterval(() => {
        vichDate(dedline)
    }, 1000);

    //закончился аймер

    //начала модельного окна

    const butnModel = document.querySelectorAll('[data-madel]'),
        delModel = document.querySelector('.modal'),
        modalClassBtn = document.querySelector('[data-colos]');


    function delModFun() {
        delModel.classList.add('hide');
        delModel.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openMaodel() {
        delModel.classList.add('show')
        delModel.classList.remove('hide')
        document.body.style.overflow = 'hidden';
        clearTimeout(InterOpen)

    }

    let InterOpen = setTimeout(openMaodel, 10000)

    butnModel.forEach(function(e) {
        e.addEventListener('click', openMaodel)
    })
    modalClassBtn.addEventListener('click', delModFun)


    delModel.addEventListener('click', (e) => {
        if (e.target === delModel) {
            delModFun()
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && delModel.classList.contains('show')) {
            delModFun()
        }
    })

    function listNiz() {
        if (window.scrollY >= 4746) {
            setTimeout(openMaodel, 2000)
        }

    }

    function scrollWin() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openMaodel()
        }
        window.removeEventListener('scroll', scrollWin)
    }

    window.addEventListener('scroll', scrollWin)

    //закончилос модельное окно




    class MenuCard {
        constructor(src, alt, title, descr, price, cach, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.cach = cach;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
            this.render();

        }

        changeToUAH() {
            if (this.cach == 'USD') {
                this.price = Math.floor(this.price / 460)
            } else if (this.cach == 'руб') {
                this.price = Math.floor(this.price / 5)
            } else if (this.cach == 'тенге') {
                this.price = this.price
            }
        }

        render() {
            const element = document.createElement('div')

            element.innerHTML = `
            <div class="menu__item">
                <img src='${this.src}' alt='${this.alt}'>
                <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                <div class="menu__item-descr">Меню "${this.title}" ${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span></span> ${this.cach}/день</div>
                </div>
            </div>
            `
            this.parent.append(element)
        }
    }

    const fitPlas = new MenuCard('img/tabs/vegy.jpg', 'vegy', 'Фитнес', '- это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 2000, 'тенге', '#list-min')
    const primePlas = new MenuCard('img/tabs/elite.jpg', 'elite', 'Премиум', 'мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 5990, 'руб', '#list-min')
    const postPlas = new MenuCard('img/tabs/post.jpg', 'post', 'Постное', ' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 3000, 'USD', '#list-min')












})