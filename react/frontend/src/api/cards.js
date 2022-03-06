import axios from 'axios';

export function store(payload) {
    return axios
        .post("/api/cards/", payload)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log("error storing card", error);
        });
}

export function destroy(cardId) {
    return axios
        .delete(`api/cards/${cardId}/`)
        .then((response) => {
            return response.data
        })
        .catch(err => {
            console.log("error deleting card", err);
        });
}

export function update(card) {
    return axios
        .put(`api/cards/${card.id}/`, card)
        .then((response) => {
            return response.data
        })
        .catch(err => {
            console.log("error updating card", err);
        });
}

export function saveCardOrder(cardOrder, columnId) {
    console.log("saving card order", cardOrder, columnId);
    return axios
        .put('api/cards/1/order/', ({cardOrder, columnId}))
        .then((response) => {
            console.log("response", response)
        }).catch((error) => {
            console.log("error updating card order", error)
        })
}