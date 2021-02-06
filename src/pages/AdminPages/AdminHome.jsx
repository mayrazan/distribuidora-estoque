import NavBar from "../../components/NavBar";
import ContactList from "../../components/ContactList";

export function AdminHome() {
  return (
    <>
      <NavBar
        home="Home"
        contact="Cadastro"
        toHome="/admin-home"
        toContact="admin-contact-form"
      />
      <ContactList />
    </>
  );
}
