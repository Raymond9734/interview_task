class LocationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_location, only: [:show, :edit, :update, :destroy]
  before_action :authorize_user, only: [:edit, :update, :destroy]

  def index
    locations = Location.all.includes(:user)
    render inertia: 'Locations/Index', props: { locations: locations }
  end

  def show
    render inertia: 'Locations/Show', props: { location: @location }
  end

  def new
    render inertia: 'Locations/New'
  end

  def create
    location = current_user.locations.build(location_params)
    
    if location.save
      redirect_to locations_path, notice: 'Location was successfully created.'
    else
      render inertia: 'Locations/New', 
             props: { 
               errors: location.errors.messages,
               location: location_params
             }, 
             status: :unprocessable_entity
    end
  end

  def edit
    render inertia: 'Locations/Edit', props: { location: @location }
  end

  def update
    if @location.update(location_params)
      redirect_to locations_path, notice: 'Location was successfully updated.'
    else
      render inertia: 'Locations/Edit', 
             props: { 
               errors: @location.errors.messages,
               location: @location
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