class Api::V1::SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { render json: { error: "Try again later." }, status: :too_many_requests }

  def show
    @user = Current.user
    if @user
      render "api/v1/sessions/show", status: :ok
    else
      render json: { message: "Unauthorized access." }, status: :unauthorized
    end
  end

  def create
    @user = User.authenticate_by(params.permit(:email_address, :password))
    if @user
      start_new_session_for @user
      render "api/v1/sessions/show", status: :ok
    else
      render json: { message: "Unauthorized access." }, status: :unauthorized
    end
  end

  def destroy
    terminate_session
    render json: { message: "Successfully logged out." }
  end
end
