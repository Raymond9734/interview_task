class User < ApplicationRecord
  has_secure_password

  has_many :locations, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, presence: true, uniqueness: true
  validates :role, presence: true, inclusion: { in: %w[admin user] }

  def admin?
    role == "admin"
  end

  def locations_count
    locations.size
  end

  scope :search_by_term, ->(term) {
    return all unless term.present?

    search_term = "%#{term}%"

    if ActiveRecord::Base.connection.adapter_name.downcase == "postgresql"
      where("username ILIKE ? OR email ILIKE ?", search_term, search_term)
    else
      where("LOWER(username) LIKE LOWER(?) OR LOWER(email) LIKE LOWER(?)", search_term, search_term)
    end
  }
end
