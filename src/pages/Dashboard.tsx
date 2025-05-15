import { useState } from "react";
import ProductsColumn from "../components/ProductsColumn";
import UsersColumn from "../components/UsersColumn";
import SelectedProductsColumn from "../components/SelectedProductsColumn";
import Card from "../components/common/Card";

export default function Dashboard() {
  const [productSearch, setProductSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [selectedProductSearch, setSelectedProductSearch] = useState("");

  const cardData = [
    {
      title: "Users",
      placeholder: "Search users...",
      serchedValue: userSearch,
      setSearchValue: setUserSearch,
      children: <UsersColumn searchTerm={userSearch} />,
    },
    {
      title: "Products",
      placeholder: "Search products...",
      serchedValue: productSearch,
      setSearchValue: setProductSearch,
      children: <ProductsColumn searchTerm={productSearch} />,
    },
    {
      title: "Selected Products",
      placeholder: "Search selected products...",
      serchedValue: selectedProductSearch,
      setSearchValue: setSelectedProductSearch,
      children: <SelectedProductsColumn searchTerm={selectedProductSearch} />,
    },
  ];

  return (
    <div className=" bg-gray-50 ">
      <div className="bg-white shadow">
        <div className="  mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Product Explorer</h1>
        </div>
      </div>
      <main>
        <div className="py-6 px-4 lg:px-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {cardData.map((card) => (
              <Card
                key={card.title}
                placeholder={card.placeholder}
                serchedValue={card.serchedValue}
                setSearchValue={card.setSearchValue}
                chilren={card.children}
                title={card.title}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
