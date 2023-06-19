import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/styles/Form.styled';

function OrderPlaced() {
  const navigate = useNavigate();
  const handleToOrderList = () => {
    navigate('/order-list');
  };
  return (
    <div>
      <h3>Ваш заказ успешно оформлен</h3>
      <Button type="button" onClick={handleToOrderList}>
        Перейти к списку заказов
      </Button>
    </div>
  );
}

export default OrderPlaced;
