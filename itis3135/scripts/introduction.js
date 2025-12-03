
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('intro-form');
    const clearBtn = document.getElementById('clear-btn');
    const addCourseBtn = document.getElementById('add-course-btn');
    const courseList = document.getElementById('course-list');

    clearBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear the form?")) {
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach((input) => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else if (input.type !== 'button' && input.type !== 'submit' && input.type !== 'reset' && input.type !== 'hidden') {
                    input.value = '';
                }
            });
        }
    });
    addCourseBtn.addEventListener('click', () => {
        const courseEntry = document.createElement('div');
        courseEntry.className = 'course-entry';
        courseEntry.innerHTML = `
            <label>Course Department: <input type="text" name="course-dept[]" required placeholder="Dept"></label>
            <label>Course Number: <input type="text" name="course-num[]" required placeholder="Num"></label>
            <label>Course Name: <input type="text" name="course-name[]" required placeholder="Name"></label>
            <label>Reason: <input type="text" name="course-reason[]" required placeholder="Reason"></label>
            <button type="button" class="delete-course-btn">Delete</button>
        `;
        courseList.appendChild(courseEntry);
    });
    courseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-course-btn')) {
            e.target.parentElement.remove();
        }
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            alert("Please fill out all required fields.");
            return;
        }
        const formData = new FormData(form);
        const data = {
            firstName: formData.get('first-name'),
            middleName: formData.get('middle-name') || '',
            nickname: formData.get('nickname') || '',
            lastName: formData.get('last-name'),
            mascotAdjective: formData.get('mascot-adjective'),
            mascotAnimal: formData.get('mascot-animal'),
            divider: formData.get('divider'),
            imageCaption: formData.get('image-caption'),
            personalBackground: formData.get('personal-background'),
            professionalBackground: formData.get('professional-background'),
            academicBackground: formData.get('academic-background'),
            primaryComputer: formData.get('primary-computer'),
            quote: formData.get('quote'),
            quoteAuthor: formData.get('quote-author'),
            funnyThing: formData.get('funny-thing'),
            shareThing: formData.get('share-thing'),
            courses: []
        };

        const imageFile = formData.get('image-upload');
        let imageSrc = document.getElementById('default-image').value;

        if (imageFile && imageFile.size > 0) {
            imageSrc = URL.createObjectURL(imageFile);
        }

        const depts = formData.getAll('course-dept[]');
        const nums = formData.getAll('course-num[]');
        const names = formData.getAll('course-name[]');
        const reasons = formData.getAll('course-reason[]');

        for (let i = 0; i < depts.length; i++) {
            data.courses.push({
                dept: depts[i],
                num: nums[i],
                name: names[i],
                reason: reasons[i]
            });
        }

        const links = formData.getAll('links[]');

        const resultHTML = `
            <h2>Introduction</h2>
            <h2>${data.firstName} ${data.middleName} ${data.lastName} ${data.divider} ${data.mascotAdjective} ${data.mascotAnimal}</h2>
            <figure>
                <img src="${imageSrc}" alt="${data.imageCaption}" style="max-width: 100%; height: auto;">
                <figcaption>${data.imageCaption}</figcaption>
            </figure>
            <ul>
                <li>
                    <b>Personal Background:</b> ${data.personalBackground}
                </li>
                <li>
                    <b>Professional Background:</b> ${data.professionalBackground}
                </li>
                <li>
                    <b>Academic Background:</b> ${data.academicBackground}
                </li>
                <li>
                    <b>Primary Computer:</b> ${data.primaryComputer}
                </li>
                <li>
                    <b>Courses I'm Taking, & Why:</b>
                    <ul>
                        ${data.courses.map((course) => `
                            <li>
                                <b>${course.dept} ${course.num} - ${course.name}:</b> ${course.reason}
                            </li>
                        `).join('')}
                    </ul>
                </li>
                ${(data.quote || data.quoteAuthor) ? `
                <li>
                    <b>Quote:</b> "${data.quote}" - ${data.quoteAuthor}
                </li>` : ''}
                ${data.funnyThing ? `
                <li>
                    <b>Funny Thing:</b> ${data.funnyThing}
                </li>` : ''}
                ${data.shareThing ? `
                <li>
                    <b>Something to Share:</b> ${data.shareThing}
                </li>` : ''}
            </ul>
            
            <div style="margin-top: 20px; text-align: center;">
                <a href="intro_form.html" onclick="location.reload(); return false;">Reset</a>
            </div>
        `;

        const main = document.querySelector('main');
        main.innerHTML = resultHTML;
    });
});