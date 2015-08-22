Rails.application.routes.draw do
  get 'welcome/index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  devise_for :users, :controllers => { :omniauth_callbacks => 'callbacks' }
  root 'pages#index'

  resources :users

  # Redirect unknown paths to root
  get '*path' => redirect('/') unless Rails.env.development?
end
