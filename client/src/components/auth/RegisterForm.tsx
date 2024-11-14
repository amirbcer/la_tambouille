import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Card, Input } from 'react-daisyui';
import { RegisterParams } from '../../models/Auth';

interface RegisterFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (params: RegisterParams) => void;
}

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [input, setInput] = useState({
    email_address: '',
    password: '',
    password_confirmation: '',
    name: '',
  });

  const [error, setError] = useState<string | null>(null);

  const submitRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.password !== input.password_confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setError(null);
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
    <form onSubmit={submitRegister}>
      <Card className="flex flex-col w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <Card.Body className="w-full font-semibold text-lg">
          <Card.Title className="text-2xl font-bold justify-center flex mb-6">Inscription</Card.Title>
          <div className="w-full mb-4">
            <label htmlFor="email" className="label">
              <span className="text-sm font-medium text-gray-700">Adresse email</span>
            </label>
            <Input
              id="email_address"
              name="email_address"
              type="email"
              placeholder="Entrez votre email"
              className="w-full px-4 py-2"
              required
              onChange={handleInput}
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="email" className="label">
              <span className="text-sm font-medium text-gray-700">Mot de passe</span>
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-2"
              required
              onChange={handleInput}
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="email" className="label">
              <span className="text-sm font-medium text-gray-700">Confirmer le mot de passe</span>
            </label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              placeholder="Confirmer le mot de passe"
              className="w-full px-4 py-2"
              required
              onChange={handleInput}
            />
          </div>
          <div className="w-full mb-6">
            <label htmlFor="email" className="label">
              <span className="text-sm font-medium text-gray-700 ">Nom d'utilisateur</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              className="w-full px-4 py-2"
              required
              onChange={handleInput}
            />
          </div>

          {error && <div className="w-full text-red-500 text-sm mb-4">{error}</div>}

          <Card.Actions className="w-full space-y-2">
            <Button className=" bg-blue-500 hover:bg-blue-600 w-full text-white font-bold">Inscription</Button>
            <p className="text-sm text-gray-500 font-medium">
              Tu as déjà un compte ?
              <a href="/login" className="font-medium text-blue-500 hover:underline m-2">
                Connexion
              </a>
            </p>
          </Card.Actions>
        </Card.Body>
      </Card>
    </form>
  );
}

export default RegisterForm;
