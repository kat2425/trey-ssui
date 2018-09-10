class LoginController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout 'default'

  def index
    redirect_to '/home' if user
  end

  def warden_login
    authenticate

    if user
      user.post_login_setup
    end

    redirect_to '/home'
  end

  def warden_logout
    if session[:impersonated]
      unimpersonate
    else
      logout
      cookies.delete 'ss_session'
      cookies.delete 'ss_ui'

      if Rails.env == 'production'
        redirect_to 'https://secure.schoolstatus.com/back_to_core'
      else
        redirect_to :login
      end
    end
  end

  def persona_change
    authenticate # a user can't switch personas if they aren't logged in

    if (new_user = User[params['id']])
      if new_user.username == user.username # ensure that the persona is valid
        new_user.post_login_setup

        warden.set_user new_user
      end
    end

    redirect_to '/home'
  end

  def impersonate
    authenticate!

    if user.is_superuser?
      if (new_user = User[params[:id]])
        session[:admin_id]     = user.id
        session[:impersonated] = true

        warden.set_user new_user
      end
    end

    redirect_to '/home'
  end

  def unimpersonate
    authenticate!

    if (admin_user = User[session[:admin_id]])
      session.delete(:admin_id)
      session.delete(:impersonated)

      warden.set_user admin_user

      redirect_to '/logout'
    end
  end

  def session_info
    render :json => session.to_json
  end

  def failed
    render :index, :status => 401
  end
end
