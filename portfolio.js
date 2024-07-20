
function createCard(data) {
    const portfolioList = document.getElementById("portfolio-list");
    const markup = data.map(({ title, image, src, technology, description }) => {
        return `        
            <li class="card" key=${title}>                
                <a target = "_blank" class="" href=${src}>
                    <div class="face face1">
                        <div class="content">
                            <picture>
                                <source srcset="" type="image/webp" />
                                <source srcset="" type="image/jpeg" />
                                <img
                                    src=${image} 
                                    style="object-fit: cover;"
                                    crossorigin="anonymous" 
                                    decoding="auto"
                                    // class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3"
                                    // width="300px" 
                                    // height="300px" 
                                    // loading="lazy"
                                    // sizes="226.8046875px"
                                    / >
                            </picture>
                        </div>
                    </div>
                    <div class="face face2">
                        <div class="content">
                            <h3 class="content__title">${title}</h3>
                            <div class="descr"><p >${technology}</div></p>
                            <div class="descr"><p >${description}</div></p>
                        </div>
                    </div>
                </a>
            </li>        
        `;
    }).join("")

    portfolioList.insertAdjacentHTML("beforeend", markup);  
}



document.addEventListener("DOMContentLoaded", function () {
    fetch("./data.json")
        .then((response) => response.json())
        .then((data) => createCard(data))
        .catch((error) =>
            console.error("Error loading portfolio projects:", error)
        );
});


// document.addEventListener("DOMContentLoaded", function () {
//   fetch("./data.json")
//     .then((response) => response.json())
//     .then((data) => {
//       const portfolioList = document.getElementById("portfolio-list");

//       data.portfolio.forEach((project) => {
//         const card = document.createElement("li");
//         card.classList.add("card");

//         const link = document.createElement("a");
//         link.classList.add("card-link");
//         link.target = "_blank";
//         link.href = project.link;

//         const img = document.createElement("img");
//         img.classList.add("card-img");
//         img.src = project.imgSrc;
//         img.alt = project.title;

//         const title = document.createElement("h3");
//         title.classList.add("card-title");
//         title.textContent = project.title;

//         const tools = document.createElement("p");
//         tools.classList.add("card-tools");
//         tools.textContent = project.tools;

//         const description = document.createElement("p");
//         description.classList.add("card-description");
//         description.textContent = project.description;

//         link.appendChild(img);
//         link.appendChild(title);
//         link.appendChild(tools);
//         link.appendChild(description);

//         card.appendChild(link);
//         portfolioList.appendChild(card);
//       });
//     })
//     .catch((error) =>
//       console.error("Error loading portfolio projects:", error)
//     );
// });