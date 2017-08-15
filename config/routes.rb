# For details on the DSL available within this file, see:
# http://guides.rubyonrails.org/routing.html

Rails.application.routes.draw do
  use_doorkeeper

  root 'login#index'

  # Sessions/Auth
  get 'login'  => 'login#index'
  post 'login' => 'login#warden_login'
  get 'logout' => 'login#warden_logout'
  get 'info'   => 'login#info'


  # React UserApp
  get 'home'     => redirect('/r')
  get '/r'       => 'home#index'
  get '/r/*path' => 'home#index'
end
