# HomeController manages the landing/homepage for authenticated users.
# It loads and renders location data along with associated user details.
class HomeController < ApplicationController
  before_action :authenticate_user!

  # GET /home
  # Renders a list of all locations with their associated user data.
  def index
    locations = Location.all.includes(:user)
    render inertia: "Home/Index", props: {
      locations: locations.as_json(include: { user: { only: [ :id, :username, :role ] } }),
      user: current_user
    }
  end
end
