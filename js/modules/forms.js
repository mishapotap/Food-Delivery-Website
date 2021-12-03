import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalSelector, modalTimerId) {
    // Send forms

    const forms = document.querySelectorAll(formSelector),
        modal = document.querySelector(modalSelector);

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так...",
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    // Отвечает за привязку постинга
    function bindPostData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
            form.insertAdjacentElement("afterend", statusMessage);
            // Вставили кусок кода после элемента statusMessage

            const formData = new FormData(form);

            //Json берет данные с формы, превращает в массив с массивами, обратно в объект и его переводит в json формат который мы потом в postData постим на dj.json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        openModal(modalSelector, modalTimerId);

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
    <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
    </div>
    `;
        document.querySelector(modalSelector).append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            modal.classList.add("show");
            modal.classList.remove("hide");
            closeModal(modalSelector);
        }, 4000);
    }
}

export default forms;
