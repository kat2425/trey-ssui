class SessionsController < ApplicationController
  def create
    user_info = request.env['omniauth.auth']

    if user = User[:username => user_info[:info][:email]]
      warden.set_user user

      session[:avatar] = user_info[:info][:image]
      redirect_to('/r')
    else
      redirect_to("/login?auth=nouser&username=#{user_info[:info][:email]}")
    end
  end
end
