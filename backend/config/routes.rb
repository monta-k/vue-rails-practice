Rails.application.routes.draw do
  post 'signin', to: 'signin#create'
  post 'signup', to: 'signup#create'
  delete 'signin', to: 'signin#destroy'
  
  namespace :api do
    namespace :v1 do
      resources :artists
      resources :records
    end
  end
end
