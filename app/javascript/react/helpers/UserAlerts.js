export const UPGRADE = {
  SMS:        getMessage('Text messaging'),
  TRANSCRIPT: getMessage('Call transcription'),
  REMINDER:   getMessage('Reminders')
}

function getMessage(capability){
  return [
    capability, 
    'capabilities available with our upgraded communications package.',
    'Talk to your district staff about upgrading today!'
  ].join(' ')
}
