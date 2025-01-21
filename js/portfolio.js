
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
                                    crossorigin="anonymous" 
                                    decoding="auto"
                                    class="portfolioImage"
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
