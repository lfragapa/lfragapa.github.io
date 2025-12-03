document.addEventListener('DOMContentLoaded', () => {
    const generateJsonBtn = document.getElementById('generate-json-btn');
    const form = document.getElementById('intro-form');

    if (generateJsonBtn) {
        generateJsonBtn.addEventListener('click', () => {
            if (!form.checkValidity()) {
                alert("Please fill out all required fields before generating JSON.");
                return;
            }

            const formData = new FormData(form);

            const getCourses = () => {
                const depts = formData.getAll('course-dept[]');
                const nums = formData.getAll('course-num[]');
                const names = formData.getAll('course-name[]');
                const reasons = formData.getAll('course-reason[]');
                const courses = [];
                for (let i = 0; i < depts.length; i++) {
                    courses.push({
                        department: depts[i],
                        number: nums[i],
                        name: names[i],
                        reason: reasons[i]
                    });
                }
                return courses;
            };

            const getLinks = () => {
                const linkUrls = formData.getAll('links[]');
                const links = linkUrls.map((url, index) => {
                    let name = `Link ${index + 1}`;
                    if (url.includes('github.com') && !url.includes('.github.io')) name = "GitHub";
                    else if (url.includes('.github.io')) name = "GitHub Page";
                    else if (url.includes('linkedin.com')) name = "LinkedIn";
                    else if (url.includes('freecodecamp.org')) name = "freeCodeCamp";
                    else if (url.includes('codecademy.com')) name = "Codecademy";
                    else if (url.includes('webpages.charlotte.edu')) name = "Charlotte Webpage";

                    return {
                        name: name,
                        href: url
                    };
                });

                const order = ["GitHub", "GitHub Page", "freeCodeCamp", "Codecademy", "LinkedIn"];
                return links.sort((a, b) => {
                    const indexA = order.indexOf(a.name);
                    const indexB = order.indexOf(b.name);
                    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                    if (indexA !== -1) return -1;
                    if (indexB !== -1) return 1;
                    return 0;
                });
            };

            const data = {
                firstName: formData.get('first-name'),
                preferredName: formData.get('nickname') || '',
                middleInitial: (formData.get('middle-name') || '').charAt(0).toUpperCase(),
                lastName: formData.get('last-name'),
                divider: formData.get('divider'),
                mascotAdjective: formData.get('mascot-adjective'),
                mascotAnimal: formData.get('mascot-animal'),
                image: "images/ZoroPose.jpg",
                imageCaption: formData.get('image-caption'),
                personalStatement: formData.get('quote') || '',
                personalBackground: formData.get('personal-background'),
                professionalBackground: formData.get('professional-background'),
                academicBackground: formData.get('academic-background'),
                subjectBackground: "",
                primaryComputer: formData.get('primary-computer'),
                courses: getCourses(),
                links: getLinks()
            };

            const imageFile = formData.get('image-upload');
            if (imageFile && imageFile.size > 0) {
                data.image = imageFile.name;
            }

            const jsonString = JSON.stringify(data, null, 2);

            const syntaxHighlight = (json) => {
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                    let cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                });
            };

            const highlightedJson = syntaxHighlight(jsonString);

            const main = document.querySelector('main');
            main.innerHTML = `
                <h2>Introduction JSON</h2>
                <pre><code class="language-json">${highlightedJson}</code></pre>
                <div style="margin-top: 20px; text-align: center;">
                    <a href="intro_form.html" onclick="location.reload(); return false;">Reset</a>
                </div>
            `;
        });
    }
});
