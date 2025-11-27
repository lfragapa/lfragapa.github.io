const courseBtn = document.getElementById("add-course-btn");
const courseFieldset = document.getElementById("course-fieldset");

courseBtn.addEventListener("click", () => {
    courseFieldset.innerHTML = `
        <p>Hello world</p>
    `;
})