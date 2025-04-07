class SessionsController < ApplicationController
  def new
    if current_user
      redirect_to home_path
    else
      render inertia: "Auth/Login"
    end
  end

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to home_path, notice: "Logged in successfully!"
    else
      render inertia: "Auth/Login",
             props: {
               errors: { email: [ "Invalid email or password" ] },
               email: params[:email]
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "Logged out successfully!"
  end
end
