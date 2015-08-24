Rails.application.routes.draw do
  get 'faq' => 'pages#help'
  get 'help' => 'pages#help'
  get 'about' => 'pages#about'
  get 'home' => 'pages#index'
  get 'institutions/show'
  get 'welcome/index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  devise_for :users, :controllers => { :omniauth_callbacks => 'callbacks' }
  root 'pages#index'

  get 'users/username/:id', to: 'users#username'
  resources :users
end
