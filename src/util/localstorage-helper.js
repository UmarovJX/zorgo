export const setLocalVar = ( key, value ) => {
	return localStorage.setItem(key, value)
}

export const getLocalVar = ( key ) => {
	return localStorage.getItem(key)
}

export const removeLocalVar = ( key ) => {
	return localStorage.removeItem(key)
}

export const setSessionVar = ( key, value ) => {
	return sessionStorage.setItem(key, value)
}

export const getSessionVar = ( key ) => {
	return sessionStorage.getItem(key)
}