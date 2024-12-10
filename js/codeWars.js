
fetch('https://www.codewars.com/api/v1/users/Kryzhanivskyi89')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.codewars-badge img').src = data.badges.large;
    });