class ChatChannel < ApplicationCable::Channel
  def subscribed
    chat = Chat.find_by(recipe_id: params[:recipe_id])
    if chat
      stream_for chat
    else
      reject
    end
  end

  def unsubscribed
    # Toute logique à exécuter lors de la déconnexion
  end
end
