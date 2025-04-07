# DashboardController handles administrative actions related to user management.
# Only authenticated admin users can access its actions.
class DashboardController < ApplicationController
  # Ensure the user is logged in
  before_action :authenticate_user!
  # Ensure the user has admin privileges
  before_action :require_admin

  # GET /dashboard
  # Displays a paginated, searchable list of users along with current user info.
  def index
    page = params[:page] || 1
    per_page = params[:per_page] || 10

    users = User.all.includes(:locations)
                .search_by_term(params[:search])

    total_count = users.count

    paginated_users = users.offset((page.to_i - 1) * per_page.to_i)
                          .limit(per_page.to_i)
    # Render the Dashboard/Index Inertia page with props
    render inertia: "Dashboard/Index", props: {
      users: paginated_users.as_json(methods: [ :locations_count ], except: [ :password_digest ]),
      user: current_user.as_json(methods: [ :locations_count ], except: [ :password_digest ]),
      pagination: {
        total: total_count,
        per_page: per_page.to_i,
        current_page: page.to_i,
        total_pages: (total_count.to_f / per_page.to_i).ceil
      }
    }
  end

  # DELETE /dashboard/users/:id
  # Deletes a non-admin user. Admin users cannot be deleted.
  def destroy_user
    user = User.find(params[:id])

    if user.admin?
      redirect_to dashboard_path, alert: "Cannot delete admin users."
    else
      user.destroy
      redirect_to dashboard_path, notice: "User was successfully deleted."
    end
  end

  private

  def require_admin
    unless current_user.admin?
      redirect_to root_path, alert: "You are not authorized to access this page."
    end
  end
end
