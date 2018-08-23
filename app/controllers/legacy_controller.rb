class LegacyController < ApplicationController
  def useradmin
    redirect_to 'https://secure.schoolstatus.com/cj/users'
  end

  def settings
    redirect_to 'https://secure.schoolstatus.com/settings'
  end

  def voice_admin
    redirect_to 'https://secure.schoolstatus.com/utilities/voice_admin'
  end
end
