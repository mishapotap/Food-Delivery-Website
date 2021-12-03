function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    // Slider

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field), //Ввели новую обертку
        width = window.getComputedStyle(slidesWrapper).width; //Получили ширину одного слайда
    let slideIndex = 1;
    let offset = 0; //Отступ (ориентир)

    if (slides.length < 10) {
        // Добавляем 0 перед количеством слайдов для total и current
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + "%"; //Установили ширину блока (если слайдов 5 то ширина будет 500%)
    slidesField.style.display = "flex"; // Слайды располагаются в строку
    slidesField.style.transition = "0.5s all"; //Правный переход

    slidesWrapper.style.overflow = "hidden"; //Ограничили показ слайдов (остальные скрыты)

    slides.forEach((slide) => {
        // Все слайды одинаковой ширины
        slide.style.width = width;
    });

    slider.style.position = "relative"; // Чтобы точки были спозиционированы относительно этого элемента
    //Создали большую обертку для точек
    const indicators = document.createElement("ol"),
        dots = [];
    indicators.classList.add("carousel-indicators");
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    //Когда цикл отработает у нас сформируется определенное количесво точек
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1); //Каждой точке устанавливается атрибут data-slide-to и нумерация (начиная с 1 (0+1 = 1 слайд))
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: 0.5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            // Как бы класс активности только через js
            dot.style.opacity = 1; //У остальных точек opacity 0.5
        }
        indicators.append(dot);
        dots.push(dot); //У нас будет массив с точками
    }

    next.addEventListener("click", () => {
        //Возвращаем слайдер в начальное положение если он на последнем элементе
        if (offset == parseInt(width) * (slides.length - 1)) {
            // = ширина одного слайда (не '500px' а число 500) * колво слайдов - 1
            offset = 0;
        } else {
            offset += parseInt(width); // Добавляем ширину слайда в offset
        }
        slidesField.style.transform = `translateX(-${offset}px)`; //Слайд смещается по оси X на offset px

        if (slideIndex == slides.length) {
            // Если дошли до конца слайдов то вовзращаемся на первый слайд
            slideIndex = 1;
        } else {
            slideIndex++; // Если еще не в конце то добавляем 1
        }

        if (slides.length < 10) {
            // Меняем номер текущего слайда
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach((dot) => (dot.style.opacity = ".5")); //У всех опасити 0.5
        dots[slideIndex - 1].style.opacity = 1; //У активного элемента опасити 1
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            // Если нажали на prev а слайд был на 0 то мы возвращаем его в конец
            offset = parseInt(width) * (slides.length - 1); // Последний слайд
        } else {
            offset -= parseInt(width); // Отнимаем ширину слайда на которую сместились
        }
        slidesField.style.transform = `translateX(-${offset}px)`; //Слайд смещается по оси X на offset px

        if (slideIndex == 1) {
            // Если мы на 1 слайде то вовзращаемся на последний слайд
            slideIndex = slides.length;
        } else {
            slideIndex--; // Если еще не на 1 слайде то минусуем 1
        }

        if (slides.length < 10) {
            // Меняем номер текущего слайда
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach((dot) => (dot.style.opacity = ".5")); //У всех опасити 0.5
        dots[slideIndex - 1].style.opacity = 1; //У активного элемента опасити 1
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");
            slideIndex = slideTo; //Клинкнули на 4 точку в slideIndex пошла 4
            offset = parseInt(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach((dot) => (dot.style.opacity = ".5"));
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
}

export default slider;
