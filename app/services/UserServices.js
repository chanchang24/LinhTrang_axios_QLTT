function userService() {
    this.layDS = function () {
        return axios({
            url: 'https://60eea4afeb4c0a0017bf4558.mockapi.io/users',
            method: 'GET'
        });
    }
}
userService.prototype.addUser = function (user) {
    return axios({
        url: 'https://60eea4afeb4c0a0017bf4558.mockapi.io/users',
        method: 'POST',
        data: user,
    })
}
userService.prototype.xoaUser = function (id) {
    return axios({
        url: `https://60eea4afeb4c0a0017bf4558.mockapi.io/users/${id}`,
        method: 'DELETE',
    })
}
userService.prototype.xemUser = function (id) {
    return axios({
        url: `https://60eea4afeb4c0a0017bf4558.mockapi.io/users/${id}`,
        method: 'GET',
    })
}
userService.prototype.capNhatUser = function (id, user) {
    return axios({
        url: `https://60eea4afeb4c0a0017bf4558.mockapi.io/users/${id}`,
        method: 'PUT',
        data: user,
    })
}

