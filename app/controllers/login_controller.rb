class LoginController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout 'default'

  def index
    save_previous_url
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

  def save_previous_url 
    previous_url = URI(request.referer || '/r').path

    if previous_url.start_with?('/reset')
      previous_url = '/r'
    end

    session[:previous_url] = previous_url
  end
end
