import { getData } from "../services/services";

function cards() {
    //   Using classes for cards
    class menuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement("div");

            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach((classname) => {
                    element.classList.add(classname);
                });
            }

            element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
            this.parent.append(element);
        }
    }

    //Через forEach перебрали полученный массив, деструктуризировали полученные 3 объекта, и создали новые карточки товара
    getData("http://localhost:3000/menu").then((data) => {
        data.forEach(({ img, altimg, title, descr, price }) => {
            new menuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });

    // axios.get("http://localhost:3000/menu").then((data) => {
    //     data.data.forEach(({ img, altimg, title, descr, price }) => {
    //         new menuCard(
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price,
    //             ".menu .container"
    //         ).render();
    //     });
    // }); // Запрос через axios

    // getData("http://localhost:3000/menu").then((data) => createCard(data));
    // // Получаем data (это массив), деструктуризирует его, создает элемент в него пишет верстку и вставляет его в .menu .container
    // function createCard(data) {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         price = price * 27;
    //         const element = document.createElement("div");
    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //       <img src=${img} alt=${altimg}>
    //       <h3 class="menu__item-subtitle">${title}</h3>
    //       <div class="menu__item-descr">${descr}</div>
    //       <div class="menu__item-divider"></div>
    //       <div class="menu__item-price">
    //           <div class="menu__item-cost">Цена:</div>
    //           <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //       </div>
    //     `;

    //         document.querySelector(".menu .container").append(element);
    //     });
    // }
}

export default cards;
