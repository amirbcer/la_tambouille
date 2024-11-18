Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :session
      resources :passwords, param: :token
      resources :recipes, only: %i[index show] do
        resource :chat, only: %i[show] do
          resources :messages, only: %i[create]
        end
      end
      resources :users, only: %i[create] do
        resources :recipes, controller: "user_recipes"
      end
    end
  end

  mount ActionCable.server => "/cable"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
