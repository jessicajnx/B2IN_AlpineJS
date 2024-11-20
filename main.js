import Alpine from './node_modules/alpinejs/dist/module.esm.js'

window.Alpine = Alpine
let login_bool = false;

Alpine.data('login', () => ({
    showPopup: false,
    popupMessage: "",
    message_login: "Pas encore inscrit ? Cliquez",
    fields: [
        {
            name: 'email',
            type: 'email',
            placeholder: 'Entrez votre email'
        },
        {
            name: 'password',
            type: 'password', 
            placeholder: 'Entrez votre mot de passe'
        }
    ],
    submitHandler(event) {
        event.preventDefault()
        try {
            const emailValue = document.getElementById('#email').value;
            const passwordValue = document.querySelector('#password').value;
            let prenomValue = document.querySelector('#prenom') ? document.querySelector('#prenom').value : undefined;
            let nomValue = document.querySelector('#nom') ? document.querySelector('#nom').value : undefined;

            this.showPopup = !(emailValue && passwordValue && (login_bool ? (prenomValue && nomValue) : true));
            this.popupMessage = this.showPopup ? "Veuillez compléter le formulaire" : "";

        } catch (error) {
            console.log('Erreur lors de la soumission du formulaire :', error);
        }
    },
    transiLoginSignup(event) {
        try {
            login_bool = !login_bool;

            this.message_login = login_bool ? "Déjà inscrit ? Cliquez" : "Pas encore inscrit ? Cliquez";
            this.fields = login_bool 
                ? [
                    { name: 'email', type: 'email', placeholder: 'Entrez votre email' },
                    { name: 'nom', type: 'nom', placeholder: 'Entrez votre nom' },
                    { name: 'prenom', type: 'prenom', placeholder: 'Entrez votre prénom' },
                    { name: 'password', type: 'password', placeholder: 'Entrez votre mot de passe' },
                    { name: 'password_confirm', type: 'password', placeholder: 'Confirmez votre mot de passe' }
                ]
                : [
                    { name: 'email', type: 'email', placeholder: 'Entrez votre email' },
                    { name: 'password', type: 'password', placeholder: 'Entrez votre mot de passe' }
                ];
        } catch (error) {
            console.log('Erreur lors du changement de formulaire :', error);
        }
    }
}));

Alpine.start()
