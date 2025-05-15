"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useGetProductsQuery } from "../store/api";
import { useAppDispatch } from "../store/hooks";
import { addSelectedProduct } from "../store/selectedProductsSlice";
import type { IProduct } from "../types";
import ListItem from "./common/ListItem";
import Loading from "./common/Loading";

const ProductsColumn = ({ searchTerm }: { searchTerm: string }) => {
  const dispatch = useAppDispatch();
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const [displayCount, setDisplayCount] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      console.log({ scrollTop, scrollHeight, clientHeight });
      if (scrollTop + clientHeight >= scrollHeight - 5 && displayCount < products.length) {
        setDisplayCount((prev) => Math.min(prev + 10, products.length));
      }
    }
  }, [displayCount, products.length]);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);
      return () => {
        currentContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  const handleProductClick = (product: IProduct) => {
    dispatch(addSelectedProduct(product));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(0, displayCount);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 h-64 flex items-center justify-center">
        <p>Error loading products</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="mt-4 overflow-y-auto h-[calc(100vh-250px)]">
      {displayedProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {displayedProducts.map((product) => (
            <ListItem
              key={product.id}
              id={product.id}
              imageUrl={product.image}
              title={product.title}
              subtitle={`$${product.price}`}
              rightText={product.category}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsColumn;
