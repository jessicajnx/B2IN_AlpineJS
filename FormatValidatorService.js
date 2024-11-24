class FormatValidatorService {
    constructor() {}
    emailValidator(email){
        const pattern = new RegExp(/[a-zA-Z0-9.\-]{2,15}[@]{1}[a-zA-Z]{3,7}[.]{1}[a-z]{2,4}/, "g") //contrainte de l'email
        const isEmailValid = pattern.test(email);
        return isEmailValid

    }
    passwordValidator(){
        const pattern = new RegExp(/[a-zA-Z0-9*!?éèùïî@$àç]{12,30}/, "g") //contrainte du mot de passe
        const isPasswordValid = pattern.test(pwd);

        for (const el of pwd){
            if(el === el.toUpperCase()){
                return true;
            }
        }
        throw new Error("Le mot de passe doit contenir au moins une majuscule")
    }
}

export default FormatValidatorService;