let currentAudio = null; 

document.getElementById("btnSub").addEventListener("click", (event) => {
    event.preventDefault();
    let inp = document.getElementById("input").value;
    get_data(inp);
});

async function get_data(inp) {
    let url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${inp}`;
    let options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cbe6888b66msh59d7f5f3630ed7dp17f820jsn7f9cdf6970c2',
            'X-RapidAPI-Host':'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    'deezerdevs-deezer.p.rapidapi.com';
    const response = await fetch(url, options);
    let result = await response.json();
    result = result.data;
    document.getElementById("results").innerHTML = "";
    result.forEach(item => {
        console.log(item);
        let div = document.createElement("div");
        div.setAttribute("class", "songs");

        let img = document.createElement("img");
        img.src = item.album.cover_big;
        img.setAttribute("class", "songimg");

        let title = document.createElement("div");
        title.innerText = item.title;
        title.setAttribute("class", "title");

        let audio = document.createElement("audio");
        audio.src = item.preview;
        audio.controls = true;
        audio.setAttribute("class", "audio");

        audio.addEventListener('play', function() {
            if (currentAudio && currentAudio !== this) {
                currentAudio.pause();
            }
            currentAudio = this; 
        });

        div.append(img);
        div.append(title);
        div.append(audio);
        document.getElementById("results").append(div);
    });
}

// Default search
document.getElementById("input")
get_data('arijit singh');