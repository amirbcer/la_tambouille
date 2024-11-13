class Api::V1::RecipesController < ApplicationController
  allow_unauthenticated_access
  before_action :set_recipe, only: %i[ show ]

  # GET /recipes
  def index
    @recipes = Recipe.all

    render json: @recipes
  end

  # GET /recipes/1
  def show
    render json: @recipe
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params.expect(:id))
    end
end
