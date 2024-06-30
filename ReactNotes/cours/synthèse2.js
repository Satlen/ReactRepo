

/***************** Transmettre des données profondément dans le contexte
 * Le context, c' est les données qu' on souhaitent partagées.
 * Le mécanisme de context en react, fonctionne en remontant la hiérachie des composants pour trouver le fournisseur de contexte le plus proche.
 * Le composant qui utilise le context en react est donc un composant direct ou indirect du provider.
 * Pour utiliser le context, on suit ces 3 étapes :
 * La fonction createContext de React est utilisée pour créer un objet de contexte, qui comprend deux parties principales :
   -  Provider (Context.Provider) : Lorsque vous créez un contexte à l'aide de createContext, vous obtenez un objet qui a une propriété appelée Provider. C'est cette propriété que vous utilisez pour envelopper une partie de votre application afin de fournir les données du contexte à ses descendants. Le Provider prend une prop appelée value à laquelle vous attribuez les données que vous souhaitez partager.
    - Consumer (Context.Consumer) et Hook (useContext) : L'objet de contexte créé par createContext expose également une propriété Consumer qui peut être utilisée dans des composants de classe, ainsi qu'un hook appelé useContext qui peut être utilisé dans des composants fonctionnels. Ces mécanismes permettent de consommer les données du contexte dans des composants spécifiques.
* Comme bonne manière, on attribue une valeur par défaut au createContext(), et le nom attribué au consumer est un nom qui réflète le contexte dont il provient soit le même.
* 
 */


// 1er cas: un cas complexe de To do List où on veut partager l' état global entre les composants.

// TaskContext.js
import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};


// TaskList.js
import React from 'react';
import { useTaskContext } from './TaskContext';

const TaskList = () => {
  const { tasks, removeTask } = useTaskContext();

  return (
    <div>
      <h2>Liste des tâches</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} 
            <button onClick={() => removeTask(task.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;


// AddTask.js
import React, { useState } from 'react';
import { useTaskContext } from './TaskContext';

const AddTask = () => {
  const { addTask } = useTaskContext();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask({ id: Date.now(), title: newTask });
      setNewTask('');
    }
  };

  return (
    <div>
      <h2>Ajouter une tâche</h2>
      <input
        type="text"
        placeholder="Nouvelle tâche"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Ajouter</button>
    </div>
  );
};

export default AddTask;


// App.js
import React from 'react';
import { TaskProvider } from './TaskContext';
import TaskList from './TaskList';
import AddTask from './AddTask';

const App = () => {
  return (
    <TaskProvider>
      <div>
        <h1>Gestionnaire de tâches</h1>
        <TaskList />
        <AddTask />
      </div>
    </TaskProvider>
  );
};

export default App;



// 2e cas mais sans context pour complèter le todo list

// TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = [
    { id: 1, text: 'Faire les courses', completed: false },
    { id: 2, text: 'Répondre aux emails', completed: true },
    { id: 3, text: 'Préparer la présentation', completed: false },
  ];

  const markTaskAsCompleted = (taskId) => {
    // Logique pour marquer la tâche comme terminée
    console.log(`Tâche ${taskId} marquée comme terminée`);
  };

  return (
    <div>
      <h2>Liste des tâches</h2>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            markTaskAsCompleted={markTaskAsCompleted}
          />
        ))}
      </ul>
    </div>
  );
};


// TaskItem.js
import React from 'react';

const TaskItem = ({ task, markTaskAsCompleted }) => {
  const handleCompleteClick = () => {
    markTaskAsCompleted(task.id);
  };

  return (
    <li>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      {!task.completed && (
        <button onClick={handleCompleteClick}>Marquer comme terminée</button>
      )}
    </li>
  );
};

export default TaskItem;

// 3e cas la même isCompleted

// App.js
import React, { useState } from 'react';
import TaskList from './TaskList';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Faire les courses', completed: false },
    { id: 2, text: 'Apprendre React', completed: true },
    { id: 3, text: 'Faire du sport', completed: false },
  ]);

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <TaskList tasks={tasks} onToggleTask={toggleTaskCompletion} />
    </div>
  );
};

export default App;

jsx

// TaskList.js
import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggleTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggleTask={onToggleTask} />
      ))}
    </ul>
  );
};

export default TaskList;


// Task.js
import React from 'react';

const Task = ({ task, onToggleTask }) => {
  const handleToggle = () => {
    onToggleTask(task.id);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
    </li>
  );
};

export default Task;

/** Une courte explication sur le code d' en haut pour modifier l' état
 * La fonction de mise à jour reçoit l'état précédent en tant que paramètre, et cela est souvent stocké dans une variable appelée prevState ou quelque chose de similaire.
 * La raison principale d'utiliser prevTasks (ou une variable similaire) est de s'assurer que vous travaillez avec l'état le plus récent au moment de la mise à jour. Puisque React garantit l'asynchronisme de la mise à jour de l'état, l'état au moment où la mise à jour est effectuée peut différer de l'état au moment où la fonction a été appelée initialement.
 */
