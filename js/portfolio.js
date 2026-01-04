

function createCard(data, category = 'all') {
    const portfolioList = document.getElementById("portfolio-list");
    
    const filteredData = category === 'all' 
        ? data 
        : data.filter(item => item.category === category);
    
    const markup = filteredData.map(({ title, image, src, technology, description }) => `
        <li class="card hidden" data-category="${category === 'all' ? 'all' : category}">
            <a target="_blank" href="${src}">
                <div class="face face1">
                    <div class="content">
                        <picture>
                            <source srcset="" type="image/webp" />
                            <source srcset="" type="image/jpeg" />
                            <img
                                src="${image}" 
                                crossorigin="anonymous" 
                                decoding="auto"
                                class="portfolioImage"
                            />
                        </picture>
                    </div>
                </div>
                <div class="face face2">
                    <div class="content">
                        <h3 class="content__title">${title}</h3>
                        <div><p class="descr">${technology}</p></div>
                        <div><p class="descr">${description}</p></div>
                    </div>
                </div>
            </a>
        </li>
    `).join("");

    portfolioList.innerHTML = markup;
    
    document.querySelectorAll('.card').forEach((card, index) => {
        card.classList.add('show');
        card.classList.remove('hidden');
    });
}

function setupFilters(data) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const selectedCategory = btn.dataset.category;
            createCard(data, selectedCategory);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("./data.json")
        .then((response) => response.json())
        .then((data) => {
            createCard(data);
            setupFilters(data);
        })
        .catch((error) =>
            console.error("Error loading portfolio projects:", error)
        );
});


// function createCard(data) {
//     const portfolioList = document.getElementById("portfolio-list");
//     const markup = data.map(({ title, image, src, technology, description }) => {
//         return `        
//             <li class="card" key=${title}>                
//                 <a target = "_blank" class="" href=${src}>
//                     <div class="face face1">
//                         <div class="content">
//                             <picture>
//                                 <source srcset="" type="image/webp" />
//                                 <source srcset="" type="image/jpeg" />
//                                 <img
//                                     src=${image} 
//                                     crossorigin="anonymous" 
//                                     decoding="auto"
//                                     class="portfolioImage"
//                                 / >
//                             </picture>
//                         </div>
//                     </div>
//                     <div class="face face2">
//                         <div class="content">
//                             <h3 class="content__title">${title}</h3>
//                             <div><p class="descr">${technology}</div></p>
//                             <div><p class="descr">${description}</div></p>
//                         </div>
//                     </div>
//                 </a>
//             </li>        
//         `;
//     }).join("")

//     portfolioList.insertAdjacentHTML("beforeend", markup);  
// }

// document.addEventListener("DOMContentLoaded", function () {
//     fetch("./data.json")
//         .then((response) => response.json())
//         .then((data) => createCard(data))
//         .catch((error) =>
//             console.error("Error loading portfolio projects:", error)
//         );
// });
