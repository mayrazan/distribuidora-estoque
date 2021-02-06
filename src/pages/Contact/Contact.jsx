import NavBar from "../../components/NavBar";
import ContactForm from "../../components/ContactForm";

export function Contact() {
  return (
    <>
      <NavBar
        home="Home"
        contact="Contato"
        toHome="/home"
        toContact="contact"
      />
      <ContactForm />
    </>
  );
}
