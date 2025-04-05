class HomeController < ApplicationController
  before_action :authenticate_user!
  
  def index
    locations = Location.all.includes(:user)
    render inertia: 'Home/Index', props: { 
      locations: locations.as_json(include: { user: { only: [:id, :username, :role] } }),
      user: current_user
    }
  end
end 