export function delPost(token, id) {
    const url = `http://51.68.230.190:666/delPost?token=${token}&id=${id}`
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
}