

/*********************react hook form
 * 
 * 
 * ******************useForm()
 * 
 * Permet de gérer trois points essentiels:
 * - managing form data
 * - submit form data
 * - enforce validation and provide visual feedback
 * 
 * 
 * **********manage form state
 * L' état d' un formulaire comprend: les erreurs, les changements de données jusqu' à la validation, les modifications...
 * le form state comprend: { values, visited, errors, isValid }
 * L' objet form retourné par useForm() comprend des méthodes :
 * - register
 * Elle prend en arg, un string correspondant au champ en question et retourne à son tour quatre autres méthodes:
 * name, ref, onChange, onBlur qu' on passe comme props au champ de façon dynamique en faisant: {...register('nom du champ')}
 * De ce fait, react hook form est en charge de l' état de notre formulaire.
 * 
 * ****************devtools
 * Pour l' installer :
 * npm install -D @hookform/devtools
 * Ensuite dans le composant qui prend en charge le formulaire, on importe: {DevTool} from '@hookform/devtools' 
 * Puis on récupère control de useForm qu' on passe à l' attribut control du composant DevTool situé après la balise form du formulaire.
 * On le retouve dans le browser en haut à gauche et comprend des propriétés:
 * - touched: si on a interragit avec le champ
 * - dirty: si la valeur du champ a été modifiée.
 * Il est important de savoir que react hook form tracke les données de champ sans pour autant rerendre le composant.
 * 
 * **************form submission
 * Pour soumettre le formulaire, on définit la fonction onSubmit(data), fonction qui sera appelée lorsqu' on presse le boutton de soumission du formulaire.
 * On récupère dans le useForm, handleSubmit. C' est le gestionnaire qui va injecter à onSubmit la valeur de chaque champ: onSubmit = {handleSubmit(onSubmit)}
 * 
 * ***************form validation
 * 
 * react hook form gère les règles de validation par défaut du html : require, min&maxlength, min&max and pattern;
 * Pour les utiliser, on passe comme 2 arg au register, un objet et j' utilise ces règles comme key.
 * - Pour require, je peux lui passer soit un booléan soit un texte mais je peux aussi lui passer un objet prennant comme key = value: true, message: '',
 * - Pour pattern, je lui passe un objet ayant comme key 
 * value et message;
 * Il faut savoir que par défaut, c' est lorsque le formulaire est soumis que la validation est mise en marche.
 * - On peut passer le prop noValidate à la balise form pour prévenir toute validation par le html et pour la laisser entièrement à la charge de react hook form.
 * 
 * 
 * **************Displaying error message
 * Pour le faire, on récupère l' objet formState de useForm. De ce dernier objet, on récupère errors qui est aussi un objet.
 * {errors.email?.message}; On peut l' afficher à l' intérieur d' une balise soit en utilisant l' opérateur optionnel comme c' est fait çi-haut ou le rendu conditionnel: {errors.username ? ...} ou soit le ternaire.
 * 
 * ****************custom validation
 * 
 * on passe à l' objet d' option du register le key: validation qui peut être soit une fonction soit un objet avec different keys qui sont maintenant des fonctions.
 * Cette fonction reçoit automatiquement le fieldValue
 * par Ex: notAdminEmail: (fieldValue =>{
 * return !fieldValue.endsWith('jnjkhjkh.email')  || 'enter an other email'} )
 * De ce fait, si la condition n' est pas vérifiée, on affiche le message après le connecteur où.
 * 
 * **************Enhancing react hook form
 * react hook form dispose de trois pilliers:
 * - form State
 * - form submission
 * - form validation
 * 
 * **************Default values
 * On peut passer des valeurs par défaut au formulaire surtout lorsque ces valeurs ont déjà été stockées.
 * Pour le faire, on passe au useForm(), un objet ayant pour clé: defaultValues. Cette clé est aussi un objet ayant pour clé, le nom de chaque champ et pour valeur, les valeurs par défaut. De ce fait, on peut passer à ces clés une fonction asynchrone qui chargera les données du serveur: {defaultValues: async () => { cosnt res = await fetch('')
 const data = await res.json()
 return ( 
    {
        username: '',
        email: data.email,
    }
 ) 
 react hook form prendra le type des valeurs par défaut comme le type de chaque champ du formulaire.
 * }} 
 * 
 * ******************Nested object
 * Permet d' avoir les données du formulaire sous forme d' objet imbriqué.
 * En effet, classiquement toutes les données correspondantes à chaque champ son envoyées dans un objet ayant pour clé le nom du champ attribué au register. Mais pour faire en sorte qu' une ou des données de champ soit eux même imbriqué dans un objet, d' abord on passe au defaultValues du useForm(), l' objet en question et dans cet objet, on donne comme clé le nom des champs dont les données seront imbriquées dans ce objet. Par la suite, au niveau du register des champs correspondant, on attribue pas directement le nom des champs correspondant mais on passe plutôt la clé de l' objet spécifier dans le defaultValues.
 * Par Ex: defaultValues: {
 social: {
    twitter: "",
    facebook: ''
 }
 * Au niveau du register des champs correspondants, {...register('social.twitter')}
 * }   
 * 
 *  *********************** Array
 * Le but est ici, de récupérer certaines données sous forme de tableau contrairement à ce qui est fait précédemment. De ce fait, on part aussi dans le defaultValues et on spécifie comme clé le nom du tableau avec pour valeur, un tableau de 2 strings vides (selon qu' on veut y mettre 2 données).
 * Ensuite dans le register des champs correspondants, je préçise l' index de la clé spécifier dans defaultValues.
 * Par Ex:
 * defaultValues: {
 phoneNumber: ["", '']
 * } 
 * {...register('phoneNumber[0]')} pour chaque champ et [1] pour le second mais lorsque j' utilise typescript, j' utilise pas la syntaxe de crochet mais plutôt le dot notation.
 * 
 * 
 * ********************Numeric and date value
 * Le but ici est de pouvoir stocker directement sous forme de number, les champs prennant comme donnée des nombres et des dates. Par défaut, on nous retourne des strings ainsi, react hook form nous offre des options à ajouter en 2nd arg de register de chaque champ que sont: valueAsDate & valueAsNumber selon le cas.
 * 
 * *******************watch, getValues, setValue
 * Elles sont toutes récupérer du useForm()
 * 
 * - Watch: C' est une méthode qui prend en arg soit en string ou un tableau ayant pour nom pour le nom du register du champ en question et permet d' avoir en direct la valeur du champ et de l' afficher dans le UI.
 * 
 * - getValues: Permet au décour d' une action dont un click par Ex lors de son appel dans un gestionnaire, d' accéder aux valeurs de chaque champ. Mais on peut aussi donner en arg, le nom d' un champ pour avoir les données correspondantes au champ.
 * 
 * - setValue: S' utilise aussi dans un gestionnaire comme getValues et prend en 1er arg, le nom du champ ensuite en 2 arg, la valeur à attribuer à ce champ. Mais ces changements n' affectent pas l' état du form comme dirty, touch. De ce fait, on passe en 3 arg à setValue, un objet d' options { shouldValidate:true, shouldDirty:true, shouldTouch: true}
 *  
 * *******************Touched et Dirty state
 * - Dirty: lorsqu' on modifie les données d' un champ mais lorsqu' on revient à la valeur par défaut, dirty revient à false. 
 * - Touch: lorsqu' un champ perd le focus.
 *    On les récupère dans la destructuration du formState:
 * {touchedFields, dirtyFields, isDirty} = formState()
 * - touchedFields et dirtyFIelds sont des objets ayant pour clé, le nom de chaque champ et retourne true ou false
 * - isDirty: Par contre, elle retourne un boolean et permet de savoir si le champ global soit donc le formulaire ait été modifié ou non.
 * 
 * ******************Disabling fields
 * Pour désactiver un champ de formulaire ayant register, je dois ajouter l' option disabled aux paramètres d' options du register.
 * 
 * ******************handleSubmission errors
 * La fonction handleSubmit qu' on reçoit de useForm(), peut prendre un 2 arg, un gestionnaire d' erreur. Cette fonction est appelée lorsqu' on soumet le formulaire tout en ayant des erreurs qui persistent dans un champ ou l' autre.
 * 
 * *****************  Disable form submission
 * Je peux désactiver le boutton submit en appliquant ces 2 conditions: disabled = {!isDirty || !isValid} qu' on prend toutes deux dans le formState.
 * Cela étant, le boutton submit sera désactiver d' une part tant qu' on ne touche pas aucun champ et d' autres part, tant que le formulaire n' est pas valid soit donc tant que toutes les conditions ne sont pas vérifiées (register)
 * Mais le problème qui persiste ici, c' est que tant qu' on ne soumet pas le formulaire, les erreurs ne s' affichent pas.
 * 
 * ****************** submission state
 * On reçoit aussi de formState: 
 * - isSubmitting: pour désactiver le boutton submit et éviter que la soumission soit envoyée plusieurs fois
 * disabled = {!isValid || isSubmitting || !isDirty}
 * - isSubmitted: false par défaut, est true après la soumission et tant que le form n' est pas reset
 * - isSubmittingSuccessful: true lorsque le form est soumis sans un runtime error.
 * - submitCount: incrémente à chaque fois qu' on a un successful submit.  
 * 
 * ******************reset form
 * La fonction reset, Elle est retournée par useForm() et permet de revenir aux paramètres par défaut.
 * On l' utilise souvent dans deux situations: pour revenir aux données de base où lorsque le formulaire est soumis et on souhaitent le réinitialiser.
 * Mais il est recommander de ne pas utiliser reset() directement dans le onSubmit pour cela, on l' utilise dans un useEffect lorsque isSubmitSuccessful.
 * 
 * useEffect(() => {
 * if(isSubmitSuccessful){ reset() }
 * }, [isSubmitSuccessful, reset])
 *  
 * ********************async validation
 * On l' utilise, dans le champ correspondant, dans le paramètre d' option du register, j' ajoute cette option: Par Ex: emailValidation: async (fieldValue) => {
  Je vérifie à travers une requête asynchrone si fieldvalue fait déjà partie du serveur.
  res = await response.json()
  return res.length === 0 || 'email already exist'
  // C' est une technique courante dans les fonctions de retour en JS pour vérifier une condition et si elle est true, alors on ne lit même plus la seconde partie mais surtout si false, on exécute la 2nde partie si elle se révèle true (ici étant une chaine non vide alors elle est true). Le principe, si la condition est false, on m' affiche le message de droite.
 * }
  Compte tenu du fait que j' affiche ou non les erreurs d' un champ avec le code suivant: <p>{ errors.fieldName?.message}</p>
  il sera afficher le message d' erreur en fonction de l' ordre des erreurs survenues pour le champ en question.
 * Mais il faut retenir que si on disable l' option submit lorsque !isValid, dans ce que le boutton de soumission sera toujours disable. Ainsi donc pour l' utiliser, il faut enlever l' option !isValid pour le disable.
 * 
 * 
 * ***************** validation mode
 * On ajoute en arg à l' objet d' option du useForm au même titre que la clé defaultValues, mode.
 * Cette clé prend plusieurs valeurs:
 * - Par défaut: "onSubmit"
 * - 'onBlur': lorsque le champ perd le focus
 * - 'onTouched': lorsque le champ perd le focus mais à la différence de onBlur, lorsqu' on se met à écrire, le message d' erreur dis=>parait.
 * - 'onChange': mais déclenche un rerendu à chaque fois.
 * - 'all': combine onBlur et onChange
 * 
 * ********************* Manually trigger validation
 * La validation que nous faisions jusque là, est une validation automatique mais on peut aussi le faire manuellement. Pour cela:
 * On récupère l' option trigger de useForm()et au décour d' un gestionnaire, on appelle la méthode trigger() pour déclencher la validation de l' ensemble du formulaire mais on peut aussi lui passer comme arg, le nom d' un champ (register name) pour déclencher la validation d' un ou de plusieurs champ. 
 * 
 * 
 * 
 * 
 */