import { IoClose } from "react-icons/io5";

type ModalProps = {
    isOpen: Boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay">
            <article className="modal-wrap">
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    {children}
                </div>
                <button className="modal-close" onClick={onClose}>
                    <IoClose size={40} color="#666"/>
                </button>
            </article>
        </div>
    );
};

export default Modal;