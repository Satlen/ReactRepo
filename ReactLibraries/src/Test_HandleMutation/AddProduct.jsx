import { useState } from "react";
import { TypingButton } from "../styledComponents/TypingButton";

export default function AddProduct({ mutate }) {
  const [newProduct, setNewProduct] = useState("");

  return (
    <div>
      <input
      type="text"
      style={{
        borderRadius:'8px',
        fontSize:'1.3rem',
        padding:'5px',
        width:'300px',
        height:'60px',
        outline: '1px solid coral',
      }}
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
      />
      <TypingButton
        onClick={() => {
          setNewProduct("");
          mutate({ title: newProduct });
        }}
      >
        click
      </TypingButton>
    </div>
  );
}
