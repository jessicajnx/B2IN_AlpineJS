import Alpine from 'alpinejs/dist/module.esm.js'
 
window.Alpine = Alpine
let login_bool = false;
Alpine.data('login', () => ({
    showPopup: false,
    popupMessage: "",
    message_login: "Pas encore inscrit ? Cliquez",
    fields:[
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
        event.preventDefault();
        console.log('Formulaire soumis');
    
        try {
            const emailValue = document.getElementById('email').value;
            const passwordValue = document.querySelector('#password').value;
            const prenomValue = login_bool ? document.querySelector('#prenom').value : null;
            const nomValue = login_bool ? document.querySelector('#nom').value : null;
    
            this.showPopup = login_bool 
                ? !(emailValue && passwordValue && prenomValue && nomValue)
                : !(emailValue && passwordValue);
    
            this.popupMessage = this.showPopup 
                ? "Veuillez compléter le formulaire" 
                : "Formulaire soumis avec succès";
    
            if (!this.showPopup) {
                console.log('Formulaire soumis avec succès');
            } else {
                console.warn('Le formulaire est incomplet');
            }
    
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            this.popupMessage = "Une erreur est survenue, veuillez réessayer.";
            this.showPopup = true;
        }
    },
    transiLoginSignup(event) {
        login_bool = !login_bool;
        if(login_bool){
            this.message_login = "Déjà inscrit ? Cliquez";
            this.fields = [
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Entrez votre email'
                },
                {
                    name: 'nom',
                    type: 'nom',
                    placeholder: 'Entrez votre nom'
                },
                {
                    name: 'prenom',
                    type: 'prenom',
                    placeholder: 'Entrez votre prénom'
                },
                {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Entrez votre mot de passe'
                },
                {
                    name: 'password_confirm',
                    type: 'password',
                    placeholder: 'Confirmez votre mot de passe'
                }
            ];
        } else {
            this.message_login = "Pas encore inscrit ? Cliquez";
            this.fields = [
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
            ];
        }
    }}
));
 
Alpine.start()
