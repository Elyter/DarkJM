export function getPosts() {
    const url = "http://51.68.230.190:666/posts"
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
}