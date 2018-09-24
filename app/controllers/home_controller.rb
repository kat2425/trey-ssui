class HomeController < ApplicationController
  def index
    authenticate!

    # redirect for expired districts
    if user&.district.expired?
      redirect_to '/subscription_expired'
    end

    redirect_to('/cj/blog') if user.is_superuser?
  end
end
