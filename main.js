import Alpine from './node_modules/alpinejs/dist/module.esm.js'
 
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
    submitHandler(event){
        event.preventDefault()
        console.log('formulaire soumis')
        try{
            if (login_bool){
                const emailValue = document.getElementById('#email').value
                const passwordValue = document.querySelector('#password').value
                const prenomValue = document.querySelector('#prenom').value
                const nomValue = document.querySelector('#nom').value
            if(!(emailValue && passwordValue && prenomValue && nomValue)){
                this.showPopup = true
                this.popupMessage = "Veuillez compléter le formulaire"
            }
            }
            const emailValue = document.getElementById('#email').value
            const passwordValue = document.querySelector('#password').value
            if(!(emailValue && passwordValue)){
                this.showPopup = true
                this.popupMessage = "Veuillez compléter le formulaire"
            }
        } catch (error){
            console.log('Erreur lors de la soumission du formulaire :', error)
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
