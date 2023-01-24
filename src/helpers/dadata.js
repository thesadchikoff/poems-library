
export const dadata = (query) => {
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    var token = "8457037c17cea06aeeb3d7a133f9f377d18953d9"
    let response = []
    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }
    fetch(url, options)
        .then(response => response.text())
        .then(result => response = result)
        .catch(error => console.log("error", error));
    return response

}