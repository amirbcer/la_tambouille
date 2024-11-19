json.messages @chat.messages.includes(:user) do |message|
  json.id message.id
  json.content message.content
  json.author message.user.name
  json.date message.created_at
end
