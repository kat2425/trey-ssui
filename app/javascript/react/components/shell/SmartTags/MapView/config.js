const _token = 'pk.eyJ1Ijoiam9lLWJ1emEiLCJhIjoiY2o4b2EzNndsMDFhczMycnpwbW94ZDcxbCJ9.QQgP-GaylKEV7U-I3md1Yg'
export const token = process.env.MAPBOX_ACCESS_TOKEN || _token

export const styles = {
  londonCycle: 'mapbox://styles/alex3165/cj2hv9v4y00242slphcyk9oca',
  light:       'mapbox://styles/mapbox/light-v9',
  dark:        'mapbox://styles/mapbox/dark-v9',
  basic:       'mapbox://styles/mapbox/basic-v9',
  streets:     'mapbox://styles/mapbox/streets-v9',
  outdoor:     'mapbox://styles/mapbox/outdoors-v10'
}

export const mapStyle = {
  flex:   1,
  width:  '100%',
  height: '100%'
}

