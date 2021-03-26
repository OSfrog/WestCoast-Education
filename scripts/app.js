const mainContainer = document.querySelector('.main-container');
const mainCenterContainer = document.querySelector('.main-center-container');


function getCourses(){
    fetch('http://localhost:3000/courses')
    .then((response) => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(data => {
        mainContainer.innerHTML = '';

        for (let obj of data){
            
            mainContainer.insertAdjacentHTML("beforeend", 
                `
                <div class="card-container">
                    <div class="card-image-container">
                    <img src="${obj.image}" />
                    </div>
                    <div class="card-text-container">
                        <h2>${obj.title}</h2>
                        <p>Category: ${obj.category}</p>
                        <p>${obj.description}</p>
                        <p>Length: ${obj.length} weeks</p>
                    </div>
                </div>
                `);
        }    
    })
    .catch((err) => {
       mainCenterContainer.innerHTML += `<p>${err}</p>`; 
    })
}

getCourses();