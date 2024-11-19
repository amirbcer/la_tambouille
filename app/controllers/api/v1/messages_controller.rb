class Api::V1::MessagesController < ApplicationController
  before_action :set_chat

  def create
    @message = @chat.messages.new(message_params.merge(user: current_user))

    if @message.save
      message = @message.to_json_data
      ChatChannel.broadcast_to(@chat, message)

      render json: message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private

    def set_chat
      @chat = Chat.find_by(recipe_id: params[:recipe_id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Chat not found" }, status: :not_found
    end

    def message_params
      params.require(:message).permit(:content)
    end
end
