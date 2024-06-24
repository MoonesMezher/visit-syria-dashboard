import './ConfirmDelete.css';

const ConfirmaDelete = ({ onDelete, onCancel, message }) => {

  const handleDelete = () => {
    onDelete();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className='BY_ConfirmaDelete-overlay'>
      <div className="BY_confirmDelete">
        <div className="dialog-content">
          <h2>تأكيد عملية الحذف</h2>
          <p>{message}</p>
          <div className="button-group">
            <button className="delete-button" onClick={handleDelete}>
              حذف
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              إلغاء
            </button>
          </div>
        </div>

      </div>
    </div>

  );
};

export default ConfirmaDelete;