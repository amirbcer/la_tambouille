class Chat < ApplicationRecord
  belongs_to :recipe
  has_many :messages, dependent: :destroy

  validates :recipe, uniqueness: true
end
