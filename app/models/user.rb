class User < Sequel::Model(:users)
  include BCrypt
  include JasperSoft
  include Users::JasperUser

  # Minimal relations
  many_to_one :district
  one_to_many :user_access_tokens
  many_to_one :district

  many_to_many :schools,  :class      => :School,
                          :join_table => :user_schools,
                          :left_key   => :user_id,
                          :right_key  => :school_id
  many_to_many :modules,  :class      => :SSModule,
                          :join_table => :user_modules,
                          :left_key   => :user_id,
                          :right_key  => :module_id
  many_to_many :policies, :class      => :Policy,
                          :join_table => :user_policies,
                          :left_key   => :user_id,
                          :right_key  => :policy_id

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

  def school_filter
    Sequel::Model.db['select * from user_school_scope(?)', id].map {|s| s[:school_id] }
  end

  def is_teacher? ; !!is_teacher ; end

  def is_spoc? ; !!is_spoc ; end

  def ss_modules
    SSModule.select_map(:symbol).sort.uniq
  end

  def name
    "#{first_name} #{last_name}"
  end

  def deleted?
    !deleted_at.nil?
  end

  # UI props
  def ui_props
    self.to_hash.slice(:id, :username, :first_name, :last_name, :created_at, :beta_tester).merge(
      :accessToken              => last_access_token,
      :api                      => 'https://api.schoolstatus.com',
      :customModules            => district&.custom_modules,
      :hiddenModules            => district&.hidden_modules,
      :channelOnly              => district&.channel_only?,
      :districtID               => district_id,
      :districtName             => district&.district_name,
      :districtCode             => district&.district_code,
      :districtExpirationStatus => district&.expiration_status,
      :daysUntilExpiration      => district&.days_until_expiration,
      :isDistrictLevel          => is_district_level?,
      :isTeacher                => is_teacher?,
      :isSpoc                   => is_spoc?,
      :isDemoUser               => demo_user?,
      :currentSchoolYear        => CURRENT_SCHOOL_YEAR,
      :has_channel              => has_channel?,
      :hasLearningLab           => has_learning_lab?,
      :higherEd                 => district&.higher_ed,
      :intercomUserHash         => intercom_user_hash,
      :jasper                   => jasper_user_creds,
      :modules                  => modules.map(&:symbol),
      :policies                 => policies.map(&:name),
      :schoolFilter             => school_filter,
      :userType                 => user_type,
      :ssModules                => ss_modules
    )
  end

  # Channel Permissions                                                         {{{
  # -------------------------------------------------------------------------------
  def district_has_channel?
    district.has_channel?
  rescue
    false
  end

  def school_has_channel?
    school_filter.map do |sch|
      School[sch].has_channel?
    end.include?(true)
  rescue
    false
  end

  def has_channel?
    return false if disable_communications

    district_has_channel? || school_has_channel? || policies_dataset.select_map(:name).include?(:channel_enabled)
  end

  # }}}

  def is_superuser?
    has_module? :superuser
  end

  def is_admin?
    has_module? :useradmin
  end

  def is_district_level?
    return false if is_superuser?
    schools.empty?
  end

  def is_spoc?
    is_spoc == true
  end

  def demo_user?
    district == District.anytown
  rescue
    false
  end

  def list_modules
    modules_dataset.select_map(:symbol)
  end

  def has_module?(symbol)
    list_modules.include? symbol.to_s
  end

  def has_learning_lab?
    district.has_module? :learning_lab
  rescue
    false
  end

  def post_login_setup
    unless is_superuser?
      begin
        tries ||= 3
        district.sync_jasper_org rescue nil
        sync_jasper_account
      rescue => e
        puts "!!! JASPER_LOGIN ERROR - #{id} / #{username} !!!"
        sleep 0.5
        retry unless (tries -= 1).zero?
        Bugsnag.notify(e)
      end
    end

    update(:has_logged_in => true)
  end

  # Itercom User Hash
  def intercom_user_hash
    OpenSSL::HMAC.hexdigest('sha256', 'u3VSD-b4LgBph_p8vDEu7GZbCAoGSLIA_bljrEoZ', id)
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
