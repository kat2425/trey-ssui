class District < Sequel::Model(:districts)
  one_to_many :users
  one_to_many :schools

  many_to_many :modules,
    :class      => :SSModule,
    :join_table => :district_modules,
    :left_key   => :district_id,
    :right_key  => :module_id

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

  def hidden_modules
    if meta&.fetch('hidden_modules')
      meta['hidden_modules']
    else
      []
    end
  rescue
    []
  end

  def list_modules
    modules_dataset.select_map(:symbol)
  end

  def has_module?(symbol)
    list_modules.include? symbol.to_s
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
