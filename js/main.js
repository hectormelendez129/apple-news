const getLocation = document.querySelector('button')
getLocation.addEventListener('click', getNews)

function getNews() {
    //creaate const userdata, api
    const date = document.querySelector('input').value
    const keyword = document.getElementById('keyword').value
    const searchType = document.querySelector('input[name = searchType]:checked').value
    const lang = document.querySelector('input[name = lang]:checked').value
    const numOfArts = document.querySelector('input[name = numOfArts]:checked').value
    //Dev api is only valid through home port server.
    const api = `73b888e216384676be0c7433b606aa60`

    //Prep article list section to accept article cards
    let articleList = document.querySelector('.articleList')
    articleList.innerHTML = '' //removes previous queries



    //insert const into url: 
    const url = `https://newsapi.org/v2/everything?q=apple+${keyword}&searchin=${searchType}&from=${date}&language=${lang}&sortBy=relevancy&apiKey=${api}`
    fetch(url)
        .then(res => res.json()) //parse response into aa json
        .then(data => {
            //Loop through articles logs json, title, url, explanations is description
            for (let i = 0; i < numOfArts; i++) {

                //create div
                const articleCard = document.createElement('div')
                articleCard.classList.add('articleCard')

                //create elements with data points
                
                const title = document.createElement('h3')
                title.id = 'title'
                title.innerText = data.articles[i].title

                const author = document.createElement('h3')
                author.id = 'author'
                author.innerText = data.articles[i].author || 'Unknown Author'

                const published = document.createElement('h3')
                published.id = 'published'
                published.innerText = data.articles[i].publishedAt

                const urlH3 = document.createElement('h3')
                urlH3.id = 'urlH3'
                urlH3.innerHTML = `<a href="${data.articles[i].url}" target="_blank">Read Article</a>`

                const content = document.createElement('h3')
                content.id = 'content'
                content.innerText = data.articles[i].content || 'No summary available.'

                const img = document.createElement('img')
                img.id = 'img'
                img.src = data.articles[i].urlToImage || 'https://via.placeholder.com/200x200?text=No+Image'
                img.width = 200
                img.height = 200

                // append to article card
                articleCard.appendChild(img)
                articleCard.appendChild(title)
                articleCard.appendChild(author)
                articleCard.appendChild(published)
                articleCard.appendChild(urlH3)
                articleCard.appendChild(content)

                // append card to article list
                articleList.appendChild(articleCard)

                // console logs for debugging
                console.log(data.articles[i])
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}