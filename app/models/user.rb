class User < Sequel::Model(:users)
  include BCrypt

  # Minimal relations
  one_to_many :user_access_tokens

  # BCrypt Auth
  class << self
    def authenticate(username, password)
      if user = self[:username => username]
        bcrypt_authenticate(user, password) ? user : false
      else
        nil
      end
    end

    def bcrypt_authenticate(user, password)
      user.bcrypt_password == password
    end
  end

  def bcrypt_password
    @bcrypt_password ||= Password.new(password_hash)
  end

  # Access Token
  def last_access_token
    user_access_tokens_dataset.first.token
  rescue
    UserAccessToken.create(
      :user_id   => id,
      :token     => make_auth_token,
      :device_id => 'ss-ui',
      :ip_addr   => 'manual'
    )

    retry
  end

  # UI props
  def ui_props
    self.to_hash.slice(:id, :username, :first_name, :last_name).merge(
      :api          => 'https://api.schoolstatus.com',
      :accessToken  => last_access_token,
      :jasper       => jasper_user_creds,
      :modules      => [],
    )
  end

  private
  def make_auth_token
    OpenSSL::HMAC.hexdigest OpenSSL::Digest.new('sha256'), id, SecureRandom::hex
  end

  def jasper_user_creds
    {
      :server  => 'https://jasper.schoolstatus.com/jasperserver-pro',
      :org     => jasper_org,
      :orgPath => "/organizations/#{jasper_org}",
      :token   => jasper_user_token
    }
  end

  def jasper_org
    district_id.gsub(/\-/, '')
  end

  def jasper_user_token
    Digest::MD5.hexdigest (id + '87fe4f01bd121f1363b1d6e530a67f76' + jasper_org)
  end
end

class UserAccessToken < Sequel::Model(:user_access_tokens)
end
