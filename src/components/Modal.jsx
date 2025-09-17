import ReactDom from 'react-dom';

const Modal = (props) => {
  const { children, handleCloseModal } = props;

  return ReactDom.createPortal(
    <div className="modal-container">
      {/* backdrop button - click outside to close */}
      <button onClick={handleCloseModal} className="modal-underlay" />
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;
