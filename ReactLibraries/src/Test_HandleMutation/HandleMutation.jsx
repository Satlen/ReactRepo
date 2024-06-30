import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AddProduct from "./AddProduct";
import { Spinner } from "../Test_Styled/Spinner";

export default function HandleMutation() {
  const fetchProducts = async () => {
    const res = await axios.get(`http://localhost:2000/products`);
    return res.data;
    //je peux les mettre dans un block try - catch ou j' utilise le then - catch
  };

  const {
    data: productFetched,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  console.log(productFetched);

  async function addProduct(newProduct) {
    const result = await axios.post(
      "http://localhost:2000/products",
      newProduct
    );
    const res = await result.data;
    return res;
    // ou result.then( (res) => res.data) mais sans le async et le await
  }

  const queryClient = useQueryClient();

  //Handleling Mutation
  /* const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      //elle, elle reçoit à son appel la nouvelle donnée ajoutée
      console.log(data);

      // queryClient.invalidateQueries(["products"])

      function handleRefectMutation(oldQueryData) {
        return [...oldQueryData, data];
      }

      queryClient.setQueryData(["products"], handleRefectMutation);
      //handleRefetchMutation reçoit à son appel la valeur actuelle en cache
    },
  });
*/
  //console.log(data);

  const { mutate } = useMutation({
    mutationFn: addProduct,
    onMutate: async (newProduct) => {
      //J' invalide toute requête susceptible en cours
      await queryClient.cancelQueries(["products"]);
      //Je récupère le cache
      const previousData = queryClient.getQueriesData(["products"]);
      //Je fais la mutation
      queryClient.setQueriesData(["products"], (oldQueryData) => [
        //ici, je pense à retourner ce qui va rester dans le data lorsqu' on utilise useQuery() selon le format habituel pour ce faire, normalement selon la façon dont je fais le get request, je devrais directement recevoir dans data, un tableau contenant les objets dont j' ai besoin.
        ...oldQueryData, newProduct
    ]);
    return {previousData}
    },
    onError: (_err, _newProduct, context) => {
      //en cas d' erreur, on essaie de faire un roll back du cache; Ce callback reçoit en 1er arg, l' erreur, en 2nd la variable attribuée à onMutate et en 3arg, ce qui est retourné par onMutate
      queryClient.setQueriesData(["products"], () => context.previousData)
    },
    onSettled: () =>{
      //Peut importe ce qui arrive, on invalide les requêtes
      queryClient.invalidateQueries(['products'])
    }
  });

  if (isLoading || isFetching) {
    return <Spinner />;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  // En décomposant ce composant en AddProduct, je limite le nombre de rendu et de ce fait, je lui ai passé mutate comme props ainsi, il gère lui même l' état newProduct et le mute.
  return (
    <div>
      <AddProduct mutate={mutate} />
      <ul>
        {productFetched?.map((p) => {
          return (
            <li
              key={p.id}
              style={{
                fontWeight: "600",
                fontSize: "1.5rem",
                lineHeight: "3",
                color: "coral",
              }}
            >
              {p.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
