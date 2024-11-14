json.token Current.session.token
json.user do
  json.id @user.id
  json.email @user.email_address
  json.name @user.name
end
