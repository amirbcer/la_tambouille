class Api::V1::SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { render json: { error: "Try again later." }, status: :too_many_requests }

  def create
    if @user = User.authenticate_by(email_address: user_params[:email_address], password: user_params[:password])
      start_new_session_for @user
      render "api/v1/sessions/create", status: :ok
    else
      render json: { message: "Unauthorized access." }, status: :unauthorized
    end
  end

  def destroy
    terminate_session
    render json: { message: "Successfully logged out." }
  end

  private
    def user_params
      params.require(:user).permit(:email_address, :password)
    end
end
