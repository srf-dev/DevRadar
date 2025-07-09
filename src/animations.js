const filter_container = document.querySelector('.select-filter')
const job_filter = document.querySelector('.job-filter')
const job_filter__item = document.querySelectorAll('.job-filter__item label')

filter_container.addEventListener('click', () => {
    job_filter.classList.toggle('open')
    filter_container.classList.toggle('open')
})

filter_container.addEventListener('mouseleave', () => removeClass())

job_filter__item.forEach((element => element.addEventListener('click', () => removeClass())))

function removeClass(){
    job_filter.classList.remove('open')
    filter_container.classList.remove('open')
}