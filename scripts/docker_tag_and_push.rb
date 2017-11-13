#!/usr/bin/env ruby

def tag_for_ecs(environment)
  system "docker tag ss-ui:#{environment} 296807674405.dkr.ecr.us-east-1.amazonaws.com/ss-ui:#{environment}"
end

def push_to_ecs(environment)
  system "`aws ecr get-login --no-include-email` && docker push 296807674405.dkr.ecr.us-east-1.amazonaws.com/ss-ui:#{environment}"
end

def run(environment)
  tag_for_ecs environment
  push_to_ecs environment
end

run (ARGV[0] || 'latest')
