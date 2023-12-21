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

    window.addEventListener('scroll', scrollWin);

    //закончилос модельное окно





    //vklab menu
    /*const getResource = async(url) => {
        const ret = await fetch(url)
        if (!ret.ok) {
            console.error(url)
        }

        return await ret.json()
    };*/


    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 460;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> тен/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }


    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });


    //const fitPlas = new MenuCard('img/tabs/vegy.jpg', 'vegy', 'Фитнес', '- это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 2000, 'тенге', '#list-min')
    //const primePlas = new MenuCard('img/tabs/elite.jpg', 'elite', 'Премиум', 'мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 5990, 'руб', '#list-min')
    //const postPlas = new MenuCard('img/tabs/post.jpg', 'post', 'Постное', ' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 3000, 'USD', '#list-min')

    //stop vklad menu
    //form

    const forms = document.querySelectorAll('form');
    const modelViv = document.querySelector('#movel_viv')

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! скоро с вами свяжутся',
        fail: 'Что-то пошло не так'
    };

    const funPostData = async(url, data) => {
        const ret = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        return await ret.json()
    };

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();


            const formData = new FormData(form);
            modelViv.textContent = message.loading

            const objJson = JSON.stringify(Object.fromEntries(formData.entries()))




            funPostData('http://localhost:3000/requests', objJson)
                .then(responseText => {
                    console.log(responseText);
                    modelViv.innerHTML = message.success;
                    form.reset();
                    setTimeout(delModFun, 3000)

                }).catch(() => {
                    console.log('error');
                    modelViv.innerHTML = message.fail;
                    form.reset();
                });



        });
    }

    forms.forEach((form) => {
        postData(form);
    });


    //слайдер

    const imgSlid = document.querySelectorAll('.offer__slide');
    const nextSlid = document.querySelector('.offer__slider-next');
    const prevSlid = document.querySelector('.offer__slider-prev');
    const ninViv = document.querySelector('#current');
    const titalViv = document.querySelector('#total');
    const slidWrepers = document.querySelector('.offer__slider-wrapper');
    const slidFild = document.querySelector('.offer_slider-inner'),
        a = window.getComputedStyle(slidWrepers).width;
    let inerSlid = 1;


    slidFild.style.width = (100 * imgSlid.length) + '%'

    imgSlid.forEach(e => {
        e.style.width = a
    })


    /*
    function delSlid() {
        imgSlid.forEach(e => {
            e.classList.add('hide');
        });
    }

    function showSlid() {
        imgSlid[inerSlid].classList.remove('hide');
        imgSlid[inerSlid].classList.add('show');
    }

    function provIter() {
        if (inerSlid < 0) {
            inerSlid = 3;
        }
        if (inerSlid > 3) {
            inerSlid = 0;
        }
    }

    delSlid();
    showSlid();
    ninViv.innerHTML = inerSlid + 1;

    nextSlid.addEventListener('click', () => {
        delSlid();
        inerSlid = inerSlid + 1;
        provIter();
        ninViv.innerHTML = inerSlid + 1;
        showSlid();
    });

    prevSlid.addEventListener('click', () => {
        delSlid();
        inerSlid = inerSlid - 1;
        provIter();
        ninViv.innerHTML = inerSlid + 1; // Исправлено
        showSlid();
    }); */













})