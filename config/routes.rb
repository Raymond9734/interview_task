Rails.application.routes.draw do
  # Authentication routes
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  
  get 'register', to: 'registrations#new'
  post 'register', to: 'registrations#create'
  
  # Location routes
  resources :locations
  
  # Admin dashboard routes
  get 'dashboard', to: 'dashboard#index'
  delete 'dashboard/users/:id', to: 'dashboard#destroy_user', as: :destroy_user
  
  # Root path is now login
  root 'sessions#new'
  
  # Home page for authenticated users
  get 'home', to: 'home#index', as: :home
  
  # Health check route
  get "up" => "rails/health#show", as: :rails_health_check

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
