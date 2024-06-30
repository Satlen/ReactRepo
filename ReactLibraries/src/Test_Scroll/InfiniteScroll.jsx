import { useInfiniteQuery } from "@tanstack/react-query";
import { request } from "../axios_interceptor/customRequest";
import { TypingButton } from "../styledComponents/TypingButton";
import { Spinner } from "../Test_Styled/Spinner";
import { Fragment } from "react";

export const InfiniteScroll = () => {
  const fetcherInfiniteQuery = ({ pageParam = 1 }) => {
    return request({ url: "/products?_per_page=2&_page=" + pageParam });
  };

  const {
    isLoading,
    isFetching,
    data,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["infiniteProduct"],
    queryFn: fetcherInfiniteQuery,
    getNextPageParam: (lastPage, allPages) => {
      //lastPage = data et allPages = [of each lastPages]
      console.log(lastPage, allPages);
      const nextPage = lastPage.next;
      // car à la fin lastPage.next sera null sinon, j' aurai tjr la prochaine page
      return nextPage;
    },
  });

  console.log(data); // est la raison de la 1ère unedifined qu' on voit

  // data ici, est un objet contenant pages qui est array. Et c' est dans celui ci qu' on a des objets représentant chaque page qui >>ntiennent prev, next puis data ...

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBlock: "100px",
      }}
    >
      <h2>Infinite Query</h2>
      {isFetching || (isLoading && <Spinner />)}
      <ul>
        {data?.pages?.map((page, i) => {
          return (
            <Fragment key={i}>
             {page?.data?.map((product) => {
                return (
                  <li
                    key={product.id}
                    style={{
                      fontWeight: "600",
                      fontSize: "1.5rem",
                      lineHeight: "3",
                      color: "coral",
                    }}
                  >
                    {product.title}
                  </li>
                );
              })}
            </Fragment>
          );
        })}
      </ul>
      <TypingButton
        onClick={
          // fetchNextPage ou
          () => fetchNextPage()
        }
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "loading more ..."
          : hasNextPage
          ? "load more"
          : "Nothing more to load"}
      </TypingButton>
    </div>
  );
};
