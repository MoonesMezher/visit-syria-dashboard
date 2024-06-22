import editIcon from './../../../assets/icons/PencilSimpleLine.svg';
import trashIcon from './../../../assets/icons/Trash.svg';

const ActionButtons = ({ onDelete, onEdit, itemId }) => {
    return (
        <>
            <td><a href="#" onClick={(e) => { e.preventDefault(); onEdit(itemId); }}><img src={editIcon} alt="Edit" /></a></td>
            <td><a href="#" onClick={(e) => { e.preventDefault(); onDelete(itemId); }}><img src={trashIcon} alt="Delete" /></a></td>
        </>
    );
};

export default ActionButtons;