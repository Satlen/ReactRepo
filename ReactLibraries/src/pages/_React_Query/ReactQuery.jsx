

/*****react hook form
 * On importe le hook useform() qui retourne entre autres:
 ***register(): pour enregistrer la valeur des inputs et de gérer leur validations. Prend plusieurs args:
 D' abord on le passe au input avec le spread opérator pour passer automatiquement ses propriétés tellesque : name, ref.
 Prend comme arg, le nom du champ (string) qui est obligatoire et sert aussi de clé pour identifier le champ ensuite, un objet pouvant revoir plusieurs params: required(prend un string qui est affiché si le champ est vide), max, minlength(prend un objet avec 2 propriétés value et message), pattern(permettant de définir les expressions régulières pour la validation et prend 2 propriétés: value et message), peut aussi prendre une fonction de validation qui prend en arg la valeur du champ et retourne un objet avec isValid(booléan) et message(pour les erreurs)
 ***handleSubmit(): fonction lancée lorsqu' on soumet le formulaire. Lorsque l'utilisateur soumet le formulaire, handleSubmit va effectuer les validations (via register et les règles définies) et, si tout est valide, appelle la fonction onSubmit avec les données du formulaire (et lui attribue les données du form).
 Pas de risque de boucle infinie pour cette fonction donc on peut l' utiliser directement dans le gestionanaire. En effet elle n' est appelée que lorsqu' on soumet le form et si tout est valide, elle appelle onSubmit et lui envoie les données.
 ***watch(): pareil que le onChange
 ***formState: {errors} = retourne un objet sur l' état global du formulaire et dispose de plusieurs propriétés :
 - isdirty: bouléan qui dit si un champ a été modifié
 - dirtyField: le nom des champs modifiés
 - isSubmitting
 - isValid
 - errors: objet ayant pour clé, le nom de chaque champ  et reçoit au fur et à mesure, les erreurs liées à chaque champ.
 - submitCount: le nbre de soumission du form 
 ******reset: pour remettre à zéro les différents champs.
 **** On dispose d' une fonction de validation de form: const onSubmit = (data) => console.log(data)
 c' est une fonction de rappel qui est appelée lorsqu' on valide tous les champs et reçoit un objet data correspondant aux valeurs des différents champs avec pour clé, le nom attribué à chaque champ.
* 
* Il est important de savoir que pour la gestion des erreurs, on affiche qu' une erreur par champ en fonction de l' ordre défini pour les options du register.
 * 
 */

/*******librairie react hot toast
 *
 * Permet de fournir des systèmes de notification
 * On utilise le composant Toaster dans la racine de notre application le fichier main.jsx par Ex. Cela permet à ce qu' il soit accessible dans toute l' application, n' est pas gené par le rendu des composants enfants qui changent fréquemment et n' entrave pas la performance.
 * On utilise la fonction toast pour lui faire appel. Elle prend en arg: le message ensuite un objet d' options: duration (en ms), style (classique du CSS en JS), position, id(pour controler un toast spécifique)...
 * On distingue plusieurs toast: success, error, promise(loading),
 */

/******************************axios
  * 
  * Elle n' est pas si différente du fetch.
  * Quand on effectue une opération avec axios, elle renvoie une promesse qui est un objet res par Ex en cas de réussite et dans et error en cas d' échec.
  * L' objet res contient plusieurs propriétés:
  * - data: corps de la réponse du serveur
  * - status
  * - statusText
  * Ainsi, c'est par convention même si je m' attends à une propriété spécifique, elle va se situer dans la propriété data de res. 
  *         *****Alors qu' avec le fetch, on renvoie tout en cas de réussite dans l' objet res. Cet objet a des propriétés ok, status, statusText. Mais pour avoir le corps de la réponse, on utilise des méthodes telles que: .json() 
  * ********La différence avec axios et fetch réside dans la manière dont ils gèrent le corps de la réponse mais aussi des erreurs. Axios permet d' avoir directement accès au corps de la réponse en retournant une promesse alors qu' avec fetch, il faut une demande supplémentaire asynchrone après avoir convertit la res en json().
  * Avec axios, le format de la réponse est gérée automatiquement. Si le serveur renvoie du json, alors on nous renvoie un objet mais si c' est du string, alors on nous renvoie une chaine.
  * Et les erreurs aussi sont gérées automatiquement avec axios où on a pas besoin de vérifier d' abord le status de la réponse avant de déclencher une erreur manuellement qui sera capturée par le catch. Avec axios, en cas d' échec, on rejette directement la promesse qu' on capture dans le catch.
  * Ajouter des en tête et autres, dépend de l' API auquel on accède: headers: {
    'Content-Type': 'application/json',
    // Vous pouvez également ajouter d'autres en-têtes ici si nécessaire.
  },
  */

/***********localStorage
 *
 * Permet de stocker dans le navigateur des données sous forme de paire clé/valeur accessible même après la fermeture du navigateur.
 * Mais ces données doivent être des chaines de caractères raison pour laquelle pour stocker des objets JS, on utilise 2 méthodes:
 * JSON.stringify() pour convertir en JSON
 * JSON.parse pour revenir en objet JS.
 * Le localStorage dispose des méthodes tellesque:
 * setItem(clé, valeur)
 * getItem(clé)
 * removeItem(clé)
 * clear()
 *
 */

/*******react query
 *
 * Permet de gérer les requêtes qu'on lancent au serveur.
 * On importe useQueryClient qu' on  initialise et on passe dans toute l' application en utilisant QueryClientProvider qui encapsule tout la racine avec son attribut client. (const queryClient = new queryClient())
 * Par la suite, on importe useQueryClient et useQuery pour lancer notre requête.
 * const queryClient = useQueryClient() : C'est un hook de React Query qui permet d'accéder à l'instance de queryClient utilisée par votre application
 * On crée ensuite notre requête (query = useQuery()) qui prend en arg un objet ayant les propriétés suivantes:
 * - queryKey: le nom de la requête pour les identifier (un array)
 * -queryFn: la fonction qu' on va exécuter qui est une promesse. À la fin, on retourne la réponse.
 * - onError: fonction qu' on lance en cas d' erreur
 * query, c' est l' état de la requête. Il renvoie un objet avec plusieurs propriétés dont: data, isLoading, isError, error... On peut le destructurer directement.
 *
 *
 * mutation
 *
 * Lorsqu' il y a une nouvelle donnée qu' on veut ajouter, modifier ou supprimer au niveau du serveur.
 *
 * const mutation  = useMutation({
 * mutationFn: (newTodo) => axios.post("", newTodo)
 * onError:
 * onSuccess:
 * })
 *
 */



/***chatGPT
    * Initialisation du QueryClient : Tout commence par l'initialisation du QueryClient, qui est un objet central dans React Query. Le QueryClient gère le cache des données, les requêtes en cours, les mises à jour, et d'autres aspects liés à la gestion des données.

Configuration de QueryClientProvider : Le QueryClient est enveloppé autour de l'ensemble de votre application via le composant QueryClientProvider. Cela rend le QueryClient accessible à tous les composants de votre application qui utilisent React Query.

*Accès à QueryClient dans les composants : Une fois que vous avez fourni le QueryClient via le QueryClientProvider, vous pouvez utiliser le hook useQueryClient dans n'importe quel composant enfant pour accéder à l'instance de QueryClient.
    * 
    *     Utilisation de useQuery et useMutation dans les composants : Dans vos composants React, vous utilisez les hooks useQuery pour effectuer des requêtes asynchrones et useMutation pour effectuer des opérations de mutation (création, mise à jour, suppression). Ces hooks s'enregistrent auprès du QueryClient et interagissent avec lui pour gérer les données.

        useQuery pour les Requêtes : Lorsque vous utilisez useQuery, React Query vérifie d'abord si les données de la requête sont présentes et fraîches dans le cache. Si elles le sont, elles sont retournées immédiatement. Sinon, la fonction de requête est appelée pour récupérer les données depuis le serveur. Les données sont ensuite stockées dans le cache du QueryClient.

        useMutation pour les Mutations : Lorsque vous utilisez useMutation pour effectuer une mutation, React Query exécute la fonction de mutation, met à jour le cache, et informe les composants utilisant les données de cette mutation que les données ont été modifiées.

    Gestion du Cache : Le cache est un élément clé de React Query. Il permet de stocker les résultats des requêtes précédentes, évitant ainsi de refaire des requêtes au serveur pour des données identiques ou fraîches. Le cache est géré par le QueryClient et est mis à jour automatiquement lors des mutations ou lors de l'invalidation manuelle des requêtes.

    Optimisation des Requêtes : React Query optimise les requêtes en utilisant des stratégies telles que la fraîcheur des données, la réutilisation du cache, et le report des requêtes jusqu'à ce qu'elles soient nécessaires. Cela améliore les performances en évitant des requêtes inutiles, en fournissant des données rapidement depuis le cache, et en réduisant la charge sur le serveur.

    Outils de Développement : React Query offre des outils de développement, tels que ReactQueryDevtools, qui permettent d'inspecter et de déboguer les requêtes, les caches et les mutations directement depuis votre application.

En résumé, React Query simplifie la gestion des données asynchrones dans les applications React en fournissant un moyen puissant, déclaratif et optimisé pour effectuer des requêtes, gérer les caches, et mettre à jour les données en temps réel. Son architecture modulaire, associée à des concepts tels que le cache, la fraîcheur des données, et les mutations, contribue à offrir des performances et une expérience utilisateur optimales.
SS

    */

/** chatGPT: importance du hook  useQueryClient
 * 
 * 
 * L'accès à QueryClient dans les composants via le hook useQueryClient est une fonctionnalité puissante de React Query qui permet une interaction directe avec l'instance de QueryClient utilisée dans votre application React. Cela ouvre la porte à une variété d'actions liées à la gestion des requêtes et du cache. Voici comment cela fonctionne, étape par étape:
1. Création de l'Instance de QueryClient

Tout d'abord, vous créez une instance de QueryClient. Cette instance est responsable de la gestion de toutes vos requêtes, du cache, des synchronisations, etc.

javascript

import { QueryClient } from 'react-query';

const queryClient = new QueryClient();

2. Fournir QueryClient à l'Application

Pour utiliser cette instance de QueryClient dans votre application, vous devez l'encapsuler dans un QueryClientProvider et le fournir à votre arborescence de composants. Cela se fait généralement au plus haut niveau de votre application, par exemple dans le composant racine ou près de celui-ci.

javascript

import { QueryClientProvider } from 'react-query';

// Création de l'instance QueryClient plus haut

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Le reste de votre application }
      </QueryClientProvider>
      );
    }
    
    3. Utilisation de useQueryClient dans les Composants Enfants
    
    Une fois que QueryClient est fourni via QueryClientProvider, vous pouvez accéder à cette instance de QueryClient de n'importe où dans l'arborescence des composants enfant en utilisant le hook useQueryClient.
    
    javascript
    
    import { useQueryClient } from 'react-query';
    
    function MyComponent() {
      const queryClient = useQueryClient();
    
      // Vous pouvez maintenant utiliser queryClient pour accéder aux méthodes de gestion des requêtes et du cache
    }
    
    Utilisations de useQueryClient
    
    Avec useQueryClient, vous avez accès à plusieurs méthodes puissantes pour interagir avec le cache et les requêtes, telles que:
    
         - Récupération et mise à jour des données de cache : Vous pouvez récupérer, mettre à jour ou supprimer les données en cache pour une clé de requête spécifique.
    
    javascript
    
    queryClient.getQueryData('todos'); // Récupère les données en cache pour la clé 'todos'
    
        - Invalidation de requêtes : Vous pouvez invalider des requêtes spécifiques pour forcer leur rechargement lors de la prochaine interaction.
    
    javascript
    
    queryClient.invalidateQueries('todos');
    
        - Réglage de la fraîcheur des données : Modifiez la fraîcheur des données pour des requêtes spécifiques, permettant un contrôle fin sur le comportement du cache.
    
        - Gestion des mutations : Lancez des mutations et synchronisez les résultats avec le cache.
    
    L'utilisation de useQueryClient est essentielle pour les cas où vous devez interagir directement avec le système de requêtes et de cache de React Query, offrant un contrôle et une flexibilité accrus dans la gestion des données de votre application

    *Quant à la nécessité de le faire (queryClient = useQueryClient) dans chaque composant enfant, vous n'avez besoin d'accéder à l'instance de QueryClient via useQueryClient que dans les composants où vous avez réellement besoin d'interagir directement avec le client de requête, par exemple, pour invalider des requêtes, accéder directement au cache, etc. Si un composant enfant n'a pas besoin de ces capacités, il n'est pas nécessaire d'y accéder QueryClient avec useQueryClient.

    *Si plusieurs composants enfants ont besoin d'interagir avec QueryClient, chacun peut initialiser sa propre instance de QueryClient en utilisant le même nom ou un nom différent. Cela signifie que chaque composant peut avoir son propre contexte de gestion des requêtes et du cache, indépendamment des autres composants.
 */


    
/******Par rapport au queryKey
     * 
     * Le queryKey est généralement une liste de valeurs, où chaque valeur identifie un aspect de la requête.
     * Exemple de queryKey pour une requête de récupération des données des tâches (todos) d'un utilisateur spécifique :

      const queryKey = ['todos', { userId: 1 }];

      Dans cet exemple, la première valeur, 'todos', identifie la nature de la requête (récupération des tâches). La deuxième valeur, { userId: 1 }, identifie le paramètre spécifique de la requête, dans ce cas, l'ID de l'utilisateur.
     * 
     * 
      */

      // Cas d' utilisation dynamique du queryKey

      // Étape 1 : Préparation de l'API ou de la fonction de récupération des données

      const fetchTodos = async ({ queryKey }) => {
        // Récupérer les paramètres de filtrage depuis queryKey
        const [_key, { status, priority }] = queryKey;
        const response = await fetch(`https://example.com/api/todos?status=${status}&priority=${priority}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      };

      // Étape 2 : Utilisation de useQuery avec des clés dynamiques

      import React, { useState } from 'react';
import { useQuery } from 'react-query';

function Todos() {
  // États pour les filtres
  const [statusFilter, setStatusFilter] = useState('completed');
  const [priorityFilter, setPriorityFilter] = useState('high');

  // Clé dynamique basée sur les états de filtre
  const todosQueryKey = ['todos', { status: statusFilter, priority: priorityFilter }];

  // Utilisation de useQuery avec une clé dynamique
  const { data: todos, isLoading, error } = useQuery(todosQueryKey, fetchTodos);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h2>Todos</h2>
      {/* Mettez ici votre code pour afficher les todos */}
      {todos && todos.map(todo => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
}


// Étape 3 : Gérer les changements de filtre

// Exemple de changement de filtre
<select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
  <option value="all">All</option>
  <option value="completed">Completed</option>
  <option value="pending">Pending</option>
</select>

<select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
  <option value="all">All</option>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</select>
/**
 * Chaque fois que les états statusFilter ou priorityFilter changent, la clé de requête passée à useQuery change également, ce qui déclenche une nouvelle requête avec les filtres mis à jour.
 */

/**
 * useQuery est conçu pour simplifier la récupération et la gestion des données dans les applications React, en lançant automatiquement des requêtes au montage du composant et à chaque fois que le queryKey change, garantissant ainsi que les données affichées sont à jour et pertinentes.
 * 
 * De ce fait, il est important de noter que:
 * - Chaque fois qu' un composant se rerend, cela ne signifie pas nécessairement que react query va relancer une requête. Si le queryKey reste le même entre les rendus, react query utilisent les données misent en cache si elles sont disponibles et fraiches au lieu de relancer la requête.
 * - Chaque fois que le queryKey change, react query lance à nouveau la requête car il considère qu' il s' agit d' une demande (requête) de données différentes.
 */



/******
 * 
 * D' abord, le QueryClient est une classe qu' on instancie. C' est le moteur de react query permettant de gérer les requêtes, le système de cache, la synchronisation des données avec le système de cache mais aussi, certains paramètres comme le staleTime(temps de pérention des requêtes qui est par défaut à 0, le temps au bout duquel une requête est considérée comme non fraiche.)...
 * Ensuite, on encadre toute l' application du provider et on utilise l' attribut client qui fournit cette instance à tous les composants enfants de l' application.
 * 
 * Maintenant dans le composant enfants, on utilise 2 hooks principalement:
 * 
 * 
 * - useQuery()
 * C'est un hook qui permet de lancer des requêtes (demande) auprès du serveur pour recevoir des données. Il se connecte de base auprès du queryClient qui gère toutes les requêtes lancées par cette dernière.  
 * 
 * Il prend 2 args principaux: 
 * . le queryKey: qui est une liste de n' importe quel type, jouant un rôle capital dans l' identification et la mise en cache des données de requêtes.
 * . le queryFn: fonction asynchrone (promesse qu' il faut retourner) lancée par react query elle même permettant de faire la requête: la récupération des données auprès du serveur. Cette fonction peut recevoir en arg, un objet avec une propriété: queryKey qui est un array utilisé par le queryFn pour effectuer des requêtes dynamiques. Cette une fonction qui est lancée dans 2 conditions: dès que le composant l' utilisant est monté, et dès que le queryKey change react query considérant qu' un changement du key est une nouvelle demande de récupération de données.
 * 
 * Il retourne un objet ayant plusieurs propriétés dont : isLoading, isError, data (comportant que le corps de la réponse du serveur).
 * Une fois une donnée récupérée, cette donnée est mise en cache automatiquement de façon spécifique à l' aide du queryKey. Ainsi, lors d' une prochaine demande de données ayant la même clé (queryKey), react query renvoie les données misent en cache si elle sont présentes et fraiches sinon, elle renvoie la requête depuis le serveur et remet les données retournées en cache.
 * N' importe quel composant enfant, peut avoir accès au même données tant qu' il spécifie une demande avec la même clé. Mais tant que les données sont présentes et fraiches pour une même clé, c'est les données en cache qui sont renvoyées.
 * 
 * 
 * - useMutation()  
 */



/**********Code evolution
 * 
 ************************************** useQuery()

 * 
 * Il retourne aussi : $isError: boolean, en cas d' erreur, $error: idem que le catch qui est un objet ayant la propriété "message".
 * En effet on aurait pu dire: const query = useQuery()
 * query: serait un objet avec pluqieurs propriétés: error, isError, data ... raison de la destructuration
 * Si j' utilise axios que le getRequest et je ne retourne que le get et rien d' autres, on me renvoie dans data du useQuery, l' objet retourné par axios ayant plusieurs propriétés dont data qui contient le corps de la réponse du serveur. Mais si je vais loin et je retourne response.data alors dans le data du useQuery(), on me retourne directement le data de axios. 
 * 
 *
 * On importe ReactQueryDevtools de react-query/devtools ensuite on le place avant la fermeture du QueryClientProvider et on lui passe des props: initialIsOpen = {false} (pour que ça soit pas ouvert par défaut) puis position = 'bottom-right' par Ex.
 * 
 * ****************** le système de cache avec le useQuery()
 * La première fois qu' une requête est déclenchée (fetch) pour une clé, $isLoading revient true et une requête est envoyée au serveur en arrière plan (refetch) pour récupérer les données donc $isFetching revient true aussi. Une fois les données récupérées, elles sont misent en cache.
 * Lors d' une prochaine récupération des données pour une même clé, isLoading revient false mais une requête est toujours envoyée (refetch) en arrière plan pour récupérer les données car les données du serveur pourrait changer. La comparaison est faite avec les données en cache et si c' est les mêmes, isFetching revient false (soit donc que la récupération n' a pas marchée) mais si différence alors isFetching revient true (soit donc que la récupération a marchée)
 * $isLoading est true lors d' un premier déclenchement d' une requête pour une clé. Ainsi, isLoading n' est true que lorsque le cache n' existe pas pour une clé.
 * $isFetching par contre, elle est toujours true à chaque fois qu' une requête est déclenchée et que le cache soit soit stale ou non. Mais il est important de savoir que lorsque les données sont fraiches, et une requête est envoyée en fonction des paramètres de refetch, isFetching devient d' abord true et presque automatiquement, elle revient false lorsque le cache existe et est fraiche. Raison pour laquelle isFetching revient false lorsque le cache est fraiche.  
 * 
 * ****************** les config du useQuery()
 * 
 *****cacheTime: Par défaut, il est à 5 min pour une même requête après quoi le cache devient périmé soit stale.

 *****inactive: c'est une propriété qui permet de savoir si on est sur la même page que les données misent en cache.

 ****************** staleTime: permet d' utiliser directement les données misent en cache sans un refetch en arrière plan. Pendant ce temps, les données en cache sont fresh (soit elles sont à jour). Après le temps prévu, le cache devient stale (soit périmé ou usé).
 *Par défaut, il est à 0 raison pour laquelle chaque visite sur la page déclenche un refetch en arrière plan. Ainsi, les données par défaut sont toujours stale. 
 * Ainsi, avec le staleTime et le cacheTime, on peut réduire le nombre de requête pour une clé.
 * Ces paramètres sont modifiés avec comme étant un objet transmis en 3 arg au useQuery.
 * 
 ****************** refetch
 * On a 2 configurations par rapport au refetch qui prennent toutes trois valeurs: true, false et 'always'. Mais elles sont toutes à true par défaut.
 * refetchOnMount: lorsque false, une fois le composant monté, il n' y a plus de refetch
 * refetchOnWindowFocus: true par défaut, elle peut entrainer une mise à jour automatique du UI mais asynchrone puisque c'est pas synchrone avec le serveur et on fait la remarque sur le UI de la mise à jour
 * 
 * ************** Polling
 * Permet de faire un refetch a un interval régulier et la mise à jour de l' UI est synchrone avec le serveur, en plus elle ne nécessite pas une interraction du user.
 * Par défaut, elles sont à false. Il s' agit de :
 * refetchInterval: 2000 par Ex en ms.
 * refetchIntervalInBackground: true, permet de faire un refetch même sans le focus du windows. Elle est utile lorsqu' on a des données qui changent à tout moment.
 * 
 * *************** useQuery on click
 * Le but ici, est de déclencher le useQuery() quand on clique sur un boutton.
 * Pour ce faire, on a 2 étapes: 
 * - enable: false, permet de désactiver le fetching onMount de base par défaut.
 * - On récupère du useQuery(), la fonction $refetch qu' on passe au gestionnaire. Elle permet de déclencher manuellement le get request du useQuery().
 * Il est important de rappeler que lors de la première requête du useQuery(), isLoading est à true, mais compte tenu du cacheTime (5 min), elle est à false pour les prochaines tentatives. Le isFetching pendant ce temps, compte tenu du staleTime (0s) est toujours à true pour les prochaines tentatives dont il pourrait être judicieux de d' utiliser le connecteur $ou (isLoading || isFetching) pour afficher le spinner. De ce fait, le spinner sera toujours afficher à chaque clique.
 * 
 * ******************* success and error callbacks
 * On peut définir des fonctions qui seront appelées en cas de succès ou d' erreur d' une requête.  
 * Ce sont: onSuccess et onError qu' on passe toujours en 3 ème arg dans un objet au useQuery(). Ces deux propriétés prennent des fonctions qui sont appelées en fonction de la réponse du serveur. Elles peuvent prendre des arguments data pour onSuccess et error pour onError qui leur sont injectées automatiquement par useQuery() lors de l' appel.
 * Ces deux propriétés sont en fait des arguments nommés donc si les fonctions qu' elles reçoivent sont atteignables et sont du même nom, pas besoin de les spécifier. Elle ira les chercher elle même. Sinon, je dois les spécifier moi même comme par Ex: onSuccess: successFn
 * 
 * 
 * ******************** data transformation
 * D' abord, le data, c' est ce que retourne le get request. Donc si je m' arrête sur le get sans le then avec axios par Ex, le data sera un objet retourné par le axios ayant des propriétés dont le data(corps de la réponse). Donc le data dépend de ce que je retourne dans le queryFn. Comme reactQuery gère automatiquement les erreurs, j' ai pas besoin de spécifier le catch.
 * Maintenant revenons à nos moutons. Avec la propriété $select, on peut transformer le data renvoyé par le useQuery(). Cette propriété reçoit une fonction à qui react Query injecte automatiquement le data. Cette dernière a la possibilité de transformer le data. De ce fait, prochainement à l' appel du data, c' est ce que retourne le select qui est renvoyé.  
 * {
 * select: (data) => data.data.map( obj => {
 *  const name = obj.name
 *  return name
 * } )
 * }
 * 
 * 
 * ****************** custom query hook
 * 
 * Pour le faire, on crée un dossier dans lequel on met un fichier dont le nom a rapport avec la donnée qu' on veut récupérer et à la fin, on ajoute data comme c' est des données.
 * Ainsi, on met le useQuery() à l' intérieur qu' on retourne. Si ce hook dispose des paramètres tels que onSuccess et onError, on les lui passe comme arg vu que c' est pas des choses qu' on réutiliser. D' ailleurs même, au lieu de passer plusieurs arg, on peut juste passer comme arg, un objet dont les propriétés sont les définitions sont des fonctions onSuccess et onError.
 * 
 * 
 * *******************  query by id
 * - On passe le id au custom hook, ensuite on l' utilise comme une partie du queryKey. 
 * - On accède au queryKey dans le fetcherFn qu' on passe à l' api.
 * Il est important de rappeler que react query passe automatiquement le queryKey au fetcherFn dans un objet donc on fait la destructuration et on accède au queryKey. 
 * 
 * 
 * ******************* parallele query
 * Il s' agit de faire plusieurs requête à la fois pour un même composant.
 * C' est aussi simple que d' utiliser plusieurs useQuery()
 * Par convention, je le fais dans un composant à part ayant pour nom le data qu' on veut récupérer. Le fetcher fonction aussi, pareil: fetchdata... dans laquelle, je ne mets que le get mais ou je pars jusqu' au then mais je m' assure de retourner le data.
 * Comme c' est plusieurs data, alors je leur donne des alias comme data: heroes par Ex.
 * 
 * 
 * ****************** dynamic parallele query
 *
 * On peut l' utiliser pour afficher des details lorsqu' on clique sur une route par Ex.
 * Pour ce faire, on peut passer comme props au composant qui représente la route qui va afficher les details un array [1, 3]
 * Ce dernier récupère le props en le destructurant puis ensuite fais appel à un hook : useQueries qui prend le array et le map lui permettant de retourner dans le map un objet: {
 * queryKey: ['heroes', id (venant du map)],
 * queryFn: () => fetherFn(id),
 * } 
 * et le passe au fetcherFn qui l' utilise dans l' api  
 * 
 * 
 * 
 * ******************* dependant query
 * 
 * Le but ici, c' est d' avoir 2 requêtes dont la 2nde ne peut pas passer sans que la 1ère ne retourne son résultat.
 * Pour ce exemple, on va prendre deux tables:
 * "user": {
 * "email": "dfdsfqsfq",
 * "channelId": "success"
 * },
 * "courses": {
 * "id": "success",
 * "courses": ["react", "angular", "vue"]
 * }
 * Donc de ce fait, on aura accès au cours uniquement lorsque le user sera correcte.
 * j' utilise le useQuery() comme d' hab pour l' email qui est reçu comme props et passé en 2nd arg de la liste pour le key et utiliser dans l' api et je reçois le channelId dans une const mais j' utilise l' opérateur optionnelle puisque le résultat prend du temps à arriver et aussi, pourrait ne pas être disponible. const channelId = user?.data.channelId
 * le second useQuery(), va récupérer les cours et ceux en fonction du channelId comme key et faisant partie de l' api. Tout en n' oubliant pas que le channelId du email correspond à l' id du courses. Pour cela, on utilise la config pour ce useQuery(): enabled: !!channelId (la double négation convertie la valeur en booléan comme le désire le enabled)
 * Ainsi, lorsque le composant est monté, la requête sera dispo mais désactiver jusqu' à ce que le channelId soit disponible. 
 * Donc on récupère chaque data d' abord en fonction de l' email puis du channelId (l' id de l' objet courses)
 * 
 * 
 * ********************** initial query data
 * 
 * permet de fournir à un composant, des données par défaut ou des données en cache ou dans le local Storage qui sont initialisées automatiquement que le composant est monté sans le isLoading. Améliore l' expérience utilisateur et permet à l' utilisareur d' avoir directement accès aux données sans besoin de chargement. Dès que le composant est monté, la fonction $initialData est exécutée et fournie les données. Pendant ce temps, la requête est lancée en arrière plan et confrontée aux caches lorsque résolue pour savoir s' il faut mettre à jour le UI ou pas. Peut être utilisée pour afficher les details d' un composant ayant besoin des don posts.map(post=>)nées venant d' un même key après que le composant parent ait déjà chargé les données qui sont présentes dans le cache. 
 * Dans la fonction initialData, on peut utiliser les données en cache d' une requête après avoir instancier le QueryClient avec le hook useQueryClient(): 
 * initialData: () => {
 * const data = queryClient.getQueryData(key)
 * const hero = data?.data?.find( hero => {
 * hero.id === heroId // heroId, est renvoyé par le composant chez qui on veut utiliser le custom hook lorsqu' on veut accéder aux données ici avec le useParams
 * })
 *  if (hero) {
 * return { data: hero} // on retourne ici hero dans un objet, pour que ça correspond au format des données renvoyées par le custom hook sinon, on peut retourner directement hero.
 * } else {
 * return undefined // ceçi est IP puisque lorsque hero ne serait pas disponible la requête puisse durer et renvoyer runtime error.
 * }
 * }
 *  posts.map(post=>)
 * 
 * ********************  paginate query
 * 
 * Ici, on a deux boutons qui gère le prev et le next en utilisant une variable d' état pour le nombre de page et on utilise disabled selon qu' il s' agit de la première page pour prev et la dernière pour next mais on peut aussi utiliser ispreviousdata pour le disabled pour eviter qu' on parte sur une nouvelle page pendant qu' une est en cour de chargement. La variable d' état est utiliser comme key et passer à l' api pour l' option page.
 * On passe comme 3arg, l' option $keepPreviousData: true
 * En effet, sans cette dernière, chaque requête est considérée directement comme une nouvelle requête faisant mettre isLoading à true à chaque fois. Ainsi, pour une meilleure expérience utilisateur, keepPreviousData permet que lorsque la nouvelle requête est lancée de garder les données précédentes en cache et que ça reste toujours afficher à l' UI ce qui met isLoading à false. Ainsi, c' est lorsque la nouvelle requête est complétée que la dernière cache est supprimée et remplacée dans l' UI par la nouvelle.
 * 
 * 
 * ********************* infinite query data
 * 
 * permet de charger des données supplémentaires à la demande ou au scroll vers le bas.
 * On utilise le hook useInfiniteQuery. Le fetcherFn, reçoit en arg de la part de react query un objet (props) qui contient querykey, signal, $pageParam: le numéro de page à charger qu' on peut initialiser à 1 par défaut où attribuer à useInfiniteQuery l' option: initialPageParam : 1. On passe pageParam à l' api.
 * Le data retourné par useInfiniteQuery est différent. Elle ne contient pas directement le get response mais est lui même un objet avec des propriétés pageParams [] et pages: qui contient maintenant le corps de la réponse du serveur. 
 * On utilise une 3ème option: getNextPageParam: C 'est une fonction qui reçoit 2 args (lastPage, pages):  
 * - lastPage : les données de la dernière page chargées (idem que la propriété pages de data retourné par useInfiniteQuery soit donc le corps de la réponse du serveur)
 * - pages = allPages: un tableau de tous les lastPages donc on peut utiliser allPages.length et l' incrémenter pour avoir la page suivante. 
 * En effet, lastPage: response api ( dépend de ce qui est retourné par l' api data ou .data) et pages: array of each response api ( dépend aussi, de ce qui est retourné par lastPages. De ce fait, selon le cas on aurait besoin de creuser pour avoir le corps de la réponse du serveur)
 * Elle dit à reactQuery comment obtenir la prochaine page de donnée et retourne undefined s' il n' y en a pas.
 * En gros, elle retourne l' incrémentation de pageParam.
 * useInfiniteQuery retourne:
 * - hasNextPage: bouléan en fonction de si getNextPageParam retourne undefined (false) ou number (true).
 * {
 * const nextPage = lastPage.length ? allPages.length + 1 : undefined
 * return nextPage
 * }
 * - isFetchingNextPage: pour dire si un chargement de données suivante est en cours. Les 2 (!hasNextPage || isFetchingNextPage) peuvent être utiliser pour désactiver le button de chargement
 * {
 * isFetchingNextPage ? "loading more ..." : hasNextPage ? "load more" : 'Nothing more to load'
 * } sans oublier disabled = {!hasNextPage}
 * - fetchNextPage: fonction utiliser dans un gestionnaire pour charger les données suivantes.  
 *  
 * 
 * 
 * 
 * ********************** useMutation
 * Permet de metre à jour, d' ajouter des données dans le serveur...
 * On peut créer un hook personnalisé, qui retourne useMutation qui prend en 1er arg le mutationFn. 
 * Le mutationFn contient le post request qui avec axios, prend en arg l' url puis la donnée à passer. Cette donnée peut être reçue dynamiquement en la passant comme paramètre au mutationFn.
 * Le hook useMutation retourne entre autre: isLoading, error, isError, mutate(): fn permettant d' appeler le mutationFn pour faire le post request  et peut prendre des arg qui sont directement passés au mutationFn.       
 * mutate() est souvent appelée dans le gestionnaire pour faire des posts dynamiques.
 * 
 * 
 * 
 * *************************Pose par rapport à certaines préoccupations générales que j' ai rencontrées
 * 1 - Le plus souvent, on ne veut pas surcharger une fonction, un objet, même le return d' un composant. De ce fait, on définit dans l' espace global de ce composant ces # données qu' on passe à l' élément qui en a besoin. Dans le cas des fonctions, on a pas besoin de passer un élément comme paramètre à une fonction avant de l' utiliser tant que l' élément est accessible à la fonction. De base, on ne passe des paramètres que lorsque la fonction a besoin d' une donnée spécifique, modulable. Le reste, c' est juste pour des raisons de surchage.
 * 2 - Par rapport aux objets, on peut leur passer n' importe quoi sans avoir besoin d' être explicite, par Ex { name, maFunction }. JS, en interprétant va utiliser ces noms comme nom de propriété et leurs associer leur valeur. 
 * 
 * 
 * 
 * ***************************Query invalidation
 * Çi haut, on a fait la mutation mais on a du faire un refetch manuellement pour que les données soient à jour. Car sans le refetch, les données sont uniquement à jour dans le serveur mais pas dans le catch et le refetch permettra d' aller chercher les nouvelles données du serveur. On peut refetch automatiquement une requête lorsque les données du serveur changent pour mettre à jour l' UI pour les requêtes utilisant ces données qui ont changé dans le serveur. C' est là qu' entre en jeu le Query invalidation. Dans le hook personnalisé, on crée une instance du useQueryClient() et dans le useMutation retourné, on définit le success callback avec la propriété onSuccess où on invalide le key correspondant aux données mutées (queryClient.invalidateQueries('')). En invalidant une requête, React Query fait le refetch de toutes les requêtes ayant le key en question et cette fonction onSuccess est appelée dès que les données sont mutées. 
 * 
 * 
 * ****************************Handling mutation response
 * En effet, en invalidant une requête, on gaspille un appel de requête d' autant plus que lorsqu' on fait un post request, il est envoyé comme propriété response à la requête faite les données ajoutées dans le serveur (avec l' id du donnée). On peut le voir en affichant dans la console response = axios.post par Ex.
 * Cette donnée est injectée dans la propriété onSuccess qu' on peut utiliser sous le nom de data ici.
 * D' abord, on appel sur l' instance la méthode setQueryData(). Elle prend en 1er arg, le queryKey et en second arg une fonction qui reçoit automatiquement le $oldQueryData en arg qui fait allusion aux données actuellement présentes dans le queryCache.
 * De long en large dans ce cours, c' est le genre de requête où on retourne juste le get request donc ce qui est renvoyé dans le data reçu n' est pas directement le corps de la réponse mais plutôt un objet ayant plusieurs props status, statusText et data qui contient maintenant le corps de la réponse. Donc le corps de la réponse, pour y accéder, on fait data.data et comme ici, oldQueryData représente les données en cache qui proviennent du get request récent, avec oldQueryData, on a accès au corps de la réponse. De même, avec le post request, ce qu' on injecte à onSuccess est typiquement la réponse du serveur en fonction de ce qu' on retourne. Donc si on retourne juste le post, on va recevoir dans un objet (à nous de lui donner un nom lors de la réception) 
 * ayant plusieurs props dont data qui est la donnée ajoutée au serveur. Ainsi, .data permet d' accéder au corps de la réponse. Il en ait de même pour le post request. A chaque fois react query retourne le résultat dans un objet ayant la propriété data qui à son tour, contient le return du mutationFn ou queryFn.
 *Ici, donc, en 2 args du setQueryData après le queryKey, une fonction qui reçoit oldQueryData.On return à la fin, un objet où on spread oldQueryData, et on passe sur la propriété data et on lui assigne les anciennes données de oldQueryData et complète les nouvelles. On procède ainsi, lorsqu' on retourne directement le post request et le get request :
 En gros, on retourne un résultat du format de ce que le get response retourne en mettant à jour le ces données directment dans le cache.
 return {
  ...oldQueryData,
  data: [...oldQueryData.data, data.]
 } 
 *

 * C 'est bon d' utiliser l' opérateur optionnel pour des données qui ne sont pas directement accessible mais prendrais du temps surtout avec l' api. 
 *
 * 
 *
 * ***************************optimistic mutation
 * Le but est de supposer qu'une mutation se déroulerait bien et donc de directement mettre à jour le cache par par les nouvelles données qu' on souhaitent ajouter au serveur. De ce fait, la mutation elle même va se dérouler en arrière plan et lorsqu' elle réussit, il n' y aura plus rien à faire puisque les données auront déjà été mises à jour. Mais en cas d' erreur, on retourne à l' ancien état.
 *****On passe par différentes étapes pour y arriver:
 * D' abord, on utilise les options onMutate, onSettled et onError le plus souvent.
 * À onMutate, on passe la nouvelle donnée qu' on est censée ajouter à la base de donnée soit donc celle qu' on passe naturellement à la fonction mutationFn.
 * On la définit comme asynchrone puisque d' abord, on annule tout potentiel refetch sur cette clé avec await cancelQueries(key) pour ne pas qu' il y ait une modification de donnée inattendue. Après, on récupère l' état actuel du cache avec previousData = getQueryData(key) qu' on va rencoyer en cas d' erreur.
 * On fait maintenant la mutation en mettant à jour le cache avec setQueryData(key, callback). Ce callback peut récupérer l' état actuel du cache et permettra de calculer l' état suivant à partir. Mais on peut toujours utiliser le previousData.  À la fin, on retourne previousData dans un objet qui est reçu dans le context de onError.
 * La fonction onMutate() est appelée directement dès que la requête est lancée.
 * Avec onError, on récupère trois args: error, variables(la nouvelle donnée qu' on passe à onMutate ou au mutationFn) mais aussi le context qui est l' objet qu' on retourne dans onMutate. On utilise ici surtout, le context pour avec setQueryData pour faire un roll back et donc retourner à l' état précédent.
 * Dans onSettled, on invalide la requête qu' il y ait réussite ou pas. De cette manière, peut importe le résultat, les données sont toujours à jour soit l' ancien état soit le nouvel.
 * 
 * 
 * **************************axios interceptor
 * Permet d' étabblir des paramètres par défaut qui nous permettront de faire facilement les requêtes axios sans pour autant spécifier certains paramètres.
 * 
 * const api = axios.create({baseUrl: ''})
 * Je créé une instance de axios.
 * export const request ({...options}) => {
 * axios.defaults.headers.common.Authorization = 'Bearer Token' (au cas où pour accéder aux données, on aurait besoin d' un token d' autenfication qu' on y accède souvent depuis le loxal storage pr les prochaines requêtes)
 * 
 * onSuccess (fn) et onError (fn) : au choix pour gérer le then et le catch après la réponse du serveur mais on peut le gérer aussi depuis le useQuery
 * A la fin de la fonction, on retourne api(options).then(onSuccess).catch(onError)
 * }
 * On utilise ainsi request dans le fetcherFn et mutationFn en en lui passant les options:
 * request({url: ''}) pour get request;
 * request({url:'', method: 'post', data: hero}) pour post request
 *  
 */












 /***************************************** Json Serveur
  * 
  * C' est un fake rest API qui permet au front-end de travailler avec le serveur.
  * Les données sont dans le format json et comporte des clés qui chacun sont un tableau de plusieurs objets. Chaque objet dans le array dispose d' un id unique. Ainsi, à partir d' une clé, je peux directement accéder à un objet du tableau juste en spécifiant l' id de l' objet. Comme par Ex: localhost:3000/products/2 dans l' url, avec products, étant une clé dans le fichier db.json et comportant un tableau de plusieurs objets.
  * De ce fait, avec la syntaxe çi-dessus, j' accède au product ayant l' id 2.
  * Tout en ayant à l' esprit que ce sont des chaines de caractère lors de l' écriture.
  * 
  * ***************** filtering
  * 1 -  products?category=electronics
  * 2 - products?category=electronics&discount.type=shipping
  * 
  * ***************** sorting
  * D' abord trier en fonction du prix par ordre croissant
  * - products?_sort=price : par défaut, le order est asc (ascendant)
  * Maintenant, on veut trier en fonction du prix et de la catégorie de sorte que les prix soient descendant et la catégorie ascendante.
  * - products?_sort=price,catégory&_order=desc,asc
  * 
  * 
  * **************** pagination
  * la limite par défaut est de 10 éléments.
  * Mais on peut la spécifier soit même et cela s' applique à toutes toutes les pages la limite. 
  * products?_limit=3&_page=1, de ce fait, il sera afficher 3 éléments par page.
  * 
  * 
  * **************** operators
  * On distingue: 
  * - _gte = greater than: products?price_gte=2000
  * - _lte = less than: products?price_lte=5000
  * - _ne = not equal: products?id_ne=2; on m' envoie toutes les données sauf celles d' id = 2
  * - _like = ^f: products?category_like=^b ; c' est un regex et permet de prendre toutes les données qui commence par la valeur spécifier ici, par b.
  * 
  * 
  * **************** full text search
  * permet de faire des recherches directes sur sur toutes les valeurs d' une clé.
  * - products?q=nics : ici, on m' enverra tous les product ayant nics comme valeur indépendemment du nom de la propriété de l' objet.
  * 
  * 
  * *************** relashionships
  * Le but ici, est de récupérer des données parent ou enfant dans une table ou une clé lors d' un get request.
  * Ces données apparaissent comme des propriétés dans la table en question. Mais une table ne peut avoir qu' un seul parent et autant d' enfant possible. 
  * Pour avoir les enfants, on utilise le keyword embed: products?_embed=reviews
  * En ce qui concerne le parent, c' est expand : reviews?_expand=product (comme c' est un seul parent, faire gaf à ce que ce soit singulier)
  * 
  * ************** json config
  * - spécify the port: "serve-json": "json-server --watch db.json --port 4000" au niveau du package.json la partie script.
  * - specify the routes: on crée un fichier routes.json comportant : "api/v1/*": "$1"
  * ensuite dans le package.json, on ajoute au serve-json: --routes routes.json
  *  
  * *************** generate random data
  * je crée un fichier data.js dans laquelle :
  * je crée une fonction: module.export = () => {
  * const data = { products: [] }
  * 
  * for (let i = 0; i < 10; i++){
  *   data.products.push({
  * id : i,
  * title: `product${i}`
  * })
  * }
  *   return data
  * }
  * 
  * Enfin, au lieu de --watch db.json ce sera plutôt -w data.js
  * Comme j' ai déjà tout spécifier dans le package.json alors je peux directement utiliser la commande npx ... pour accéder au serveur.
  * 
  */

 {

  "products": [
    {
      "id": 1,
      "title": "product 1",
      "category": "electronics",
      "price":5000,
      "description": "This is a description about product 1"
    },
    {
      "id": 2,
      "title": "product 2",
      "category": "books",
      "price": 4000,
      "description": "This is a description about product 2"
    },
    {
      "id": 5,
      "title": "product 5",
      "category": "elctronics",
      "price": 5000,
      "description": "This is a description about product 5",
      "discount": {
        "type": "shipping"
      }
    },
    reviews: [
      {
        "id": 1,
        "rating": 4,
        "comment": "Review 1 for product 1",
        "productId": 1
      }
    ]
  ]
 }