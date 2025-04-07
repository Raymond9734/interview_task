# LocationsController manages CRUD operations for user-created locations.
# It also provides views for personal and public locations, with authorization checks.
class LocationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_location, only: [ :show, :edit, :update, :destroy ]
  before_action :authorize_user, only: [ :edit, :update, :destroy ]


  # GET /locations/:id
  # Shows a single location along with all locations
  def show
    @location = Location.includes(:user).find(params[:id])
    all_locations = Location.all.includes(:user)
    render inertia: "Locations/Show", props: {
      location: @location.as_json(include: { user: { only: [ :id, :username, :role ] } }),
      user: current_user,
      allLocations: all_locations.as_json(include: { user: { only: [ :id, :username, :role ] } })
    }
  end

  # GET /locations/new
  # Renders form to create a new location
  def new
    all_locations = Location.all.includes(:user)
    render inertia: "Locations/New", props: {
      user: current_user,
      allLocations: all_locations.as_json(include: { user: { only: [ :id, :username, :role ] } })
    }
  end

  # POST /locations
  # Handles creation of a new location
  def create
    location = current_user.locations.build(location_params)

    if location.save
      redirect_to locations_path, notice: "Location was successfully created."
    else
      # Convert validation errors to a more user-friendly format
      error_messages = location.errors.full_messages.join(", ")
      render inertia: "Locations/New",
             props: {
               errors: location.errors.messages,
               location: location_params,
               user: current_user,
               flash: {
                 error: error_messages
               }
             },
             status: :unprocessable_entity
    end
  end

  # GET /locations/:id/edit
  # Renders form to edit an existing location
  def edit
    @location = Location.includes(:user).find(params[:id])
    all_locations = Location.all.includes(:user)
    render inertia: "Locations/Edit", props: {
      location: @location.as_json(include: { user: { only: [ :id, :username, :role ] } }),
      user: current_user,
      allLocations: all_locations.as_json(include: { user: { only: [ :id, :username, :role ] } })
    }
  end

  # PATCH/PUT /locations/:id
  # Updates an existing location
  def update
    if @location.update(location_params)
      redirect_to locations_path, notice: "Location was successfully updated."
    else
      render inertia: "Locations/Edit",
             props: {
               errors: @location.errors.messages,
               location: @location,
               user: current_user
             },
             status: :unprocessable_entity
    end
  end

  # DELETE /locations/:id
  # Deletes a location if the user is authorized
  def destroy
    @location.destroy
    redirect_to locations_path, notice: "Location was successfully deleted."
  end

  # GET /locations/my
  # Shows only locations created by the current user
  def my
    render inertia: "Locations/MyLocations", props: {
      user_locations: current_user.locations.as_json(include: { user: { only: [ :id, :username, :role ] } }),
      user: current_user
    }
  end

  # GET /locations/others
  # Shows locations created by users other than the current user
  # Includes search and pagination (4 per page)
  def others
    query = Location.where.not(user: current_user)
                   .includes(:user)
                   .search_by_term(params[:search])

    # Apply pagination with 4 items per page
    per_page = 4
    page = params[:page] || 1
    total_count = query.count

    locations = query.order(created_at: :desc)
                    .offset((page.to_i - 1) * per_page)
                    .limit(per_page)

    render inertia: "Locations/OtherLocations", props: {
      other_locations: locations.as_json(include: { user: { only: [ :id, :username, :role ] } }),
      user: current_user,
      pagination: {
        current_page: page.to_i,
        total: total_count,
        per_page: per_page,
        total_pages: (total_count.to_f / per_page).ceil
      }
    }
  end

  # GET /locations
  # Lists all locations in the system
  def index
    all_locations = Location.all.includes(:user)
    render inertia: "Locations/Index", props: {
      locations: all_locations.as_json(include: { user: { only: [ :id, :username, :role ] } }),
      user: current_user
    }
  end

  private

  # Finds the location based on the ID paramete
  def set_location
    @location = Location.find(params[:id])
  end

  def location_params
    params.require(:location).permit(:name, :latitude, :longitude)
  end

  # Ensures only the location's owner or an admin can edit/update/delete it
  def authorize_user
    unless @location.user == current_user || current_user.admin?
      redirect_to locations_path, alert: "You are not authorized to perform this action."
    end
  end
end
