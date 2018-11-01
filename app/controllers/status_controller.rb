class StatusController < ApplicationController
  def index
    health = light_check
    render :json => health
  end

  def db
    health = params[:key] == 'monkeynutninjafoo' ? deep_check : light_check

    health.values.each do |hv|
      if hv != 'OK'
        return bad_status
      end
    end

    render :json => health
  end

  private
  def bad_status
    render :json => { :status => 'UNHEALTHY' }, :status => 500
  end

  def light_check
    { :status => 'OK' }
  end

  def deep_check
    {
      :db_check         => db_check,
      :jasper_user_sync => jasper_user_sync,
      :jasper_user_info => jasper_user_info,
      :status           => 'OK'
    }
  end

  def demo_user
    User[username: 'anytown@bcg.io']
  end

  def db_check
    District.anytown.district_code == '9999' ? 'OK' : raise
  end

  def jasper_user_sync
    tries ||= 4
    demo_user.sync_jasper_account
    'OK'
  rescue Exception => e
    sleep 0.325
    retry unless (tries -= 1).zero?
  end

  def jasper_user_info
    tries ||= 4
    demo_user.jasper_user['user']['enabled'] == 'true'
    'OK'
  rescue Exception => e
    sleep 0.325
    retry unless (tries -= 1).zero?
  end
end
