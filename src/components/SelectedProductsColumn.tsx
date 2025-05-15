"use client";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { removeSelectedProduct } from "../store/selectedProductsSlice";
import ListItem from "./common/ListItem";

export default function SelectedProductsColumn({ searchTerm }: { searchTerm: string }) {
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector((state) => state.selectedProducts.products);

  const handleRemoveProduct = (productId: number) => {
    dispatch(removeSelectedProduct(productId));
  };

  const filteredProducts = selectedProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log({ filteredProducts });
  return (
    <div className="mt-4 overflow-y-auto h-[calc(100vh-250px)]">
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 h-64 flex items-center justify-center">
          <p>No products selected</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <ListItem
              key={product.id}
              id={product.id}
              imageUrl={product.image || "/placeholder.svg"}
              title={product.title}
              subtitle={`$${product.price}`}
              onClick={() => handleRemoveProduct(product.id)}
              rightText={<div className="inline-flex items-center text-sm font-semibold text-red-500">Remove</div>}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
