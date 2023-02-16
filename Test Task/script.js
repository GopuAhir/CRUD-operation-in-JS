let globleData = []
async function getData() {


    const responseUser = await fetch("https://jsonplaceholder.typicode.com/users")
    const userData = await responseUser.json()


    const responsePosts = await fetch("https://jsonplaceholder.typicode.com/posts")
    const postsData = await responsePosts.json()


    globleData = userData.map(userItem => {
        var filterPostsData = postsData.filter(postItem => postItem.userId === userItem.id)
        return {
            ...userItem, post: filterPostsData
        }
    })
    ShowUsersTableData(globleData)
}
getData()


function ShowUsersTableData(data) {
    let table = '<table tyle="border-collapse: collapse; font-family: Arial;" >'
    table += (`<tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Show Data</th>
                   </tr>`)
    data.forEach((userItem) => {
        table +=
            (`<tr>
                    <td> ${userItem.id}</td>
                    <td> ${userItem.name}</td>
                    <td> ${userItem.email}</td>
                    <td> <button onclick="handleClick(${userItem.id})">Show Data</button></td>
                 </tr>`)
    })
    table += '</table>'
    document.getElementById("userData-list").innerHTML = table
};




function handleClick(id) {
    let table = '<table border="1">'
    table += (`<tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>UpDate</th>
                     <th>Delete</th>
                   </tr>`)
    globleData.map((userItem) => {
        userItem.post.filter((postItem) => {
            if (postItem.userId === id) {
                table +=
                    (`<tr>
                    <td> ${postItem.userId}</td>
                    <td> ${postItem.title}</td>
                    <td> ${postItem.body}</td>
                    <td> <button onclick="forUpdate(${postItem.id})">UPDATE</button></td>
                    <td> <button onclick="forDelete(${postItem.id})">DELETE</button></td>
                 </tr>`)
            }
        })
    })
    table += '</table>'
    document.getElementById("postData-list").innerHTML = table
}


function forUpdate(id) {
    globleData.forEach(item => {
        item.post.filter(postItem => {
            if (postItem.id === id) {
                console.log(postItem);
                form =
                    (`<form>
                    <label for="title">Title</label><br>
                    <input type="text" id="title" name="title" value="${postItem.title}"><br>
                    <label for="body">Body</label><br>
                    <input type="text" id="body" name="body" value="${postItem.body}"><br><br>
                    <input type = "button" onClick="upDateRecord(${postItem.id})" value = "UpDate">
             </form>`)
            }
        })
    })
    form += '</form>'
    document.getElementById("formInput-list").innerHTML = form;
}
function upDateRecord(id) {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value

    globleData.forEach(item => {
        item.post.filter(postItem => {
            if (postItem.id === id) {
                postItem.title = title
                postItem.body = body
                handleClick(item.id)
            }
        })
    })
}

function forDelete(id) {

    globleData.forEach(item => {
        const iniLength = item.post.length;
        item.post = item.post.filter(postItem => postItem.id !== id)

        const newLength = item.post.length;
        if (newLength < iniLength) {
            handleClick(item.id);
        }
    });

}
