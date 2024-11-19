class Recipe < ApplicationRecord
  belongs_to :user

  has_one_attached :picture
  has_rich_text :content
  has_one :chat, dependent: :destroy
end
