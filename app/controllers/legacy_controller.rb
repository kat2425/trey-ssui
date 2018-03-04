class LegacyController < ApplicationController
  def useradmin
    redirect_to 'https://secure.schoolstatus.com/cj/users'
  end

  def settings
    redirect_to 'https://secure.schoolstatus.com/settings'
  end
end
