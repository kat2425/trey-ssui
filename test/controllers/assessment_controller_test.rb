require 'test_helper'

class AssessmentControllerTest < ActionDispatch::IntegrationTest
  test "should get tvaas" do
    get assessment_tvaas_url
    assert_response :success
  end

end
