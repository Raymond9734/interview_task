class LocationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_location, only: [:show, :edit, :update, :destroy]
  before_action :authorize_user, only: [:edit, :update, :destroy]

  def index
    # Add debug logs
    Rails.logger.debug "Current user: #{current_user.inspect}"
    
    all_locations = Location.all.includes(:user)
    @user_locations = all_locations.where(user: current_user)
    @other_locations = all_locations.where.not(user: current_user)
    
    Rails.logger.debug "User locations: #{@user_locations.inspect}"
    Rails.logger.debug "Other locations: #{@other_locations.inspect}"
    
    render inertia: 'Locations/Index', props: { 
      user_locations: @user_locations.as_json(include: { user: { only: [:id, :username, :role] } }),
      other_locations: @other_locations.as_json(include: { user: { only: [:id, :username, :role] } }),
      user: current_user
    }
  end

  def show
    @location = Location.includes(:user).find(params[:id])
    all_locations = Location.all.includes(:user)
    render inertia: 'Locations/Show', props: { 
      location: @location.as_json(include: { user: { only: [:id, :username, :role] } }),
      user: current_user,
      allLocations: all_locations.as_json(include: { user: { only: [:id, :username, :role] } })
    }
  end

  def new
    all_locations = Location.all.includes(:user)
    render inertia: 'Locations/New', props: {
      user: current_user,
      allLocations: all_locations.as_json(include: { user: { only: [:id, :username, :role] } })
    }
  end

  def create
    location = current_user.locations.build(location_params)
    
    if location.save
      redirect_to locations_path, notice: 'Location was successfully created.'
    else
      render inertia: 'Locations/New', 
             props: { 
               errors: location.errors.messages,
               location: location_params,
               user: current_user
             }, 
             status: :unprocessable_entity
    end
  end

  def edit
    @location = Location.includes(:user).find(params[:id])
    all_locations = Location.all.includes(:user)
    render inertia: 'Locations/Edit', props: { 
      location: @location.as_json(include: { user: { only: [:id, :username, :role] } }),
      user: current_user,
      allLocations: all_locations.as_json(include: { user: { only: [:id, :username, :role] } })
    }
  end

  def update
    if @location.update(location_params)
      redirect_to locations_path, notice: 'Location was successfully updated.'
    else
      render inertia: 'Locations/Edit', 
             props: { 
               errors: @location.errors.messages,
               location: @location,
               user: current_user
             }, 
             status: :unprocessable_entity
    end
  end

  def destroy
    @location.destroy
    redirect_to locations_path, notice: 'Location was successfully deleted.'
  end

  private

  def set_location
    @location = Location.find(params[:id])
  end

  def location_params
    params.require(:location).permit(:name, :latitude, :longitude)
  end

  def authorize_user
    unless @location.user == current_user || current_user.admin?
      redirect_to locations_path, alert: 'You are not authorized to perform this action.'
    end
  end
end 