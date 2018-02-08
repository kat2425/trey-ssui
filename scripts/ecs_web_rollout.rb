#!/usr/bin/env ruby
# ---------------------------------------------------------------------------------
# Automated ECS Service Deployment tool
# ---------------------------------------------------------------------------------
require 'json'
require 'ansi256'

def describe_task
  JSON.parse `aws ecs describe-task-definition --task-definition ss-ui`
end

def task_definition
  describe_task['taskDefinition']
end

def container_def
  task_definition['containerDefinitions']
end

def new_revision
  JSON.parse `aws ecs register-task-definition --family ss-ui --container-definitions '#{container_def.to_json}'`
end

def new_revision_id
  new_revision['taskDefinition']['revision']
end

def update_service
  _new_revision_id = new_revision_id

  JSON.parse `aws ecs update-service --cluster ss-ui --service ss-ui --task-definition ss-ui:#{_new_revision_id}`
  puts "[x] Updated service to revision #{_new_revision_id.to_s.fg(83)}"
end

update_service
