class Policy < Sequel::Model(:policies)
  many_to_many :users,  :class      => :User,
                        :join_table => :user_policies,
                        :left_key   => :policy_id,
                        :right_key  => :user_id
end
