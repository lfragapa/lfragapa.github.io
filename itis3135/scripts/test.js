document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. SETUP COURSES (Prefilled with your data) ---
    const initialCourses = [
        { name: "ITIS-3135 Front-End Web Application Development", desc: "Seemed like an interesting class and I wanted to find out more so I registered for it." },
        { name: "ITSC-2175 Logic and Algorithms", desc: "Required for Major." },
        { name: "ITSC-3155 Software Engineering", desc: "Required for major." },
        { name: "STAT-2122 Intro to Probability and Statistics", desc: "Required for my major and also I enjoy stats." },
        { name: "MUSC-1113 Symphonic Band", desc: "I played in my band in my HS for years and I took a break from it last year but I want to get back into it." },
        { name: "MUSC-1512 Music in U.S. Communities", desc: "I had a class with the same professor last semester and I really enjoyed it so I took another class with him to check off another one of my themes classes." }
    ];

    const coursesContainer = document.getElementById("coursesContainer");

    function addCourseInput(name = "", desc = "") {
        const div = document.createElement("div");
        div.className = "course-entry";
        div.innerHTML = `
            <input type="text" name="courseName" placeholder="Course Name" value="${name}" required>
            <input type="text" name="courseDesc" placeholder="Why are you taking it?" value="${desc}" required>
            <button type="button" class="delete-btn">Delete</button>
        `;
        div.querySelector(".delete-btn").addEventListener("click", () => div.remove());
        coursesContainer.appendChild(div);
    }

    // Load initial courses
    initialCourses.forEach(c => addCourseInput(c.name, c.desc));

    // Button Listeners
    document.getElementById("addCourseBtn").addEventListener("click", () => addCourseInput());
    
    document.getElementById("clearBtn").addEventListener("click", () => {
        document.querySelectorAll("form input, form textarea").forEach(input => {
            if (input.type !== "submit" && input.type !== "reset" && input.type !== "button") {
                input.value = "";
                input.checked = false;
            }
        });
    });

    // --- 2. FORM SUBMISSION (Recreating the Original Page) ---
    document.getElementById("introForm").addEventListener("submit", function(e) {
        e.preventDefault();

        // Gather Values
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        const mascot = document.getElementById("mascot").value;
        const animal = document.getElementById("animal").value;
        const caption = document.getElementById("caption").value;
        const personalBg = document.getElementById("personalBg").value;
        const profBg = document.getElementById("profBg").value;
        const academicBg = document.getElementById("academicBg").value;
        const platformBg = document.getElementById("platformBg").value;
        const quote = document.getElementById("quote").value;
        const author = document.getElementById("author").value;

        // Image Handling
        const imageInput = document.getElementById("introImage");
        let imgSrc = "images/ZoroPose.jpg"; // YOUR ORIGINAL IMAGE
        if (imageInput.files[0]) imgSrc = URL.createObjectURL(imageInput.files[0]);

        // Build Course List HTML
        let coursesHTML = "";
        document.querySelectorAll(".course-entry").forEach(entry => {
            const n = entry.querySelector("input[name='courseName']").value;
            const d = entry.querySelector("input[name='courseDesc']").value;
            coursesHTML += `
                <li>
                    <b>${n}:</b> ${d}
                </li>`;
        });

        // RECONSTRUCT HTML
        // This HTML matches your original introduction.html EXACTLY.
        // The Instructions say: "They should be EXACTLY the same except for the H2"
        // So we keep the <h2>Introduction Form</h2> at the top, and render the rest below.
        
        const resultHTML = `
            <h2>${fname} ${lname} || ${mascot} ${animal}</h2>
            <figure>
                <img src="${imgSrc}" alt="${caption}">
                <figcaption>${caption}</figcaption>
            </figure>
            <ul>
                <li>
                    <b>Personal Background:</b> ${personalBg}
                </li>
                <li>
                    <b>Professional Background:</b> ${profBg}
                </li>
                <li>
                    <b>Academic Background:</b> ${academicBg}
                </li>
                <li>
                    <b>Primary Computer:</b> ${platformBg}
                </li>
                <li>
                    <b>Courses I'm Taking, & Why:</b>
                    <ul>
                        ${coursesHTML}
                    </ul>
                </li>
                <li style="list-style: none; margin-top: 10px;">
                   <i>"${quote}"</i> - <b>${author}</b>
                </li>
            </ul>
            
            <br>
            <p><a href="#" onclick="location.reload()">Reset</a></p>
        `;

        // Hide Form, Show Result
        document.getElementById("form-wrapper").style.display = "none";
        document.getElementById("resultContainer").innerHTML = resultHTML;
    });
});
