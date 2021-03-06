Rails.configuration.middleware.use RailsWarden::Manager do |manager|
  manager.default_strategies :bcrypt, :ss_core_token

  manager.failure_app = -> env {
    LoginController.action(:failed).call(env)
  }
end

class Warden::SessionSerializer
  def serialize(user)
    user.id
  end

  def deserialize(id)
    User[id]
  end
end

Warden::Strategies.add(:bcrypt) do
  def valid?
    !!(params['username'] && params['password'])
  end

  def authenticate!
    return fail! if (user = User[:username => params[:username]&.downcase, :deleted_at => nil]).nil?

    # if (user&.district.district_code != '9999') && !(user&.district.higher_ed)
    #   return fail!
    # end

    if User.bcrypt_authenticate(user, params[:password])
      user.log_login_success rescue nil
      success!(user)
    else
      user.log_login_failure rescue nil
      fail!
    end
  end
end

Warden::Strategies.add(:ss_core_token) do
  def valid?
    !cookies['ss_session'].blank?
  end

  def authenticate!
    raw_cookie    = CGI::unescape(cookies['ss_session'])
    parsed_cookie = Marshal.load Rack::Session::Cookie::Base64.new.decode(Rack::Utils.unescape(raw_cookie))

    if (user = User[parsed_cookie['warden.user.session.key']])
      session[:impersonated] = parsed_cookie['impersonated']
      session[:admin_id]     = parsed_cookie['admin_id']

      success!(user)
    else
      fail!
    end
  end
end
