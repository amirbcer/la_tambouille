class Api::V1::ChatsController < ApplicationController
  before_action :set_recipe

  def show
    @chat = @recipe.chat || @recipe.create_chat
    render "api/v1/chats/show"
  end

  private
    def set_recipe
      @recipe = Recipe.find(params[:recipe_id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Recipe not found" }, status: :not_found
    end
end
