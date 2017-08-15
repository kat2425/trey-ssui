require 'test_helper'

class ChannelControllerTest < ActionDispatch::IntegrationTest
  test "should get engagement" do
    get channel_engagement_url
    assert_response :success
  end

end
