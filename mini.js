let searchItem = document.getElementById("searchInput");
let searrchResultEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppend(result) {
    let {
        link,
        title,
        description
    } = result;
    console.log(title);

    //creating div - result-item
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("result-item");
    searrchResultEl.appendChild(mainDiv);

    //anchorElemnet - result-title
    let titleEl = document.createElement("a");
    titleEl.classList.add("result-title");
    titleEl.textContent = title;
    titleEl.href = link;
    titleEl.target = "_blank";
    mainDiv.appendChild(titleEl);

    //break
    let breakEL = document.createElement("br");
    mainDiv.appendChild(breakEL);

    //anchor url - result-url
    let linkEl = document.createElement("a");
    linkEl.classList.add("result-url");
    linkEl.textContent = link;
    linkEl.href = link;
    linkEl.target = "_blank";
    mainDiv.appendChild(linkEl);

    //break
    let brEl = document.createElement("br");
    mainDiv.appendChild(brEl);

    //para description - line-description
    let paraEl = document.createElement("p");
    paraEl.classList.add("line-description");
    paraEl.textContent = description;
    mainDiv.appendChild(paraEl);
}

function displayResult(searchResult) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResult) {
        createAndAppend(result);
    }
}

function searchwiki(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searrchResultEl.textContent = "";
        let searchItemEl = searchItem.value;
        console.log(searchItemEl);
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchItemEl;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
}

searchItem.addEventListener("keydown", searchwiki);
