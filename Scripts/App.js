const baseURLToSearch = "https://tenor.googleapis.com/v2/search?";
const baseFeaturedURL = "https://tenor.googleapis.com/v2/featured?";
const APIKey = "AIzaSyDfuGjk5rgs8Kbc1mJ2i7wjf8-01rKif0M";
var searchContent = document.getElementById('giphSearchBar');
var searchBox = document.getElementById('searchedGiphs');
var naturalPage = document.getElementById('giphs');
var featuredGiphs = document.getElementById('trendingList');   
var finalURL;
document.addEventListener('keydown' ,async (event) => {
    if (event.key === 'Enter') {
        searchBox.innerHTML = '';
        finalURL = baseURLToSearch + `q=${searchContent.value}&key=${APIKey}&limit=10`;
        searchBox.style.display = 'flex';
        naturalPage.style.display = 'none';
        runObject(await search(finalURL),searchBox )
        }
    
})
//event listener para verificar si el input del searchbox esta vacio

searchContent.addEventListener('input', () => {
    if (searchContent.value === '') featured();
})
        


async function search(url)  {
    let object;
    await fetch (url).then(res => res.json()).then(data => object = data.results);
    return object;
}

const createElements  = (url, name) =>{
    let finalContent = document.createElement('div')
    let tittle = document.createElement('p');
    let image = document.createElement('img')
    image.src = url;
    tittle.textContent = name;
    finalContent.appendChild(image);
    finalContent.appendChild(tittle);
    finalContent.className = 'eachGiph'
    return finalContent;
}


const runObject = (jsonObject, box) => {
    console.log(jsonObject);
    jsonObject.forEach(element => {
        console.log(element);
        box.appendChild(createElements(element.media_formats.nanogif.url, element.content_description))
    })
}
featured()

async function featured() {
    featuredGiphs.innerHTML = '';   
    let url = baseFeaturedURL+ `&key=${APIKey}&limit=4&searchFilter=a`
    let object;
    searchBox.style.display = 'none';
    naturalPage.style.display = 'flex';
    await fetch(url).then(res => res.json()).then(data => object = data);
    runObject(object.results, featuredGiphs);
}   