Rails.configuration.middleware.use RailsWarden::Manager do |manager|
  manager.default_strategies :bcrypt

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
    params['username'] && params['password']
  end

  def authenticate!
    return fail! if (user = User[:username => params[:username]]).nil?

    if User.bcrypt_authenticate(user, params[:password])
      success!(user)
    else
      fail!
    end
  end
end
