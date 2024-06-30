/**
 * 
 * 
 * Les composants doivent rester pures de même que certaines fonctions ie sont utiliser en lecture seule pour éviter des  bugs. Ne doivent modifier rien qui existait avant qu' on leur fasse appel comme les props. Elles doivent être utilisée en lecture seule. Il en est de même pour certaines fonctions comme les réducteur qui ne calcul que l' état suivant. Les composants ne doivent pas changer d' objet ou de variable qui existait avant qu' on fasse appel à ce composant.
 */

/**
 * En react, les attributs fonctionnent comme des clés à qui on associe des objets. Voir une double {{}} signifie qu'on a mis un objet dans du JSX. Et react transforme chaque élément JSX en un objet. Comme on peut pas afficher directement 2 objets sans les avoir encapsulés dans un tableau raison pour laquelle le JSX ne prend qu'un élément parent.
 * On peut donc utiliser les div, label mais surtout les fragments pour encapsuler nos éléments. Mais avec la map() pour attribuer les key, on doit expliciter le Fragment. 
 * Il y a trois types d' entrée en react: les props, l' état et le contexte. On doit toujours les traiter en lecture seule. Ne jamais changer d' objet ou de variable lors du rendu. Pour changer quelque chose en réponse à une saisie de l' utilisateur, on définie plutôt un état qu' une variable. Il doit pas y avoir 2 états qui affichent la même chose. Plutôt stocker cet élément de l' état dans une variable comme avec le find() par Ex. Ainsi, lorsqu' on appel 2 fois un composant qui est pur, il retourne toujours la même chose comme les formules mathématiques.
 * En revanche, une fonction pure peut modifier quelque chose qui a été créer en son sein comme un tableau vide créé dans le composant à qui on ajoute des éléments. Mais tout ce qui est créé avant est utilisé en lecture seule.
 * Les effets indésirables comme une animation, le reload, modification des données ne se produisent pas pendant le rendu mais plutôt à côté. Il en est de même pour les gestionnaire d' évènement bien que définie dans le composant, ne s' exécutent pas pendant le rendu mais à côté et donc n' ont pas besoin d'  être pures.
 */

/**
 * Les fonctions fléchées avec =>{ peuvent avoir plusieurs lignes de code mais sont considérées comme ayant de corps et donc, on doit spécifier de le return sinon ne renvoie rien. 
 */

/**
 * Un composant dont le nom commence par le miniscule est un élément JSX alors qu'un composant dont le nom commence par une majuscule, react sait que c' est un composant personnalisé. 
 * 
 */




/**
 * Le rendu conditionnel peut être fait avec if , && et ?
 */

/**
 * Les fonctions map() et filter() 
 * La fonction map crée un nouveau tableau et renvoie le résultat fourni sur chaque élément de l' appel.  
 * La fonction filter quant à elle, fait un test pour chaque élément du tableau et retourne les éléments qui ont répondu true au test dans un nouveau tableau. 
 */


/**
 * Les clés indiquent à react à quel élément de tableau chaque composant correspond afin qu' il puisse les faire correspondre plus tard. Elles doivent être inclues dans les données si possible. Elles permettent à react d' identifier de manière unique chaque composant et donc d' optimiser la performance.
 *
 */

/**
 * En react l' état est la mémoire d' un composant, les données qui changent dans le temps.
 */


/**   Valeurs de référence avec les ref
 * 
 * Lorsque veut qu'un composant « se souvienne » de certaines informations, sans pour autant que cette information déclenche de nouveaux rendus, on utilise une réf.
 * Si je l'initialise à 0, react me retourne un objet avec une propriété current dont la valeur est 0.
 * C' est une propriété mutable qu'on peut lire et modifier vu que c' est qu' un simple objet javascript.
 * Lorsqu'une information n'est nécessaire que par les gestionnaires d'événements et que le changement ne nécessite pas de re-rendue, l'utilisation d'une ref peut être plus efficace.
 * C' est une valeur qui est mise à jour entre les rendues mais ne déclenche pas de rendue, que j' ai pas besoin de lire ou écrire et  que je peux muter.
 * Les useRef sont comme le useState sans le setter puisque qu' ici, on le mute donc on retourne toujours le même objet par conséquent, react ne sait pas quand son état change d' où le non déclenchement de rendu. Ce sont des objets JS tout simplement.
 * On peut aussi les voir comme les variables d' instance mais plutôt que this.something, on utilise la syntaxe somethingRef.current
 * *** On peut les utiliser pour la manipulation DOM en compagnie des API navigateur comme myRef.focus(), scrollIntoView(); pour gérer les minuteries
 */

            

            // 1- Utilisation des useRef pour modifier le DOM

        // Cas du Carroussel avec avec scrollIntoView()


// 2- Les ref rappels: manipuler plusieurs noeuds DOM dynamiquement

/**
 * On utilise les attributs ref sur des noeuds DOM pour stocker ces noeuds dans la ref.(ref = {itemsRef}: indique à react de mettre le noeud DOM dans itemsRef.current ) current auquels ensuite par l' intermédiare des gestionnaires sur les bouttons, on applique une API du navigateur: scrollIntoView({
 * behaviour: 'smooth',
 * block: 'nearest',
 * inline: 'center'})
 *  
 */






/** 
 *       3 -  La mise à jour du DOM de façon synchrone avec les flushSync.
 * 
    On enveloppe les set (soit tout ce qui déclenche le rendu) dans le flushSync qui prend une anonnyme comme argument.
 * Voici le code du gestionnaire: 
 * function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    flushSync(() => {
      setText('');
      setTodos([ ...todos, newTodo]);      
    });
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }
 *  Le ref étant appliqué au parent comme ul.
*/


/** 4- Synchronisation avec les effets
 * 
 * Un effet est un effet secondaire causé par le rendu à la différence des évènements. Ils s' exécutent après le rendu quelque soit l' interraction de l' utilisateur alors que les évènements dépendent de l' interaction de l' utilisateur.
 * Les effets doivent synchroniser un composant avec un système externe.
 * Pour savoir si react doit rendre un composant de l' arbre des dépendances, react utilise le fonction Object.is() pour comparer si la valeur précédente de la dépendance est la même. Un tableaau de dépendance vide sans la dépendance dont le code à l' intérieur du useEffect a besoin engendrera des erreurs. Le tableau de dépendance vide, entraine l' exécution du code seulement lorsque le composant est monté. Mais lorsque la dépendance est explicitée, le code est exécuté à chaque fois que Object.is() retourne    
 * retourne false. Mais lorsqu'on ne spécifie pas une dépendance, le code est exécuté à chaque rendu.
 * La fonction de nettoyage, c'est une fonction qui est censée néttoyer le code du useEffect. Elle peut soit réinitialisée une animation, fermer un modal, interrompre un appel...
 * C' est une fonction qu'on ajoute à la fin du code du useEffect. De préférence, une fonction anonyme.
 * Elle est appelée par react dans 2 cas : lorsque le composant est démonté ou lorsque l' effet doit rouler encore une nouvelle fois.
 * Le strictMode en react, appel chaque composant 2 fois par conséquent, chaque effet 2 fois permettant de savoir si un effet a besoin d' une fonction de nettoyage ou pas.   
 * Ansi, en developpement, si la fonction de nettoyage est définie, je verrai d' abord dans la console lorsque le composant est monté,  puis démonté et ensuite monté si j' applique du code à afficher dans la console dans ces deux conditions.
 */


 /* 5 -  ***** Les autres hooks de react

 * ****************useMemo() 
 * est un hook react qui permet de mettre en cache (memoriser) le résultat d' un calcul entre des mises à jours (re-rendues). Ce qui compte ici, c' est les données.
 * On l' enveloppe dans un support (variable) à l' intérieur d' un composant et prend en arg, une fonction anonyme qui à son tour prend deux args: la fonction de calcul et les dépendances. Ce sont toutes les valeurs dont dépendent le hook ou l' effet et ce sont des valeurs qui changent. 
 * Les dépendances peuvent être des props, états, supports, ou des fonctions utilisées par la fonction de calcul.
 * On utilise la memoisation, lorsqu' on veut filtrer ou transformer un grand tableau dont les dépendances changent peu ou lorsqu' on veut englober un calcul lent.
 * Lors du rendu initial, react utilise la fonction de calcul et le résultat du rendu est mis en cache. Lors des prochaines rendues, si les dépendances ne changent pas alors react retourne les valeurs du dernier état mis en cache sinon, react utilise à nouveau la fonction de calcul.
 * Pour savoir le temps que prendrait un calcul, on peut l' englober dans un journal: 
 * En gros, englober tout le support dans : console.time("filter Array") & console.timeEnd('filter Array) 
 * Le code est lent si la valeur est >= 1 ms
 * Compte tenu du fait que useMemo retourne un résultat, alors on précise le return de la fonction qu' on met en cache.
 * 
 * 
 * ***************memo
 * Permet de sauter le re-rendu d' un composant lorsque ses props sont inchangés
 * On enveloppe cette composante dans memo pour avoir une version memoiser de la dite composante. Memo prend 2 args : memo(component, areComponentEqual). Le deuxième arg, on ne le précise pas souvent, react fait le calcul lui même et compare les props avec la fonction Object.is(). On met générallement memo dans un support ayant le même nom que le composant. La memoire n' a trait qu' aux supports qui sont transmis à la composante par rapport à ses parents. Donc un composant memoiser va rérendre si son propre état change.
 * On utilise souvent useMemo() et useCallback() en même temps que memo.  
 * 
 * $ Cas d' utilisation
 * 
 * - Saut de re-rendu lorsque les composants sont inchangés 
 * React ne re-rend pas un composant à nouveau lorsque son parent rerendra tant que ces nouveaux accesoires sont les mêmes par rapport aux derniers accesoires. 
 * Mais react rerendra un composant à même mémoriser si un contexte qu' il utilise change où si son propre état change. La memoire n' a trait qu' aux supports qui sont transmis à la composante par rapport à ses parents.
 *   
 * 
 * 
 * Quelques conseils de bonne gestion de l' état:
 * - Lorsqu' un composant accepte visuellement d' autres composants, le laisser accepter d' éléments JSX en tant qu' enfant. De ce fait, lorsque son état se met à jour, react n' aura pas besoin de mettre à jour ses enfants.
 * - Préférez l' état local et ne pas soulever l' état plus que nécessaire. C' est le cas pour les formulaires. Ne pas rendre l' état transitoire si est placé au sommet de l' arbre UI.
 * - Rendre les composants purs
 * - Éviter les effets inutiles qui mettent à jour l' état.
 * - Éviter les dépendances inutiles de effets (déplacer une fonction ou un objet dans un effet où à l' extérieur d' un composant plutôt que la mémoisation.)
 * - utiliser le devtools pour voir quel composant nécessiterait de memorisation 
 * 
 * 
 * 
 * Mise à jour des composants: minimisation des changements d' accesoires
 * Un composant rerend à chaque fois qu' un props est un objet, tableau ou une fonction.
 * En effet, la comparaison que fait react entre l' anciens props et les nouveaux est superficielle.
 * Pour minimiser les changements d' accesoires, on adopte les mesures suivantes:
 * *****A chaque fois que le props est un objet, empêcher le composant parent de le recréer en utilisant useMemo()  
 * ***** Un composant peut accepter des valeurs individuelles plutôt qu' un objet entier.
 *******Préferer si possible, donner au composant un booléan qui indique une valeur plutôt que la valeur elle-même puisqu' elle change très peu.  
 * *****Quand on doit passer une fonction comme props pour mémoriser un composant, préférer mettre cette fonction en dehors du composant de sorte qu' elle ne change jamais ou la déclarer dans un useCallback() afin de mettre sa définition en cache entre re-rendue. 
 * 
 */


// 1er cas :

function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  const person = useMemo(
    () => ({ name, age }),
    [name, age]
  );

  return <Profile person={person} />;
}

const Profile = memo(function Profile({ person }) {
  // ...
});

// 2e cas :

function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);
  return <Profile name={name} age={age} />;
}

const Profile = memo(function Profile({ name, age }) {
  // ...
});

// 3e cas: 

function GroupsLanding({ person }) {
  const hasGroups = person.groups !== null;
  return <CallToAction hasGroups={hasGroups} />;
}

const CallToAction = memo(function CallToAction({ hasGroups }) {
  // ...
});


/** useCallback()
 * Permet de mettre en cache une définition de fonction entre re-rendu.
 * const cachedFn = useCallback(fn, dependencies).
 * c' est le cas des gestionnaires lorsqu' on veut les faire passer comme props à des composants enfants. Si le parent a un état ou contexte qui change, Le composant enfant va rerendre. Ainsi, on met d' abord le gestionnaire dans le useCallback() pour éviter que sa définition ne change entre les rendues et par la suite, on met le composant enfant dans memo pour éviter que cet dernier ne monte lorsque son parent se rerend sans que les props reçus par ce dernier ne change.   
 * ********* La différence avec useMemo() est que useMemo() ne met en cache que les résultats de l' appel d' une fonction alors que useCallback met en cache la dédinition de la fonction  elle même. 
 * Cela permet d' envoyer la fonction vers le bas sans des redondages inutiles du composant enfant qui la reçoit. 
 * 
 * Quelques cas d' utilisation
 * 
 * - Mise à jour de l' état à partir d' un rappel mémorisé.
 * C' est le cas du handlAddTodo
 * Lorsqu' on lit un état seulement pour calculer l' état suivant, on peut se passer des dépendances en passant au set une fonction de mise à jour. Normalement cette fonction dépend de l' état todos comme dépendance. 
 */

// 1er cas:
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ No need for the todos dependency
  // ...

  // 2e cas:



  
/** 5 - Ne pas avoir besoin des effets: Les cas où on a pas besoin des effets.
 * 
 ******************** Les effets permettent de sortir de react et de se synchroniser ses composants avec un système externe: widjet(modal, carte), réseau ou le DOM. 
 * 
 * Lorsque quelque chose peut être calculée à partir des supports ou de l' état existant, on ne le met pas en état et on le calcul lors du rendu.
 * Ex: fullName qui peut être calculée à partir des états firstName et lastName. On le met donc dans une constante plutôt que de rédéfinir un état.
 * 
 *********************Réinitialisation de l' ensemble de l' état lorsqu' un props change 
 * C' est le cas d' un composant ProfilePage qui reçoit un props userId. Cette page contient une entrée de commentaire qu' on stocke dans une variable d' état comment. Mais lorsqu'on navigue d' un profil à l' autre, l' état comment ne se réinitialise pas. Ainsi, on peut poster accidentellement un commentaire sur le profil d' un autre user. Ainsi, pour résoudre ce problème, on souhaite effacer l' état comment à chaque fois que userId est modifié. 
 * Eviter d' utiliser useEffect pour apporter des modifications sur le rendu puisque, ça se déroule après le rendu donc va entrainer secondairement un rerendu. 
 * ** On doit donc dire à react que le profil de chaque utilisateur est conceptuellement un profil différent en lui donnant une clé explicite. Pour cela, on divise donc notre composant en deux et on passe un key, de la composante externe (parent) à la composante interne (enfant)  
 * Normalement, react preserve l' état lorsque le même composant est rendu au même endroit.
 * En passant donc un key, userId à Profile, ici, on dit à react de considérer le composant Profile avec # userId comme 2 composants # qui ne doivent pas partager le même état.  Ainsi, à chaque fois que le key change, react réorganisera le DOM et réinitialisera l' état de Profile et de tous ses enfants.
 * 
 * *********************Ajustement d' un état lorsqu' un accessoire change
 * ?? : Cet opérateur en JS, nullish coalescing si result = a ?? b alors result sera égal à b si est null ou inedifined peut importe si a est falsy (0 ou '').
 * On veut ajuster ou changer un peu l' état en fonction d' un changement de support
 * C'est ce que  Listla composante reçoit une liste de  itemsen tant qu'accessoire, et maintient l'élément sélectionné dans le  selectionvariable d'état. Vous voulez réinitialiser le  selection à  null chaque fois que le  itemsbénétient un réseau différent: 
 *  
 * Avec ce 2nd cas, on ne devrait pas mettre à jour l' état directement dans le rendu mais ça va puisqu' on a spécifié une condition. Sinon, on aura une boucle infinie car le composant ne va plus retourner le JSX mais restituer immédiatement le rendu.
 * 
 * 
 * Une approche encore meilleure, est au lieu de stocker (et de réinitialiser) l'élément sélectionné, vous pouvez stocker l'ID d'élément sélectionné:
 * Il n'est plus nécessaire d'ajuster l'État du tout. Si l'élément avec l'ID sélectionné est dans la liste, il reste sélectionné. Si ce n'est pas le cas,  selection (une simple variable) calculé pendant le rendu sera  null parce qu'aucun élément de correspondance n'a été trouvé.
 *********GPT: Cette approche est souvent recommandée pour calculer des valeurs dérivées des props ou de l'état dans les composants fonctionnels, car elle assure que la valeur est toujours à jour avec les dernières props et état puisque le composant sera appelé lorsque selectedId est # ou items et selection, recalculée en conséquence. Aucun élément ne serait trouvé si selectedId est null ou l' id n' est pas dans la liste.
*****
******************************Envoi d' une demande POST
*La demande d' analyse POST, doit rester dans un effet mais la demande POST (soumission du formulaire) doit rester dans le gestionnaire.
En effet, lorsqu' on veut mettre une logique, se demander la logique du point de vue de l' utilisateur pour savoir quand utiliser un effet ou un gestionnaire. Si cette logique est provoquée par une interaction particulière, conservez-la dans le gestionnaire de cas. Si elle est causée par l'utilisateur qui voit le composant sur l'écran, conservez-le dans l'Effet.
*
**************************
********************Le code qui fonctionne parce qu'un composant a été affiché devrait être dans Effects, le reste devant des événements.
    ***************Si vous avez besoin de mettre à jour l'état de plusieurs composants, il est préférable de le faire au cours d'un seul événement.
   **************** Chaque fois que vous essayez de synchroniser les variables d'état dans différents composants, envisagez de lever l'état.
    ****************Vous pouvez aller chercher des données avec Effects, mais vous devez mettre en œuvre le nettoyage pour éviter les conditions de course.


*


 */

 // 1er cas :
 export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // ✅ This and any other state below will reset on key change automatically
  const [comment, setComment] = useState('');
  // ...
}

// 2 cas:
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // Better: Adjust the state while rendering
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}

// Approche de substitution au 2cas:

function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // ✅ Best: Calculate everything during rendering
  const selection = items.find(item => item.id === selectedId) ?? null;
  // ...
}

// Ca pratique du 2 avec GPT
import React, { useState } from 'react';

// Composant List
function List({ items }) {
  // État pour suivre l'ID de l'article sélectionné
  const [selectedId, setSelectedId] = useState(null);

  // Trouver l'article sélectionné basé sur selectedId
  const selectedItem = items.find(item => item.id === selectedId) ?? null;

  return (
    <div>
      <ul>
        {items.map(item => (
          <li
            key={item.id}
            style={{ fontWeight: item.id === selectedId ? 'bold' : 'normal' }}
            onClick={() => setSelectedId(item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div>
        {selectedItem ? (
          <div>
            <h3>Details for {selectedItem.name}</h3>
            <p>Description: {selectedItem.description}</p>
          </div>
        ) : (
          <p>Please select an item.</p>
        )}
      </div>
    </div>
  );
}

// App Component
function App() {
  const items = [
    { id: 1, name: 'Item 1', description: 'Description of Item 1' },
    { id: 2, name: 'Item 2', description: 'Description of Item 2' },
    // Ajoutez d'autres articles selon le besoin
  ];

  return (
    <div className="App">
      <h1>Item Selector</h1>
      <List items={items} />
    </div>
  );
}

export default App;



/******************* Le hook useSyncExternalStore
 * C' est un hook qui permet de se connecter son état react à un magasin externe comme un webSocket
 * Prend 3 args:
 * La méthode subscribe(): qui permet de s' abonner aux changements d' état et appelle le callback lorsque l' état change.
 * Cette méthode prend un callback en paramètre qu' on appelle lorsqu' il y a un changement d' état. Elle retourne une fonction qui permet de se désabonner.
 * getSnapshot(): qui permet de récupérer la valeur à l' intérieur de l' état.
 * getServerSnapshot(): lorsqu'on a un rendu côté serveur.
 * 
 */



// Quelques cas d' applications sur si on doit utiliser l' effet ou nom

//1er cas :

import { useState } from 'react';
import { initialTodos, createTodo } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      <footer>
        {activeTodos.length} todos left
      </footer>
    </>
  );
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
    </>
  );
}


// 2e cas:


/*************Durée de vie des effets reactifs
 * 
 * Les dépendances, c' est toutes les valeurs réactives dont nécesitent l' effet.
 * La valeur réactive, peut être un prop, un état, même une variable régulière.
 * Tout ce qui est déclaré dans un composant est une valeur réactive. Que ce soit une variable calculée à partir d' un props ou d' un état ou même une variable simple, elle est réactive tant que c' est déclarée dans un composant. Puisque, à chaque rerendue, react rerend tout ce qui est dans le composant et donc produit une nouvelle version de chaque élément du composant.
 * Mais les éléments déclarés à l' extérieur du composant ne sont pas récatifs parace que c' est pas lu pendant le rendu.
 * Tout ce qui est déclaré à l' intérieur de l' effet n'est pas non plus lu pendant le rendu par conséquent n' est pas du tout réactif. On peut donc les omettre dans le tableau des dépendances.  
 * 
 * 
 */