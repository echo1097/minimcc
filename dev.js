const DevApp = () => {
    const [showForm, setShowForm] = React.useState(true);
    const [form, setForm] = React.useState({
        name: '',
        age: '',
        discord: '',
        experience: '',
        languages: '',
        availability: '',
        portfolio: [],
        githubLink: '',
        websiteLink: '',
        otherLink: '',
        motivation: '',
        teamwork: ''
    });
    const [status, setStatus] = React.useState('');
    const wh1 = "https://discord.com/api/webhooks/";
    const wh2 = "1323757525094371360/";
    const wh3 = "dvJ8zF_y8-xr_o21rc1-nofCUGTQZLEbfcPO_XcZYDKaQiX8c17r9bo_Xkdkig7N0Lxs";
    //dont spam this webhook or il break your knecaps
    React.useEffect(() => {
        fetch('showhide.json')
            .then(res => res.json())
            .then(data => {
                setShowForm(data.showDevApplications);
            })
            .catch(err => {
                console.error('Error loading application state:', err);
            });
    }, []);

    const FileUpload = ({ files, onFileChange, onRemoveFile }) => {
        const handleFileChange = (e) => {
            const selectedFiles = Array.from(e.target.files || []);
            if (files.length + selectedFiles.length > 3) {
                alert('You can only upload up to 3 screenshots');
                return;
            }
            
            Promise.all(selectedFiles.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            })).then(results => {
                onFileChange([...files, ...results].slice(0, 3));
            });
        };

        return React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Project Screenshots'),
            React.createElement('div', { className: 'file-upload-container' },
                React.createElement('button', {
                    type: 'button',
                    onClick: () => document.getElementById('dev-file-input').click(),
                    className: 'upload-button'
                }, 'Upload Screenshots (max 3)'),
                React.createElement('input', {
                    id: 'dev-file-input',
                    type: 'file',
                    accept: 'image/*',
                    multiple: true,
                    onChange: handleFileChange,
                    className: 'hidden-input'
                }),
                React.createElement('div', { className: 'preview-grid' },
                    files.map((file, index) => 
                        React.createElement('div', { key: index, className: 'preview-item' },
                            React.createElement('img', { 
                                src: file,
                                alt: `Preview ${index + 1}`,
                            }),
                            React.createElement('button', {
                                type: 'button',
                                className: 'remove-button',
                                onClick: () => onRemoveFile(index)
                            }, '×')
                        )
                    )
                )
            )
        );
    };

    const handleFileChange = (newFiles) => {
        setForm({ ...form, portfolio: newFiles });
    };

    const removeFile = (index) => {
        setForm({
            ...form,
            portfolio: form.portfolio.filter((_, i) => i !== index)
        });
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            const webhookUrl = wh1 + wh2 + wh3;
            
            const formData = new FormData();
            form.portfolio.forEach((file, index) => {
                const base64Data = file.split(',')[1];
                const binaryData = atob(base64Data);
                const array = new Uint8Array(binaryData.length);
                for (let i = 0; i < binaryData.length; i++) {
                    array[i] = binaryData.charCodeAt(i);
                }
                const blob = new Blob([array], { type: 'image/png' });
                formData.append(`file${index + 1}`, blob, `screenshot${index + 1}.png`);
            });

            const embedData = {
                embeds: [{
                    title: '💻 New Developer Application',
                    color: 3447003,
                    fields: [
                        { name: 'Minecraft username', value: form.name, inline: true },
                        { name: 'Age', value: form.age, inline: true },
                        { name: 'Discord username', value: form.discord, inline: true },
                        { name: 'Programming Experience', value: form.experience || 'None provided' },
                        { name: 'Programming Languages', value: form.languages || 'Not specified' },
                        { name: 'Weekly Availability', value: form.availability || 'Not specified' },
                        { name: 'GitHub', value: form.githubLink || 'Not provided' },
                        { name: 'Personal website/portfolio', value: form.websiteLink || 'Not provided' },
                        { name: 'Other Link', value: form.otherLink || 'Not provided' },
                        { name: 'Why they want to join', value: form.motivation || 'No reason provided' },
                        { name: 'Team Experience', value: form.teamwork || 'Not specified' }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };

            formData.append('payload_json', JSON.stringify(embedData));

            const res = await fetch(webhookUrl, {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                setStatus('success');
                setForm({
                    name: '',
                    age: '',
                    discord: '',
                    experience: '',
                    languages: '',
                    availability: '',
                    portfolio: [],
                    githubLink: '',
                    websiteLink: '',
                    otherLink: '',
                    motivation: '',
                    teamwork: ''
                });
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Submission error:', err);
            setStatus('error');
        }
    };

    if (!showForm) {
        return React.createElement('div', { className: 'application-closed' },
            React.createElement('h2', null, 'Application Closed'),
            React.createElement('p', null, 'We are not accepting Developer applications at this time.')
        );
    }

    return React.createElement('div', { className: 'application-container' },
        React.createElement('div', { className: 'application-form' },
            React.createElement('h2', null, 'Developer Application'),
            React.createElement('form', { onSubmit: submit },
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Minecraft Username'),
                    React.createElement('input', {
                        required: true,
                        value: form.name,
                        onChange: (e) => setForm({...form, name: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Age'),
                    React.createElement('input', {
                        required: true,
                        type: 'number',
                        value: form.age,
                        onChange: (e) => setForm({...form, age: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Discord Username'),
                    React.createElement('input', {
                        required: true,
                        value: form.discord,
                        onChange: (e) => setForm({...form, discord: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'How long have you been programming?'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.experience,
                        onChange: (e) => setForm({...form, experience: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'What programming languages are you proficient in?'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.languages,
                        onChange: (e) => setForm({...form, languages: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'How many hours per week can you dedicate to development?'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.availability,
                        onChange: (e) => setForm({...form, availability: e.target.value})
                    })
                ),
                React.createElement(FileUpload, {
                    files: form.portfolio,
                    onFileChange: handleFileChange,
                    onRemoveFile: removeFile
                }),
                React.createElement('div', { className: 'links-section' },
                    React.createElement('label', null, 'GitHub Profile'),
                    React.createElement('input', {
                        value: form.githubLink,
                        onChange: (e) => setForm({...form, githubLink: e.target.value}),
                        placeholder: 'https://github.com/yourusername'
                    }),
                    React.createElement('label', null, 'Personal Website/Portfolio'),
                    React.createElement('input', {
                        value: form.websiteLink,
                        onChange: (e) => setForm({...form, websiteLink: e.target.value}),
                        placeholder: 'Your personal website/portfolio (if applicable)'
                    }),
                    React.createElement('label', null, 'Other Link'),
                    React.createElement('input', {
                        value: form.otherLink,
                        onChange: (e) => setForm({...form, otherLink: e.target.value}),
                        placeholder: 'Any other relevant link'
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Why do you want to join our development team?'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.motivation,
                        onChange: (e) => setForm({...form, motivation: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Have you worked on development teams before? If yes, describe your experience'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.teamwork,
                        onChange: (e) => setForm({...form, teamwork: e.target.value})
                    })
                ),
                React.createElement('button', { type: 'submit' }, 'Submit Application')
            ),
            status === 'success' && React.createElement('div', { className: 'success-message' },
                'Your application has been submitted successfully!'
            ),
            status === 'error' && React.createElement('div', { className: 'error-message' },
                'There was an error submitting your application. Please try again later.'
            )
        )
    );
};

window.DevApp = DevApp;