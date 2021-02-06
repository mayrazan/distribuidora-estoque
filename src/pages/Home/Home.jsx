import NavBar from "../../components/NavBar";
import ProductList from "../../components/ProductList";

export function Home() {
  return (
    <>
      <NavBar
        home="Home"
        contact="Contato"
        toHome="/home"
        toContact="contact"
      />
      <ProductList />
    </>
  );
}
