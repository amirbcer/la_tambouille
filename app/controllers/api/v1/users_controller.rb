class Api::V1::UsersController < ApplicationController
  allow_unauthenticated_access only: [ :create ]
  before_action :set_user, only: [ :update_password ]

  # POST /users
  def create
    if User.exists?(email_address: user_params[:email_address])
      return render json: { error: "Email has already been taken" }, status: :unprocessable_entity
    end

    @user = User.new(user_params)

    if @user.save
      render "api/v1/users/create", status: :created
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  # PATCH /users/:id/password
  def update_password
    unless valid_user_and_password?
      return render json: { error: "Unauthorized or invalid current password." }, status: :unauthorized
    end

    unless passwords_match?
      return render json: { error: "New password and confirmation do not match." }, status: :unprocessable_entity
    end

    if @user.update(password: password_params[:new_password])
      render json: { message: "Password updated successfully." }, status: :ok
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def valid_user_and_password?
      @user == Current.user && @user.authenticate(password_params[:password])
    end

    def passwords_match?
      password_params[:new_password] == password_params[:password_confirmation]
    end

    def user_params
      params.require(:user).permit(:name, :email_address, :password, :password_confirmation)
    end

    def password_params
      params.permit(:password, :new_password, :password_confirmation)
    end
end
