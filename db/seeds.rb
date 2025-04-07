# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear existing data
puts "Clearing existing data..."
Location.destroy_all
User.destroy_all

# Create an admin user
puts "Creating admin user..."
admin = User.create!(
  email: 'admin@example.com',
  username: 'admin',
  password: 'password123',
  role: 'admin'
)

# Kenya's major cities and points of interest with their coordinates
KENYA_LOCATIONS = [
  { name: "Nairobi", lat: -1.2921, lng: 36.8219 },
  { name: "Mombasa", lat: -4.0435, lng: 39.6682 },
  { name: "Kisumu", lat: -0.1022, lng: 34.7617 },
  { name: "Nakuru", lat: -0.3031, lng: 36.0800 },
  { name: "Eldoret", lat: 0.5143, lng: 35.2698 },
  { name: "Malindi", lat: -3.2138, lng: 40.1169 },
  { name: "Thika", lat: -1.0396, lng: 37.0900 },
  { name: "Kitale", lat: 1.0187, lng: 35.0062 },
  { name: "Garissa", lat: -0.4536, lng: 39.6401 },
  { name: "Kakamega", lat: 0.2827, lng: 34.7519 },
  { name: "Mount Kenya", lat: -0.1521, lng: 37.3084 },
  { name: "Lake Nakuru", lat: -0.3666, lng: 36.0833 },
  { name: "Masai Mara", lat: -1.5000, lng: 35.1833 },
  { name: "Amboseli National Park", lat: -2.6527, lng: 37.2606 },
  { name: "Tsavo East National Park", lat: -2.7833, lng: 38.4667 }
]

# Helper method to create location with unique name
def create_unique_location(user, base_location, attempt = 0)
  lat_variation = rand(-0.4..0.4)
  lng_variation = rand(-0.4..0.4)
  
  suffix = attempt == 0 ? "" : " #{attempt}"
  name = "#{user.username}'s #{base_location[:name]} Point#{suffix}"
  
  begin
    Location.create!(
      name: name,
      latitude: base_location[:lat] + lat_variation,
      longitude: base_location[:lng] + lng_variation,
      user: user
    )
  rescue ActiveRecord::RecordInvalid => e
    if e.message.include?('Name has already been taken')
      # Try again with incremented suffix
      create_unique_location(user, base_location, attempt + 1)
    elsif e.message.include?('Latitude and longitude combination already exists')
      # Try again with new random variations
      create_unique_location(user, base_location, attempt)
    else
      raise e
    end
  end
end

# Create 50 regular users with random locations
puts "Creating 50 users with random locations..."
50.times do |i|
  # Create user
  user = User.create!(
    email: "user#{i+1}@example.com",
    username: "user#{i+1}",
    password: 'password123',
    role: 'user'
  )
  
  # Create 1-3 random locations for each user
  rand(1..3).times do
    base_location = KENYA_LOCATIONS.sample
    create_unique_location(user, base_location)
  end
end

# Create some locations for admin
3.times do
  base_location = KENYA_LOCATIONS.sample
  create_unique_location(admin, base_location)
end

puts "Seed completed!"
puts "Created:"
puts "- 1 admin user (email: admin@example.com, password: password123)"
puts "- 50 regular users (email: userN@example.com, password: password123)"
puts "- #{Location.count} locations"
