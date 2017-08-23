#!/bin/bash

echo `date` > .deploy_time &&
  service nginx restart &&
  puma -C config/puma_config.rb
