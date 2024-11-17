class Api::V1::UserRecipesController < ApplicationController
  before_action :set_user
  before_action :set_recipe, only: %i[show update destroy]
  before_action :authorize_user

  # GET /api/v1/users/:user_id/recipes
  def index
    @total = @user.recipes.count
    @recipes = @user.recipes.order(id: :desc).page(params[:page])
  end

  # POST /api/v1/users/:user_id/recipes
  def create
    @recipe = @user.recipes.build(recipe_params)
    if @recipe.save
      render "api/v1/user_recipes/show", status: :created
    else
      render json: { errors: recipe.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/users/:user_id/recipes/:id
  def update
    if @recipe.update(recipe_params)
      render "api/v1/user_recipes/show", status: :ok
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
      params.require(:recipe).permit(:title, :content, :picture)
    end
end
