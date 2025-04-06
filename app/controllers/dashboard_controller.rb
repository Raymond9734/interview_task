class DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def index
    users = User.all.includes(:locations)
    render inertia: 'Dashboard/Index', props: { 
      users: users.as_json(methods: [:locations_count], except: [:password_digest]),
      user: current_user.as_json(methods: [:locations_count], except: [:password_digest])
    }
  end

  def destroy_user
    user = User.find(params[:id])
    
    if user.admin?
      redirect_to dashboard_path, alert: 'Cannot delete admin users.'
    else
      user.destroy
      redirect_to dashboard_path, notice: 'User was successfully deleted.'
    end
  end

  private

  def require_admin
    unless current_user.admin?
      redirect_to root_path, alert: 'You are not authorized to access this page.'
    end
  end
end 