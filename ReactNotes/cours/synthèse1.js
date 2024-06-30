
 
 /** ****************Il est important de savoir 2 ou 3 trucs par rapport au useState:
   * Dans la valeur initiale, on peut attribuée une fonction qui sera calculée uniquement lors du rendu initial.
   * Dans la fonction de paramétrage, on peut mettre la variable d' état qui va correspondre à sa valeur lors du dernier rendu. On peut y mettre n' importe quoi. 
   * Avec la syntaxe setState(state => ), on essaie d' accéder à la valeur la plus récente de l' état.
   * Dans les itérations (filter et map), pour chaque élément de la dernière valeur de l' état (souvent une liste), on exécute la même instruction. On passe le key au composant parent. Ainsi, chaque élément du composant est distinct et à son gestionnaire. De ce fait, en fonction des interactions du user comme programmer par le addEventListener, react sait quel élément de la liste dans le DOM a changé ou a été touché. Ceçi, en fonction des keys qui enveloppent le parent, qu' il reconnait pour chaque itération.
   * 
   */





 
 /************* La différence entre le useState() et les variables d' état
  * 
  . Les variables locales (définies dans le composant) ne persistent pas entre les rendus. Lorsque react rend un composant une deuxième fois, il le rend à partir de 0 et les changements dans les variables locales ne déclenchent pas de rendu. Tout ceçi la différencie du  useState(). On utilise le useState() quand on veut que react se souvienne de quelque chose.
  . Ainsi lorsqu' on veut que react se souvienne d' une variable et on a pas besoin que cette variable soit rendu comme les index, on la définie dans le module à l' extérieur du composant. 

 */


  /* ******** Comment react rend un composant

  1 - D' abord, on a le déclenchement du rendu (après un set par Ex)
    . Dépend de 2 facteurs:
      - le rendu initial
      - l' état de la composante ou de l' un de ces encêtres a été mis à jour. Cette mise à jour fait la queue à render ie dans la hiérachie. 
    . En gros, le déclenché un rendu, c' est faire appel à react.
  2 - Ensuite, react rend les composants ie react appel les composants
    . lors du rendu initial, react appel le composant racine
    . pour les rendus ultérieurs, react fait appel au composant dont le set a déclenché le rendu.
    Cet appel est récursif ie si le composant qui doit être rendu est imbriqué, react rend aussi ces derniers jusqu' a ce qu' il sache exactement ce qui doit être affiché à l' écran. 
    . lors du rendu, un composant doit être pur: 
      . mêmes entrées(entrée du user), même sortie
      . s' inquiète de ses propres affaires
    . Avec le strict mode, react appel 2 fois les composants pour se rendre compte des erreurs.
  3 - react modifie le DOM
  . react ne touche pas le DOM si le resultat du rendu est le même que lors du dernier rendu. 
  */
 
 
 
 
 
 /* En parlant des gestionnaires d' évènement en react

Par convention, il est courant de nommer les gestionnaires d'événements comme  handlesuivi du nom de l'événement
 Par convention, les accessoires de traitement des événements devraient commencer par on, suivie d'une lettre majuscule.
    Si vous voulez définir votre gestionnaire d'événements en ligne, encapsulez-le dans une fonction anonyme.
    On dispose de 2 manières pour passer des gestionnaires :
    <button onClick={handleClick}>passe le handleClickfonction.
    <button onClick={() => alert('...')}>passe le () => alert('...')fonction.
        Dans le dernier cas, on parle de gestionnaire en ligne.
. Le gestionnaire d' évènement est appelé à chaque fois que le user clique ou effectue une action.
. Pour les itérations avec filter et map, l' état à l' intérieur du set est l' état courant ie les dernières valeurs de l' état visibles sur l' interface avant le déclenchement du rendu alors la seconde valeur de l' état par rapport à laquelle on fait la comparaison est la valeur initiale de l' état.
. Il faut aussi retenir que les itérations du map et filter sont les même chose que les boucles où j' itère selon certaines valeurs et en fonction du nombre de valeur de la variable, on m' exécute autant de fois l' instruction contenue dans la boucle. Cette instruction pouvant directement avoir rapport avec ce qui est itéré ou non.  
. C' est le parent qui permet à l' enfant de modifier l' état en lui passant le gestionnaire.
. Pour des raisons de performance, il est conseillé de ne pas partager l' état depuis les composants de niveau supérieur étant donné que le rendu est récursif.   

 */

// 1er cas

// un gestionnaire d' évènement impécable 

import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}

// 2e cas

// Une manière aussi de gérer l' état pour éviter les reddons de l' état; ici avec le selectedId qui était le selectedItems et renvoyait items[0].title de base. Alors qu' ici, l' état se permet juste de récupérer l' id et on a une constante qui récupère l' objet voulu de l' état pour ne pas que l' état affiche directement un objet appartenant à un autre état.


const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export  function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(item =>
    item.id === selectedId
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedId(item.id);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}






/*****************Le hook useState()

Quand vous appelez useState, vous dites à React que vous voulez que ce composant se souvienne de quelque chose :
  const [index, setIndex] = useState(0);
  Dans ce cas, vous voulez que React se souvienne index.
Chaque fois que votre composant rend,  useState vous donne un tableau contenant deux valeurs:
    La variable d'état (index) avec la valeur que vous avez stockée.
    La fonction de paramétrage d'état (setIndex) qui peuvent mettre à jour la variable d'état et déclencher React pour rendre le composant à nouveau.


    1 - Votre composant rend la première fois. Parce que tu es passé 0 à useState en tant que valeur initiale pour index, il reviendra [0, setIndex]. React se souvient 0 est la valeur la plus récente de l'État.
    2 - Vous mettez à jour l'état. Lorsqu'un utilisateur clique sur le bouton, il appelle setIndex(index + 1). index est 0, donc c'est setIndex(1). Cela dit à React de se souvenir index est 1 Maintenant et déclenche un autre rendu.
    2 - Le deuxième rendu de votre composant. Reagir toujours voit useState(0), mais parce que React se souvient que vous avez mis index à 1, il retourne [1, setIndex] à la place.
    Et ainsi de suite.
. Sur le plan interne, React détient un tableau de paires d'états pour chaque composant. Il maintient également l'indice courant de la paire, qui est fixé à  0avant le rendu. Chaque fois que vous appelez useStateReact vous donne la paire d'états suivant et incrémente l'index.
.  Contrairement aux accessoires, l'État est entièrement privé pour le composant qui le déclare. La composante parente ne peut pas le changer. Cela vous permet d'ajouter de l'état à n'importe quel composant ou de l'enlever sans impacter le reste des composants.
. On ne met à jour l' état que par la fonction de paramétrage

*/


/****************************** L' etat en tant qu' instantané
 * 
 - la valeur d' une variable d' état ne change jamais au sein d' un rendu.
 . En effet, tout le code du gestionnaire d' évènement est exécuté en tenant de l' état précendant. C 'est après avoir terminé tout le code du gestionnaire que react déclenche le rendu. Ainsi, chaque code de l' état est exécuté en tenant compte de la valeur précédente de l' état. Même si un code est exécuté après le rendu comme dans un setTimeout(), le code qu' il retourne est toujours en fonction de la valeur de l' état à son appel.

*/


// Exemple d' un exercice de formulaire

import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}




/* ********* Mise en file d' attente d' une série de mise à jour par l' état

- React attend que tous les codes des gestionnaires de cas aient été exécutés avant de traiter les mises à jour de l'état.
- Cela permet de mettre à jour en une fois plusieurs composants (plusieurs set) sans trop de re-rendu. Mais cela signifie aussi que l'interface utilisateur ne sera mise à jour qu'après que le gestionnaire d'événements, et n'importe quel code de celui-ci, ne sera terminé.
-**** On peut mettre à jour le même état plusieurs fois avant un rendu.
  . Lorsqu' on introduit plusieurs instructions dans un gestionnaire, au clique ou à l' appel, chaque instruction se met en file d' attente jusqu' à ce qu'on termine tout le code du gestionnaire avant que react ne déclenche le rendu.
  . De ce fait, lorsqu'on a rien à faire avec la valeur de l' état en file d' attente, ie on veut juste que notre code s 'exécute en fonction de l' état courant et lors du rendu, passe à l' état suivant, on utilise le code comme celui-çi: { () => setCount(count + 1)} comme fonction de paramétrage
  . Mais lorsque l' on veut utiliser la valeur de l' état en file d' attente et travailler avec, on utilise le code comme celui-çi: 
  { () => setCount( count => count + 1) } on appelle cette fonction passée au setCount une fonction de mise à jour.
  De ce fait, lors du rendu, react passe par la file d' attente et donne l' état final mise à jour. 

  - ChatGPT sur la mise à jour de l' état par react
  Voici une explication plus détaillée du processus asynchrone dans React :
    1 - Appel de la fonction de mise à jour : Lorsque vous appelez une fonction de mise à jour de l'état (comme setTasks), React ne met pas immédiatement à jour l'état.
    2 - File d'attente des mises à jour : Au lieu de cela, React met la mise à jour de l'état dans une file d'attente (ou un "batch") pour optimiser les performances.
    3 - Rendu asynchrone : React planifie le rendu asynchrone après avoir traité toutes les mises à jour d'état en attente. Cela signifie que le rendu ne se produit pas immédiatement après l'appel de la fonction de mise à jour.
    4 - Fonctions de rappel : Si vous avez des fonctions de rappel après la mise à jour de l'état (par exemple, useEffect ou des mises à jour d'état successives), elles seront exécutées après le rendu asynchrone.
    5 - Garantie de l'ordre des effets : React garantit l'ordre des effets (y compris les mises à jour d'état) en les exécutant dans l'ordre où ils ont été déclarés.
  . 

*/


/* ************* Mise à jour des données Objets dans l' état

- On peut utiliser la bibliothèque immer qui facilite l' imbrication mais en interne reproduire l' objet de base et apporte les modifications ajoutées. 
- Sinon, on a deux méthodes pour imbriquer directement les objets:*
  . D' abord on travail sur l' objet imbriqué à part ensuite on l' introduit dans l' objet de base.
  . Soit on y va directement 
*/

const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});

// 1er cas

const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
// ceçi marche parceque les objets ne sont pas en fait imbriqués ce sont des des adresses auxquels chaque valeur pointe.
setPerson(nextPerson);

// 2eme cas

setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});


/*** Mise à jour des données Arrays dans l' état
 * 
 * Avec les arrays, les 
 * En général, on ne peut muter que des objets qu' on vient de créer comme dans un gestionnaire ...  mais si on a affaire à quelque chose qui est déjà en état, on doit en faire une copie.
 * On peut utiliser filter() et map() pour créer de nouveaux tableaux avec des éléments filtrés ou transformés ie dans le gestionnaire, on peut toujours utiliser la fonction map() et filter() directement à l' intérieur d' une set pour retourner un nouvel état sans pour autant faire une mutation vu que ces fonctions retournes un nouvel objet.
 * Les fonctions qui modifient l' état font une mutation:
 * push, unshift, pop, reverse, sort, [i] =, splice ...
 * Les fonctions qui font une copie: map, slice, filter, concat, [...], ...
 */

// 1er cas : Suppression d' un tableau

import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}


// 2e cas : Insérer dans un tableau!

import { useState } from 'react';

let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++, name: name },
      // Items after the insertion point:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        Insert
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}


// 3e cas :apporter des modifications à un tableau comme inverser:

import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        Reverse
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}


// 4e cas : mettre à jour un état imbriqué

import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setMyList(myNextList);
  }

  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = [...yourList];
    const artwork = yourNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setYourList(yourNextList);
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}




/* ***************** Pour partager l' état entre deux composants, 

Parfois, vous voulez que l'état de deux composants change toujours ensemble. Pour le faire, retirez l'état des deux, le déplacer vers leur parent commun le plus proche, puis transmettez-le à eux par l'intermédiaire d'accessoires. C'est ce qu'on appelle l'état de levage, et c'est l'une des choses les plus courantes que vous ferez en écrivant du code React.


*/

// 1er cas: On veut faire un accordeon pour que lorsqu'un composant affiche son texte, l' autre soit en retrait

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
}

// 2e cas:  On veut que lorsqu' on écrit dans une base de recherche, on affiche les éléments ayant le nom correspondant

export function filterItems(items, query) {
  query = query.toLowerCase();
  return items.filter(item =>
    item.name.split(' ').some(word =>
      word.toLowerCase().startsWith(query)
    )
  );
}

export const foods = [{
  id: 0,
  name: 'Sushi',
  description: 'Sushi is a traditional Japanese dish of prepared vinegared rice'
}, {
  id: 1,
  name: 'Dal',
  description: 'The most common way of preparing dal is in the form of a soup to which onions, tomatoes and various spices may be added'
}, {
  id: 2,
  name: 'Pierogi',
  description: 'Pierogi are filled dumplings made by wrapping unleavened dough around a savoury or sweet filling and cooking in boiling water'
}, {
  id: 3,
  name: 'Shish kebab',
  description: 'Shish kebab is a popular meal of skewered and grilled cubes of meat.'
}, {
  id: 4,
  name: 'Dim sum',
  description: 'Dim sum is a large range of small dishes that Cantonese people traditionally enjoy in restaurants for breakfast and lunch'
}];


import { useState } from 'react';
import { foods, filterItems } from './data.js';

export default function FilterableList() {
  const [query, setQuery] = useState('');
  const results = filterItems(foods, query);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <SearchBar
        query={query}
        onChange={handleChange}
      />
      <hr />
      <List items={results} />
    </>
  );
}

function SearchBar({ query, onChange }) {
  return (
    <label>
      Search:{' '}
      <input
        value={query}
        onChange={onChange}
      />
    </label>
  );
}

function List({ items }) {
  return (
    <table>
      <tbody> 
        {items.map(food => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}




/* Explication du code çi-dessus
. L'état de levage change souvent la nature de ce que vous stockez en tant qu'état ie si je controle des composants par des props, si l' un modifie l' état par l' intermédiaire des gestionnaires que le parent leur a transmis, cela a immédiatement des répercussions sur ce qui est affiché par le second composant puisque les 2 dépendent du même état. Ainsi, quand on partage l' état, un seul composant devrait être actif à la fois comme le cas çi dessus.
. Dans ce cas, un seul panneau devrait être actif à la fois. Cela signifie que le  Accordion Un composant parent commun doit suivre le tableau de bord qui est le groupe actif. Au lieu d'un  boolean valeur, il pourrait utiliser un nombre comme indice de l'actif  Panel pour la variable d'état:
          const [activeIndex, setActiveIndex] = useState(0);
. Lorsque le  activeIndex est 0, le premier panneau est actif, et quand il est 1, c'est le deuxième.
. En cliquant sur le bouton « Afficher » dans l'un ou l'autre  Panelnécessité de modifier l'indice actif en Accordion. A  Panelne peut pas définir le  activeIndexinimport { useTaskContext } from "./TaskContextProvider"


export default function () {
    
const { search, handleSearchChange } = useTaskContext()

    return (
<>
<h2> Barre de Tâche</h2>
<input 
    type = "text"
    value = {search}
    placeholder="Saisissez le nom d' un cours"
    onChange = {handleSearchChange}
></input> {' '}
<button onClick={}> Ajouter une nouvelle tâche</button>

</>

    )

}diquer directement parce qu'il est défini à l'intérieur du Accordion. Le  Accordionun élément doit être explicitement autorisé  Panelun composant pour changer son état en faisant descendre un gestionnaire d'événements comme un accessoire:
. On dit qu' un composant est contrôlé si son parent peut modifier son comportement à l' aide des props comme çi-dessus mais un composant est incontrolé quand son comportement est géré par sa variable d' état (useSate) donc le parent n' y a pas accès. 
. Le fait qu' il utilise des index ici pour spécifier si active ou pas est subtil. Je le fait pour les composants controlé sinon, j' y vais directement avec les booléans. La finalité, c' est d' avoir isActive dans ces 2 cas çi.
*/



/* *******************État de conservation et de réinitialisation

ici, on parle de la conservation et de la suppression de la mémoire en react.
.Démonter un composant, supprime son état. De ce fait, il n' est pas conseillé d' imbriquer des composants de peur que le composant imbriquer, soit nouvellement rendu à chaque rerendu.
. React maintient l'état aussi longtemps que le même élément est rendu à la même position.
. L'État n'est pas conservé dans les étiquettes JSX. Il est associé à la position arborescente dans laquelle vous mettez ce JSX. Donc l' état d' un composant dépend de l' arbre UI. Si le composant est toujours au même endroit dans l' arbre UI, son état est maintenu. Mais lorsqu'on démonte un composant, on modifie l' arbre UI donc l' état du composant est supprimé et est remise à zéro au nouveau montage.
- Les clés ne sont pas seulement pour les listes. Vous pouvez utiliser des clés pour faire la distinction React entre n'importe quel composant. Par défaut, React utilise l'ordre dans le parent (« premier compteur », « deuxième compteur ») pour discerner entre les composants. Mais les clés vous permettent de dire à React qu'il ne s'agit pas seulement d'un premier compteur, ou d'un deuxième compteur, mais d'un compteur spécifique - par exemple, le compteur de Taylor. De cette façon, React connaîtra le compteur de Taylor partout où il apparaît dans l'arbre.
  . En passant donc une clé au compteur parent, non seulement je dis à react que c' est le premier compteur ou le deuxième compteur comme dans le cas d'une liste, mais je dis aussi à react que c' est un compteur spécifique. Ainsi, react se souvient de son état même si je fais apparaître plusieurs compteur au même endroit dans l' arbre UI ie il sera toujours associé au compteur ayant une key, une mémoire spécifique même si on fait disparaître l' un et on fait apparaître l' autre au même endroit. 
    C' est la meilleure approche lorsqu' on veut réinitialisé l' état d' un composant.
    On peut l' utiliser dans des cas comme :
    . Une application qui permet à deux joueurs de suivre leurs scores à chaque tour:
    .  Une application de chat où on ne veut pas laisser l'utilisateur envoyer un message qu'il a déjà tapé à une mauvaise personne car on doit réinitiliser l' état une fois que le user1 a envoyé un message au user2.
- Pour garder l'état vivant pour des composants qui ne sont plus visibles :
  . Vous pouvez lever l'état et maintenir le message en attente pour chaque destinataire dans l'élément parent. De cette façon, lorsque les composants de l'enfant sont retirés, peu importe, car c'est le parent qui conserve les informations importantes. C'est la solution la plus courante.
  . Vous pouvez également utiliser une autre source en plus de l'état de React. Par exemple, vous voulez probablement qu'un projet de message persiste même si l'utilisateur ferme accidentellement la page. Pour mettre en œuvre cela, vous pourriez avoir le Chatinitialiser son état en lisant localStorage, et sauvez les projets là aussi.
  . Le key qu' on donne à un composant, aide react a identifié quel élement a changé, a été ajouté ou supprimé. Parfois, on peut se servir de l' index pour faire le key. Le key n' est pas transmis comme props, il est uniquement transmit a react.
  . Dans le cas où on supprime des éléments et on crée un autre, donc quand l' ordre change, l' index n'est pas adapté pour le key.
  . Mais on peut utiliser l' index lorsque l' ordre des éléments n' est pas modifié ou lorsque l'on a une liste statique et lorsque les éléments de la liste n'ont pas d' identifiant unique en tant que tel.
  . le key est censé représenter un composant entourant toute l' itération map.    


*/

// 1er cas
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  // la classe çi-dessus est surtout liée au style en CSS pour appliqué une couleur quand on hover ou pas. 

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}

// 2eme cas

import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.id} contact={to} />
    </div>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];


export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}



export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}

// 3e cas

function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        key={selectedId}
        initialData={selectedContact}
        onSave={handleSave}
      />
    </div>
  );
  }

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

import { useState } from 'react';

export default function EditContact({ initialData, onSave }) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  return (
    <section>
      <label>
        Name:{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: initialData.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        Save
      </button>
      <button onClick={() => {
        setName(initialData.name);
        setEmail(initialData.email);
      }}>
        Reset
      </button>
    </section>
  );
}

// 4e cas

import { useState } from 'react';
import Contact from './Contact.js';

export default function ContactList() {
  const [reverse, setReverse] = useState(false);

  const displayedContacts = [...contacts];
  if (reverse) {
    displayedContacts.reverse();
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          value={reverse}
          onChange={e => {
            setReverse(e.target.checked)
          }}
        />{' '}
        Show in reverse order
      </label>
      <ul>
        {displayedContacts.map((contact, i) =>
          <li key={i}>
            <Contact contact={contact} />
          </li>
        )}
      </ul>
    </>
  );
}

const contacts = [
  { id: 0, name: 'Alice', email: 'alice@mail.com' },
  { id: 1, name: 'Bob', email: 'bob@mail.com' },
  { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];

import { useState } from 'react';

export default function Contact({ contact }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p><b>{contact.name}</b></p>
      {expanded &&
        <p><i>{contact.email}</i></p>
      }
      <button onClick={() => {
        setExpanded(!expanded);
      }}>
        {expanded ? 'Hide' : 'Show'} email
      </button>
    </>
  );
}

// 5e cas

import { 
  src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const hasNext = index < images.length - 1;

  function handleClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  let image = images[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h3>
        Image {index + 1} of {images.length}
      </h3>
      <img key={image.src} src={image.src} />
      <p>
        {image.place}
      </p>
    </>
  );
}

let images = [{
  place: 'Penang, Malaysia',
  src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
  place: 'Lisbon, Portugal',
  src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
  place: 'Bilbao, Spain',
  src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
  place: 'Valparaíso, Chile',
  src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
  place: 'Schwyz, Switzerland',
  src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
  place: 'Prague, Czechia',
  src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
  place: 'Ljubljana, Slovenia',
  src: 'https://i.imgur.com/3aIiwfm.jpg'
}];






/* Les réducers en react

On utilise un réducteur lorsqu'on a plusieurs gestionnaires d' évènement qui modifie le même état en faisant appel à setTasks. 
Par exemple, lorsqu' on a plusieurs gestionnaires qui font appel à setTasks pour ajouter, supprimer et éditer l' état tasks.
    Pour réduire cette complexité et maintenir toute votre logique dans un endroit facile d'accès, vous pouvez déplacer cette logique d'état en une seule fonction en dehors de votre composant, appelée « réducteur ».

Ils jouent le même rôle que la fonction réducer() qui prend le résultat jusqu' à présent, le point en cours et retourne l' état suivant. En react, la fonction qui renvoie le prochain état est appelé réducteur. Elle prend l' état jusqu' à présent, l' action et renvoie l' état suivant.
. Le useReducerHook prend deux arguments :
    Une fonction réductrice
    Un état initial
Et il retourne :
    Une valeur d'État
    Une fonction d'expédition (pour «expédier» les actions de l'utilisateur vers le réducteur)
- const [tasks, setTasks] = useState(initialTasks);
- const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

- chatGPT

. La séquence d'événements se déroule comme suit :
    1 - Appel de la fonction dispatch : Lorsque vous appelez dispatch avec une action, cela déclenche une mise à jour de l'état et dispatch est appelé suite à l' interaction du user décrire par le addEventListener. Elle est introduite dans une fonction annonyme qui remplace le gestionnaire et renvoie l' action au réducteur. L' action c' est un objet qui décrit un changement qu' on souhaite apporté sur l' état.
    2 - Exécution du Réducteur : React appelle la fonction réducteur que vous avez passée à useReducer avec l'état actuel et l'action.
    La fonction réducteur prend l'état actuel (state) et l'action en cours (action) comme paramètres et renvoie le nouveau state.
    3 - Mise à Jour de l'État : Le résultat renvoyé par le réducteur devient le nouvel état. En gros, le return du réducteur est le set.
    4 - Rendu : React met à jour l'interface utilisateur pour refléter le nouvel état. C' est ici, que react déclenche le rendu, comme pour le useState. 
  .  Le fait que l'état actuel soit envoyé au réducteur et que le réducteur retourne le nouvel état estLe fait que l'état actuel soit envoyé au réducteur et que le réducteur retourne le nouvel état est géré par React lui-même. géré par React lui-même.


  . Il est important qu'un réducteur doit être une fonction pure ie ne calcul que l' état suivant. N' est pas censée afficher quelque chose, si l' on doit le faire, c' est dans le gestionnaire. 



*/

// 1er cas sur les reducers


import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];






