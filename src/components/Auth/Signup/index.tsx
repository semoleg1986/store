import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_BUYER, CREATE_USER } from '../../../graphql/mutation/auth';
import { Button, FormContainer, Input } from '../../Form/Form.styled';

function Signup() {
  const [createUser] = useMutation(CREATE_USER);
  const [createBuyer] = useMutation(CREATE_BUYER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showBuyerFields, setShowBuyerFields] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
      if (!showBuyerFields) {
        const { data } = await createUser({
          variables: { email, password, username },
        });
        const createdUserId = data.createUser.user.id;
        setUserId(createdUserId);
        console.log(createdUserId);

        setShowBuyerFields(true);
        // Handle success or perform any other actions
      } else {
        const buyerData = await createBuyer({
          variables: {
            name,
            surname,
            phoneNumber,
            address,
            userId,
          },
        });
        console.log(buyerData);
        navigate('/stock');

        setName('');
        setSurname('');
        setPhoneNumber('');
        setAddress('');

        setShowBuyerFields(false);
      }
    } catch (error) {
      console.error(error);
      // Handle error or display an error message
    }
  };

  return (
    <div>
      <FormContainer>
        {!showBuyerFields && (
          <>
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </>
        )}

        {showBuyerFields && (
          <>
            <Input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <Input
              type="text"
              placeholder="phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </>
        )}
        <Button onClick={handleCreateUser}>{showBuyerFields ? 'Create Buyer' : 'Sign Up'}</Button>
      </FormContainer>
    </div>
  );
}

export default Signup;
