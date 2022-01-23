
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

// export function store(context, payload) {
//     axios
//         .post("/columns", payload)
//         .then(() => {
//             context.dispatch('retrieve')
//         })
//         .catch(error => {
//             console.log("error when creating new column", error);
//         });
// }

// export function destroy(context, payload) {
//     axios
//         .delete(`/columns/${payload}`)
//         .then(response => {
//             context.commit('REMOVE_COLUMN', payload)
//         })
//         .catch(err => {
//             console.log("error deleting column", err);
//         });
// }

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