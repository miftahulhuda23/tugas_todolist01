document.getElementById("addList").addEventListener("submit", (event) => {
    event.preventDefault()

    const list = document.getElementById("inputList").value

    const data = {
        list,
    }

    axios.post("http://localhost:3000/List", data).then((response) => {
        console.log("data berhasil ditambahkan")
    })

        .catch((error) => {
            console.log("data error")
        })
})


let data = []
axios.get("http://localhost:3000/List").then((response) => {
    const listData = document.getElementById("listData")

    data = response.data

    data.forEach((data, id) => {
        const { list } = data
        const tablelist = `
        <tr>
                    <th scope="row">${id + 1}</th>
                    <td>${list}</td>
                    <td>
                    <button type="button" class="btn btn-danger" onclick="deleteList(${data.id})"><i class="fas fa-trash-alt"></i></button> &nbsp
                    <button type="button" class="btn btn-info" onclick="editList(${data.id})"><i class="fas fa-pen-alt"></i></button>
                    </td>
                </tr>`

        listData.innerHTML += tablelist
    })
})

    .catch((error) => {
        console.log(error)
    })

const deleteList = (id) => {
    let confirm = window.confirm("are you sure ?")
    if (confirm == true) {
        axios.delete(`http://localhost:3000/List/${id}`).then((response) => {

        })
            .catch((error) => {
                console.log('deleteError')
            })
    } else {
        alert("cancel delete")
    }
}


const editList = (id) => {
    const findData = data.find(data => {
        return data.id === id
    })
    if (findData) {
        const list = window.prompt('change your list', findData.list)
        const data = {
            list,
        }
        axios.put(`http://localhost:3000/List/${id}`, data)
    }
}