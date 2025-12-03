document.addEventListener('DOMContentLoaded', () => {
    const generateHtmlBtn = document.getElementById('generate-html-btn');
    const form = document.getElementById('intro-form');

    if (generateHtmlBtn) {
        generateHtmlBtn.addEventListener('click', () => {
            if (!form.checkValidity()) {
                alert("Please fill out all required fields before generating HTML.");
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
                primaryComputer: formData.get('primary-computer'),
                quoteAuthor: formData.get('quote-author'),
                funnyThing: formData.get('funny-thing'),
                shareThing: formData.get('share-thing'),
                courses: getCourses(),
                links: getLinks()
            };

            const imageFile = formData.get('image-upload');
            if (imageFile && imageFile.size > 0) {
                data.image = imageFile.name;
            }

            let htmlString = `
<h2>Introduction HTML</h2>
<h3>${data.firstName} ${data.middleInitial ? data.middleInitial + '. ' : ''}${data.preferredName ? '"' + data.preferredName + '" ' : ''}${data.lastName} ${data.divider} ${data.mascotAdjective} ${data.mascotAnimal}</h3>
<figure>
    <img
        src="${data.image}"
        alt="${data.imageCaption}"
    />
    <figcaption>${data.imageCaption}</figcaption>
</figure>
<ul>
    <li>
        <strong>Personal Background:</strong> ${data.personalBackground}
    </li>
    <li>
        <strong>Professional Background:</strong> ${data.professionalBackground}
    </li>
    <li>
        <strong>Academic Background:</strong> ${data.academicBackground}
    </li>
    <li>
        <strong>Primary Computer:</strong> ${data.primaryComputer}
    </li>
    <li>
        <strong>Courses I'm Taking, & Why:</strong>
        <ul>
${data.courses.map((course) => `            <li>
                <strong>${course.department} ${course.number} - ${course.name}:</strong> ${course.reason}
            </li>`).join('\n')}
        </ul>
    </li>
${(data.personalStatement || data.quoteAuthor) ? `    <li>
        <strong>Quote:</strong> "${data.personalStatement}" - ${data.quoteAuthor}
    </li>` : ''}
${data.funnyThing ? `    <li>
        <strong>Funny Thing:</strong> ${data.funnyThing}
    </li>` : ''}
${data.shareThing ? `    <li>
        <strong>Something to Share:</strong> ${data.shareThing}
    </li>` : ''}
</ul>
<ul>
${data.links.map((link) => `    <li>
        <a href="${link.href}">${link.name}</a>
    </li>`).join('\n')}
</ul>`;

            const syntaxHighlightHtml = (html) => {
                let escaped = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

                escaped = escaped.replace(/(&lt;\/?[a-z0-9]+)(.*?)(&gt;)/gi, function (match, p1, p2, p3) {
                    let tag = `<span class="key">${p1}</span>`;
                    let attrs = p2.replace(/([a-z-]+)=(".*?")/gi, '<span class="string">$1</span>=<span class="string">$2</span>');
                    let end = `<span class="key">${p3}</span>`;
                    return tag + attrs + end;
                });

                return escaped;
            };

            const highlightedHtml = syntaxHighlightHtml(htmlString);

            const main = document.querySelector('main');
            main.innerHTML = `
                <h2>Introduction HTML</h2>
                <pre><code class="language-html">${highlightedHtml}</code></pre>
                <div style="margin-top: 20px; text-align: center;">
                    <a href="intro_form.html" onclick="location.reload(); return false;">Reset</a>
                </div>
            `;
        });
    }
});
