Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :session, only: %i[show create destroy]
      resources :recipes, only: %i[index show] do
        resource :chat, only: %i[show] do
          resources :messages, only: %i[create]
        end
      end
      resources :users, only: %i[create] do
        resources :recipes, controller: "user_recipes"
        member do
          patch :update_password
        end
      end
    end
  end

  mount ActionCable.server => "/cable"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Serve React app through the home controller in production
  get "*path" => "home#index", constraints: ->(req) { !req.path.start_with?("/rails/") } if Rails.env.production?

  # Defines the root path route ("/")
  # root "home#index"
end
