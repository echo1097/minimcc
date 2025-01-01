const App = () => {
    const [showForm, setShowForm] = React.useState(true);
    const [form, setForm] = React.useState({
        name: '',
        age: '',
        discord: '',
        exp: '',
        why: '',
        whyYou: '',
        sc1: '',
        sc2: '',
        sc3: '',
        sc4: ''
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
                setShowForm(data.showModApplications);
            })
            .catch(err => {
                console.error('Error loading application state:', err);
            });
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        
        try {
            const webhookUrl = wh1 + wh2 + wh3;
            
            const embedData = {
                embeds: [{
                    title: '📝 New Moderator Application',
                    color: 5793266,
                    fields: [
                        {
                            name: 'Minecraft username',
                            value: form.name,
                            inline: true
                        },
                        {
                            name: 'Age',
                            value: form.age,
                            inline: true
                        },
                        {
                            name: 'Discord username',
                            value: form.discord,
                            inline: true
                        },
                        {
                            name: 'Previous experience',
                            value: form.exp || 'None provided'
                        },
                        {
                            name: 'Why they want to be a mod',
                            value: form.why || 'No reason provided'
                        },
                        {
                            name: 'Why choose them',
                            value: form.whyYou || 'Not specified'
                        },
                        {
                            name: 'A member is harassing others in chat with offensive language. What would you do?',
                            value: form.sc1 || 'No response'
                        },
                        {
                            name: 'You catch a member using forbidden client modifications(hacks/cheats). What would you do?',
                            value: form.sc2 || 'No response'
                        },
                        {
                            name: 'A member is being negative in in game chat, demanding redos, accusing everyone of cheating, and demanding the mods ban people. What would you do?',
                            value: form.sc3 || 'No response'
                        },
                        {
                            name: 'You discover players exploiting a game-breaking bug. What would you do?',
                            value: form.sc4 || 'No response'
                        }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };

            const res = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(embedData)
            });

            if (res.ok) {
                setStatus('success');
                setForm({
                    name: '',
                    age: '',
                    discord: '',
                    exp: '',
                    why: '',
                    whyYou: '',
                    sc1: '',
                    sc2: '',
                    sc3: '',
                    sc4: ''
                });
            } else {
                console.error('Webhook error:', await res.text());
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
            React.createElement('p', null, 'We are not accepting Moderator applications at this time.')
        );
    }

    return React.createElement('div', { className: 'application-container' },
        React.createElement('div', { className: 'application-form' },
            React.createElement('h2', null, 'Moderator Application'),
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
                    React.createElement('label', null, 'Previous Experience'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.exp,
                        onChange: (e) => setForm({...form, exp: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Why do you want to join our mod team?'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.why,
                        onChange: (e) => setForm({...form, why: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Why should we accept you over other applicants?'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.whyYou,
                        onChange: (e) => setForm({...form, whyYou: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'A member is harassing others in chat with offensive language. What would you do?'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.sc1,
                        onChange: (e) => setForm({...form, sc1: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'You catch a member using forbidden client modifications(hacks/cheats). What would you do?'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.sc2,
                        onChange: (e) => setForm({...form, sc2: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'A member is being negative in in game chat, demanding redos, accusing everyone of cheating, and demanding the mods ban people. What would you do?'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.sc3,
                        onChange: (e) => setForm({...form, sc3: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'You discover players exploiting a game-breaking bug. What would you do?'),
                    React.createElement('textarea', {
                        required: true,
                        value: form.sc4,
                        onChange: (e) => setForm({...form, sc4: e.target.value})
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