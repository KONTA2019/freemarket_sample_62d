Rails.application.routes.draw do

  root 'items#index'
  devise_scope :user do
    get "/sign_in" => "devise/sessions#new" # login/sign_inへのカスタムパス
    get "/sign_up" => "devise/registrations#new", as: "new_user_registration" # sign_up/registrationへのカスタムパス
  end
  devise_for :users
  resources :items
  resources :users, only: [:edit, :update, :show, :destroy,] do
    member do 
      get :logout
      get 'card',to: 'cards#show'
      get :nocard
    end
    resources :items, only: [:new]
  end

  resources :cards, only: [:index, :new, :show] do
    collection do
      post 'show', to: 'cards#show'
      post 'pay', to: 'cards#pay'
      post 'delete', to: 'cards#delete'
    end
  end

  # 以下ガイドページ用のルート
  get 'delivery', to: 'guides#delivery'
  get 'price', to: 'guides#price'
  get 'prohibited_item', to: 'guides#prohibited_item'
  get 'prohibited_conduct', to: 'guides#prohibited_conduct'
  get 'counterfeit_goods', to: 'guides#counterfeit_goods'
  get 'seller_terms', to: 'guides#seller_terms'

end
