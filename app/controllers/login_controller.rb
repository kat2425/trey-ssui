class LoginController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout 'default'

  def index
    redirect_to '/home' if user
  end

  def warden_login
    authenticate
    redirect_to '/home'
  end

  def warden_logout
    logout
    cookies.delete 'ss_session'

    if Rails.env == 'production'
      redirect_to 'https://secure.schoolstatus.com/back_to_core'
    else
      redirect_to :login
    end
  end

  def session_info
    render :json => session.to_json
  end

  def failed
    render :index, :status => 401
  end
end
