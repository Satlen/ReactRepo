

/******************Les props
 * 
 * Les props permettent de rendre dynamique nos composant.
 * Lorsqu' on veut passer des strings comme JSX, on a pas besoin des accolades
 * Mais en dehors des strings, comme les objets, nombres, on doit forcement mettre les accolades.
 *  
 * 
 */




/**********useEffect()
 * 
 * Permet d' ajouter des effets durant le cycle de vie du composant.
 * Un composant a 3 cycles de vie: le montage, la mise à jour et le démontage.
 * 
 * Lorsqu' on met un tableau de dépendance vide, alors on dit au useEffect, d' ignorer les mises à jour de l' état et des valeurs réactives puisqu' il se MAJ uniquement lors du premier rendu.
 * On les utilise pour gérer des effets de bord comme:
 * Modifications du DOM,
 * Requêtes HTTP
 * Les timers
 * Se connecter à des bibliothèques tierces, webSockets
 *   
 */

/***********useContexte()
 * 
 * Permet d' accéder à la valeur d' un contexte, de façon globale dans le composant.
 * Si le composant parent d' un contexte (qui est un état par Ex ) se rend, alors on a le rendu de tous les enfants composant qui utilisent ce contexte. 
 * Mettre une valeur initiale dans le contexte permet d' avoir l' auto-complétion lorsqu' on veut utiliser le contexte plus tard.
 * Lorsqu' un composant n' est pas enfant du Provider, et on utilise le contexte chez ce dernier, on a uniquement accès à la valeur initiale du contexte.
 * Donc sans le Provider, j' ai uniquement accès aux valeurs initiales mentionnées dans le contexte.
 */


/************* react Memo()
 * 
 * Compare l' état précédent et l 'état suivant pour savoir s' il doit rendre le composant ou pas.Cet état comprend les props, l' état lui même. Mais c' est une comparaison superficielle. Memo n' est pas en mesure de compare des fonctions, des objets imbriqués. Pour cela, je peux lui passer un second argument qui arePropsEqual? C' est une fonction anonyme qui prend en arg prevProps et nextProps ie l' état avant la MAJ et après la MAJ.
 * De cette manière, je peux spécifier au Memo, les paramètres à comparer pour dire si les props sont les mêmes ou pas. De ce fait, je peux tenir compte des paramètres simples qu' il peut comparer et contribuant à la mise à jour de l' état comme:
 * (prevProps, nextProps) => {
 * if (prevProps.completed === nextProps.completed){
 * return true} donc de memoiser dans ce cas çi.
 * return false
 * }
 * 
 * Mais il y a un problème avec Memo en fonction du mode de rendu de react. Cette tâche créée, a conscience de son existence et de la tâche précédente. Ainsi, pour éviter tout problème ultérieur en rapport avec l' état, on utilise la fonction de MAJ dans le set.
 * Memo ne fonctionne pas aussi avec les contexte. En effet il marche avec les contextes mais compte tenu de la mise à jour de l' état du contexte, il devient impuissant.
 * 
 * En effet, on crée notre composant et on introduit tout notre logique.
 * Mais ce qu' on exporte, c'est plutôt le memo appliqué sur ce composant.
 * Memo concerne principalement la MAJ des props que reçoient un composant.
 * 
 * L' optimisation avec memo, se fait toujours après coup. On ne l' anticipe pas. On le fait lorsqu' on a un ralentissement.
 * Pour éviter des rendues inutiles d' un composant, la meilleure approche est de bien subdiviser la logique de ses composants par Ex, l' état associé au Input type text, doit être propre à un composant enfant. Cela pour éviter que lorsqu' on tape un caractère, le composant se rerend et rerend par la suite d' autres éléments qui n' étatient pas nécessaires comme le composant inclut dans une fonction map().
 * Il est donc important de savoir que lorsqu' un parent se rerend, il va entrainer ses enfants à lui. Mais lorsque c' est l' enfant qui se rerend, il n' entraine pas son parent même s' il reçoit des props de celui-çi.
 *  La première question avant l' usage de memo, est de se demander si son état est géré au bon endroit ie si on doit pas lui trouver un composant dédié pour que ça mise à jour, n' impacte pas les autres composant.
 * C' est après cette étape, qu' on utilise memo, après avoir vérifié si on bien subdivisé ses composants. 
 * 
 * *Pour un gestionnaire de tâche par Ex, le composant SearchBar a son propre état lui permettant de de récupérer la valeur saisie et le parent lui envoie un gestionnaire par lequel il transmet à ce dernier la valeur saisie par le user. De ce fait, la MAJ de l' état causée par la nouvelle saisie du user, ne va impacter que le composant enfant.
 * 
 * Une autre manière de mieux gérer l' état que j' ai vu chez grafikart est de mettre le SearchBar et le ShowBar dans un composant et le TaskList dans un autre.
 * De ce fait, ces derniers vont filtrer l' état et le transmettre à TaskList au lieu que TaskList utilise directement l' état et je vais appliquer la logique dessus, lui il n' aura qu' à afficher l' état filtré que je mets dans visibleTasks par Ex. 
 * Pour avoir visibleTasks par Ex, je filtre l' état avec les conditions suivantes:
 * visibleTasks = Tasks.filter( task =>
 * if (show... && !task.completed){return false} soit donc de ne pas les afficher
 * if (search && !task.name.includes(search){return false} )
 * C'est ce état qui est maintenant  envoyé à taskList.
 * 
 * 
 * 
 * Le second param de react memo, areCompoanentEqual?, prend une fonction callback qui retourne dans ses params (prevProps, nextProps), la valeur précédente et suivante de chacune des props du composant qu' on memoise. Ainsi (prevProps, nextProps) sont des objets contenant comme propriété chaque props du composant qu' on memoise. Je peux donc dire à cette fonction, d' être uniquement en observation sur une props étant une chaine de caractère par Ex pour faire la comparaison de si les props précédentes équivalent aux props suivantes. 
 * 
 * 
 * */


// Ici, un code de atomic react pour gérer les Id avec la fonction reduce

/*******reduce()
 * La fonction reduce() est une fonction de rappelle, permet d' itérer sur les éléments d' une liste et de retourner une valeur unique résultante de ces différentes valeurs parcourues.
 * Elle prend 2 params: l' accumulateur qui est initialisée ici à 0 mais si elle n' est pas fournie, elle prend la première valeur de l' élément actuel. Ensuite, l' élément actuel du tableau sur lequel on itère en exécutant la fonction de rappel jusqu'à fini le tableau.
 * Elle prend 2 args: la fonction de rappelle et la valeur initiale qui est attribuée à l' accumulateur   
 * Ici, le max ira d' office à 0 le tableau étant vide ainsi on exécute ce code pour tous les éléments pour retourner la valeur maximale lors de la dernière itération.
 * 
 * ce code a plusieurs utilités : 
 * - avec les bases de données ou les Id sont données de façon automatique, permet de connaitre le dernier Id ou l' Id le plus récent pour pouvoir ajouter d' autre enregistrements par Ex.
 * - Connaitre l' id de l' élément le plus récent ou le dernier élément de la liste.
 * - pour avoir un Id unique
 * Ainsi, avec ce code, on regarde à chaque fois l' id maximum qu' on utilise ici, pour ajouter un nouveau id
 */

let tasks = []
let maxId = tasks.reduce((max, task)=> task.id > max ? task.id : max, 0)



/*********useMemo()
 * 
 * Permet de mettre en cache le résultat d' une fonction entre les rendus.
 * Prend en arg la fonction et les dépendances.
 * Les dépendances, c' est toutes les valeurs que je voudrais que la fonction s' exécute à leur mise à jour.
 * Un tableau de dépendance vide, va conserver en mémoire la valeur initiale de la fonction en mémoire et donc ne va pas se mettre à jour.
 * Dans useMemo(), on retourne toujours quelque chose.    
 * Le problème avec useMemo() comme react memo, on memoise par rapport au rendu initial du composant lorsqu' on met un tableau de dépendance vide. Ainsi, lorsque je memoise le résultat d' une fonction avec le useMemo(), à chaque fois qu' il y a rendu, react compare par rapport au rendu initial. De ce fait, lorsque je memoise le filterTasks ou Tasks, si au départ j' ai 3 tasks react memoise les 3 tasks. Ainsi, prochainement lorsque je crée un nouveau task, react compare au rendu initial et fait par Ex pour l' id, le dernier + 1, et ça marche, mais lorsque je crée une nouvelle task, react fait encore la même opération si comme çi c' était la première fois aboutissant au même key. Pour régler ceçi avec le useMemo, il faut ajouter la dépendance comme tasks ici par Ex. Pour ne pas avoir avoir à utiliser l' état comme props, j' utilise la fonction de mise à jour.
 * Penser à utiliser la fonction de nettoyage dans les set qui s' assure lui même de la mise à jour de l' état, pour ne pas avoir à préciser l' état comme dépendance.
 * On utilise memo et useMemo() sur le moins de fonction et composant possible.
 * 
 * Le filtrage et le toggleTheme ne touche pas à l' état des tâches donc il n' y a pas de rendu du composant causé par ceux-çi.
 */


/*************useCallback()
 * Le useCallback(), c' est la même chose que le useMemo() mais sans le return de la fonction. 
 *  
 */


/***********custom Hook 
 * Les custom hooks permettent de réutiliser de la logique dans nos composants.
 * Un custom hook, s' utilise seulement si on utilise des built in hooks de react.
 * Utilisent plusieurs fonctionnalités des composants pour en faire ressortir un résultat.
 * On les utilise comme des built-in hooks.
 * 
*/


/************forwardRef
 *  C' est un composant d' ordre supérieur qui permet d' utiliser le useRef sur un composant personnalisé.
 * Pour ce faire, le composant sur lequel on applique le useRef est un composant enfant dont ler parent lui renvoie sa référence comme props. Ce composant enfant a son tour, on lui applique le forwardRef() qui prend une fonction anonyme comme arg. Cette fonction anonyme prend 2 args que sont les props que reçoient le composant et le ref comme étaant le 2nd arg de cette anonyme.
 * Le composant enfant peut maintenant appliquer sur ses composants built-in la référence qu' il a reçu de son parent comme props.      
 * 
 */


