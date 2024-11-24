import Alpine from './node_modules/alpinejs/dist/module.esm.js';
import FormatValidatorService from './FormatValidatorService.js';
//import persist from '@alpinejs/persist';

//Alpine.plugin(persist);

window.Alpine = Alpine;

Alpine.store('auth', {
    // Utilisation de persist pour conserver l'état
    //login_bool: Alpine.$persist(false),
    login_bool: false,
    loggedInUser: null, 
    toggleLoginBool() {
        this.login_bool = !this.login_bool;
    },

    login(user) { 
        this.login_bool = true;
        this.loggedInUser = user; 
        localStorage.setItem('loggedInUser', JSON.stringify(user)); 
    },

    logout() { 
        this.login_bool = false;
        this.loggedInUser = null;
        localStorage.removeItem('loggedInUser'); 
    },

    loadUserFromStorage() { 
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            this.login_bool = true;
            this.loggedInUser = storedUser;
        }
    },
});

Alpine.data('login', () => ({
    showPopup: false,
    popupMessage: "",
    message_login: "Pas encore inscrit ? Cliquez",
    fields: [],
    init() {
        this.updateFields();
        Alpine.store('auth').loadUserFromStorage(); 
        if (Alpine.store('auth').login_bool) { 
            window.location.href = './index.html'; 
        }
    },
    updateFields() {
        this.message_login = Alpine.store('auth').login_bool
            ? "Déjà inscrit ? Cliquez"
            : "Pas encore inscrit ? Cliquez";
        this.fields = Alpine.store('auth').login_bool
            ? [
                { name: 'email', type: 'email', placeholder: 'Entrez votre email' },
                { name: 'nom', type: 'text', placeholder: 'Entrez votre nom' },
                { name: 'prenom', type: 'text', placeholder: 'Entrez votre prénom' },
                { name: 'password', type: 'password', placeholder: 'Entrez votre mot de passe' },
                { name: 'password_confirm', type: 'password', placeholder: 'Confirmez votre mot de passe' }
            ]
            : [
                { name: 'email', type: 'email', placeholder: 'Entrez votre email' },
                { name: 'password', type: 'password', placeholder: 'Entrez votre mot de passe' }
            ];
    },
    transiLoginSignup(event) {
        Alpine.store('auth').toggleLoginBool();
        this.updateFields();
    },
    submitHandler(event) {
        event.preventDefault();
        const pwdValue = document.getElementById("password").value;
        const emailValue = document.querySelector("#email").value;
        const formatvalidatorservice = new FormatValidatorService()
        const isEmailValid = formatvalidatorservice.emailValidator(emailValue)
        const isPasswordValid = formatvalidatorservice.passwordValidator(pwdValue)

        if (!isEmailValid || !isPasswordValid) {
            alert("Email ou mot de passe invalide.");
            return;
        }

        fetchUsers().then(users => {
            const foundUser = users.find(user => user.email === emailValue && user.password === pwdValue);
        
            if (foundUser) {
                Alpine.store('auth').login(foundUser); 
                alert(`Bienvenue, ${foundUser.name} !`);
                window.location.href = './index.html'; 
            } else if (!Alpine.store('auth').login_bool) {
                alert("Utilisateur non trouvé. Vérifiez vos identifiants ou inscrivez-vous.");
            }
            
        });

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailValue,
                password: pwdValue,
                name: nameValue,
            }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(err => {
                        throw new Error(err.error);
                    });
                }
            })
            .then(data => {
                alert(data.message); 
                window.location.href = './index.html'; 
            })
            .catch(err => {
                alert(`Erreur : ${err.message}`);
            });
    

        async function fetchUsers() {
            try {
                const response = await fetch('./users.json'); 
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des utilisateurs."); 
                }
                return await response.json(); 
            } catch (error) {
                console.error("Erreur :", error);
                return []; 
            }
        }


        if (foundUser) {
            Alpine.store('auth').login(foundUser); 
            alert(`Bienvenue, ${foundUser.name} !`);
            window.location.href = './index.html'; 
        } else if (!Alpine.store('auth').login_bool) {
            alert("Utilisateur non trouvé. Inscription simulée.");
            const newUser = { email: emailValue, password: pwdValue, name: "Nouvel Utilisateur" };
            fakeUsersDB.push(newUser);
            Alpine.store('auth').login(newUser);
            alert("Inscription réussie !");
            window.location.href = './index.html';
        }

        try {
            formatvalidatorservice.passwordValidator(pwdValue)
        } catch(err) {
            alert(err)
        }

        const regexMail = new RegExp(/[\w.]{3,30}[@]{1}[a-z]{1,10}[.]{1}[a-z]{2,3}/, "ig")
        const isEmailValidRegex = regexMail.test(emailValue)
        if(isEmailValid) {
            alert("good")
            return
        }
        window.prompt(`email: ${emailValue} et mot de passe ${pwdValue}`) 
    }
}));
Alpine.directive('validate-email', (el) => {
    el.addEventListener('blur', () => {
        const regex = /^[\w.]{3,30}@[a-z]{1,10}\.[a-z]{2,3}$/;
        if (!regex.test(el.value)) {
            alert("Email invalide !");
        }
    });
});

Alpine.start();
