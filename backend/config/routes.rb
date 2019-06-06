Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :artists do
        resources :records
      end
    end
  end

  post 'refresh', to: 'refresh#create'
  post 'signin', to: 'signin#create'
  post 'signup', to: 'signup#create'
  delete 'signin', to: 'signin#destroy'
end
