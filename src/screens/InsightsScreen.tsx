import { useState } from 'react'

const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'

const recommendations = [
  {
    priority: 'critical',
    title: 'Apply nitrogen to North Paddock B',
    detail: 'Soil nitrate at 8 mg/kg — 45% below threshold for canola at this growth stage. Recommend 40 kg N/ha urea application within 5 days.',
    action: 'Create application plan',
    field: 'North Paddock B',
    impact: '+12% yield potential',
    confidence: 94,
    category: 'Nutrition',
    emoji: '🌿',
  },
  {
    priority: 'high',
    title: 'Monitor aphid population in NPB',
    detail: 'Aphid density at 142/100 tillers with parasitism rate only 13%. Economic threshold exceeded. Deploy parasitic wasp habitat strips or consider targeted spray.',
    action: 'View IPM options',
    field: 'North Paddock B',
    impact: 'Prevent 8–15% yield loss',
    confidence: 88,
    category: 'Pest',
    emoji: '🦗',
  },
  {
    priority: 'medium',
    title: 'Irrigate to restore moisture deficit',
    detail: 'North Paddock B showing 21% moisture — critical stress for canola at pod fill. 25mm irrigation recommended to restore to field capacity.',
    action: 'Schedule irrigation',
    field: 'North Paddock B',
    impact: 'Prevent drought stress',
    confidence: 91,
    category: 'Water',
    emoji: '💧',
  },
  {
    priority: 'low',
    title: 'Establish native buffer strips',
    detail: 'Biodiversity modeling suggests 200m of mixed native plantings along the western drainage line would increase beneficial insect populations by 35%.',
    action: 'View habitat design',
    field: 'West Dryland',
    impact: '+35% beneficial insects',
    confidence: 76,
    category: 'Ecology',
    emoji: '🌳',
  },
  {
    priority: 'low',
    title: 'Apply compost to build SOC',
    detail: 'Increasing compost to 4t/ha on East Fields will accelerate SOC trajectory and bring forward carbon credit eligibility by approximately 6 months.',
    action: 'Plan compost application',
    field: 'East Fields',
    impact: 'Accelerate C sequestration',
    confidence: 82,
    category: 'Carbon',
    emoji: '♻️',
  },
]

const seasonTrends = [
  { month: 'Apr', health: 62 },
  { month: 'May', health: 65 },
  { month: 'Jun', health: 68 },
  { month: 'Jul', health: 71 },
  { month: 'Aug', health: 69 },
  { month: 'Sep', health: 74 },
]

function TrendSparkline() {
  const w = 310, h = 70
  const pad = { l: 8, r: 8, t: 10, b: 24 }
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b
  const min = 55, max = 82
  const tx = (i: number) => pad.l + (i / (seasonTrends.length - 1)) * iw
  const ty = (v: number) => pad.t + ih - ((v - min) / (max - min)) * ih
  const path = seasonTrends.map((d, i) => `${i === 0 ? 'M' : 'L'} ${tx(i)} ${ty(d.health)}`).join(' ')
  const area = `${path} L ${tx(seasonTrends.length - 1)} ${h - pad.b} L ${tx(0)} ${h - pad.b} Z`

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A7532" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#3A7532" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-grad)"/>
      <path d={path} fill="none" stroke="#3A7532" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {seasonTrends.map((d, i) => (
        <g key={d.month}>
          <circle cx={tx(i)} cy={ty(d.health)} r={i === seasonTrends.length - 1 ? 5 : 3} fill={i === seasonTrends.length - 1 ? '#3A7532' : 'white'} stroke="#3A7532" strokeWidth={i === seasonTrends.length - 1 ? 0 : 2}/>
          <text x={tx(i)} y={h - 5} textAnchor="middle" fontFamily={SF} fontSize="9" fill="#C8C0B4">{d.month}</text>
          {i === seasonTrends.length - 1 && (
            <text x={tx(i) + 8} y={ty(d.health) + 4} fontFamily={SF} fontSize="10" fill="#3A7532" fontWeight="600">{d.health}</text>
          )}
        </g>
      ))}
    </svg>
  )
}

const priorityConfig = {
  critical: { color: '#C03428', bg: '#FEF0EE', borderColor: '#F0A09A', label: 'Critical' },
  high: { color: '#B87020', bg: '#FDF6EC', borderColor: '#E8C080', label: 'High' },
  medium: { color: '#B87020', bg: '#FDFAF4', borderColor: '#E8D0A0', label: 'Medium' },
  low: { color: '#2A5C82', bg: '#EFF6FD', borderColor: '#A8C8E8', label: 'Low' },
}

export default function InsightsScreen() {
  const [expanded, setExpanded] = useState<number | null>(0)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiResponse, setAiResponse] = useState<string | null>(null)

  const handleAsk = () => {
    if (!aiPrompt.trim()) return
    const isSpray = aiPrompt.toLowerCase().includes('spray')
    setAiResponse(
      isSpray
        ? 'A targeted aphicide at 1.0 L/ha is recommended for North Paddock B within 48 hours, preferably early morning to protect beneficial insects. Observe a 7-day withholding period before harvest.'
        : 'Field data shows North Paddock B carries the highest compound risk — moisture stress, nitrogen deficiency, and aphid pressure together. Address irrigation and nutrition before pest management for best return.'
    )
    setAiPrompt('')
  }

  return (
    <div style={{ paddingBottom: 24, minHeight: '100%', background: '#F7F4EE' }}>
      <div style={{ padding: '14px 22px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3A7532' }} />
          <span style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', fontWeight: 500 }}>AI Analysis · Updated 9:41 AM</span>
        </div>
        <h2 className="font-display" style={{ fontSize: 24, color: '#1C1A15', margin: 0 }}>Farm Intelligence</h2>
      </div>

      {/* Season trend card */}
      <div style={{ margin: '0 18px 16px', background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', fontWeight: 500, marginBottom: 2 }}>Farm Health · 2026 Season</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span className="font-display" style={{ fontSize: 32, color: '#1C1A15' }}>74</span>
              <span style={{ fontFamily: SF, fontSize: 12, color: '#3A7532', fontWeight: 600 }}>↑ +12 pts since Apr</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: SF, fontSize: 10, color: '#9A9186', marginBottom: 2 }}>Projected</div>
            <div className="font-display" style={{ fontSize: 22, color: '#B87020' }}>79</div>
            <div style={{ fontFamily: SF, fontSize: 10, color: '#B87020' }}>end of season</div>
          </div>
        </div>
        <TrendSparkline />
      </div>

      {/* Recommendations */}
      <div style={{ margin: '0 18px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: '#1C1A15', letterSpacing: '-0.01em' }}>Recommendations</span>
          <span style={{ fontFamily: SF, fontSize: 12, color: '#9A9186' }}>{recommendations.length} active</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {recommendations.map((rec, i) => {
            const config = priorityConfig[rec.priority as keyof typeof priorityConfig]
            const isOpen = expanded === i
            return (
              <div key={i} style={{ background: isOpen ? config.bg : 'white', border: `1px solid ${isOpen ? config.borderColor : '#EDE8DF'}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  style={{ width: '100%', background: 'none', border: 'none', padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{rec.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <div style={{ background: config.color + '18', borderRadius: 6, padding: '2px 7px' }}>
                        <span style={{ fontFamily: SF, fontSize: 11, fontWeight: 600, color: config.color }}>{config.label}</span>
                      </div>
                      <span style={{ fontFamily: SF, fontSize: 11, color: '#9A9186' }}>{rec.field}</span>
                    </div>
                    <div style={{ fontFamily: SF, fontSize: 13, color: '#1C1A15', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{rec.title}</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path d="M4 6l4 4 4-4" stroke="#C8C0B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 16px 16px' }}>
                    <p style={{ fontFamily: SF, fontSize: 13, color: '#5A5248', lineHeight: 1.6, margin: '0 0 14px' }}>{rec.detail}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                      <div style={{ background: 'white', borderRadius: 10, padding: '10px 12px' }}>
                        <div style={{ fontFamily: SF, fontSize: 10, color: '#9A9186', fontWeight: 500, marginBottom: 3 }}>Expected Impact</div>
                        <div style={{ fontFamily: SF, fontSize: 12, color: '#3A7532', fontWeight: 600 }}>{rec.impact}</div>
                      </div>
                      <div style={{ background: 'white', borderRadius: 10, padding: '10px 12px' }}>
                        <div style={{ fontFamily: SF, fontSize: 10, color: '#9A9186', fontWeight: 500, marginBottom: 3 }}>AI Confidence</div>
                        <div className="font-display" style={{ fontSize: 20, color: rec.confidence >= 85 ? '#3A7532' : '#B87020' }}>{rec.confidence}%</div>
                      </div>
                    </div>
                    <button style={{ width: '100%', background: '#3A7532', border: 'none', borderRadius: 12, padding: '12px', fontFamily: SF, fontSize: 13, fontWeight: 600, color: 'white', cursor: 'pointer', letterSpacing: '-0.01em' }}>
                      {rec.action} →
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* AI Chat */}
      <div style={{ margin: '0 18px' }}>
        <div style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: '#1C1A15', letterSpacing: '-0.01em', marginBottom: 10 }}>Ask FarmSense AI</div>
        <div style={{ background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {aiResponse && (
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0EBE2', background: '#F0F8EE' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: '#3A7532', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1C3.8 1 2 2.6 2 4.6c0 1.7 1.2 3 2.5 3.7L6 10l1.5-1.7C8.8 7.6 10 6.3 10 4.6 10 2.6 8.2 1 6 1z" fill="white"/>
                  </svg>
                </div>
                <span style={{ fontFamily: SF, fontSize: 12, fontWeight: 600, color: '#3A7532' }}>FarmSense AI</span>
              </div>
              <p style={{ fontFamily: SF, fontSize: 13, color: '#2A5C24', margin: 0, lineHeight: 1.6 }}>{aiResponse}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: 0 }}>
            <input
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAsk()}
              placeholder="Ask about any field or decision..."
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                padding: '14px 16px',
                fontFamily: SF,
                fontSize: 13,
                color: '#1C1A15',
                outline: 'none',
              }}
            />
            <button
              onClick={handleAsk}
              style={{ padding: '10px 14px', background: aiPrompt.trim() ? '#3A7532' : '#F0EBE2', border: 'none', cursor: 'pointer', margin: 8, borderRadius: 10, transition: 'background 0.2s', flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 8L1.5 2.5l2 5.5-2 5.5L14 8z" fill={aiPrompt.trim() ? 'white' : '#C8C0B4'} strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          {['Should I spray NPB?', 'When to harvest North A?', 'Carbon credit status?'].map(q => (
            <button
              key={q}
              onClick={() => setAiPrompt(q)}
              style={{
                background: 'white',
                border: '1px solid #EDE8DF',
                borderRadius: 20,
                padding: '6px 12px',
                fontFamily: SF,
                fontSize: 12,
                color: '#5A5248',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
