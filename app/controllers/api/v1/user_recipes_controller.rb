class Api::V1::UserRecipesController < ApplicationController
  before_action :set_user
  before_action :authorize_user
  before_action :set_recipe, only: %i[ show destroy ]

  # GET /api/v1/users/:user_id/recipes
  def index
    render json: @user.recipes, status: :ok
  end

  # GET /api/v1/users/:user_id/recipes/:id
  def show
    render json: @recipe, status: :ok
  end

  # POST /api/v1/users/:user_id/recipes
  def create
    recipe = @user.recipes.build(recipe_params)
    if recipe.save
      render json: recipe, status: :created
    else
      render json: { errors: recipe.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/users/:user_id/recipes/:id
  def destroy
    if @recipe.destroy
      head :no_content
    else
      render json: { error: "Failed to delete recipe" }, status: :unprocessable_entity
    end
  end

  private

    def set_user
      @user = User.find(params[:user_id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "User not found" }, status: :not_found
    end

    def set_recipe
      @recipe = @user.recipes.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Recipe not found" }, status: :not_found
    end

    def authorize_user
      render json: { error: "Unauthorized" }, status: :forbidden unless @user == current_user
    end

    def recipe_params
      params.require(:recipe).permit(:title, :picture, :description, ingredients: [], steps: [])
    end
end
