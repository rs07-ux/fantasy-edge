'use client';
import { useState } from 'react';

export default function Home() {
  const [sport, setSport] = useState('NFL');
  const [tab, setTab] = useState('lineup');
  const [scoring, setScoring] = useState('PPR');
  const [week, setWeek] = useState('Week 1');
  const [roster, setRoster] = useState('');
  const [context, setContext] = useState('');
  const [giving, setGiving] = useState('');
  const [receiving, setReceiving] = useState('');
  const [needs, setNeeds] = useState('');
  const [waivers, setWaivers] = useState('');
  const [weakness, setWeakness] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const sports = ['NFL', 'NBA', 'MLB', 'NHL'];
  const tabs = ['lineup', 'trade', 'waiver'];

  async function callAI(prompt: string) {
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result || 'Something went wrong.');
    } catch {
      setResult('Error connecting to AI. Please try again.');
    }
    setLoading(false);
  }

  function analyzeLineup() {
    if (!roster) return alert('Please enter your roster.');
    callAI(`You are an expert fantasy ${sport} analyst.
Sport: ${sport} | Format: ${scoring} | ${week}
Roster:
${roster}
${context ? 'Extra context: ' + context : ''}
Give me:
1. Recommended starting lineup with reasoning
2. Who to sit and why
3. Top 3 matchup/injury alerts
4. Confidence level (High/Medium/Low)
Be specific, concise, and use bullet points.`);
  }

  function analyzeTrade() {
    if (!giving || !receiving) return alert('Fill in both sides of the trade.');
    callAI(`You are an expert fantasy ${sport} analyst.
Giving up: ${giving}
Receiving: ${receiving}
${needs ? 'Team needs: ' + needs : ''}
Give me:
1. Clear verdict: Accept, Decline, or Counter?
2. Value breakdown of each side
3. How it fits the team
4. Suggested counter-offer if needed
Be direct and clear.`);
  }

  function analyzeWaiver() {
    if (!waivers) return alert('Enter available waiver players.');
    callAI(`You are an expert fantasy ${sport} analyst.
Available: ${waivers}
${weakness ? 'Team needs: ' + weakness : ''}
Give me:
1. Top pickup recommendation with strong reasoning
2. Second best option
3. Who to drop to make room
4. FAAB bid % suggestion
Focus on both short-term and long-term value.`);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">⚡</span>
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-900">FantasyEdge AI</h1>
              <p className="text-xs text-gray-500">AI-powered fantasy sports assistant</p>
            </div>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Free Beta</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Win your fantasy league<br />with AI on your side</h2>
          <p className="text-gray-500 text-base">Get instant lineup advice, trade analysis, and waiver picks powered by Claude AI</p>
        </div>

        <div className="flex gap-2 justify-center mb-8">
          {sports.map(s => (
            <button key={s} onClick={() => setSport(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${sport === s ? 'bg-black text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'}`}>
              {s}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map(t => (
              <button key={t} onClick={() => { setTab(t); setResult(''); }}
                className={`flex-1 py-3 text-sm font-medium capitalize transition-all ${tab === t ? 'bg-gray-50 text-gray-900 border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}>
                {t === 'lineup' ? '🏈 Lineup Optimizer' : t === 'trade' ? '🔄 Trade Analyzer' : '📋 Waiver Wire'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {tab === 'lineup' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Scoring Format</label>
                    <select value={scoring} onChange={e => setScoring(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-black">
                      <option>Standard</option>
                      <option>PPR</option>
                      <option>Half PPR</option>
                      <option>DFS</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Week</label>
                    <select value={week} onChange={e => setWeek(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-black">
                      {Array.from({length: 18}, (_, i) => <option key={i}>Week {i + 1}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Your Roster</label>
                  <textarea value={roster} onChange={e => setRoster(e.target.value)} rows={5}
                    placeholder={`QB: Lamar Jackson, Jalen Hurts\nRB: Christian McCaffrey, Derrick Henry\nWR: Tyreek Hill, Ja'Marr Chase\nTE: Travis Kelce\nK: Justin Tucker\nDST: SF 49ers`}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black resize-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Extra Context (optional)</label>
                  <textarea value={context} onChange={e => setContext(e.target.value)} rows={2}
                    placeholder="Any injuries, weather, or matchup notes..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black resize-none" />
                </div>
                <button onClick={analyzeLineup} disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all disabled:opacity-40">
                  {loading ? 'Analyzing...' : 'Optimize My Lineup →'}
                </button>
              </div>
            )}

            {tab === 'trade' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Players You're Giving Up</label>
                  <textarea value={giving} onChange={e => setGiving(e.target.value)} rows={3}
                    placeholder="E.g.: Derrick Henry, DeVonta Smith"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black resize-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Players You're Receiving</label>
                  <textarea value={receiving} onChange={e => setReceiving(e.target.value)} rows={3}
                    placeholder="E.g.: Justin Jefferson, Tony Pollard"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black resize-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Your Team Needs</label>
                  <textarea value={needs} onChange={e => setNeeds(e.target.value)} rows={2}
                    placeholder="E.g.: Need RB depth, strong at WR, week 14 playoff push"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black resize-none" />
                </div>
                <button onClick={analyzeTrade} disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all disabled:opacity-40">
                  {loading ? 'Analyzing...' : 'Analyze This Trade →'}
                </button>
              </div>
            )}

            {tab === 'waiver' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Available Waiver Players</label>
                  <textarea value={waivers} onChange={e => setWaivers(e.target.value)} rows={3}
                    placeholder="E.g.: Jaylen Warren, Zack Moss, Rashid Shaheed"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black resize-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Your Team Weaknesses</label>
                  <textarea value={weakness} onChange={e => setWeakness(e.target.value)} rows={2}
                    placeholder="E.g.: Need a WR2, backup RB is on bye week 11"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black resize-none" />
                </div>
                <button onClick={analyzeWaiver} disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all disabled:opacity-40">
                  {loading ? 'Analyzing...' : 'Get Waiver Advice →'}
                </button>
              </div>
            )}
          </div>
        </div>

        {(loading || result) && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">AI Recommendation</span>
            </div>
            {loading ? (
              <div className="flex gap-1 py-4">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
              </div>
            ) : (
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{result}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Free</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">$0<span className="text-base font-normal text-gray-400">/mo</span></div>
            <p className="text-sm text-gray-500 mb-4">Get started today</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>✓ 3 AI requests per day</li>
              <li>✓ Lineup optimizer</li>
              <li>✓ Trade analyzer</li>
              <li>✓ Waiver wire advice</li>
            </ul>
            <div className="w-full text-center py-2 rounded-lg border border-gray-200 text-sm text-gray-500">Current Plan</div>
          </div>
          <div className="bg-black rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-400 text-black text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
            <div className="text-sm font-medium text-gray-400 mb-1">Pro</div>
            <div className="text-3xl font-bold text-white mb-1">$9.99<span className="text-base font-normal text-gray-400">/mo</span></div>
            <p className="text-sm text-gray-400 mb-4">For serious fantasy players</p>
            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li>✓ Unlimited AI requests</li>
              <li>✓ Everything in Free</li>
              <li>✓ Player injury alerts</li>
              <li>✓ AI Fantasy Coach chat</li>
              <li>✓ Season simulator</li>
              <li>✓ Weakness Exploiter</li>
            </ul>
            <button onClick={async () => {
              const email = prompt('Enter your email to subscribe:');
              if (!email) return;
              const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
              });
              const data = await res.json();
              if (data.url) window.location.href = data.url;
            }} className="w-full bg-white text-black py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all">
              Upgrade to Pro →
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mb-8">Powered by Claude AI · FantasyEdge AI © 2026</p>
      </div>
    </main>
  );
}