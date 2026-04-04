Rails.application.routes.draw do
  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  root "boards#index"

  resources :boards do
    resources :tasks, except: [:index] do
      member do
        patch :update_status
      end
      resources :assignments, only: [:create, :destroy]
    end
  end
end
