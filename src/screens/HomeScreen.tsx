import { useState } from 'react'

const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'

const alerts = [
  { id: 1, type: 'warn', title: 'Soil moisture critically low', field: 'North Paddock B', time: '2h ago' },
  { id: 2, type: 'info', title: 'Beneficial insect detected', field: 'South Block 3', time: '4h ago' },
  { id: 3, type: 'alert', title: 'Nutrient deficiency risk: N', field: 'East Fields', time: '8h ago' },
]

const metrics = [
  { label: 'Soil Temp', value: '18.4', unit: '°C', trend: '+0.3', up: true },
  { label: 'Moisture', value: '31', unit: '%', trend: '−4.1', up: false },
  { label: 'Humidity', value: '67', unit: '%', trend: '+2', up: true },
  { label: 'Wind', value: '12', unit: 'km/h', trend: 'SW', up: null },
]

function HealthArc({ score }: { score: number }) {
  const r = 72
  const cx = 100
  const cy = 100
  const startAngle = -210
  const sweep = 240
  const toRad = (d: number) => (d * Math.PI) / 180
  const arcPath = (start: number, end: number, radius: number) => {
    const s = toRad(start)
    const e = toRad(end)
    const x1 = cx + radius * Math.cos(s)
    const y1 = cy + radius * Math.sin(s)
    const x2 = cx + radius * Math.cos(e)
    const y2 = cy + radius * Math.sin(e)
    const large = end - start > 180 ? 1 : 0
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`
  }
  const scoreAngle = startAngle + (score / 100) * sweep
  const color = score >= 75 ? '#3A7532' : score >= 50 ? '#B87020' : '#C03428'
  const knobX = cx + r * Math.cos(toRad(scoreAngle))
  const knobY = cy + r * Math.sin(toRad(scoreAngle))

  return (
    <svg width="200" height="160" viewBox="0 0 200 160">
      <path d={arcPath(startAngle, startAngle + sweep, r)} fill="none" stroke="#E8E2D8" strokeWidth="10" strokeLinecap="round" />
      <path d={arcPath(startAngle, scoreAngle, r)} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />
      <circle cx={knobX} cy={knobY} r={6} fill="white" stroke={color} strokeWidth="2.5" />
      <text x={cx} y={cy + 8} textAnchor="middle" fontFamily="'DM Serif Display', Georgia, serif" fontSize="44" fill="#1C1A15">{score}</text>
      <text x={cx} y={cy + 24} textAnchor="middle" fontFamily={SF} fontSize="9.5" fill="#9A9186" letterSpacing="1.5" fontWeight="500">FARM HEALTH</text>
      <text x={28} y={150} textAnchor="middle" fontFamily={SF} fontSize="9" fill="#C8C0B4">0</text>
      <text x={172} y={150} textAnchor="middle" fontFamily={SF} fontSize="9" fill="#C8C0B4">100</text>
    </svg>
  )
}

export default function HomeScreen() {
  const [score] = useState(74)

  return (
    <div style={{ paddingBottom: 24, minHeight: '100%', background: '#F7F4EE' }}>
      {/* Header */}
      <div style={{ padding: '14px 22px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', fontWeight: 500, marginBottom: 3, letterSpacing: '0.02em' }}>Mon 21 Sep · Sunrise 06:34</div>
          <h2 className="font-display" style={{ fontSize: 24, color: '#1C1A15', margin: 0 }}>Good morning, Stephany.</h2>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3A7532', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2a4 4 0 100 8A4 4 0 0010 2zM4 18c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: '#B87020', border: '2px solid #F7F4EE' }} />
        </div>
      </div>

      {/* Weather card */}
      <div style={{ margin: '0 18px 18px', background: 'white', borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #EDE8DF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="8" fill="#F5A623" opacity="0.9"/>
              <path d="M18 4v5M18 27v5M4 18h5M27 18h5M8.1 8.1l3.5 3.5M24.4 24.4l3.5 3.5M8.1 27.9l3.5-3.5M24.4 11.6l3.5-3.5" stroke="#F5A623" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <div className="font-display" style={{ fontSize: 26, color: '#1C1A15', lineHeight: 1 }}>23°</div>
              <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', fontWeight: 500 }}>Partly Cloudy</div>
            </div>
          </div>
          <div style={{ flex: 1, borderLeft: '1px solid #EDE8DF', paddingLeft: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
            {[['Rain', '14 mm / 7d'], ['Evap', '4.2 mm'], ['GDD', '186 / season'], ['VPD', '1.2 kPa']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: SF, fontSize: 10, color: '#9A9186' }}>{k}</span>
                <span style={{ fontFamily: SF, fontSize: 11, color: '#1C1A15', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health arc */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <HealthArc score={score} />
        <div style={{ display: 'flex', gap: 8, marginTop: -6 }}>
          {[['Soil', '82', '#3A7532'], ['Biodiversity', '71', '#B87020'], ['Crop', '68', '#B87020']].map(([l, v, c]) => (
            <div key={l} style={{ background: 'white', border: '1px solid #EDE8DF', borderRadius: 12, padding: '8px 14px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ fontFamily: SF, fontSize: 10, color: '#9A9186', fontWeight: 500, marginBottom: 2 }}>{l}</div>
              <div className="font-display" style={{ fontSize: 20, color: c as string, lineHeight: 1 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sensor metrics */}
      <div style={{ margin: '18px 18px 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ background: 'white', border: '1px solid #EDE8DF', borderRadius: 14, padding: '10px 10px 8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontFamily: SF, fontSize: 9, color: '#9A9186', fontWeight: 500, marginBottom: 4, lineHeight: 1.2 }}>{m.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <span className="font-display" style={{ fontSize: 19, color: '#1C1A15' }}>{m.value}</span>
              <span style={{ fontFamily: SF, fontSize: 9, color: '#9A9186' }}>{m.unit}</span>
            </div>
            <div style={{ fontFamily: SF, fontSize: 9.5, color: m.up === true ? '#3A7532' : m.up === false ? '#C03428' : '#9A9186', marginTop: 2, fontWeight: 500 }}>{m.trend}</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div style={{ margin: '20px 18px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: '#1C1A15', letterSpacing: '-0.01em' }}>Active Alerts</span>
          <span style={{ fontFamily: SF, fontSize: 13, color: '#3A7532', fontWeight: 500 }}>View all</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {alerts.map(a => {
            const c = a.type === 'warn' ? '#B87020' : a.type === 'alert' ? '#C03428' : '#2A5C82'
            const bg = a.type === 'warn' ? '#FDF6EC' : a.type === 'alert' ? '#FDF0EE' : '#EFF5FD'
            return (
              <div key={a.id} style={{ background: bg, border: `1px solid ${c}22`, borderLeft: `3px solid ${c}`, borderRadius: '0 12px 12px 0', padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: SF, fontSize: 13, color: '#1C1A15', fontWeight: 500, marginBottom: 2 }}>{a.title}</div>
                  <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186' }}>{a.field}</div>
                </div>
                <span style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', whiteSpace: 'nowrap', marginTop: 1 }}>{a.time}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div style={{ margin: '20px 18px 0' }}>
        <div style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: '#1C1A15', letterSpacing: '-0.01em', marginBottom: 12 }}>Recent Activity</div>
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #EDE8DF', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {[
            { action: 'SOC prediction updated', detail: 'East Fields — 3.4% C ↑ 0.1', time: '1h' },
            { action: 'Field observation logged', detail: 'North Paddock B — Aphid pressure moderate', time: '3h' },
            { action: 'Lab results received', detail: 'South Block 3 — pH 6.8', time: '6h' },
            { action: 'Rain event recorded', detail: '14mm — West Dryland', time: '12h' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < arr.length - 1 ? '1px solid #F0EBE2' : 'none', alignItems: 'flex-start' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#D8D0C4', marginTop: 4, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SF, fontSize: 12.5, color: '#1C1A15', fontWeight: 500, marginBottom: 2 }}>{item.action}</div>
                <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186' }}>{item.detail}</div>
              </div>
              <span style={{ fontFamily: SF, fontSize: 11, color: '#C8C0B4' }}>{item.time}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
