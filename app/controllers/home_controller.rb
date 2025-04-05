class HomeController < ApplicationController
  before_action :authenticate_user!
  
  def index
    locations = Location.all.includes(:user)
    render inertia: 'Home/Index', props: { 
      locations: locations,
      user: current_user
    }
  end
end 