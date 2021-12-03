function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    // modal.classList.toggle("show");
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    if (modalTimerId) {
        //Проверка передан и существует ли modalTimerId
        clearTimeout(modalTimerId);
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove("show");
    // modal.classList.toggle("show");
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach((button) => {
        button.addEventListener("click", () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.getAttribute("data-close") == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (
            window.scrollY + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
