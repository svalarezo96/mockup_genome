import { useState } from 'react'

const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'
type TabId = 'soc' | 'micro' | 'lab'

const labResults = [
  { param: 'pH (CaCl₂)', value: '6.8', unit: '', ref: '6.5–7.0', status: 'good' },
  { param: 'Bray P', value: '22', unit: 'ppm', ref: '15–30', status: 'good' },
  { param: 'Nitrate-N', value: '8', unit: 'mg/kg', ref: '10–25', status: 'warn' },
  { param: 'Ammonium-N', value: '3.2', unit: 'mg/kg', ref: '2–5', status: 'good' },
  { param: 'Potassium', value: '182', unit: 'mg/kg', ref: '120–200', status: 'good' },
  { param: 'Sulfur', value: '9.1', unit: 'mg/kg', ref: '8–15', status: 'good' },
  { param: 'Total C', value: '3.4', unit: '%', ref: '≥2.5', status: 'good' },
  { param: 'Total N', value: '0.31', unit: '%', ref: '0.2–0.4', status: 'good' },
  { param: 'C:N ratio', value: '11.0', unit: '', ref: '10–14', status: 'good' },
]

const socData = [
  { year: '2019', value: 2.8, pred: false },
  { year: '2020', value: 2.9, pred: false },
  { year: '2021', value: 3.1, pred: false },
  { year: '2022', value: 3.0, pred: false },
  { year: '2023', value: 3.2, pred: false },
  { year: '2024', value: 3.4, pred: false },
  { year: '2025', value: 3.6, pred: true },
  { year: '2026', value: 3.8, pred: true },
  { year: '2027', value: 4.0, pred: true },
]

function SOCChart() {
  const w = 300, h = 130
  const padL = 32, padB = 28, padR = 12, padT = 14
  const innerW = w - padL - padR
  const innerH = h - padB - padT
  const min = 2.5, max = 4.3
  const toX = (i: number) => padL + (i / (socData.length - 1)) * innerW
  const toY = (v: number) => padT + innerH - ((v - min) / (max - min)) * innerH
  const obs = socData.filter(d => !d.pred)
  const pred = socData.filter(d => d.pred)
  const join = socData.find(d => d.pred)!
  const joinPrev = obs[obs.length - 1]
  const pathD = (pts: typeof socData) => pts.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(socData.indexOf(d))} ${toY(d.value)}`).join(' ')

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="soc-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A7532" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#3A7532" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Grid */}
      {[2.5, 3.0, 3.5, 4.0].map(v => (
        <g key={v}>
          <line x1={padL} y1={toY(v)} x2={w - padR} y2={toY(v)} stroke="#EDE8DF" strokeWidth="1"/>
          <text x={padL - 5} y={toY(v) + 3.5} textAnchor="end" fontFamily={SF} fontSize="8" fill="#C8C0B4">{v}</text>
        </g>
      ))}
      {/* X labels */}
      {socData.map((d, i) => i % 2 === 0 && (
        <text key={d.year} x={toX(i)} y={h - 6} textAnchor="middle" fontFamily={SF} fontSize="8" fill="#C8C0B4">{d.year}</text>
      ))}
      {/* Observed fill */}
      <path d={`${pathD(obs)} L ${toX(obs.length - 1)} ${h - padB} L ${toX(0)} ${h - padB} Z`} fill="url(#soc-grad)"/>
      {/* Lines */}
      <path d={pathD(obs)} fill="none" stroke="#3A7532" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1={toX(socData.indexOf(joinPrev))} y1={toY(joinPrev.value)} x2={toX(socData.indexOf(join))} y2={toY(join.value)} stroke="#B87020" strokeWidth="2" strokeDasharray="5 3"/>
      <path d={pathD(pred)} fill="none" stroke="#B87020" strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Dots */}
      {obs.map(d => <circle key={d.year} cx={toX(socData.indexOf(d))} cy={toY(d.value)} r={3} fill="#3A7532"/>)}
      {pred.map(d => <circle key={d.year} cx={toX(socData.indexOf(d))} cy={toY(d.value)} r={3} fill="white" stroke="#B87020" strokeWidth="2"/>)}
      {/* Callout */}
      <rect x={toX(5) - 22} y={toY(3.4) - 18} width="44" height="16" rx="5" fill="#E8F5E5"/>
      <text x={toX(5)} y={toY(3.4) - 6} textAnchor="middle" fontFamily={SF} fontSize="9" fill="#3A7532" fontWeight="600">3.4% C</text>
    </svg>
  )
}

function MicrobiomeDonut() {
  const data = [
    { group: 'Bacteria', pct: 68, color: '#3A7532' },
    { group: 'Fungi', pct: 22, color: '#B87020' },
    { group: 'Archaea', pct: 7, color: '#2A5C82' },
    { group: 'Other', pct: 3, color: '#D8D0C4' },
  ]
  const r = 44, cx = 60, cy = 60
  let angle = -90
  const slices = data.map(d => {
    const start = angle
    const sweep = (d.pct / 100) * 360
    angle += sweep
    return { ...d, start, sweep }
  })
  const arc = (start: number, sweep: number) => {
    const tr = (d: number) => (d * Math.PI) / 180
    const x1 = cx + r * Math.cos(tr(start)), y1 = cy + r * Math.sin(tr(start))
    const x2 = cx + r * Math.cos(tr(start + sweep)), y2 = cy + r * Math.sin(tr(start + sweep))
    return `M ${x1} ${y1} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2}`
  }
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
        <circle cx={cx} cy={cy} r={r + 10} fill="#F7F4EE"/>
        {slices.map(s => <path key={s.group} d={arc(s.start, s.sweep)} fill="none" stroke={s.color} strokeWidth="14"/>)}
        <circle cx={cx} cy={cy} r={30} fill="white"/>
        <text x={cx} y={cy - 3} textAnchor="middle" fontFamily="'DM Serif Display', Georgia, serif" fontSize="18" fill="#1C1A15">3.8</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontFamily={SF} fontSize="8" fill="#9A9186" fontWeight="500">DIVERSITY</text>
      </svg>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.map(d => (
          <div key={d.group} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
            <span style={{ fontFamily: SF, fontSize: 13, color: '#5A5248', flex: 1 }}>{d.group}</span>
            <div style={{ width: 60, height: 4, background: '#EDE8DF', borderRadius: 2 }}>
              <div style={{ width: `${d.pct}%`, height: '100%', background: d.color, borderRadius: 2 }} />
            </div>
            <span style={{ fontFamily: SF, fontSize: 12, color: '#1C1A15', fontWeight: 600, minWidth: 28 }}>{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SoilScreen() {
  const [activeTab, setActiveTab] = useState<TabId>('soc')

  return (
    <div style={{ paddingBottom: 24, minHeight: '100%', background: '#F7F4EE' }}>
      <div style={{ padding: '14px 22px 16px' }}>
        <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', fontWeight: 500, marginBottom: 3 }}>East Fields · Lab 18 Sep 2026</div>
        <h2 className="font-display" style={{ fontSize: 24, color: '#1C1A15', margin: 0 }}>Soil Intelligence</h2>
      </div>

      {/* Soil profile */}
      <div style={{ margin: '0 18px 16px', background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ fontFamily: SF, fontSize: 12, fontWeight: 600, color: '#1C1A15', marginBottom: 12 }}>Soil Profile — Horizons</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 20, display: 'flex', flexDirection: 'column', borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
            {[['#8B6914', 30], ['#9E7A20', 25], ['#B8924E', 20], ['#C8AA78', 15], ['#D8C4A2', 10]].map(([c, h], i) => (
              <div key={i} style={{ background: c as string, flex: h as number }} />
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { label: 'A — Topsoil', depth: '0–28 cm', soc: '3.4%', texture: 'Clay loam' },
              { label: 'AB — Transition', depth: '28–45 cm', soc: '1.8%', texture: 'Clay loam' },
              { label: 'B — Subsoil', depth: '45–80 cm', soc: '0.6%', texture: 'Heavy clay' },
              { label: 'BC — Parent', depth: '80–120 cm', soc: '0.2%', texture: 'Weathered rock' },
              { label: 'C — Bedrock', depth: '>120 cm', soc: '<0.1%', texture: 'Granite' },
            ].map(h => (
              <div key={h.label} style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 4, borderBottom: '1px solid #F0EBE2' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: SF, fontSize: 11, color: '#1C1A15', fontWeight: 500 }}>{h.label}</span>
                  <span style={{ fontFamily: SF, fontSize: 10, color: '#9A9186', marginLeft: 6 }}>{h.depth}</span>
                </div>
                <span style={{ fontFamily: SF, fontSize: 11, color: '#3A7532', fontWeight: 600 }}>{h.soc}</span>
                <span style={{ fontFamily: SF, fontSize: 10, color: '#9A9186' }}>{h.texture}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{ margin: '0 18px 14px', background: '#EDE8DF', borderRadius: 12, padding: 4, display: 'flex', gap: 2 }}>
        {([['soc', 'SOC'], ['micro', 'Microbiome'], ['lab', 'Lab Results']] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              flex: 1,
              fontFamily: SF,
              fontSize: 12,
              fontWeight: activeTab === id ? 600 : 400,
              padding: '7px 4px',
              background: activeTab === id ? 'white' : 'none',
              border: 'none',
              borderRadius: 9,
              color: activeTab === id ? '#1C1A15' : '#9A9186',
              cursor: 'pointer',
              boxShadow: activeTab === id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'soc' && (
        <div style={{ margin: '0 18px', background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', fontWeight: 500, marginBottom: 2 }}>Soil Organic Carbon</div>
              <div className="font-display" style={{ fontSize: 32, color: '#1C1A15' }}>3.4<span style={{ fontSize: 16, color: '#9A9186' }}>%C</span></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', fontWeight: 500, marginBottom: 2 }}>AI Forecast 2027</div>
              <div className="font-display" style={{ fontSize: 24, color: '#B87020' }}>4.0<span style={{ fontSize: 13, color: '#D4A060' }}>%C</span></div>
              <div style={{ fontFamily: SF, fontSize: 11, color: '#3A7532', fontWeight: 500 }}>↑ +0.6 predicted</div>
            </div>
          </div>
          <SOCChart />
          <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 18, height: 3, background: '#3A7532', borderRadius: 2 }} />
              <span style={{ fontFamily: SF, fontSize: 11, color: '#9A9186' }}>Observed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 18, height: 3, background: '#B87020', borderRadius: 2, opacity: 0.7 }} />
              <span style={{ fontFamily: SF, fontSize: 11, color: '#9A9186' }}>AI Predicted</span>
            </div>
          </div>
          <div style={{ marginTop: 14, padding: '10px 12px', background: '#F0F8EE', borderRadius: 10, border: '1px solid #C8E8C0' }}>
            <div style={{ fontFamily: SF, fontSize: 12, color: '#2A5C24', lineHeight: 1.5 }}>
              At current trajectory, East Fields will reach the <strong>4% SOC threshold</strong> by late 2027, qualifying for carbon credit certification under ERF methodology.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'micro' && (
        <div style={{ margin: '0 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: '#1C1A15', marginBottom: 14 }}>Microbial Community</div>
            <MicrobiomeDonut />
          </div>
          <div style={{ background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: '#1C1A15', marginBottom: 12 }}>Functional Groups</div>
            {[
              { name: 'N-fixers', score: 72, detail: 'Rhizobium, Azospirillum' },
              { name: 'P-solubilisers', score: 58, detail: 'Bacillus, Pseudomonas' },
              { name: 'AMF colonisation', score: 84, detail: 'Glomus, Rhizophagus' },
              { name: 'Suppressives', score: 67, detail: 'Trichoderma, Streptomyces' },
            ].map(g => (
              <div key={g.name} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div>
                    <span style={{ fontFamily: SF, fontSize: 13, color: '#1C1A15', fontWeight: 500 }}>{g.name}</span>
                    <span style={{ fontFamily: SF, fontSize: 11, color: '#9A9186', marginLeft: 6 }}>{g.detail}</span>
                  </div>
                  <span style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: g.score >= 70 ? '#3A7532' : '#B87020' }}>{g.score}</span>
                </div>
                <div style={{ height: 5, background: '#EDE8DF', borderRadius: 3 }}>
                  <div style={{ width: `${g.score}%`, height: '100%', background: g.score >= 70 ? '#3A7532' : '#B87020', borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'lab' && (
        <div style={{ margin: '0 18px', background: 'white', border: '1px solid #EDE8DF', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0EBE2', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: '#1C1A15' }}>East Fields · 18 Sep 2026</span>
            <span style={{ fontFamily: SF, fontSize: 11, color: '#9A9186' }}>9 analytes</span>
          </div>
          {labResults.map((r, i) => (
            <div key={r.param} style={{ display: 'flex', alignItems: 'center', padding: '11px 16px', borderBottom: i < labResults.length - 1 ? '1px solid #F7F4EE' : 'none', gap: 10 }}>
              <div style={{ flex: 1, fontFamily: SF, fontSize: 13, color: '#1C1A15' }}>{r.param}</div>
              <div style={{ fontFamily: SF, fontSize: 13, fontWeight: 600, color: r.status === 'good' ? '#3A7532' : '#B87020' }}>
                {r.value}<span style={{ fontSize: 10, color: '#9A9186', fontWeight: 400, marginLeft: 2 }}>{r.unit}</span>
              </div>
              <div style={{ fontFamily: SF, fontSize: 10, color: '#C8C0B4', minWidth: 50, textAlign: 'right' }}>{r.ref}</div>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: r.status === 'good' ? '#3A7532' : '#B87020', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
