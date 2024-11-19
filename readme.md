#Consignes / Barême

##HTML (/20 points)
- Utiliser un validator d'HTML (/5points)
- Utiliser des attributs d'accessibilités (si possible)(/5points)
- Utiliser une méthodologie CSS de notation des classes (ex: BEM)(/5points)
- Utiliser des identifiants de façon appropriétée (/5points)


##Sécurité (5 points)
- Faire attention au Broken Access Control (redirection obligatoire)


## Javascript (/20 points)
- Utiliser le this ( 1 point )
- Utiliser des fonctions fléchées (1 point)
- Utiliser des expressions de fonction fléchée  (1 point)
- Utiliser des tableaux et des méthodes de tableau ( map , forEach, sum, reduce , every) (5 points)
- Utiliser des variables mutables et constantes ( de façon appropriée )
- Utiliser des types primitifs et des types composites (2 points)
- Utiliser des structures de contrôles : ternaires, switch, boucle  (2 points)
- Architecturer le code de façon "clean" : réutilisabilité, responsabilité unique (5 points)
- Architecturer une application robuste : gestion des erreurs (throw) (3 points )

## Alpine.js  (/20 points)

- Utiliser x-data  (1 points)
- Utiliser un plugin d'Alpine (5 points)
- Utiliser x-cloak,x-show, x-if, x-teleport, x-init, x-bind (5 points)
- Utiliser  Alpine.store(), Alpine.data() (5 points)
- Faire votre directive custom  (2 points)
- Utiliser x-transition, x-ignore (2 points)

## Bonnes pratiques ( /20 points)

- Utiliser Eslint (5 points)
- Utiliser Formatter ( 5 points)
- Enlever le code mort ( 3 points)
- Commenter le moins possible le code  ( 2 points)
- Faire attention au nommage des variables, des constantes, des fonctions, des méthodes ( 5points)


## Bonus
Les bonus ne peuvent donner que 2 points au total

utiliser <nav>
<i tabindex="0" role="button" @click="homeHandler" @keyup.enter="homeHandler"
faire ça pour tout => en gros c'est pour que les icones marchent avec click et aussi avec Enter.


---------------
npm init -y
npm i alpinejs