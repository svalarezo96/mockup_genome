import { useState } from 'react'

const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'

const insects = [
  { name: 'Aphid (Myzus persicae)', role: 'pest', count: 142, trend: '+28%', field: 'North Paddock B', risk: 'high', emoji: '🦗' },
  { name: 'Ladybird (Coccinellidae)', role: 'beneficial', count: 34, trend: '+12%', field: 'South Block 3', risk: 'low', emoji: '🐞' },
  { name: 'Parasitic wasp (Aphidius)', role: 'beneficial', count: 19, trend: '+44%', field: 'North Paddock B', risk: 'low', emoji: '🐝' },
  { name: 'Diamondback moth (Plutella)', role: 'pest', count: 22, trend: '−8%', field: 'North Paddock A', risk: 'medium', emoji: '🦋' },
  { name: 'Earthworm spp.', role: 'beneficial', count: 318, trend: '+6%', field: 'East Fields', risk: 'low', emoji: '🪱' },
  { name: 'Ground beetle (Carabidae)', role: 'beneficial', count: 27, trend: '+18%', field: 'West Dryland', risk: 'low', emoji: '🪲' },
]

const biodiversity = [
  { category: 'Plants', observed: 48, baseline: 42, icon: '🌿' },
  { category: 'Birds', observed: 19, baseline: 23, icon: '🐦' },
  { category: 'Insects', observed: 86, baseline: 78, icon: '🦋' },
  { category: 'Soil fauna', observed: 34, baseline: 31, icon: '🪱' },
  { category: 'Fungi', observed: 127, baseline: 118, icon: '🍄' },
]

const observations = [
  { date: '18 Sep', observer: 'J. Hartley', type: 'Vegetation', note: 'Native grass understory recovering well', field: 'West Dryland' },
  { date: '16 Sep', observer: 'AI Trap', type: 'Insect', note: 'Aphid population 142 per 100 tillers — exceeds economic threshold', field: 'North Paddock B' },
  { date: '14 Sep', observer: 'J. Hartley', type: 'Bird', note: 'White-winged chough nesting confirmed', field: 'West Dryland' },
  { date: '11 Sep', observer: 'Camera trap', type: 'Mammal', note: 'Echidna activity recorded — soil disturbance beneficial', field: 'South Block 3' },
]

export default function LifeScreen() {
  const [activeView, setActiveView] = useState<'insects' | 'biodiversity' | 'observations'>('insects')
  const beneficial = insects.filter(i => i.role === 'beneficial').length
  const ratio = Math.round((beneficial / insects.length) * 100)

  return (
    <div style={{ paddingBottom: 24, minHeight: '100%', background: '#F7F4EE' }}>
      <div style={{ padding: '14px 22px 16px' }}>
        <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', fontWeight: 500, marginBottom: 3 }}>All Fields · Monitoring Active</div>
        <h2 className="font-display" style={{ fontSize: 24, color: '#1C1A15', margin: 0 }}>Farm Life & Biodiversity</h2>
      </div>

      {/* Summary */}
      <div style={{ margin: '0 18px 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { label: 'Insect Taxa', value: insects.length.toString(), sub: 'detected', color: '#1C1A15' },
          { label: 'Beneficial', value: `${ratio}%`, sub: 'healthy ratio', color: '#3A7532' },
          { label: 'Species Obs.', value: '314', sub: '↑ +22 season', color: '#1C1A15' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', border: '1px solid #EDE8DF', borderRadius: 14, padding: '12px 12px 10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontFamily: SF, fontSize: 10, color: '#9A9186', fontWeight: 500, marginBottom: 4 }}>{s.label}</div>
            <div className="font-display" style={{ fontSize: 22, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: SF, fontSize: 10, color: '#9A9186', marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ margin: '0 18px 14px', background: '#EDE8DF', borderRadius: 12, padding: 4, display: 'flex' }}>
        {(['insects', 'biodiversity', 'observations'] as const).map(v => (
          <button key={v} onClick={() => setActiveView(v)} style={{
            flex: 1,
            fontFamily: SF,
            fontSize: 12,
            fontWeight: activeView === v ? 600 : 400,
            padding: '7px 4px',
            background: activeView === v ? 'white' : 'none',
            border: 'none',
            borderRadius: 9,
            color: activeView === v ? '#1C1A15' : '#9A9186',
            cursor: 'pointer',
            boxShadow: activeView === v ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s',
            textTransform: 'capitalize',
          }}>
            {v}
          </button>
        ))}
      </div>

      {activeView === 'insects' && (
        <div style={{ margin: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {insects.map(ins => {
            const isPest = ins.role === 'pest'
            const riskColor = isPest ? (ins.risk === 'high' ? '#C03428' : '#B87020') : '#3A7532'
            const riskBg = isPest ? (ins.risk === 'high' ? '#FEF0EE' : '#FDF6EC') : '#EEF8EC'
            return (
              <div key={ins.name} style={{ background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 42, height: 42, background: '#F7F4EE', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {ins.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: SF, fontSize: 13, color: '#1C1A15', fontWeight: 600, marginBottom: 2, letterSpacing: '-0.01em' }}>{ins.name}</div>
                  <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', marginBottom: 8 }}>{ins.field}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <div style={{ background: riskBg, borderRadius: 6, padding: '3px 8px' }}>
                      <span style={{ fontFamily: SF, fontSize: 11, fontWeight: 600, color: riskColor, textTransform: 'capitalize' }}>{ins.role}</span>
                    </div>
                    <span style={{ fontFamily: SF, fontSize: 12, color: '#5A5248' }}>n = {ins.count}</span>
                    <span style={{ fontFamily: SF, fontSize: 12, color: ins.trend.startsWith('+') && isPest ? '#C03428' : ins.trend.startsWith('+') ? '#3A7532' : '#3A7532', fontWeight: 500 }}>{ins.trend}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeView === 'biodiversity' && (
        <div style={{ margin: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: '#1C1A15', marginBottom: 16 }}>Species Richness vs. Baseline</div>
            {biodiversity.map(b => {
              const above = b.observed >= b.baseline
              return (
                <div key={b.category} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 20 }}>{b.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontFamily: SF, fontSize: 13, color: '#1C1A15' }}>{b.category}</span>
                      <span style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: above ? '#3A7532' : '#B87020' }}>
                        {b.observed}<span style={{ color: '#C8C0B4', fontWeight: 400 }}>/{b.baseline}</span>
                      </span>
                    </div>
                    <div style={{ height: 5, background: '#EDE8DF', borderRadius: 3, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${(b.baseline / Math.max(b.observed, b.baseline) / 1.1) * 100}%`, background: '#D8D0C4', borderRadius: 3 }} />
                      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${(b.observed / (Math.max(b.observed, b.baseline) * 1.1)) * 100}%`, background: above ? '#3A7532' : '#B87020', borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: '#1C1A15', marginBottom: 12 }}>Ecosystem Services</div>
            {[['Pollination', 81], ['Natural pest control', 67], ['Nutrient cycling', 74], ['Water regulation', 63]].map(([label, score]) => (
              <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <span style={{ fontFamily: SF, fontSize: 13, color: '#5A5248', flex: 1 }}>{label}</span>
                <div style={{ width: 80, height: 5, background: '#EDE8DF', borderRadius: 3 }}>
                  <div style={{ width: `${score}%`, height: '100%', background: (score as number) >= 70 ? '#3A7532' : '#B87020', borderRadius: 3 }} />
                </div>
                <span style={{ fontFamily: SF, fontSize: 12, fontWeight: 600, color: '#1C1A15', minWidth: 24, textAlign: 'right' }}>{score}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'observations' && (
        <div style={{ margin: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {observations.map((obs, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ background: '#EEF8EC', borderRadius: 6, padding: '3px 8px' }}>
                    <span style={{ fontFamily: SF, fontSize: 11, fontWeight: 600, color: '#3A7532' }}>{obs.type}</span>
                  </div>
                  <span style={{ fontFamily: SF, fontSize: 11, color: '#9A9186' }}>{obs.date}</span>
                </div>
                <span style={{ fontFamily: SF, fontSize: 11, color: '#9A9186' }}>{obs.observer}</span>
              </div>
              <p style={{ fontFamily: SF, fontSize: 13, color: '#5A5248', margin: '0 0 8px', lineHeight: 1.5 }}>{obs.note}</p>
              <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186' }}>📍 {obs.field}</div>
            </div>
          ))}
          <button style={{ background: 'white', border: '1.5px dashed #D8D0C4', borderRadius: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="#9A9186" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: SF, fontSize: 13, fontWeight: 500, color: '#9A9186' }}>Log New Observation</span>
          </button>
        </div>
      )}
    </div>
  )
}
