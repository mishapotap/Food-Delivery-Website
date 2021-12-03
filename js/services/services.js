// Посылет запрос на сервер, получает ответ, трансформирует его в json
const postData = async (url, data) => {
    let result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: data,
    });
    return await result.json();
};

//Отправляет get запрос и возвращает нам объект в JS
async function getData(url) {
    let result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
}

export { postData };
export { getData };
