const options = document.querySelectorAll(`input[name='option']`)
let jobsFound = document.getElementById('section-filter__text')

let dataJSON = []
let dataAPI = []

let developer_mode = true

function render(data, type='all'){
    const container = document.getElementById('section-job')
    container.innerHTML = ''
    dataAPI = []

    if(type === 'developer'){
        type = 'all'
    }

    data.forEach(element => {
        const card = document.createElement('div')
        card.classList.add('section-job__card')

        card.innerHTML = 
        `
         <div class="card__header">
                <div class="container">
                    <div class='circle'>
                        <img src="assets/icon_card.svg" alt="Ícone">
                    </div>
                    <p class="employer-name">${element.employer_name}</p>
                </div>
                <div class="tag ${type}">
                    ${type}
                </div>
            </div>

            <div class="line"></div>
            
            <div class="card__information">
                <div class="name">
                    <span>Nome da vaga</span>
                    <h3>${element.job_title}</h3>
                </div>

                <div class="container">
                    <p><span>Local:</span><br> ${element.job_location || 'Não informado'}</p>
                    <p><span>Publicado:</span><br> ${element.job_posted_at || 'Data não informada'}</p>
                </div>
            </div>

            <div class="line"></div>
                
            <a href="${element.job_apply_link}" class="btn-card">Ver vaga</a>
        `

        container.appendChild(card)
        dataAPI.push(container)
        jobsFound.textContent = `${data.length} vagas foram encontradas`
    })
}

// 'event.target' se refere ao botão de rádio que foi clicado/alterado
        
function optionJob(){
    options.forEach((element) => {
        element.addEventListener('change', (event) =>{
            if(event.target){
                const filter = event.target.getAttribute('data-option')
                load(filter)
            }
        })
    })
}

function optionJobLocal(){
    options.forEach((element) => {
        element.addEventListener('change', (event) =>{
            if(event.target){
                const filter = event.target.getAttribute('data-option')
                
                if(filter === 'all'){
                    jobsFound.textContent = `${dataJSON.length} vagas foram encontradas`
                    render(dataJSON)
                }
                else{
                    const job_filter = dataJSON.filter(job => job.job_title.toLowerCase().replace(/[\s\-]/g, '').includes(filter.toLowerCase()))
                    jobsFound.textContent = `${job_filter.length} vagas foram encontradas`
                    render(job_filter, filter)
                }
            }
        })
    })
}

function load(job = "developer"){

    const url = api.url(job, country="br", page = 1, num_pages = 1)
            
    api.getJob(url).then(data => {
        if (!data) {
            console.warn("Nenhum dado retornado da API")
            return
        }
        render(data, job)})
}

function loadLocal(){
    fetch('./src/generator.json')
        .then(response => response.json())
        .then(data => {
            dataJSON = data
            render(data)})
}

if(developer_mode){
    optionJobLocal()
    loadLocal()
}else{
    optionJob()
    load()
}
