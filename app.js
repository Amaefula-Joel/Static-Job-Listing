// handlebars library
// --- for populating jobs ---
const jobTemplate = document.getElementById("jobTemplate").innerHTML;
const templateFunc = Handlebars.compile(jobTemplate);

// --- for populating search categories ---
// const searchTemplate = document.getElementById("searchCategortTemp").innerHTML;
// const searchTempFunc = Handlebars.compile(searchTemplate);


const jobContainer = document.querySelector("#job-container");
const searchContainer = document.querySelector("#searchContainer");

// filter parameters
let filters = {
    role: "",
    level: "",
    languages: [],
    tools: []
}

window.addEventListener("DOMContentLoaded", function () {
    jobData();
});

async function jobData() {
    try {
        const requestUrl = 'data.json';

        const request = new Request(requestUrl);

        const response = await fetch(request);

        const data = await response.json();

        populateJob(data);
    } catch (error) {
        console.error('Error fetching or parsing job data:', error);
    }
}

function populateJob(jobs) {

    const templateFromJson = jobs.map(templateFunc).join("");

    jobContainer.innerHTML = templateFromJson;

    const btns = document.querySelectorAll(".btn");
    btns.forEach(function (button) {
        button.addEventListener("click", function () {
            const dataType = button.dataset.type;

            // -- for further test on handlebars library -- 
            // let searchData = {
            //     type: dataType,
            //     value: ""
            // }

            if (dataType === "role") {

                const roleFilter = button.dataset.role;
                filters.role = roleFilter;

                addSearchCategory(dataType, roleFilter);

            } else if (dataType === "level") {

                const levelFilter = button.dataset.level;
                filters.level = levelFilter;

                addSearchCategory(dataType, levelFilter);

            } else if (dataType === "languages") {

                const languageFilter = button.dataset.languages;
                filters.languages.push(languageFilter);

                addSearchCategory(dataType, languageFilter);

            } else if (dataType === "tools") {

                const toolsFilter = button.dataset.tools;
                filters.tools.push(toolsFilter);

                addSearchCategory(dataType, toolsFilter);
            }

            filterCategory(jobs);
        });
    });
}

function filterCategory(jobs) {
    const filteredJobs = jobs.filter(function (job) {
        return (filters.role === "" || job.role === filters.role) &&
            (filters.level === "" || job.level === filters.level) &&
            (filters.languages.length === 0 || filters.languages.every(lang => job.languages.includes(lang))) &&
            (filters.tools.length === 0 || filters.tools.every(tool => job.tools.includes(tool)))
    });

    // console.log(filteredJobs);
    populateJob(filteredJobs);
}

function addSearchCategory(type, value) {
    // used to to confirm if that element has been created
    const elementWithDataAttribute = document.querySelectorAll(`[data-type=${type}]`);
    let foundElement = false;

    elementWithDataAttribute.forEach(function (element) {
        if (searchContainer.contains(element)){
            if (element.getAttribute("data-value") === value) {
                foundElement = true;
            }
        }
    });

    if (!foundElement) {
        const createdButton = document.createElement('div');
        createdButton.setAttribute("class", "searchFlex");
        createdButton.innerHTML = `
            <div class="filterItem"> ${value}</div>
            <button data-type="${type}" data-value="${value}" class="deleteBtn"><img src="images/icon-remove.svg" alt="remove"></button>`;
        searchContainer.appendChild(createdButton);
        
        // searchContainer.innerHTML += `
        // <div class="searchFlex">
        //     <div class="filterItem"> ${value}</div>
        //     <button data-type="${type}" data-value="${value}" class="deleteBtn"><img src="images/icon-remove.svg" alt="remove"></button>
        // </div>`;
    }

    const deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach(function (btn) {
        btn.addEventListener("click", deleteOneCategory);
    });

    searchContainer.classList.add("show");
}

// delete a search category from the filter variable
function deleteOneCategory() {
    const buttonDataType = this.dataset.type;
    const buttonDataValue = this.dataset.value;

    if (buttonDataType === "level" || buttonDataType === "role") {
        filters[buttonDataType] = "";
    } else{
        const index = filters[buttonDataType].indexOf(buttonDataValue);
        if (index !== -1) {
            filters[buttonDataType].splice(index, 1);
        }
    }

    // hides the parent element (div.searchFlex)
    const parentOfButton = this.parentElement;
    parentOfButton.remove();
    
    // hide the searchContainer if it has nothing ot show
    if (searchContainer.childElementCount < 1) {
        searchContainer.classList.remove("show");
    }

    console.log(jobData());

}