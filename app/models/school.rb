class School < Sequel::Model(:schools)
  many_to_one :districts

  def has_channel?
    if has_channel && channel_trial_start
      (Date.today - channel_trial_start).to_i <= 30
    else
      has_channel
    end
  end
end
