class FeedbakController < ApplicationController
  def index
    authenticate!
  end
end
