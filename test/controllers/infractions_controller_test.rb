require 'test_helper'

class InfractionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get infractions_index_url
    assert_response :success
  end

end
