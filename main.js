import Alpine from './node_modules/alpinejs/dist/module.esm.js';
//import persist from '@alpinejs/persist';

//Alpine.plugin(persist);

window.Alpine = Alpine;

Alpine.store('auth', {
    // Utilisation de persist pour conserver l'état
    //login_bool: Alpine.$persist(false),
    login_bool: false,
    toggleLoginBool() {
        this.login_bool = !this.login_bool;
    }
});

Alpine.data('login', () => ({
    showPopup: false,
    popupMessage: "",
    message_login: "Pas encore inscrit ? Cliquez",
    fields: [],
    init() {
        this.updateFields();
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
    }
}));

Alpine.start();
