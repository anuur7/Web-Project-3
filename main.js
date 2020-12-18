const button = document.querySelector('.button')
const searchbox = document.querySelector('.searchbox')
const chineseButton = document.querySelector('.chinese')
const mainContentDiv = document.querySelector('.main-content')
const chinese = document.querySelector('.chinese')
const indian = document.querySelector('.indian')
const italian = document.querySelector('.italian')
const african = document.querySelector('.african')

let cuisinesArray = [chinese, indian, italian, african];

button.addEventListener("click", fetchSearch)

async function fetchSearch(name) {
    const restaurantToSearch = name ? name : searchbox.value; 

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(data) {
            console.log(data)

            const restaurantResponse = await fetch (`https://developers.zomato.com/api/v2.1/search?q=${restaurantToSearch}&count=20&lat=${data.coords.latitude}&lon=${data.coords.longitude}&cuisines=indian`, {
    headers: 
    { "user-key": "207a0c5b1b9e7e8ba746b09b4ecdbd80" } 
})
    const data1 = await restaurantResponse.json()
    console.log(data1)

    let output = data1.restaurants.map((i) => {
        return `<ul>
                    <li> <b>Restaurant</b>: ${i.restaurant.name}</li>
                    <li> <b>Rating</b>: ${i.restaurant.user_rating.aggregate_rating}/10</li>
                    <li> <b>Address</b>: ${i.restaurant.location.address}</li>
                 </ul>`
    }).join("");
    mainContentDiv.insertAdjacentHTML('afterbegin', output);

        }, function() {
            alert('Cannot get your location')
        })
    }

}

cuisinesArray.forEach(cuisine => {
    cuisine.addEventListener('click', function() {
        fetchSearch(cuisine.className)
    })
}) 
