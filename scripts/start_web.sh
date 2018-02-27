#!/bin/bash

echo `date` > .deploy_time &&
  service nginx restart &&
  tail -f /var/log/nginx/nginx-ss-ui.log &
  puma -C config/puma_config.rb
