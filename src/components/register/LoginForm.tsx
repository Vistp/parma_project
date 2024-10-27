import { Context } from 'main';
import { observer } from 'mobx-react-lite';
import { FC, useContext, useState } from 'react';

export const LoginForm: FC = observer(() => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { regStore } = useContext(Context);

  return (
    <div>
      <input 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        type="text" 
        placeholder="Email" 
      />
      <input 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        type="password" 
        placeholder="Пароль" 
      />
      <button onClick={() => regStore.login(email, password)}>
        Логин
      </button>
      <button onClick={() => regStore.registration(email, password)}>
        Регистрация
      </button>
    </div>
  );
});
