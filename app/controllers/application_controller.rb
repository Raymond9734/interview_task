class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_current_user

  private

  def set_current_user
    @current_user = User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def current_user
    @current_user
  end
  helper_method :current_user

  def authenticate_user!
    unless current_user
      redirect_to login_path, alert: 'You need to sign in to access this page.'
    end
  end
  helper_method :authenticate_user!
end
