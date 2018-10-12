class StatusController < ApplicationController
  def index
    light_check
  end

  def db
    params[:key] == 'monkeynutninjafoo' ? deep_check : light_check
  end

  private
  def light_check
    render :json => { :status => 'OK' }
  end

  def deep_check
    render :json => {
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
