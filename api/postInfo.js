export function postInfo(id, token) {
    const url = `http://51.68.230.190:666/postInfo?id=${id}&token=${token}`
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
}