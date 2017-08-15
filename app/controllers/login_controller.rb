class LoginController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout 'login'

  def index
  end

  def warden_login
    authenticate
    redirect_to '/home'
  end

  def warden_logout
    logout
    redirect_to :login
  end

  def info
    # login
    authenticate!
    # authenticate!
    # binding.pry
  end

  def failed
    redirect_to :login
  end
end
