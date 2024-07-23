import Aside from "@/components/contact/aside";
import Messageform from "@/components/contact/message-form";



function Contact() {
  return (
    <main className="container flex flex-col md:flex-row gap-10 pb-20" >
      <Aside />
      <div className={`flex-1 p-10 border`}>
        <Messageform />
      </div>
    </main>
  );
}

export default Contact;