Rails.application.routes.draw do
  get 'signin/create'
  get 'signin/destroy'
  namespace :api do
    namespace :v1 do
      resources :artists
      resources :records
    end
  end
end
