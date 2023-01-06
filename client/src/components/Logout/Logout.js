function Logout() {
    fetch('http://10.2.10.51:3001/logout', {
        method: 'DELETE',
        credentials: 'include',
    })
}

export default Logout;