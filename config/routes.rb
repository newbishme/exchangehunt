Rails.application.routes.draw do
  get 'search', to: 'search#search'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  get 'support' => 'pages#support'

  get 'privacy_policy' => 'pages#privacy_policy'
  get 'faq' => 'pages#help'
  get 'help' => 'pages#help'
  get 'about' => 'pages#about'
  get 'home' => 'pages#index'
  get 'welcome/index'

  get 'heartbeat' => 'application#heartbeat'

  devise_for :users, :controllers => { :omniauth_callbacks => 'callbacks' }
  root 'pages#index'

  get 'users/username/:id', to: 'users#username'
  get 'institutions/mapping', to: 'institutions#mapping'
  get 'institutions/:id/connections/:userid', to: 'institutions#user_institution_connections'

  get 'confirm', to: 'users#confirm'
  post 'resend_confirmation', to: 'users#resend_confirmation'
  resources :users

  get 'institutions/:id/recently_joined', to: 'institutions#recently_joined'
  get 'institutions/:id/home_users', to: 'institutions#home_users'
  get 'institutions/:id/exchange_users', to: 'institutions#exchange_users'
  resources :institutions

  resources :messages, only: [:new, :create]

  resources :conversations, only: [:index, :show, :destroy] do
    member do
      post :reply
    end
  end

  resources :conversations, only: [:index, :show, :destroy] do
    member do
      post :restore
    end
  end

  resources :conversations, only: [:index, :show, :destroy] do
    collection do
      delete :empty_trash
    end
  end

  resources :conversations, only: [:index, :show, :destroy] do
    member do
      post :mark_as_read
    end
  end


end
