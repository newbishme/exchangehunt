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

  get 'confirm', to: 'users#confirm'
  resources :users

  get 'institutions/:id/recently_joined', to: 'institutions#recently_joined'
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
