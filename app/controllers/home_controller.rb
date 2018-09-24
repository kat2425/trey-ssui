class HomeController < ApplicationController
  def index
    authenticate!

    redirect_to('/cj/blog') if user.is_superuser?

    # redirect for expired districts
    if user&.district.expired?
      redirect_to '/subscription_expired'
    end
  end
end
