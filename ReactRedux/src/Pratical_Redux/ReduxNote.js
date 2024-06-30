/************************ Redux
 *
 * *****************Three core concepts
 *
 * Les trois concepts fondamentaux de redux:
 * - store: entrepôt ou magasin, gère le state
 * - action: objet qui décrit ce qui s' est passé dans l' applicaton.
 * - reducer: fonction qui reçoit l' action et décide de comment retourner le nouvel état.
 *
 *
 * *************** Three principles
 *
 * - 1er:
 * L' état global de l' application est stockée dans un seul objet dans un store.
 * - 2em:
 * La seule manière de mettre à jour le state est d' émettre une action qui est un objet qui décrit ce qui s' est passé.
 * - 3em:
 * Pour spécifier comment l' état sera mit à jour à partir de l' action envoyée, on écrit une fonction reducer.
 *
 *
 ******************** Action
 *
 * - D' abord, on crée une constante qui est un literal pour spécifier le type de l' action (le tout en maj) pour éviter les erreurs.
 * - On crée une fonction créateur d'action qui va retourner une action. Ceçi, en terme de dynamisme et pour faire des modifications qu' à un seul endroit si nécessaire. L' action retournée est un objet ayant la propriété type mais peut contenir autres choses.
 * Avec redux, la convention est d' appeler payload la seconde propriété de l' objet d' action après type lorsqu' on souhaite ajouter des informations additionnelles. On passe souvent au payload, le param du créateur d' action
 *
 *
 ****************** Reducers
 *
 * C' est une fonction qui accepte deux args: state et action et qui retourne l' état suivant. On donne comme valeur par défaut au state l' état initial qui sera envoyé comme arg au param state du reducer lorsque l' application démarre. Le reducer implémente le logique de rendu du nouvel état à partir de l' action qui lui sera envoyé en 2nd arg.
 * On utilise le switch case pour implémenter cette logique et par défaut, on retourne le state (previousState = l' état de l' application sans avoir fait de changement).
 * L' état retourné, est une copie du previousState en utilisant le spread puis on ne met à jour que la propriété concerné.
 *
 *
 * *************** Store
 *
 * On a une seule store pour toute l' application. Cette store a plusieurs responsabilités:
 * - Elle gère le state.
 * - Permet d' accéder à l' état actuel du state via getState()
 * - Elle fournit une méthode appelée dispatch(action) qui accepte un arg action et permet toute mise à jour de l' état qu' elle stocke.
 * - Elle permet de s' abonner à toute modification de l' état (écouter) via subscribe(listener) qui accepter une fonction comme arg (listener) et cette dernière est exécutée à chaque fois que l' état change.
 * On s' abonne aux changements d' état, dès qu' on passe le listener à subscribe. Tous les listener existant sont exécutés dès qu' on appelle le dispatch. En effet, dès qu on appelle le dispatch d' un certain type action, le case du reducer correspondant est exécuté.  Donc lorsqu'on appelle subscribe, elle attend toute modification du state pour déclencher à chaque fois listener.
 * - Elle permet aussi de se désabonner des changements de l' état en appelant la fonction retournée par subscribe(). En effet, lorsqu'on appelle subscribe, elle renvoie une nouvelle fonction qu' on peut  récupérer dans la variable unsubscribe et appeller pour arrêter l' écoute.
 * De ce fait, tout appel du dispatch n' entrainera plus un appel du listener.
 *
 * ***** On utilise la méthode createStore de redux pour créer la store. Elle accepte comme param le reducer.
 *
 ******** En gros le pattern de redux:
 *
 * - déclarer l' état initial
 * - déclarer la constante qui sera passée comme type à l' action et la créateur d' action
 * - déclarer le reducer
 * - créer le store
 * - on s' abonne aux changements du store
 * - on émet une action pour mettre à jour le state du store
 * - On se désabonne des changements du store
 *
 *
 * **************** Actions creators
 *
 * C' est la méthode bindActionCreator() de redux.
 * Par défaut: const actions = bindActionCreators()
 * Elle accepte 2 args, le premier un objet prenant les créateurs d' actions et le 2nd, la méthode auquelle ces créateurs d' actions seront wrapper donc envelopper.
 * Cette fonction crée un objet dans lequel les créateurs d' actions sont des keys et leur associe leur valeur. A chaque appel de ces key, ces méthodes seront enveloppées dans méthode passée comme 2 arg ici: store.dispatch.
 *
 *
 * ******************Multiples reducers
 *
 * On peut utiliser un seul reducer qui va gérer toute la logique de notre state mais cela devient assez vite encombrant.
 * *******De ce fait on peut créer plusieurs reducers qui vont gérer chacun une partie de l' état global du store. Pour ce faire, d' abord on sépare l' état de l' application en deux états différents qui auront chacun son reducer.
 * *******Ensuite, on utilise la méthode de redux combineReducers() pour combiner les reducers de chaque state de l' application en un rootReducer. Cette méthode accepte comme arg un objet à qui on passe une clé-valeur, la valeur correspondra au reducer de chaque state.
 * ******* C' est donc le reducer global rootReducer qui est passé comme arg à createStore.
 * Cela étant, lors d' un dispatch, toutes les reducers sont informées mais c' est le reducer concerné qui se met en action et modifie son state.
 * ******* Il en résulte dans le store, un state global fait d' un objet ayant comme propriété, le nom attribué à chaque reducer dans la méthode combineReducers et comme valeur, le state géré par chaque reducer.
 *
 *
 * **************** Immer
 *
 * C' est une librairie qui permet de modifier apparemment l' état comme s' il était mutable mais sous le capot, transforme notre code en en utilisant le spread comme il se doit.
 * On l' installe et on importe la méthode produce de immer.
 * On lui donne en premier arg le state (previousState) et en 2nd arg une fonction qui reçoit un arg draft qui est une ébauche du state. À partir de celle çi, on modifie directement le state.
 *
 *
 ****************** Middlewars
 *
 * C' est une fonction qui intervient entre le moment où on dispatch une action et le mement où elle atteint le reducer. Elle étent la fonctionnalité de redux.
 * Elles peuvent être utiliser pour intercepter une action ou la traiter (loguer, modifier, supprimer, effectuer des requêtes asynchrones)...
 * Avec la fonction const logger = createLogger() de redux-logger, on peut loguer les actions qui ont été dispatchées.
 * On utilise la méthode applyMiddleware de redux pour appliquer un middleware. On la passe comme 2nd arg au createStore. Elle (applyMiddleware) prend à son tour en arg autant de middleware que possible suivant l' ordre d' enchainement.
 * Les middlewares ne traitent que les actions, la souscription permet aux composants de souscrire aux changement d' état.
 * CreateLogger de redux-logger, intercepte chaque action dispatchée pour loguer des informations sur l' action et sur l' état avant et après que l' action ait été traitée par le reducer.
 *
 *
 **************** Async action with Redux-Thunk
 *
 *
 *De base, les actions redux sont synchrones ie s' exécutent automatiquement et mettent à jour l' état. Mais parfois, on a besoin de faire appel à un api et de récupérer des données qui seront utiliser dans l' application. On a besoin donc de faire un appel asynchrone. Ainsi entre en jeu redux-thunk.
 *
 * - On définit une action thunk qui est une fonction qui contrairement aux autres fonctions créatrices d' actions, retourne au lieu d' un objet, une fonction. Cette fonction à son appel, reçoit 2 args: dispatch et getState. Cette fonction retournée par l' action thunk, permet surtout d' effectuer des appels asynchrones comme des appels API et se servant de dispatch et getState pour dispatcher des actions normales et mettre à jour le state  et accéder à sa valeur actuelle si nécessaire.
 * - La configuration en passant la méthode thunk à applyMiddleware sans l' appeler.
 * - Pour dispatcher une action thunk, on le fait comme on le ferait avec une action normale. Redux-thunk va intercepter l' action lorsqu' elle est dispatchée idem pour tous les middlewares d' ailleurs mais Redux-thunk quant à elle recherche une action que reconnait, celle qui renvoie une fonction et l' intercepter sinon, elle l' ignore et l' action va passer par les middlewares suivants et enfin aboutir au reducer.
 * C' est une action asynchrone puisque c' est après le dispatch de l' action
 *
 *
 *
 ******************* RTK
 *
 * Elle offre comme avantage, moins de ligne de code et la disposition de certaines librairies nécessaires au fonctionnement de redux.
 * ***** Il faut réorganiser la structure de l' application en créant 2 dossiers app contenant le fichier store et features contenant les différentes slices (une portion de l' état global).
 *
 ****** La méthode createSlice, permet de subdiviser l' état global de l' application en slice chacun ayant son propre réducteur. Elle prend en arg un objet contenant 3 propriétés :
 - name: nom du slice
 - initialState: l' état initial du slice
 - reducers: prend un objet ayant pour key le nom de l' action et pour valeur la fonction réductrice de chaque action
 Cette fonction reçoit en arg state et action et mute directement l' état qu' on lui renvoit grâce à immer sans avoir besoin de retourner explicitement l' état.
 ****** À la fin, on récupère de createSlice, la propriété actions et reducer:
 - actions: est un objet qui retourne comme clé les fonctions créateur d' action (dont le nom correspond au nom de l' action) qui n' accepte que le payload et retourne l' objet d' action dont la propriété type, générée automatiquement fait du [nom du slice/nom de l' action] et le payload qu' on lui passe en arg.
 - reducer: on l' exporte par défaut et est fait de toutes les fonctions réductrices regroupées en une. 
 *
 *
 * ****************** Configuring store
 * 
 * Ici, on utilise la méthode configureStore au lieu de createStore. Elle prend en arg, un objet dont plusieurs clés:
 * - reducer; elle prend comme valeur un objet et se comporte comme combineReducer donc on lui donne une clé-valeur avec la clé utilisée comme une propriété du store (chaque clé représente chaque slice de l' état global associé à leur reducer comme valeur) et la valeur, le reducer correspondant au slice. Ces clés déterminent la structure de l' état global dans le store. On lui donne le même nom ainsi qu' aux slices pour plus de cohérence.
 * Après cela, le reste c' est comme avec redux: subscribe(), getState(), dispatch().... Pour dispatch une action, on appelle le dispatch à qui on passe la créateur d' action avec son argument.
 * 
 * 
 * ********** Using loggerMiddleware
 * 
 * Pour l' utiliser, il faut l' installer, on s' addresse à la propriété middleware du configureStore à qui on passe une fonction. Cette fonction prend en arg: la méthode getDefaultMiddleware. On retourne getDefaultMiddleware().concat(logger). En fait, redux toolkit utilise par défaut des middlewares qui sont appelés automatiquement donc, on essaie d' ajouter le logger à la fin de ces listes de middleware.
 * 
 * 
 * *********** Extra reducers
 * 
 * Chaque reducer est associée à une partie du state.
 * Le principe de base d' un reducer est qu' elle ne met à jour qu' une partie du state donc son slice mais elle peut aussi répondre à n'importe quelle action qui a été dispatchée.
 * C' est le cas, lorsqu'on veut agir sur une autre slice lorsqu' on dispatche une certaine action.
 * ******* Tout cela est fait avec la propriété extraReducers:
 * Avec redux toolkit, on dispose de 2 approches: 
 * - On passe à extraReducers, un objet avec des clés dynamiques: un tableau contenant un string désignant le nom de l' action puis à sa valeur, on définie une fonction reducer qui peut recevoir le state et les actions et on établit la logique. Par exemple, diminuer le nombre de crème lorsqu'on commande un gateau. Tout en sachant que crème et gateau sont 2 slices différents.  
 * - La deuxième approche, consiste à passer à extraReducers, une fonction. Cette fonction reçoit un arg qu' on appelle builder. À partir de celle çi, on accède à la méthode addCase(). À cette méthode, on passe d' abord l' action (retournée par le createSlice) et comme 2nd arg, on passe la fonction reducer qui reçoit les args habituels et on établit la logique. Pour le createAsyncThunk, on passe comme premier arg la fonction thunk (action async).
 * 
 *
 ****************createAsyncThunk
 *
 * C' est cette fonction qui permet de gérer les opératons asynchrone avec redux-toolkit. Elle prend en arg, 2 params:
 * - le nom de l' action ("user/userfetch") (dont on s' en sert + pending, fulfilled... pr le type d' action)
 * - une fonction asynchrone qui retourne une promesse dont le résultat est utilisé comme le payload. On a pas besoin de spécifier le bloc catch pour la fonction asynchrone vu que RTK le fait automatiquement.
 **** La fonction createAsyncThunk retourne une fonction thunk qui est dispatchable et prend comme arg, les params qu' on souhaitent attribuer à la fonction asynchrone lors de son appel. 
 **** À son appel (fonction thunk), elle retourne 3 propriétés basées sur l' état de la promesse retournée. 
 * - pending: dès son appel, elle retourne une action de type pending qu' on y accède via cette propriété et implémenter les transitions de state dans le extraReducer mais pas de payload.
 * - fulfilled: une fois la promesse résolue, elle retourne une action de type fulfilled et le resultat de la promesse comme payload.
 * - rejected: lorsque la promesse échoue ou est non résolue. Elle retourne pour ce type d' action l' erreur dans error qui dispose souvent d' au moins deux propriétés message et name.
 * 
 * ***********On utilise dans createSlice, le reducer pour gérer les actions synchrones mais extraReducer, pour gérer souvent les actions asynchrones ou les actions qui n' ont pas directement de rapport avec le reducer d' un slice. 
 * 
 * ********** Dans le extraReducers du createSlice, on passe à la méthode addCase du builder les propriétés de la fonction thunk. En effet, cette fonction retourne une promesse étant donné que les promesses disposent des propriétés success, pending... c' est le cas avec la fonction thunk. En fonction de ces différentes phases, createAsyncThunk envoie une action ayant le type correspondant. 
 *
 *
 * 
 * 
 *
 **********************react redux


 *
 ** D' abord, il faut importer le composant Provider, le fait encadrer l' application et lui passer le prop store après avoir importer le store.
 ****Ensuite, on utilise les hooks:
 * - useSelector: prend en arg une fonction qui prend en arg le state qui constitue l' objet passé à la propriété reducer du configureStore. Ce state permet d' accéder aux différents slices du store. UseSelector retourne ce qui est retourné par cette fonction.
 * - useDispath: Ce hook permet d' accéder au dispatch du store. On lui assigne une constante qu' on utilise pour dispatch une action.
 *
 *
 * 
 * *******************react redux with typescript
 * 
 * *** D' abord dans le slice, je type initialState et j' utilise le generic PayloadAction pour typer les actions.
 * *** Dans la partie configureStore, j' exporte:
 * - export type AppDispatch = typeof store.dispatch
 * - export type RootState = ReturnType<typeof store.getState> (on utilise ReturnType pour retourner le type d' une fonction complexe et c' est la convention.
 * *** On crée un fichier hooks qui va exporter les hooks useSelector et useDispatch typés.
 * export const useAppDispatch:()=> AppDispatch = useDispatch;
 * export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 
 * J' utilise maintenant useAppSelector et useAppDispatch dans mon application.
 *
 *
 *
 *
 *
 *
 *
 *
 */
