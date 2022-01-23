// export function store(context, payload) {
//     axios
//         .post("/cards", payload)
//         .then(response => {
//             context.dispatch('column/retrieve',  null, {root:true})
//         })
//         .catch(error => {
//             console.log("error storing card", error);
//         });
// }

// export function destroy(context, payload) {
//     axios
//         .delete(`/cards/${payload}`)
//         .then(() => {
//             context.dispatch('column/retrieve',  null, {root:true})
//         })
//         .catch(err => {
//             console.log("error deleting card", err);
//         });
// }

// export function update(context, payload) {
//     axios
//         .put(`cards/${payload.id}`, payload)
//         .then(response => {
//             context.dispatch('column/retrieve',  null, {root:true})
//         })
//         .catch(err => {
//             console.log("error updating card", err);
//         });
// }

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