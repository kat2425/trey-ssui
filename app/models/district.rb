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
end
