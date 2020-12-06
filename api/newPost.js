export function newPostReq(token, title, text) {
    const url = `http://51.68.230.190:666/newPost?token=${token}&title=${encodeURI(title)}&text=${encodeURI(text)}`
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
}