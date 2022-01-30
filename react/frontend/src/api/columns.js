
import axios from 'axios';

export function retrieve() {
    return axios
        .get("/api/columns/")
        .then(response => {
            return response.data
        })
        .catch((err) => {
            console.log('error when retrieving columns', err)
        });
}

export function store(name, order = -1) {
    const column = ({name, order})
    return axios
        .post("api/columns/", column)
        .then((response) => {
            return response.status
        })
        .catch(error => {
            console.log("error when creating new column", error);
        });
}

export function destroy(columnId) {
    console.log("delete column", columnId)
    return axios
        .delete(`api/columns/${columnId}/`)
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log("error deleting column", err);
        });
}

// export function update(context, payload) {
//     axios
//         .put(`/columns/${payload.id}`, payload)
//         .then(() => {
//             context.dispatch('retrieve')
//         })
//         .catch(err => {
//             console.log("error updating column", err);
//         });
// }

// export function saveColumnOrder(context) {
//     context.commit('SET_UPDATE_ORDER_PROGRESS', true)
//     const data = {
//         columns: context.state.columns
//     }
//     axios.post('/columns/order', data).then((response) => {
//         context.commit('SET_UPDATE_ORDER_PROGRESS', false)
//         context.dispatch('retrieve')
//     }).catch((error) => {
//         console.log("error updating column order", error)
//     })
// }