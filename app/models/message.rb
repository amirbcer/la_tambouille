class Message < ApplicationRecord
  belongs_to :chat
  belongs_to :user

  validates :content, presence: true

  def to_json_data
    {
      id: id,
      content: content,
      date: created_at,
      author: user.name
    }
  end
end
