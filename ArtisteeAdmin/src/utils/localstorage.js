const keyUserName = '__TI_TELENTU'
const keyPassword = '__TI_TELENTP'

export const setCregential = credential => {
  const {userName, password} = credential
  window.localStorage.setItem(keyUserName, JSON.stringify(userName))
  window.localStorage.setItem(keyPassword, JSON.stringify(password))
}

export const getCredential = () => {
  const localstorageUserName = window.localStorage.getItem(keyUserName)
  const localstoragePassword = window.localStorage.getItem(keyPassword)

  return {
    userName: localstorageUserName,
    password: localstoragePassword,
  }
}

export const logout = () => {
  window.localStorage.clear()
}

export const isLogin = () => {
  const localstorageUserName = window.localStorage.getItem(keyUserName)
  const localstoragePassword = window.localStorage.getItem(keyPassword)
  return !!localstoragePassword && !!localstorageUserName
}
