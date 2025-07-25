import Btn from "./Btn";

function Modal({ img, name, description, link, setModal }) {
  return (
    <div
      className="modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) setModal(false);
      }}
    >
      <div className="modal">
        <img src={img} className="modal-img" />
        <h2 className="modal-name">{name}</h2>
        <p className="modal-description">{description}</p>
        <Btn link={link} content="What's new?" blank={true} />
      </div>
    </div>
  );
}

export default Modal;
