# For details on the DSL available within this file, see:
# http://guides.rubyonrails.org/routing.html

Rails.application.routes.draw do
  use_doorkeeper

  root 'login#index'

  # status checks
  get 'status'    => 'status#index'
  get 'status/db' => 'status#db'

  # Sessions/Auth
  get  'login'                                  => 'login#index'
  post 'login'                                  => 'login#warden_login'
  get  '/session/logout'                        => 'login#warden_logout'
  get  '/session/info'                          => 'login#session_info'
  get  '/personas/switch/:id'                   => 'login#persona_change'
  post '/impersonate/:id'                       => 'login#impersonate'
  get '/unimpersonate'                         => 'login#unimpersonate'

  # Google OmniAuth
  get '/auth/google_oauth2/callback'            => 'sessions#create'

  # Legacy Hooks
  get '/legacy/useradmin'                       => 'legacy#useradmin'
  get '/legacy/settings'                        => 'legacy#settings'
  get '/legacy/voice_admin'                     => 'legacy#voice_admin'

  # Redirects
  get '/redirects/learning_lab'                 => 'redirects#learning_lab'
  get 'reset'                                   => 'reset#index'
  get 'reset/*path'                             => 'reset#index'
  get 'home'                                    => redirect('/r')
  get '/r'                                      => 'home#index'
  get '/r/*path'                                => 'home#index'

  get '/verification/*path'                     => 'verification#index'
  get '/verification'                           => 'verification#index'

   # Mobile redirect route
  get '/mobile/verification/:potential_user_id' => 'verification#mobile'
end
