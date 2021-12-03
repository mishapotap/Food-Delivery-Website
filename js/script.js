require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import tabs from "./modules/tabs";
import timer from "./modules/timer";
import slider from "./modules/slider";
import modal from "./modules/modal";
import forms from "./modules/forms";
import cards from "./modules/cards";
import calc from "./modules/calc"; // Импортировали все функции
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 50000);
    //Вызываем функции
    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    timer(".timer", "2022-06-11");
    slider({
        container: ".offer__slider",
        slide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        totalCounter: ".total",
        currentCounter: ".current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner",
    });
    modal("[data-modal]", ".modal", modalTimerId);
    forms("form", ".modal", modalTimerId);
    cards();
    calc();
});
