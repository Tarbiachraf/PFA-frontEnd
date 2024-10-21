import React from "react";
import './Contactus.css'; // Assurez-vous d'avoir un fichier Footer.css dans le même dossier
const Contactus = () => {
    return (
        <>
<section className="contact_section layout_padding" id="contactLink">
  <div className="container">
    <div className="heading_container">
      <h2>Get In touch</h2>
    </div>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-lg-6 col-md-8 mx-auto">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6" id="hada">
              <input type="text" className="form-control" id="inputName4" placeholder="Name" />
            </div>
            <div className="form-group col-md-6">
              <input type="email" className="form-control" id="inputEmail4" placeholder="Email id" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <input type="text" className="form-control" id="inputSubject4" placeholder="Subject" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <input type="text" className="form-control" id="inputMessage" placeholder="Message" /> 
            </div>
          </div>
          <div className="d-flex justify-content-center" >
            <button type="submit" className="">Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

        </>
    );
}
export default Contactus;