document.addEventListener('DOMContentLoaded', function() {
    // Navigation between sections
    setupNavigation();
    
    // Real-time preview functionality
    setupRealTimePreview();
    
    // Add more experience/education entries
    setupAddMoreEntries();
    
    // Handle "current" checkboxes
    setupCurrentCheckboxes();
    
    // Generate and download resume
    setupResumeGeneration();
});

function setupNavigation() {
    // Form navigation (tabs)
    const navItems = document.querySelectorAll('.form-navigation li');
    const nextButtons = document.querySelectorAll('.next-section');
    const prevButtons = document.querySelectorAll('.prev-section');
    const formSections = document.querySelectorAll('.form-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update navigation active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section, hide others
            formSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Next button functionality
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentSection = this.closest('.form-section');
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection) {
                // Hide current section
                currentSection.classList.remove('active');
                
                // Show next section
                nextSection.classList.add('active');
                
                // Update navigation
                const nextSectionId = nextSection.id;
                navItems.forEach(nav => {
                    nav.classList.remove('active');
                    if (nav.getAttribute('data-section') === nextSectionId) {
                        nav.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Previous button functionality
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentSection = this.closest('.form-section');
            const prevSection = currentSection.previousElementSibling;
            
            if (prevSection) {
                // Hide current section
                currentSection.classList.remove('active');
                
                // Show previous section
                prevSection.classList.add('active');
                
                // Update navigation
                const prevSectionId = prevSection.id;
                navItems.forEach(nav => {
                    nav.classList.remove('active');
                    if (nav.getAttribute('data-section') === prevSectionId) {
                        nav.classList.add('active');
                    }
                });
            }
        });
    });
}

function setupRealTimePreview() {
    // Personal information preview
    const fullNameInput = document.getElementById('fullName');
    const guardianInput = document.getElementById('jobTitle'); // Using jobTitle for guardian
    const landmarkInput = document.querySelectorAll('.form-group input[placeholder=""]')[0];
    const areaInput = document.querySelectorAll('.form-group input[placeholder=""]')[1];
    const distInput = document.querySelectorAll('.form-group input[placeholder=""]')[2];
    const pinInput = document.querySelectorAll('.form-group input[placeholder=""]')[3];
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const locationInput = document.getElementById('location');
    const linkedinInput = document.getElementById('linkedin');
    const websiteInput = document.getElementById('website');
    
    // Preview elements
    const previewFullName = document.getElementById('preview-fullname');
    const previewGuardian = document.getElementById('preview-guardian');
    const previewLandmark = document.getElementById('preview-landmark');
    const previewArea = document.getElementById('preview-area');
    const previewCity = document.getElementById('preview-city');
    const previewPincode = document.getElementById('preview-pincode');
    const previewEmail = document.getElementById('preview-email');
    const previewPhone = document.getElementById('preview-phone');
    const previewLocation = document.getElementById('preview-location');
    const previewLinkedin = document.getElementById('preview-linkedin');
    const previewWebsite = document.getElementById('preview-website');
    
    // Update personal info in real-time
    if (fullNameInput) {
        fullNameInput.addEventListener('input', function() {
            previewFullName.textContent = this.value || 'Your Full Name';
        });
    }
    
    if (guardianInput) {
        guardianInput.addEventListener('input', function() {
            previewGuardian.textContent = this.value || 'D/O';
        });
    }
    
    if (landmarkInput) {
        landmarkInput.addEventListener('input', function() {
            previewLandmark.textContent = this.value || 'Landmark / Near by';
        });
    }
    
    if (areaInput) {
        areaInput.addEventListener('input', function() {
            previewArea.textContent = this.value || 'Area';
        });
    }
    
    if (distInput) {
        distInput.addEventListener('input', function() {
            previewCity.textContent = this.value || 'State /City';
        });
    }
    
    if (pinInput) {
        pinInput.addEventListener('input', function() {
            previewPincode.textContent = this.value || 'Pincode';
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            previewEmail.innerHTML = this.value ? `<i class="fas fa-envelope"></i> ${this.value}` : '<i class="fas fa-envelope"></i> email@example.com';
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            previewPhone.innerHTML = this.value ? `<i class="fas fa-phone"></i> ${this.value}` : '<i class="fas fa-phone"></i> (123) 456-7890';
        });
    }
    
    if (locationInput) {
        locationInput.addEventListener('input', function() {
            previewLocation.innerHTML = this.value ? `<i class="fas fa-map-marker-alt"></i> ${this.value}` : '<i class="fas fa-map-marker-alt"></i> City, State';
        });
    }
    
    if (linkedinInput) {
        linkedinInput.addEventListener('input', function() {
            if (this.value) {
                previewLinkedin.innerHTML = `<i class="fab fa-linkedin"></i> ${this.value}`;
                previewLinkedin.style.display = 'block';
            } else {
                previewLinkedin.style.display = 'none';
            }
        });
    }
    
    if (websiteInput) {
        websiteInput.addEventListener('input', function() {
            if (this.value) {
                previewWebsite.innerHTML = `<i class="fas fa-globe"></i> ${this.value}`;
                previewWebsite.style.display = 'block';
            } else {
                previewWebsite.style.display = 'none';
            }
        });
    }
    
    // Experience preview
    setupExperiencePreview();
    
    // Education preview
    setupEducationPreview();
    
    // Skills preview
    const skillsInput = document.getElementById('skillsList');
    const previewSkills = document.getElementById('preview-skills');
    
    if (skillsInput) {
        skillsInput.addEventListener('input', function() {
            if (this.value.trim()) {
                const skills = this.value.split(',').map(skill => skill.trim());
                previewSkills.innerHTML = '';
                
                const skillsList = document.createElement('ul');
                skillsList.className = 'skills-list';
                
                skills.forEach(skill => {
                    if (skill) {
                        const skillItem = document.createElement('li');
                        skillItem.textContent = skill;
                        skillsList.appendChild(skillItem);
                    }
                });
                
                previewSkills.appendChild(skillsList);
            } else {
                previewSkills.innerHTML = '<p class="empty-section-message">Your skills will appear here.</p>';
            }
        });
    }
    
    // Summary preview
    const summaryInput = document.getElementById('professionalSummary');
    const previewSummary = document.getElementById('preview-summary');
    
    if (summaryInput) {
        summaryInput.addEventListener('input', function() {
            previewSummary.textContent = this.value || 'A brief summary of your professional background and career goals will appear here.';
        });
    }
}

function setupExperiencePreview() {
    const previewExperience = document.getElementById('preview-experience');
    
    // Function to update experience preview
    function updateExperiencePreview() {
        const entries = document.querySelectorAll('.experience-entry');
        
        if (entries.length > 0) {
            previewExperience.innerHTML = '';
            
            entries.forEach((entry, index) => {
                const jobTitle = entry.querySelector(`#jobTitle${index + 1}`).value;
                const company = entry.querySelector(`#company${index + 1}`).value;
                const startDate = entry.querySelector(`#startDate${index + 1}`).value;
                const endDate = entry.querySelector(`#endDate${index + 1}`).value;
                const currentJob = entry.querySelector(`#currentJob${index + 1}`).checked;
                const description = entry.querySelector(`#jobDescription${index + 1}`).value;
                
                if (jobTitle || company) {
                    const experienceItem = document.createElement('div');
                    experienceItem.className = 'resume-item';
                    
                    // Format dates
                    let dateText = '';
                    if (startDate) {
                        const startDateObj = new Date(startDate);
                        dateText = startDateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                        
                        if (currentJob) {
                            dateText += ' - Present';
                        } else if (endDate) {
                            const endDateObj = new Date(endDate);
                            dateText += ` - ${endDateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
                        }
                    }
                    
                    experienceItem.innerHTML = `
                        <div class="resume-item-header">
                            <h3>${jobTitle || 'Position'}</h3>
                            <p class="organization">${company || 'Company'}</p>
                            <p class="date">${dateText}</p>
                        </div>
                        <p class="description">${description || ''}</p>
                    `;
                    
                    previewExperience.appendChild(experienceItem);
                }
            });
            
            if (previewExperience.innerHTML === '') {
                previewExperience.innerHTML = '<p class="empty-section-message">Your work experience will appear here.</p>';
            }
        }
    }
    
    // Add event listeners to all experience fields
    document.addEventListener('input', function(e) {
        if (e.target.closest('.experience-entry')) {
            updateExperiencePreview();
        }
    });
    
    // Also update when checkboxes change
    document.addEventListener('change', function(e) {
        if (e.target.id && e.target.id.startsWith('currentJob')) {
            updateExperiencePreview();
        }
    });
}

function setupEducationPreview() {
    const previewEducation = document.getElementById('preview-education');
    
    // Function to update education preview
    function updateEducationPreview() {
        const entries = document.querySelectorAll('.education-entry');
        
        if (entries.length > 0) {
            previewEducation.innerHTML = '';
            
            entries.forEach((entry, index) => {
                const degree = entry.querySelector(`#degree${index + 1}`).value;
                const school = entry.querySelector(`#school${index + 1}`).value;
                const startDate = entry.querySelector(`#eduStartDate${index + 1}`).value;
                const endDate = entry.querySelector(`#eduEndDate${index + 1}`).value;
                const currentEdu = entry.querySelector(`#currentEdu${index + 1}`).checked;
                const description = entry.querySelector(`#eduDescription${index + 1}`).value;
                
                if (degree || school) {
                    const educationItem = document.createElement('div');
                    educationItem.className = 'resume-item';
                    
                    // Format dates
                    let dateText = '';
                    if (startDate) {
                        const startDateObj = new Date(startDate);
                        dateText = startDateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                        
                        if (currentEdu) {
                            dateText += ' - Present';
                        } else if (endDate) {
                            const endDateObj = new Date(endDate);
                            dateText += ` - ${endDateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
                        }
                    }
                    
                    educationItem.innerHTML = `
                        <div class="resume-item-header">
                            <h3>${degree || 'Degree'}</h3>
                            <p class="organization">${school || 'School'}</p>
                            <p class="date">${dateText}</p>
                        </div>
                        <p class="description">${description || ''}</p>
                    `;
                    
                    previewEducation.appendChild(educationItem);
                }
            });
            
            if (previewEducation.innerHTML === '') {
                previewEducation.innerHTML = '<p class="empty-section-message">Your education will appear here.</p>';
            }
        }
    }
    
    // Add event listeners to all education fields
    document.addEventListener('input', function(e) {
        if (e.target.closest('.education-entry')) {
            updateEducationPreview();
        }
    });
    
    // Also update when checkboxes change
    document.addEventListener('change', function(e) {
        if (e.target.id && e.target.id.startsWith('currentEdu')) {
            updateEducationPreview();
        }
    });
}

function setupAddMoreEntries() {
    // Add more experience entries
    const addExperienceBtn = document.getElementById('add-experience');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', function() {
            const experienceEntries = document.getElementById('experience-entries');
            const entryCount = experienceEntries.querySelectorAll('.experience-entry').length + 1;
            
            const newEntry = document.createElement('div');
            newEntry.className = 'experience-entry';
            newEntry.innerHTML = `
                <hr class="entry-divider">
                <div class="form-group">
                    <label for="jobTitle${entryCount}">Job Title</label>
                    <input type="text" id="jobTitle${entryCount}" placeholder="e.g. Software Developer">
                </div>
                <div class="form-group">
                    <label for="company${entryCount}">Company</label>
                    <input type="text" id="company${entryCount}" placeholder="e.g. Tech Solutions Inc.">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="startDate${entryCount}">Start Date</label>
                        <input type="month" id="startDate${entryCount}">
                    </div>
                    <div class="form-group">
                        <label for="endDate${entryCount}">End Date</label>
                        <input type="month" id="endDate${entryCount}">
                        <div class="checkbox-group">
                            <input type="checkbox" id="currentJob${entryCount}">
                            <label for="currentJob${entryCount}">I currently work here</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="jobDescription${entryCount}">Description</label>
                    <textarea id="jobDescription${entryCount}" rows="4" placeholder="Describe your responsibilities and achievements"></textarea>
                </div>
            `;
            
            experienceEntries.appendChild(newEntry);
            
            // Setup current job checkbox for the new entry
            setupCurrentCheckbox(`currentJob${entryCount}`, `endDate${entryCount}`);
        });
    }
    
    // Add more education entries
    const addEducationBtn = document.getElementById('add-education');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', function() {
            const educationEntries = document.getElementById('education-entries');
            const entryCount = educationEntries.querySelectorAll('.education-entry').length + 1;
            
            const newEntry = document.createElement('div');
            newEntry.className = 'education-entry';
            newEntry.innerHTML = `
                <hr class="entry-divider">
                <div class="form-group">
                    <label for="degree${entryCount}">Degree</label>
                    <input type="text" id="degree${entryCount}" placeholder="e.g. Bachelor of Science in Computer Science">
                </div>
                <div class="form-group">
                    <label for="school${entryCount}">School</label>
                    <input type="text" id="school${entryCount}" placeholder="e.g. University of Technology">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="eduStartDate${entryCount}">Start Date</label>
                        <input type="month" id="eduStartDate${entryCount}">
                    </div>
                    <div class="form-group">
                        <label for="eduEndDate${entryCount}">End Date</label>
                        <input type="month" id="eduEndDate${entryCount}">
                        <div class="checkbox-group">
                            <input type="checkbox" id="currentEdu${entryCount}">
                            <label for="currentEdu${entryCount}">I'm currently studying here</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="eduDescription${entryCount}">Description (optional)</label>
                    <textarea id="eduDescription${entryCount}" rows="3" placeholder="Relevant coursework, achievements, etc."></textarea>
                </div>
            `;
            
            educationEntries.appendChild(newEntry);
            
            // Setup current education checkbox for the new entry
            setupCurrentCheckbox(`currentEdu${entryCount}`, `eduEndDate${entryCount}`);
        });
    }
}

function setupCurrentCheckboxes() {
    // Setup initial current job/education checkboxes
    setupCurrentCheckbox('currentJob1', 'endDate1');
    setupCurrentCheckbox('currentEdu1', 'eduEndDate1');
}

function setupCurrentCheckbox(checkboxId, dateFieldId) {
    const checkbox = document.getElementById(checkboxId);
    const dateField = document.getElementById(dateFieldId);
    
    if (checkbox && dateField) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                dateField.disabled = true;
                dateField.value = '';
            } else {
                dateField.disabled = false;
            }
            
            // Trigger update of preview
            if (checkboxId.startsWith('currentJob')) {
                const event = new Event('input');
                document.querySelector(`#${checkboxId}`).closest('.experience-entry').querySelector('input').dispatchEvent(event);
            } else if (checkboxId.startsWith('currentEdu')) {
                const event = new Event('input');
                document.querySelector(`#${checkboxId}`).closest('.education-entry').querySelector('input').dispatchEvent(event);
            }
        });
    }
}

function setupResumeGeneration() {
    const generateButton = document.getElementById('generate-resume');
    const downloadPdfButton = document.getElementById('download-pdf');
    const downloadJpgButton = document.getElementById('download-jpg');
    const downloadPngButton = document.getElementById('download-png');
    const downloadDocxButton = document.getElementById('download-docx');
    
    if (generateButton) {
        generateButton.addEventListener('click', function() {
            // Scroll to preview
            document.querySelector('.resume-preview').scrollIntoView({ behavior: 'smooth' });
            
            // You could add additional functionality here
            alert('Resume generated! You can now download it in your preferred format.');
        });
    }
    
    // PDF Download
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', function() {
            // Get the resume template element
            const resumeElement = document.querySelector('.resume-template');
            
            // Configure pdf options with fixed A4 size
            const options = {
                margin: [10, 10, 10, 10],
                filename: 'my-resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            // Generate and download PDF
            html2pdf().from(resumeElement).set(options).save();
        });
    }
    
    // JPG Download
    if (downloadJpgButton) {
        downloadJpgButton.addEventListener('click', function() {
            const resumeElement = document.querySelector('.resume-template');
            
            // Set the width to A4 dimensions (210mm × 297mm at 96 DPI)
            const a4Width = 794; // pixels at 96 DPI
            const a4Height = 1123; // pixels at 96 DPI
            
            // Create a clone of the resume element to avoid modifying the original
            const clone = resumeElement.cloneNode(true);
            document.body.appendChild(clone);
            
            // Set fixed A4 dimensions
            clone.style.width = a4Width + 'px';
            clone.style.height = a4Height + 'px';
            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
            clone.style.top = '-9999px';
            clone.style.backgroundColor = 'white';
            
            html2canvas(clone, {
                scale: 2,
                useCORS: true,
                width: a4Width,
                height: a4Height
            }).then(canvas => {
                // Convert to JPG and download
                canvas.toBlob(function(blob) {
                    saveAs(blob, 'my-resume.jpg');
                    document.body.removeChild(clone);
                }, 'image/jpeg', 0.95);
            });
        });
    }
    
    // PNG Download
    if (downloadPngButton) {
        downloadPngButton.addEventListener('click', function() {
            const resumeElement = document.querySelector('.resume-template');
            
            // Set the width to A4 dimensions (210mm × 297mm at 96 DPI)
            const a4Width = 794; // pixels at 96 DPI
            const a4Height = 1123; // pixels at 96 DPI
            
            // Create a clone of the resume element to avoid modifying the original
            const clone = resumeElement.cloneNode(true);
            document.body.appendChild(clone);
            
            // Set fixed A4 dimensions
            clone.style.width = a4Width + 'px';
            clone.style.height = a4Height + 'px';
            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
            clone.style.top = '-9999px';
            clone.style.backgroundColor = 'white';
            
            html2canvas(clone, {
                scale: 2,
                useCORS: true,
                width: a4Width,
                height: a4Height
            }).then(canvas => {
                // Convert to PNG and download
                canvas.toBlob(function(blob) {
                    saveAs(blob, 'my-resume.png');
                    document.body.removeChild(clone);
                }, 'image/png');
            });
        });
    }
    
    // DOCX Download
    if (downloadDocxButton) {
        downloadDocxButton.addEventListener('click', function() {
            // Get text content from resume sections
            const name = document.getElementById('preview-name').textContent || 'Resume';
            const fullName = document.getElementById('preview-fullname').textContent || '';
            const contact = document.querySelector('.contact-info').textContent || '';
            const summary = document.getElementById('preview-summary').textContent || '';
            const experience = document.getElementById('preview-experience').textContent || '';
            const education = document.getElementById('preview-education').textContent || '';
            const skills = document.getElementById('preview-skills').textContent || '';
            
            // Create a new Document
            const doc = new docx.Document({
                sections: [{
                    properties: {
                        page: {
                            size: {
                                width: docx.convertMillimetersToTwip(210),
                                height: docx.convertMillimetersToTwip(297),
                            },
                            margin: {
                                top: docx.convertMillimetersToTwip(20),
                                right: docx.convertMillimetersToTwip(20),
                                bottom: docx.convertMillimetersToTwip(20),
                                left: docx.convertMillimetersToTwip(20),
                            },
                        },
                    },
                    children: [
                        new docx.Paragraph({
                            text: name,
                            heading: docx.HeadingLevel.HEADING_1,
                            alignment: docx.AlignmentType.CENTER,
                        }),
                        new docx.Paragraph({
                            text: fullName,
                            alignment: docx.AlignmentType.CENTER,
                        }),
                        new docx.Paragraph({
                            text: contact.replace(/\s+/g, ' ').trim(),
                            alignment: docx.AlignmentType.CENTER,
                        }),
                        new docx.Paragraph({
                            text: '',
                        }),
                        new docx.Paragraph({
                            text: 'Summary',
                            heading: docx.HeadingLevel.HEADING_2,
                        }),
                        new docx.Paragraph({
                            text: summary,
                        }),
                        new docx.Paragraph({
                            text: '',
                        }),
                        new docx.Paragraph({
                            text: 'Experience',
                            heading: docx.HeadingLevel.HEADING_2,
                        }),
                        new docx.Paragraph({
                            text: experience.replace(/\s+/g, ' ').trim(),
                        }),
                        new docx.Paragraph({
                            text: '',
                        }),
                        new docx.Paragraph({
                            text: 'Education',
                            heading: docx.HeadingLevel.HEADING_2,
                        }),
                        new docx.Paragraph({
                            text: education.replace(/\s+/g, ' ').trim(),
                        }),
                        new docx.Paragraph({
                            text: '',
                        }),
                        new docx.Paragraph({
                            text: 'Skills',
                            heading: docx.HeadingLevel.HEADING_2,
                        }),
                        new docx.Paragraph({
                            text: skills.replace(/\s+/g, ' ').trim(),
                        }),
                    ],
                }],
            });
            
            // Generate and download the document
            docx.Packer.toBlob(doc).then(blob => {
                saveAs(blob, 'my-resume.docx');
            });
        });
    }
}