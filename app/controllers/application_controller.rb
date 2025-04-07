# ApplicationController serves as the base class for all controllers
# It includes InertiaRails to integrate Inertia.js with Rails.
class ApplicationController < ActionController::Base
  include InertiaRails::Controller

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Set up before actions to configure user and flash messages
  before_action :set_current_user
  before_action :set_flash_messages

  private

  # Set up before actions to configure user and flash messages
  def set_current_user
    @current_user = User.find_by(id: session[:user_id]) if session[:user_id]
  end

  # Getter method for current_user, making it available in views and helpers
  def current_user
    @current_user
  end
  helper_method :current_user

  # Ensure the user is authenticated before accessing certain pages
  def authenticate_user!
    unless current_user
      redirect_to login_path, alert: "You need to sign in to access this page."
    end
  end
  helper_method :authenticate_user!

  # Set flash messages to be used with Inertia.js rendering
  def set_flash_messages
    # Use Inertia's built-in flash handling
    flash.now[:notice] = flash[:notice]
    flash.now[:alert] = flash[:alert]
    flash.now[:error] = flash[:error]
  end
end
