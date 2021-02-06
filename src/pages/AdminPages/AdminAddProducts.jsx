import NavBar from "../../components/NavBar";
import AddProducts from "../../components/AddProducts";

export function AdminAddProducts() {
  return (
    <>
      <NavBar
        home="Home"
        contact="Cadastro"
        toHome="/admin-home"
        toContact="admin-contact-form"
      />
      <AddProducts />
    </>
  );
}
