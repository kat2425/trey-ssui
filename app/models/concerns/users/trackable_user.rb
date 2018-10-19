module Users
  module TrackableUser
    extend ActiveSupport::Concern
    def log_login_success
      JunctionLog.log_info({
        type:      'user',
        status:    'success',
        event:     'login',
        timestamp: DateTime.now,
        district:  district_id,
        user:      id
      })
    end

    def log_login_failure
      JunctionLog.log_info({
        type:      'user',
        status:    'failure',
        event:     'login',
        timestamp: DateTime.now,
        district:  district_id,
        user:      id
      })
    end

    def log_logout
      JunctionLog.log_info({
        type:     'user',
        status:   'logout',
        event:    'login',
        timestamp: DateTime.now,
        district:  district_id,
        user:      id
      })
    end
  end
end
