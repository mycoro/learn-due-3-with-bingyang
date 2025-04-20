import { ref } from 'vue'

const isAuthenticated = ref(false) //a global state that tracks whether the user is logged in

const login = async (username, password) => {
    //simulate a successful login
    isAuthenticated.value = true
}

const logout = async () => {
    //simulate a successful logout
    isAuthenticated.value = false
}

export { isAuthenticated, login, logout}