class SSModule < Sequel::Model(:modules)
  many_to_many :users,  :class      => :User,
                        :join_table => :user_modules,
                        :left_key   => :module_id,
                        :right_key  => :user_id
end
