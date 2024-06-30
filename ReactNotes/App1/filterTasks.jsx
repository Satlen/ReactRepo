/**
 * function pour filtrer une liste à partir d' une entrée du user
 * @function
 * @param {Array} lists - la liste à partir duquelle on filtre
 * @param {Array} prompts - permet de filtrer lists
 * @returns {Array} - qu' on va utiliser dorénavent comme état global 
 */
export function filterTasks (lists, prompts ) {

return lists.filter( (list ) => 
{ 
    return list.title
    .split(' ')
    .some( word => word.toLowerCase().includes(prompts.toLowerCase())); 
}
    )}
    

