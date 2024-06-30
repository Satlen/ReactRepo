import { useState } from "react";
import { request } from "../axios_interceptor/customRequest";
import { Center } from "../styledComponents/Center";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../Test_Styled/Spinner";
import { TypingButton } from "../styledComponents/TypingButton";
import { createRef } from "react";

export default function Pagination() {
  const [pageNumber, setPageNumber] = useState(1);

  const inputRef = createRef("");

  const fetchProduct = ({ queryKey }) => {
    const [_, key] = queryKey;
    console.log(key);

    if (inputRef.current?.value){
      const dynamicSearch = inputRef.current?.value
      return request({ url: `/products?_per_page=3&_page=${key}&title=`+ dynamicSearch})
    }
    return request({ url: `/products?_per_page=3&_page=${key}`});
    
  };

  const {
    isLoading,
    data: Product,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ["product", pageNumber],
    queryFn: fetchProduct,
    // () => fetchProduct(pageNumber), avec cette syntaxe, je lui passe moi même le pageNumber
  });

  return (
    <>
      <Center>
        <h2>Pagination Query</h2>
        <input
          style={{
            height: "10px",
            padding: "20px",
            marginBlock: "20px",
            width: "300px",
            borderRadius: "8px",
            fontSize: "1.3rem",
          }}
          placeholder="Press Enter to search"
          ref={inputRef}
          onKeyDown={(e) => {
            console.log(inputRef.current?.value);
            //inputRef.current, une fois que je l' associe à un élément du DOM, est un objet qui contient toutes les propriétés du DOM dont value.
            if (inputRef.current?.value) {
              //le chainage optionnel car c' est pas automatiquement disponible les données
              // Par la suite, je vais dire que lorsqu' on tape Enter, d' ajouter à l' url ce que le user vient d' ajouter selon le param des données qu' on veut utiliser et j'irai dans le fetcherFn pour dire que lorsque le inputRef.current.value existe, qu' on l' ajoute à la requête
              if(e.key === "Enter"){
                  refetch()
              }
              
            }
          }}
        />
        {isLoading || (isFetching && <Spinner />)}
        <ul>
          {Product?.data?.map((p) => (
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
          ))}
        </ul>
        <div
          style={{
            display: "flex",
            gap: "2vw",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <TypingButton
            onClick={() => setPageNumber((prev) => prev - 1)}
            disabled={Product?.prev === null || isFetching}
          >
            Prev
          </TypingButton>
          <TypingButton
            onClick={() => {
              console.log(pageNumber);
              return setPageNumber((prev) => prev + 1);
            }}
            disabled={Product?.next === null || isFetching}
          >
            Next
          </TypingButton>
        </div>
      </Center>
    </>
  );
}
