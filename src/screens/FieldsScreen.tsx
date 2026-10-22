import { useState } from 'react'

const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'

const fields = [
  { id: 'NPA', name: 'North Paddock A', area: 48.2, health: 84, status: 'good', crop: 'Winter Wheat', moisture: 42 , notes: ""},
  { id: 'NPB', name: 'North Paddock B', area: 31.5, health: 51, status: 'warn', crop: 'Canola', moisture: 21, notes: 'Moisture stress — critical' },
  { id: 'SB3', name: 'South Block 3', area: 62.1, health: 78, status: 'good', crop: 'Barley', moisture: 38 , notes: "" },
  { id: 'EF1', name: 'East Fields', area: 44.7, health: 63, status: 'warn', crop: 'Chickpea', moisture: 29, notes: 'Nitrogen deficiency risk' },
  { id: 'WD', name: 'West Dryland', area: 87.3, health: 71, status: 'good', crop: 'Fallow', moisture: 35, notes: '14mm rain event recorded' },
]

function FieldMap() {
  return (
    <svg width="100%" viewBox="0 0 340 205" style={{ display: 'block' }}>
      <rect width="340" height="205" fill="#EDE8DF" rx="12"/>

      {/* NPA — good */}
      <path d="M18 18 L118 18 L126 88 L24 92 Z" fill="#D6EDD2" stroke="#3A7532" strokeWidth="1.5"/>
      <text x="72" y="56" textAnchor="middle" fontFamily={SF} fontSize="10" fontWeight="600" fill="#2A5C24">NPA</text>
      <text x="72" y="70" textAnchor="middle" fontFamily={SF} fontSize="9" fill="#3A7532">84 · Wheat</text>

      {/* NPB — warn */}
      <path d="M128 18 L202 16 L206 82 L132 88 Z" fill="#FDEEDD" stroke="#B87020" strokeWidth="1.5"/>
      <text x="168" y="50" textAnchor="middle" fontFamily={SF} fontSize="10" fontWeight="600" fill="#8A5010">NPB</text>
      <text x="168" y="64" textAnchor="middle" fontFamily={SF} fontSize="9" fill="#B87020">51 · Canola</text>

      {/* SB3 — good */}
      <path d="M18 98 L132 94 L138 168 L20 172 Z" fill="#D6EDD2" stroke="#3A7532" strokeWidth="1.5"/>
      <text x="78" y="132" textAnchor="middle" fontFamily={SF} fontSize="10" fontWeight="600" fill="#2A5C24">SB3</text>
      <text x="78" y="146" textAnchor="middle" fontFamily={SF} fontSize="9" fill="#3A7532">78 · Barley</text>

      {/* EF1 — warn */}
      <path d="M206 18 L314 22 L312 86 L208 82 Z" fill="#FDEEDD" stroke="#B87020" strokeWidth="1.5"/>
      <text x="260" y="52" textAnchor="middle" fontFamily={SF} fontSize="10" fontWeight="600" fill="#8A5010">EF1</text>
      <text x="260" y="66" textAnchor="middle" fontFamily={SF} fontSize="9" fill="#B87020">63 · Chickpea</text>

      {/* WD — fallow */}
      <path d="M138 92 L312 86 L318 176 L140 178 Z" fill="#EAE4D8" stroke="#9A9186" strokeWidth="1" strokeDasharray="5 3"/>
      <text x="226" y="130" textAnchor="middle" fontFamily={SF} fontSize="10" fontWeight="600" fill="#5A5248">WD</text>
      <text x="226" y="144" textAnchor="middle" fontFamily={SF} fontSize="9" fill="#9A9186">71 · Fallow</text>

      {/* Legend */}
      <rect x="18" y="185" width="8" height="8" rx="2" fill="#D6EDD2" stroke="#3A7532" strokeWidth="1"/>
      <text x="30" y="193" fontFamily={SF} fontSize="9" fill="#5A5248">Healthy</text>
      <rect x="80" y="185" width="8" height="8" rx="2" fill="#FDEEDD" stroke="#B87020" strokeWidth="1"/>
      <text x="92" y="193" fontFamily={SF} fontSize="9" fill="#5A5248">Attention</text>
      <rect x="162" y="185" width="8" height="8" rx="2" fill="#EAE4D8" stroke="#9A9186" strokeWidth="1" strokeDasharray="3 2"/>
      <text x="174" y="193" fontFamily={SF} fontSize="9" fill="#5A5248">Fallow</text>
    </svg>
  )
}

export default function FieldsScreen() {
  const [selected, setSelected] = useState<string | null>(null)
  const sel = fields.find(f => f.id === selected)

  return (
    <div style={{ paddingBottom: 24, minHeight: '100%', background: '#F7F4EE' }}>
      <div style={{ padding: '14px 22px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', fontWeight: 500, marginBottom: 3 }}>5 fields · 273.8 ha total</div>
          <h2 className="font-display" style={{ fontSize: 24, color: '#1C1A15', margin: 0 }}>Field Overview</h2>
        </div>
        <div style={{ background: 'white', border: '1px solid #EDE8DF', borderRadius: 10, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="#9A9186" strokeWidth="1.3"/>
            <path d="M8.5 8.5l3 3" stroke="#9A9186" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: SF, fontSize: 13, color: '#5A5248', fontWeight: 500 }}>Filter</span>
        </div>
      </div>

      {/* Map */}
      <div style={{ margin: '0 18px 16px', background: '#EDE8DF', border: '1px solid #D8D0C4', borderRadius: 16, overflow: 'hidden' }}>
        <FieldMap />
      </div>

      {/* Selected field detail */}
      {sel && (
        <div style={{ margin: '0 18px 16px', background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div className="font-display" style={{ fontSize: 18, color: '#1C1A15', marginBottom: 2 }}>{sel.name}</div>
              <div style={{ fontFamily: SF, fontSize: 12, color: '#9A9186' }}>{sel.area} ha · {sel.crop}</div>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: '#F0EBE2', border: 'none', borderRadius: 8, width: 28, height: 28, cursor: 'pointer', fontFamily: SF, fontSize: 14, color: '#9A9186' }}>✕</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[['Health', `${sel.health}/100`, sel.health >= 70 ? '#3A7532' : '#B87020'], ['Moisture', `${sel.moisture}%`, '#1C1A15'], ['Status', sel.status === 'good' ? 'Good' : 'Attention', sel.health >= 70 ? '#3A7532' : '#B87020']].map(([k, v, c]) => (
              <div key={k as string} style={{ background: '#F7F4EE', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: SF, fontSize: 10, color: '#9A9186', fontWeight: 500, marginBottom: 4 }}>{k}</div>
                <div className="font-display" style={{ fontSize: 18, color: c as string }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: SF, fontSize: 12, color: '#9A9186', fontStyle: 'italic', marginTop: 10 }}>{sel.notes}</div>
        </div>
      )}

      {/* Field list */}
      <div style={{ margin: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {fields.map(f => {
          const isActive = selected === f.id
          const healthColor = f.health >= 70 ? '#3A7532' : '#B87020'
          const healthBg = f.health >= 70 ? '#E8F5E5' : '#FDF0E0'
          return (
            <button
              key={f.id}
              onClick={() => setSelected(isActive ? null : f.id)}
              style={{
                background: isActive ? 'white' : 'white',
                border: `1px solid ${isActive ? healthColor + '60' : '#EDE8DF'}`,
                borderRadius: 16,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                boxShadow: isActive ? `0 2px 10px ${healthColor}18` : '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: healthBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="font-display" style={{ fontSize: 20, color: healthColor }}>{f.health}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SF, fontSize: 14, color: '#1C1A15', fontWeight: 600, marginBottom: 3, letterSpacing: '-0.01em' }}>{f.name}</div>
                <div style={{ fontFamily: SF, fontSize: 12, color: '#9A9186' }}>{f.area} ha · {f.crop}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                <span style={{ fontFamily: SF, fontSize: 10, color: '#9A9186', fontWeight: 500 }}>Moisture</span>
                <div style={{ width: 52, height: 5, background: '#F0EBE2', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${f.moisture}%`, height: '100%', background: f.moisture < 30 ? '#B87020' : '#3A7532', borderRadius: 3 }} />
                </div>
                <span style={{ fontFamily: SF, fontSize: 12, color: '#1C1A15', fontWeight: 600 }}>{f.moisture}%</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
