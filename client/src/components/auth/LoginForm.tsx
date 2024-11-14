import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Card, Input } from 'react-daisyui';
import { LoginParams } from '../../models/Auth';

interface LoginFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (params: LoginParams) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const [input, setInput] = useState<LoginParams>({
    email_address: '',
    password: '',
  });

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.email_address || !input.password) return;

    onSubmit(input);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={submitLogin}>
      <Card className="flex flex-col w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <Card.Body className="w-full font-semibold text-lg">
          <Card.Title className="text-2xl font-bold justify-center flex mb-6">Connexion</Card.Title>

          <div className="w-full mb-4">
            <label htmlFor="email_address" className="label">
              <span className="text-sm font-medium text-gray-700 ">Adresse email</span>
            </label>
            <Input
              type="email"
              id="email_address"
              name="email_address"
              placeholder="Entrez votre email"
              className="w-full px-4 py-2"
              required
              onChange={handleInput}
            />
          </div>

          <div className="w-full mb-6">
            <label htmlFor="email" className="label">
              <span className="text-sm font-medium text-gray-700 ">Mot de passe</span>
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-2"
              required
              onChange={handleInput}
            />
          </div>

          <Card.Actions className="w-full space-y-2">
            <Button className=" bg-blue-500 hover:bg-blue-600 w-full text-white font-bold">Se connecter</Button>
            <p className="text-sm text-gray-500 font-medium">
              Pas encore de compte ?
              <a href="/register" className="font-medium text-blue-500 hover:underline m-2">
                Clique ici
              </a>
            </p>
          </Card.Actions>
        </Card.Body>
      </Card>
    </form>
  );
}

export default LoginForm;
