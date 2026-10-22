import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import FieldsScreen from './screens/FieldsScreen'
import SoilScreen from './screens/SoilScreen'
import LifeScreen from './screens/LifeScreen'
import InsightsScreen from './screens/InsightsScreen'

type Tab = 'home' | 'fields' | 'soil' | 'life' | 'insights'

const tabs: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 10.5L11 3l8 7.5V19a1 1 0 01-1 1H4a1 1 0 01-1-1v-8.5z" fill={active ? '#3A7532' : 'none'} stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="8" y="12" width="6" height="8" rx="0.5" fill={active ? '#FFFFFF' : 'none'} stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    id: 'fields',
    label: 'Fields',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="8" height="8" rx="1.5" fill={active ? '#3A7532' : 'none'} stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.5"/>
        <rect x="12" y="2" width="8" height="8" rx="1.5" fill={active ? '#3A753240' : 'none'} stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.5"/>
        <rect x="2" y="12" width="8" height="8" rx="1.5" fill={active ? '#3A753240' : 'none'} stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.5"/>
        <rect x="12" y="12" width="8" height="8" rx="1.5" fill={active ? '#3A7532' : 'none'} stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'soil',
    label: 'Soil',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 17h16" stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 13c3-5 5-2 8-6s4-4 8-4" stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="15" cy="7" r="2.5" fill={active ? '#3A7532' : 'none'} stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'life',
    label: 'Life',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3C8 3 5 5.5 5 9c0 3.5 2.5 6 4.5 7l1.5 2 1.5-2C14.5 15 17 12.5 17 9c0-3.5-3-6-6-6z" fill={active ? '#3A753230' : 'none'} stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 7v4M9 9l2 2 2-2" stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'insights',
    label: 'Recomendation',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" fill={active ? '#3A753218' : 'none'} stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.5"/>
        <path d="M8 11l2.5 2.5L14 8" stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 5v1.5M11 15.5V17M5 11h1.5M15.5 11H17" stroke={active ? '#3A7532' : '#9A9186'} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')

  const screenMap: Record<Tab, React.ReactNode> = {
    home: <HomeScreen />,
    fields: <FieldsScreen />,
    soil: <SoilScreen />,
    life: <LifeScreen />,
    insights: <InsightsScreen />,
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-6" style={{ background: '#DDD7CB' }}>
      {/* Desktop label */}
      {/* <div className="hidden lg:flex flex-col items-start mr-16 max-w-xs">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#3A7532', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5C5 1.5 2.5 3.5 2.5 6.5c0 2.5 2 4.5 3.5 5.5L8 14l2-2c1.5-1 3.5-3 3.5-5.5 0-3-2.5-5-5.5-5z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont', fontSize: 13, fontWeight: 600, color: '#1C1A15', letterSpacing: '-0.01em' }}>FarmSense</span>
          <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont', fontSize: 11, color: '#9A9186', background: '#E8E2D8', padding: '2px 6px', borderRadius: 4 }}>v2.4</span>
        </div>
        <h1 className="font-display" style={{ fontSize: 38, lineHeight: 1.15, color: '#1C1A15', marginBottom: 14, marginTop: 0 }}>
          Understand the<br /><em>health</em> of<br />your farm.
        </h1>
        <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont', fontSize: 14, lineHeight: 1.6, color: '#5A5248', marginBottom: 24, marginTop: 0 }}>
          AI-powered field intelligence combining soil science, microbiome data, weather, biodiversity monitoring, and precision observations.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['SOC Prediction Engine', 'Microbiome Analysis', 'Insect Monitoring', 'Weather Integration', 'AI Decision Support'].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 5, height: 5, background: '#3A7532', borderRadius: '50%' }} />
              <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont', fontSize: 13, color: '#5A5248' }}>{f}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Phone frame */}
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 52,
          background: '#F7F4EE',
          border: '1px solid #C8C0B4',
          boxShadow: '0 0 0 6px #D4CEC6, 0 0 0 7px #C0B8AE, 0 56px 120px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.8)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Status bar */}
        <div style={{ height: 50, display: 'flex', alignItems: 'flex-end', paddingBottom: 8, paddingInline: 28, flexShrink: 0, position: 'relative', zIndex: 10 }}>
          <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 126, height: 36, background: '#1C1A15', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2A2820' }} />
            <div style={{ width: 64, height: 6, borderRadius: 3, background: '#2A2820' }} />
          </div>
          <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont', fontSize: 12, fontWeight: 600, color: '#1C1A15' }}>9:41</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 5, alignItems: 'center' }}>
            {/* Signal */}
            <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
              {[2,5,8,11,14].map((x,i) => (
                <rect key={x} x={x} y={10-(i+1)*2} width="2.5" height={(i+1)*2} rx="0.5" fill={i < 4 ? '#1C1A15' : '#D8D0C4'}/>
              ))}
            </svg>
            {/* WiFi */}
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
              <path d="M7.5 8.5a1 1 0 100 2 1 1 0 000-2z" fill="#1C1A15"/>
              <path d="M4.5 6.5C5.5 5.5 6.5 5 7.5 5s2 .5 3 1.5" stroke="#1C1A15" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M2 3.5C4 1.5 5.8 1 7.5 1s3.5.5 5.5 2.5" stroke="#1C1A15" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {/* Battery */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <div style={{ width: 24, height: 12, border: '1.5px solid #1C1A15', borderRadius: 3, padding: '1.5px', display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 0.82, height: '100%', background: '#3A7532', borderRadius: 1.5 }} />
              </div>
              <div style={{ width: 2, height: 5, background: '#1C1A15', borderRadius: '0 1px 1px 0' }} />
            </div>
          </div>
        </div>

        {/* Screen */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <div key={activeTab} className="animate-fadein" style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            {screenMap[activeTab]}
          </div>
        </div>

        {/* Tab bar — iOS style */}
        <div style={{
          flexShrink: 0,
          height: 82,
          background: 'rgba(247,244,238,0.92)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid #E0D9CE',
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: 10,
          paddingInline: 4,
        }}>
          {tabs.map(tab => {
            const active = tab.id === activeTab
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  padding: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
              >
                {tab.icon(active)}
                <span style={{
                  fontSize: 10,
                  fontFamily: '-apple-system, BlinkMacSystemFont',
                  fontWeight: active ? 600 : 400,
                  color: active ? '#3A7532' : '#9A9186',
                  letterSpacing: '-0.01em',
                }}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
