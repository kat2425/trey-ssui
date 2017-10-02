export const user = {
  id:                '16c4c928-d91b-4c1b-bfd0-c03d9c80d14c',
  username:          'tyler@schoolstatus.com',
  first_name:        'Tyler',
  last_name:         'Cummings',
  full_name:         'Tyler Cummings',
  mobile_number:     '9014914152',
  title:             null,
  reset_status:      0,
  is_bounce_contact: false,
  has_rotp:          false,
  eula:              true,
  is_spoc:           false,
  has_logged_in:     true,
  is_teacher:        false,
  changelog_version: 0,
  beta_tester:       true,
  is_active:         true,
  is_superuser:      false,
  is_district_level: true,
  district_id:       '5126918ae9c77f9384000053',
  teacher_ids:       [],
  teachers:          [],
  office_hours:      null
}

export const contact = {
  id:           '1381288f-bbf2-4e34-b041-1752b2af4c75',
  student_id:   '51db4bd8e9c77f81290001ec',
  name:         'Lee, Ellen',
  phone:        '601-467-4919',
  email:        'ellen@schoolstatus.com',
  relationship: 'Cousin',
  resides_with: false,
  checkout:     true,
  emergency:    true,
  no_contact:   false,
  is_manual:    false,
  primary:      false,
  meta:         null,
  description:  null
}

export const call_log = {
  action:             null,
  contact_id:         '1381288f-bbf2-4e34-b041-1752b2af4c75',
  created_at:         '2017-09-27T14:22:56.362-05:00',
  dial_call_status:   'completed',
  direction:          'outgoing',
  district_id:        '5126918ae9c77f9384000053',
  id:                 'aeb669ef-d297-4124-8f6a-10e4087a4674',
  recording_duration: 23,
  recording_path:     '',
  recording_sid:      'REf1a3c67fc36389c0281338c418605325',
  school_id:          '51269191e9c77f9384000455',
  student_id:         '51db4bd8e9c77f81290001ec',
  user_id:            '16c4c928-d91b-4c1b-bfd0-c03d9c80d14c',
  notes:              [],
  contact:            contact,
  user:               user,
  voicemails:         [],
  call_transcripts:   [{
    id:              '589ffee7-f33b-4fe4-a907-bc00083e916c',
    created_at:      '2017-09-27T10:53:24.064-05:00',
    call_transcript: 'Speaker 1: Hello world. Speaker 2: World Good.' 
  }]
}

const comm = {
  id:         '93bdf5f2-dfee-4d97-ae3c-fe57bf362eef',
  created_at: '2017-10-02T09:35:37.848-05:00',
  type:       'call',
  preview:
    'https://ss-student-buckets-production.s3.amazonaws.com/Anytown%20School%20District%20%285126918ae9c77f9384000053%29/Brown%2C%20John%20%2851db4bd8e9c77f81290001ec%29/REcaf443419d574456b07dbe34113aa222.mp3?AWSAccessKeyId=AKIAJ5G4GNHPUN3BKDFA&Expires=1506963733&Signature=WPvyDOSAE2ZYSY5q4p72iEkytc4%3D',
  link_ref:
    'https://api.schoolstatus.com/commo/call_log/93bdf5f2-dfee-4d97-ae3c-fe57bf362eef?show_transcript=true',
  direction:  'outgoing',
  user: {
    id:         '16c4c928-d91b-4c1b-bfd0-c03d9c80d14c',
    username:   'tyler@schoolstatus.com',
    first_name: 'Tyler',
    last_name:  'Cummings'
  },
  contact: {
    id:           '1381288f-bbf2-4e34-b041-1752b2af4c75',
    name:         'Lee, Ellen',
    email:        'ellen@schoolstatus.com',
    relationship: 'Cousin'
  },
  length: {
    length: 28,
    unit:   'seconds'
  },
  call_status: 'completed'
}

export default {
  call_log,
  user,
  contact,
  comm
}
