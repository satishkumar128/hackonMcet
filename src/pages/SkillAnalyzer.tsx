import React, { useState } from 'react';
import SkillChart from '../components/SkillChart';
import { format } from 'date-fns';

type SkillKey = 'Python' | 'React' | 'UIDesign' | 'Algorithms' | 'Communication';

const SKILLS: SkillKey[] = ['Python', 'React', 'UIDesign', 'Algorithms', 'Communication'];

export default function SkillAnalyzer() {
  const initial = SKILLS.reduce<Record<string, number>>((acc, s) => {
    acc[s] = 60; // default mid-level
    return acc;
  }, {});

  const [values, setValues] = useState<Record<string, number>>(initial);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string[] | null>(null);

  function handleChange(skill: SkillKey, v: number) {
    setValues((prev) => ({ ...prev, [skill]: v }));
  }

  function generateMockPlan(vals: Record<string, number>) {
    // pick skills with lowest scores
    const entries = Object.entries(vals).sort((a, b) => a[1] - b[1]);
    const top = entries.slice(0, 3);
    const recommendations = top.map(([skill, score], i) => {
      const hours = Math.max(1, Math.round((80 - score) / 8));
      return `Practice ${skill} ${hours} hrs/week — focus on fundamentals and exercises.`;
    });
    return recommendations;
  }

  async function handleAnalyze() {
    setLoading(true);
    setPlan(null);
    // simulate AI processing
    setTimeout(() => {
      const p = generateMockPlan(values);
      setPlan(p);
      setLoading(false);
    }, 1200 + Math.random() * 800);
  }

  const chartData = SKILLS.map((s) => ({ subject: s === 'UIDesign' ? 'UI Design' : s, A: values[s], fullMark: 100 }));

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Skill Self-Assessment</h1>
        <p className="text-gray-600 mb-6">Move the sliders to self-assess each skill, then click Analyze Gaps.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {SKILLS.map((skill) => (
              <div key={skill} className="bg-white p-4 rounded shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{skill === 'UIDesign' ? 'UI Design' : skill}</div>
                  <div className="text-sm text-gray-600">{values[skill]}%</div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={values[skill]}
                  onChange={(e) => handleChange(skill, Number(e.target.value))}
                  className="w-full"
                />
              </div>
            ))}

            <div className="pt-2">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-60"
              >
                {loading ? 'Analyzing...' : 'Analyze Gaps'}
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h2 className="font-semibold mb-3">Your Skill Profile</h2>
            <SkillChart data={chartData} dataKey="A" height={320} />

            {plan && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Mock AI Improvement Plan</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {plan.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
                <div className="mt-3 text-sm text-gray-500">Generated {format(new Date(), 'PPP p')}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
