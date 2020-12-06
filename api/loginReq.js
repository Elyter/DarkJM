export function loginReq(username, password) {
    const url = `http://51.68.230.190:666/login?username=${encodeURI(username)}&password=${encodeURI(password)}`
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
}