class Api::V1::UsersController < ApplicationController
  allow_unauthenticated_access

  # POST /users
  def create
    if User.exists?(email_address: user_params[:email_address])
      return render json: { error: "Email has already been taken" }, status: :unprocessable_entity
    end

    user = User.new(user_params)

    if user.save
      render json: user, status: :created
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  private
    def user_params
      params.require(:user).permit(:email_address, :password, :password_confirmation)
    end
end
