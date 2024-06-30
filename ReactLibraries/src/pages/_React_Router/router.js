/**
 * Le Routage V6
 *
 * On installe la bibliothèque react-rooter-dom
 * Un root, c' est un chemin d' accès.
 * D' abord, on importe la fonction createBrowserRooter de react-rooter-dom qui permet de créer le root qu'on passe dans tous les composants par la fonction RooterProvider pour qu' ils puissent tous y avoir accès.
 * Tout ceçi se fait dans le fichier main.jsx mais on peut aussi retourner le RouterProvider dans App.jsx.
 * createBrowserRooter prend en param, un tableau de chemin d' accès qu' on met dans un objet. Cet objet contient plusieurs propriétés:
 * - path: le chemin
 * - element: ce qu' on veut rendre (jsx ou composant)
 *  On utilise le composant RouterProvider à qui on passe en attribut router, la route qu' on a crée permettant de passer notre root à toute l' application.
 *
 * Pour se déplacer dans le root, on utilise le composant Link avec son attribut 'to' qui permet de spécifier là où on veut aller. On peut ainsi, aller d' une page à une autre.
 */

/*****Routage superposé ou nested root
 * Dans une route, lorsqu' on a un paramètre à mettre dans l' url, on met : ensuite le nom du paramètre. On précise par la suite l' élément à rendre.
 * Ainsi, on peut accéder à ce paramètre en s' aidant du hook useParams() qui retourne un objet (qu' on peut toujours destructurer) contenant les # paramètres.
 * De ce fait, je peux créer un url auquel on peut accéder directement sans paramètre.
 * De la même manière, on peut accéder au même url avec des paramètres mais qui vont diriger vers une autre page.
 *
 */

/*******Routes imbriqués
 *
 * On peut créer une route ayant des enfants. Pour cela, on utilise la propriété "children" qui reçoit un tableau permettant de définir de nouvelles routes représentant les enfants.
 * Ainsi, on peut créer un système de navigation dans le parent permettant d' accéder aux différents enfants.
 * Mais le parent ne sait pas de base, où afficher les enfants routes. On utilise donc dans le composant parent, le composant Outlet permettant au parent de savoir où afficher les enfants routes dont il dispose.
 *  Pour demander au parent d' afficher les enfants, on utilise le composant "Outlet". On peut encadrer ces enfants dans un container. ils vont ainsi s' afficher en dessous du container. Lorsqu' on utilise pas le composant Outlet, il n' est affiché que le composant racine.
 * Le but des composants imbriqués, est d' afficher les enfants à l' intérieur des parents.
 * Les enfants peuvent rediriger vers d' autres url (comme pour la navigation) ou vers le même url ('') ou même url avec paramètre. On utilise des Link dans le parent pour pouvoir accéder à ces enfants. Le Outlet est donc appliqué en dessous des Link, s' il y en a.
 */

/**********************index route
 * On l'utilise lorsqu' on a une route imbriquée et on veut spécifier la route par défaut. Pour ce faire, on crée une nouvelle route imbriquée au même endroit que les routes imbriquées dont il s' agit mais on met juste index comme prop au lieu de préciser le path. En gros, si 2 routes imbriquées de base, je précise une 3 ème identique à celle que je veux que ça soit par défaut mais je remplace par le path = '', par index.
 *
 */

// NavLink
/**
 * On utilise le composant Link lorsqu' on veut aller d' une route à une autre mais on utilise NavLink pour les navbar par Ex. En affet on s' en sert lorsqu'on veut faire une différence entre la route sur laquelle on est. En utilisant cet composant, lorsqu' on clique sur une route, cette dernière reçoit la classe active qu' on peut styliser soit en CSS (a.active{
 * bg: red,
 * fw:bold, ...
 * })
 *  soit en JS en passant au classe style une fonction qui reçoit un objet contenant la propriété isActive. style = {{({isActive}) => {fw: isActive ? 'bold' : 'normal'}}}
 *
 */

/******Gestion des erreurs
 * On dispose aussi de la propriété errorElement qu' on applique à l' élément racine qui permet de spécifier un élément à rendre en cas d' erreur. Cette page est donc déclenchée en cas d' erreur comme un url qui n' existe pas.
 * On peut récupérer l' erreur qui est provoquée par le router en utilisant le hook useRooteError() dans la page d' erreur. Elle permet de capturer à la fois l' erreur causée par le router de même qu' une erreur causée par un composant enfant lors de son rendu.
 */

/****loader
 * C'est une propriété qui permet de charger les données directement au niveau de la route.
 * C'est une fonction qui renvoie les données à passer au composant. On peut aussi utiliser un fetch dans cette fonction.
 * Pour récupérer les données chargées via le loader, on utilise le hook useLoaderData() dans le composant dédié
 * Le loader permet de précharger des données de manière asynchrone avant qu' un composant de route ne soit rendu. Il garantie que le composant aura accès aux données nécessaires dès le premier rendu.
 *
 */

/*

  loader: () => {
    posts = fetch('').then( res => res.json)
    return defer( {posts})
  }
  // au niveau du composSuspenseant concerné:
  const {posts} = useLoaderData()
  <Suspense fallback={}>
  <Await resolve={posts}> 
  {
    (posts)=>{
      posts.map(post=>) //où
    }
  }
  <PostList/>
  </Await>  
  </Suspense>

avec: PostList(){
  const posts = useAsyncValue()
  return (
    <>
     posts.map(post=>)
    </>
  )
}
*/

/*************** Lorsqu' une route n' existe pas et on veut y accéder.
 * On crée un composant dédié pour ça.
 * On crée une nouvelle route et on précise comme chemin: '*'
 * On l'utilise souvent pour tous les chemins qui n' existent pas dans une application comme la page 404.  Ainsi, on est redirigé sur cette page si la page auxquelle on essaie d' accéder n' existe pas.'
 *
 */

/**********Routage protégé
 * Pour l' implémenter, on fait on utilise le rendu conditionnel à partir de props permettant de spécifier où rediriger avec le composant "Navigate" en fonction de la valeur du props. On peut l' utiliser dans le cas où un utilisateur n' est pas connecté et on veut lui interdire l' accès à certaines routes.
 * On crée donc un composant "IsProtected" par Ex, recevant le props définissant la condition  et un props "children". Il encapsule les enfants et retourne en fonction de la condition là où il faut rediriger.
 * 
  function Protegé({children, connecté}){
  
  (if (!connecté) return <Navigate to '/'>)
  
  return(
  <> {children} </>
  )
  }
*
* Ce composant encapsule donc les éléments à en capsuler dans le routage. 
 * 
 */

/***************useNavigate()
 * Pour rediriger vers une route de manière intentionnelle par Ex, lorsque le user finir de s' inscrire et pour le rediriger vers l' adresse de connexion, on utilise le hook useNavigate().
 * const navigate = useNavigate()
 *
 * Ainsi, lors de la redirection, on utilise navigate() puis on lui passe comme arg le chemin.
 * On peut aussi revenir en arrière dans l' historique après avoir utiliser navigate. Pour ce faire, on passe -1 à navigate comme arg au button implémetant le retour. Ainsi, on est redirigé à la dernière route. Mais avant d' utiliser navigate, il faut d' abord créer la route. Pour éviter le retour à l' ancienne route après une navigation on passe un 2nd arg au navigate qui est un objet avec la propriété replace qu' on met à true. navigate('', { replace: true}). ce 2nd arg est appliqué au button qui implémente la navigation dont on ne veut pas y retourner après s' être déplacé.
 */

/******le hook useNavigation
 * Dans n' importe quel composant, on a la possibilité de récupérer l' état du rooter.
 * Mais on le fait souvent dans le composant racine.
 * On place le "spinner" sur la page d' arrivée.
 * On utilise le hook useNavigation() qui nous renvoie différentes informations dont l' état (status) qu' on récupère: {status} = useNavigation(). De ce fait, lorsque clique sur l' enfant du parent ayant une requête asynchrone, le spinner s' affiche. 
 *Le status prend différentes valeurs: 
 - idle: pour dire de ne rien faire si la page est chargée
 - loading: de faire un chargement
 - submitting: dans le cas des soumissions de formulaire.
 *Ainsi, on peut procéder de la sorte pour le chargement
 *{status === 'loading' && <Spinner />}
  <Outlet/>
 * 
 * Mais pour afficher une partie de la page en attendant le chargement de l' enfant ie pour afficher des informations sur la page d' arrivée pendant que les données se chargent, on utilise la méthode defer() proposée par react router au niveau du loader au lieu de directement utiliser le fetch.
 * En effet, on retourne au niveau du loader, une promesse qu' on convertie en JSON. Puis on retourne defer() prenant en arg, un objet ayant pour clé le nom de la variable (contenant la promesse) et pour valeur, la promesse.
 * Ce defer, permet de dire, que tu peux charger le composant qu' on attend sans forcement attendre le résultat. Il retourne donc une promesse et permet de charger la partie du composant ne nécessitant pas de requête et le spinner s' affiche pour la partie avec requête.
 * Dans le composant concerné par le loader, on peut pas directement maper sur une promesse donc on utilise des composants spéciaux de react-rooter.
 * Le composant "Suspense" de react, permet d' afficher un fallback (le spinner) pendant qu' il y a un chargement. Il prend un composant enfant "Await" provenant de react-rooter et prend un attribut "resolve" où on lui précise la promesse qu' on attend (ici, posts). En enfant à ce dernier, on donne une fonction qui prend le résultat et peut donc faire le maping.
 * Mais pour cette dernière étape, pour éviter la surchage, on passe un composant qui va retourner le résultat du Await dans une const: en utilisant le hook useAsyncValue() du rooter-Dom 
 * 
 * Le composant Suspense de React permet de gérer le chargement asynchrone des composants. Il prend une propriété fallback, qui est rendue pendant que le composant chargé est en cours de chargement. C'est une excellente occasion de montrer un indicateur de chargement à l'utilisateur.
 * Par Ex:  <Suspense fallback={<div>Chargement...</div>}>
 * 
 * 
 * 

 */

/*******Le système d' action côté client
 * Permet de gérer au niveau des routes, les formulaires.
 * On crée un formulaire (Form de react-rooter) dont l' attribut "action" redirige vers un url du rooter.
 * La particularité réside dans le fait qu' on aura dans la route (route spécifier dans le Form) une propriété 'action' qui permet de spécifier ce qu' on souhaite faire lorsque cette route sera déclenchée, fonction permettant de récupérer l' objet request qu' on passe au serveur puis on fait une redirection.
 * On peut utiliser le state pour voir si on est entrain d' envoyer des données et désactiver les # champs si nécessaire.
 *
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      //itinéraire nesté
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

/******* Créer un composant de page d' erreur
 *
 * Pour créer ce composant de la page d' erreur, on utilise le hook useRootError() (error = useRootError()) qui l' erreur qui a été jetée lorsque l' utilisateur navigue vers des routes qui n' existent pas.
 * On peut utiliser les propriétés statusText || message (error.statusText) pour accéder au message de l' erreur.
 * Régler la <ErrorPage> comme errorElement sur la voie racinaire.
 *
 */

/******Créer de nouvelles routes
 * On crée un nouveau composant Contact par Ex qu' on connecte au route.
 *
 */

/**********Itinéraires nichés
 * On veut que le composant Contact soit rendu à l' intérieur de App par Ex le composant racine.
 * On fait donc de la route de Contact un enfant de la route racine.
 * Ensuite, on doit dire à la root racine où est ce qu' on veut qu' elle rende ses enfants via le composant <Outlet>
 *
 *
 */

/***********Routage latéral du client
 *
 * Le routage côté client permet à notre application de mettre à jour l'URL sans demander un autre document au serveur. Au lieu de cela, l'application peut rendre immédiatement une nouvelle interface utilisateur. Faisons-le avec <Link>.
 */

/********Données de chargement
 *  On utilise 2 API loader et useLoarderData
 *
 */

/*********URL Param ou param dans les chargeurs
 * le : transforme le segment URL concerné en un segment dynamique correspondant à des valeurs dynamiques.
 * Après les :, on passe des clés et le tout constitue le segment dynamique qu' on appelle juste param.
 * Si le segment URL est :contactId, alors la valeur dynamique sera transmise comme params.contactId en définissant dans le composant en question : const params = useParam() ou const { contactId } = useParams
 * Le hook useParam() renvoie un objet ayant une clé ( le segment dynamique) à qui on associe sa valeur dynamique.
 * Ces params sont le plus souvent utilisés pour trouver un enregistrement par ID
 *
 */

/****************searchParams
 *
 * C' est une fonctionnalité puissante permettant de manipuler dynamiquement l' url. On peut l' utiliser pour faire de recherche avec select par Ex: const sortOrder = searchParams.get('sort') || 'all' (par défaut) qu' on utilise pour le rendu. En effet, le composant dans lequel on l' utilise, dans le routage de cet élément, ça ajoute le searchParams au path. On peut aussi l' utiliser pour la pagination, pour filtrer.
 * Elle est comme le useState et prend : const [searchParams, setSearchParams] = useSearchParams()
 * Avec le gestionnaire, on change la valeur du searchParams par la fonction setSearchParams qui prend un objet contenant une propriété et sa valeur mais un objet vide lorsqu' on veut faire un reset du path puis par la méthode searchParams.get() qu' on assigne à une variable pour implémente le rendu. La clé et la valeur de l' objet sont ajoutés au path du composant qui implémente le useSearchParams
 *
 *
 */

/********************relative links
 *
 *Elles ne commencent pas par des / mais prend automatiquement à la fin / + le chemin le plus proche dans lequel ils sont rendu. Mais lorsqu'on veut utiliser des chemins absolus, on est obligé d' écrire tout le chemin complet.
 */

/*****************Lazy loading
 * Permet de réduire la taille de la page à charger et donc le temps de chargement. Pour le faire, on a besoin de l' import dynamique et de react suspense. En effet, le lazy loading permet de charger un élément uniquement lorsqu' on en a besoin.
 * D' abord, on export le composant en question par défaut puis on l' importe dans une variable à partir de la fonction lazy. Cette fonction prend en arg une fonction et fait l' import dynamique à partir de la syntaxe d' import dynamique : import(''). Elle retourne en retour une promesse.
 * Ensuite, on utilise Suspense, pour afficher l' élément charger paresseusement. C' est un composant qui permet d' afficher un spinner avec le prop fallback lors du chargement d' un composant chargé paresseusement. Il encadre ce dit composant. Pour le routage, l' élément de la route devient donc la variable du chargement paresseux qui est maintenant un composant.
 */

/*************useLocation
 * Fait plus ou moins la même chose que le urlParams mais permet d' accéder à des infos sans avoir besoin de les passer par l' url mais disparait au décour d' un raffraichissement...
 * On fait const location = useLocation
 * On peut l' utiliser avec Link, avec sa propriété state pour passer une donnée au composant de destination. <Link state = {{id, hero}} />
 * On peut l' utiliser avec navigate dans le hook useNavigate(). navigate('url', {state: {path: location.pathname}} )
 * - state: c' est une propriété de react-router qui permet de passer des informations. On l' utilise avec : useNavigate, Navigate, Outlet, Link, NavLink.
 * On a accès au state dans le composant de destination.
 * - Quant à pathname: c' est une propriété de location qui permet d' avoir le chemin d' accès de l' url actuel
 * - Quant à l' utilisation de state avec location.pathname avec les routes protégées,
 * Dans le composant de destination, on accède à l' url auquel on essaiyait d' accéder avant d' être redirigé.
 *
 */

/*******************routes protégées
 *
 * On crée un composant réutilisable pour encadrer au niveau de element, tous les composants dont l' accès est protégé sous condition.
 *
 * function PrivateRoute({children}) {
 *
 * if (){ return <Navigate to='' state = {{path: location.pathname}} />}
 * // Si donc on essaie d' accéder à une route que ce composant encadre, on vérifie d' abord la condition et si elle est false, alors on retourne le children soit le composant. Dans le cas contraire, on redirige en fonction du if mais on stocke dans le state, l' url que le user essayait d' accéder avant d' être redirigé.//
 *
 * Dans la destination, après la redirection, on eut accéder au state qu' on peut utiliser pour faire une redirection vers l' url de base. On peut de ce fait empêcher le retour en arrière avec le 2nd arg: {replace}.
 *
 * return children
 *
 * }
 *
 *
 */

/*****************Différence entre Navigate et useNavigate
 *
 * On utilise Navigate lorsque la redirection est directement dans le rendu comme pour les routes protégées et useNavigation lorsque la redirection est un effet secondaire soit dons se produit au décour d' une action comme un clique.
 */

/***************authentification with react router and context api
 * De manière basique avec le contexte api, on fournit par le composant AuthProvider, les valeurs: user (data), login(fn(user){setUser(user)}) et logout(fn{setUser(null)}) au moyen de AuthContext, AuthContext.Provider et useAuth.
 * Ensuite, la logique du composant Login et Logout.
 * Login utilise la fn login(user) en passant le user et fait une redirection Logout, fait pareil. Et le routage protégés qui protège Logout en redirigeant vers Login suivi de replace pour ne pas revenir en arrière et après Login, on peut accéder au Logout par Ex. Dans Logout, on peut utiliser un boutton pour rediriger vers l' acceuil.
 *
 *
 *
 */
