class RegistrationsController < ApplicationController
  # Redirect logged-in users to home, otherwise render the registration page
  def new
    if current_user
      redirect_to home_path
    else
      render inertia: "Auth/Register"
    end
  end

  # Handle user registration form submission
  def create
    user = User.new(user_params)

    if user.save
      session[:user_id] = user.id
      redirect_to home_path, notice: "Account created successfully!"
    else
      render inertia: "Auth/Register",
             props: {
               errors: user.errors.messages,
               user: user_params
             },
             status: :unprocessable_entity
    end
  end

  private

  # Strong parameters: securely extract only the allowed fields
  def user_params
    # Try to get parameters from either the registration namespace or root level
    params_to_use = if params[:registration]
                      params[:registration].permit(:email, :username, :password, :password_confirmation, :role)
    else
                      params.permit(:email, :username, :password, :password_confirmation, :role)
    end

    # Ensure role is either 'user' or 'admin', default to 'user'
    params_to_use[:role] = params_to_use[:role].in?(%w[user admin]) ? params_to_use[:role] : "user"
    params_to_use
  end
end
