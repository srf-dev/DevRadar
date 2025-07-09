const api = {}

const optionsJob = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': `Sua chave aqui`,
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
}

api.getJob = (url) => {
    return fetch(url, optionsJob)
        .then(response => response.json())
        .then(response => response.data)
        .catch (error => {
            console.error(error)
            return []
        })
}

api.url = (job, country, page, num_pages) => {
    return `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(job)}&country=${country}&page=${page}&num_pages=${num_pages}`
}

