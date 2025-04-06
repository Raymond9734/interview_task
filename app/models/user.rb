class User < ApplicationRecord
  has_secure_password
  
  has_many :locations, dependent: :destroy
  
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, presence: true, uniqueness: true
  validates :role, presence: true, inclusion: { in: %w[admin user] }
  
  def admin?
    role == 'admin'
  end

  def locations_count
    locations.size
  end
end 