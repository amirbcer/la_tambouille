class Api::V1::RecipesController < ApplicationController
  allow_unauthenticated_access

  # GET /recipes
  def index
    @recipes = Recipe.order(id: :desc).page(params[:page])
  end

  # GET /recipes/:id
  def show
    @recipe = Recipe.find(params[:id])
  end
end
