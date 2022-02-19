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

// export function storeNewCardOrder(context, payload) {
//     let data = [];
//     payload.forEach(colId => {
//         data.push(context.rootState.column.columns[colId]);
//     })
//     axios.post('/cards/reorder', {data}).then((response) => {
//         console.log("response", response)
//     }).catch((error) => {
//         console.log("error updating card order", error)
//     })
// }