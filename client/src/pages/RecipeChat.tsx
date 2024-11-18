import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card, Input } from 'react-daisyui';
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate, useParams } from 'react-router-dom';
import { Message } from '../models/Message';
import { chatService } from '../services/ChatService';

function RecipeChat() {
  const { id: recipeId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollToEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => scrollToEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  const initWebSocket = useCallback(() => {
    const ws = new WebSocket(`ws://localhost:3000/cable`);
    console.log('Connected to WebSocket for recipe', recipeId);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: JSON.stringify({
            channel: 'ChatChannel',
            recipe_id: recipeId,
          }),
        }),
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'ping') return;
      if (data.type === 'welcome') return;
      if (data.type === 'confirm_subscription') return;

      setMessages((messages) => [...messages, data.message]);
    };

    wsRef.current = ws;
  }, [recipeId]);

  const sendMessage = async () => {
    if (!newMessage || !recipeId) return;

    const message = {
      content: newMessage,
    } as Message;

    await chatService.createMessage(message, +recipeId);

    setNewMessage('');
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    try {
      if (!recipeId || isNaN(Number(recipeId))) {
        throw new Error('Invalid ID provided');
      }

      const initChat = async () => {
        const messages = await chatService.initChat(+recipeId);
        setMessages(messages);
        initWebSocket();
      };

      initChat();

      return () => {
        wsRef.current?.close();
      };
    } catch (err) {
      console.error(err);
      navigate('/recipes');
    }
  }, [recipeId, initWebSocket, navigate]);

  return (
    <div className="flex flex-col m-12 w-1/2 ">
      <div className="flex flex-row justify-between items-center mb-5 p-2">
        <h1 className="text-2xl font-semibold">Chat en direct</h1>
        <Button
          onClick={() => {
            navigate(`/recipes/${recipeId}`);
          }}
          color="info"
          size="sm"
          className="text-white"
        >
          <TiArrowBack className="text-xl" />
          Retour à la recette
        </Button>
      </div>
      <Card className="h-[75vh]">
        <Card.Body className="bg-white  w-full h-full rounded-xl border-gray-200 border-2 ">
          <div className="flex flex-col space-y-4 p-5 overflow-y-auto h-full">
            {messages.map((message) => (
              <div key={message.id} className="space-y-1 mb-2">
                <div className="flex flex-row justify-start items-center space-x-3">
                  <span className="font-medium text-end whitespace-nowrap">{message.author}</span>
                  <span className="text-sm text-gray-500">{formatDate(message.date)}</span>
                </div>
                <div className="flex text-start p-3 rounded-lg bg-gray-200 max-w-max">
                  <span>{message.content}</span>
                </div>
              </div>
            ))}
            <div ref={scrollToEndRef} />
          </div>

          <div className="flex items-center w-full border-t pt-5">
            <Input
              placeholder="Ton message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="flex grow bg-gray-100"
            />
            <Button onClick={sendMessage} color="info" className="ml-2 px-4 text-white">
              Envoyer
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecipeChat;
