class District < Sequel::Model(:districts)
  one_to_many :users
  one_to_many :schools

  class << self
    def anytown
      self[:district_code => '9999']
    end
  end

  def has_channel?
    if has_channel && channel_trial_start
      (Date.today - channel_trial_start).to_i <= 30
    else
      has_channel
    end
  end

  def custom_modules
    if meta&.fetch('custom_modules')
      meta['custom_modules']
    else
      []
    end
  rescue
    []
  end

  # Expiration Informatoin                                                      {{{
  # -------------------------------------------------------------------------------
  def expiration_status
    case
      when days_until_expiration > 60
        :good
      when days_until_expiration > 0
        :warning
      when ((days_until_expiration > -30) || Date.today < grace_date)
        :grace
      else :expired
    end
  end

  def days_until_expiration
    (expires_date - Date.today).to_i
  rescue Exception => e
    if e.message =~ /undefined method `-' for nil:NilClass/
      0
    else
      raise e
    end
  end

  def expired?
    expiration_status == :expired
  rescue Exception => e
    true
  end

  def grace?
    expiration_status == :grace
  end

  # }}}
end
