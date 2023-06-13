import { useNavigate } from 'react-router-dom';

function OrderPlaced() {
  const navigate = useNavigate();
  const handleToOrderList = () => {
    navigate('/order-list');
  };
  return (
    <div>
      <h3>Ваш заказ успешно оформлен</h3>
      <button type="button" onClick={handleToOrderList}>
        Перейти к списку заказов
      </button>
    </div>
  );
}

export default OrderPlaced;
