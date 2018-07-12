class RedirectsController < ApplicationController
  def learning_academy
    authenticate!

    token = Digest::MD5.hexdigest([
      "USER=#{user.username}",
      "TS=#{Time.now.getutc.to_i}",
      "KEY=aab9a1ff4718b86851cd1a9d18"
    ].join('&'))

    params = [
      "email=#{user.username}",
      "TS=#{Time.now.getutc.to_i}",
      "username=#{user.username}",
      "token=#{token}",
      "first_name=#{user.first_name}",
      "last_name=#{user.last_name}",
      "state=#{user&.district.state}",
      "district_name=#{user&.district.district_name}"
    ]

    redirect_to "https://schoolstatus.learnupon.com/sqsso?#{params.join('&')}"
  end
end
