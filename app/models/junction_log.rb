class JunctionLog < Sequel::Model(:junction_logs)

  class << self
    def log_info(type:, status:, event:, timestamp:, user:, district: )
      district = district.is_a?(District) ? district.id : district
      user     = user.is_a?(User)         ? user.id     : user

      create(
        :type        => type,
        :status      => status,
        :event       => event,
        :created_at  => timestamp,
        :district_id => district,
        :user_id     => user
      )
    end
  end
end
