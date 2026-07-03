'use client';

import { MapPin, IndianRupee, Calendar, Mountain } from 'lucide-react';

interface StatsProps {
  tripCount: number;
}

export default function Stats({ tripCount }: StatsProps) {
  const stats = [
    { value: tripCount, label: 'Destinations', icon: MapPin },
    { value: '₹3K', label: 'Trips From', icon: IndianRupee },
    { value: 'FRI', label: 'Booking Deadline', icon: Calendar },
    { value: 'WG', label: 'Western Ghats', icon: Mountain },
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`p-6 text-center ${
                  idx < stats.length - 1 ? 'border-r border-teal-100/50' : ''
                } ${idx < stats.length - 2 ? 'md:border-r' : ''}`}
              >
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-brand-primary opacity-60" />
                <p className="text-2xl font-['Bebas_Neue'] tracking-wide bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 uppercase tracking-wide mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
