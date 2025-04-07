class Location < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, uniqueness: true
  validates :latitude, presence: true, numericality: { greater_than_or_equal_to: -90, less_than_or_equal_to: 90 }
  validates :longitude, presence: true, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }
  validates :latitude, uniqueness: { scope: :longitude, message: "and longitude combination already exists" }


  scope :search_by_term, ->(term) {
    return all unless term.present?

    search_term = "%#{term}%"

    # Conditional logic to handle different database adapters ( PostgreSQL or sQlite)
    if ActiveRecord::Base.connection.adapter_name.downcase == "postgresql"
      where("name ILIKE ? OR latitude::text ILIKE ? OR longitude::text ILIKE ?",
            search_term, search_term, search_term)
    else
      where("LOWER(name) LIKE LOWER(?) OR LOWER(CAST(latitude AS TEXT)) LIKE LOWER(?) OR LOWER(CAST(longitude AS TEXT)) LIKE LOWER(?)",
            search_term, search_term, search_term)
    end
  }
end
